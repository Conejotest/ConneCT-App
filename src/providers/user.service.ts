import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


import { User } from '../pages/user/user.model';
import { Answer } from '../pages/questions/answer.model';
import { AuthService } from './auth.service'

@Injectable()
export class UserService {

  listOfCTs$: FirebaseListObservable<any>;

  constructor(
    public db: AngularFireDatabase,
    public authService: AuthService
  ) {}

  updateTelephone(newTelephone:string) {
    return new Promise(resolve =>
      this.getUser().then((_user) => {
          this.db.object(`/${_user.uidCT}/users/${_user.id}`)
            .update({telephone: newTelephone});
        resolve();
      })
    )
  }

  updateOtherTelephone(newTelephone:string) {
    return new Promise(resolve =>
      this.getUser().then((_user) => {
          this.db.object(`/${_user.uidCT}/users/${_user.id}`)
            .update({telephoneOther: newTelephone});
        resolve();
      })
    )
  }

  setRanking(quantity: number) {
    this.getUser().then((_user) => {
      quantity += _user.gamification[0]['quantity'];
      this.db.object(`/${_user.uidCT}/users/${_user.id}/gamification/0/quantity`).set(quantity);
      this.db.object(`/rankingGlobal/${_user.id}`).update({quantity: quantity, username: _user.name});
    })
  }

  setQuestionAnswered(_questionsAnwered: Answer[]): Promise<any> {
    return new Promise(resolve =>
      this.getUser().then((_user) => {
        for (let i in _questionsAnwered)
          this.db.object(`/${_user.uidCT}/users/${_user.id}/questions/${_questionsAnwered[i].questionID}`)
            .update({isActive: false});
        resolve();
      })
    )
  }

  getQuantityPointsRanking(): Promise<number> {
    return new Promise(resolve =>
      this.getUser().then(_user => {
        this.db.object(`/rankingGlobal/${_user.id}`).subscribe(quantityObject => resolve(quantityObject['quantity']));
      }));
  }

  getPositionRanking(): Promise<number> {
    let position: number = 1;
    return new Promise(resolve =>
      this.authService.getUID().then(_uidDQ => {
        this.db.list(`/rankingGlobal`).subscribe(_listDQs => {
          this.getQuantityPointsRanking().then(quantity => {
            _listDQs.forEach(_DQ => {
              if(_uidDQ === _DQ['$key']) {}
              else {
                if(_DQ['quantity'] <= quantity)
                  position++;
              }
            })
            if (position === 1)
              position = 0;
            resolve(Math.trunc((position/_listDQs.length)*100));
          })
        });
      })
    )
  }

  getUser(): Promise<User> {
    return new Promise(resolve => {
        this.authService.getUID().then(_uidDQ => {
        return _uidDQ;
      }).then((_uidDQ: any) => {
        this.listOfCTs$ = this.db.list(`/`);
        this.listOfCTs$.subscribe(_CTs => {
          _CTs.forEach(_DQs => {
            if(_DQs['users'] != undefined)
              if (_DQs['users'][_uidDQ] != undefined)
                resolve(_DQs['users'][_uidDQ]);
          })
        })
      })
    });
  }

  getFirstAnswer(): Promise<string> {
    return new Promise(resolve => {
      this.getUser().then((_user) => {
        this.db.list(`/${_user.uidCT}/users/${_user.id}/answers/0`)
          .subscribe(_listAnwers => {
            resolve(_listAnwers[0])
          });
      })
    });
  }

  pushAnswers (answers: Answer[]) {
    this.getUser().then((_user) => {
      answers.forEach((answer:Answer) => {
        this.db.list(`/${_user.uidCT}/users/${_user.id}/answers/${answer.questionID}/`).push(answer);
      })

    })
  }
}