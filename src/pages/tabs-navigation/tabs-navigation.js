var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamificationPage } from '../gamification/gamification';
import { QuestionsPage } from '../questions/questions';
var TabsNavigationPage = /** @class */ (function () {
    function TabsNavigationPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gamificationPage = GamificationPage;
        this.questionPage = QuestionsPage;
    }
    TabsNavigationPage = __decorate([
        Component({
            selector: 'page-tabs-navigation',
            templateUrl: 'tabs-navigation.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], TabsNavigationPage);
    return TabsNavigationPage;
}());
export { TabsNavigationPage };
//# sourceMappingURL=tabs-navigation.js.map