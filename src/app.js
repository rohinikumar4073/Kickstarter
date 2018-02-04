import ApiService from './services/ApiService';
import KickStarterController from './controller/KickStarterController';
import KickStarterModel from './model/KickStarterModel';
import KickStarterView from './view/KickStarterView';
global.app=function(){
    window.onload=function(){
    new KickStarterController(new KickStarterModel(),new KickStarterView())
    .initalise();
    }
}