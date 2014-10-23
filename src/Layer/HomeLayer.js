//
//  TwitterLayer.js
//
//
//  Created by Fumitoshi Ogata on 5/30/14.
//  Copyright (c) 2014 http://oggata.github.io All rights reserved.
//

var responses = [];

var HomeLayer = cc.Layer.extend({

    ctor:function (storage) {
        this._super();
        this.storage  = storage;
    },

    init:function () {

        this.status = "tutorial"; //tutorial -> start -> gaming -> finish -> result

        this.startCountDown = 0;
        this.gameFinishedTime = 0;

        this.gameTime = 0; //30秒 夜 0-10 朝 10-20 夜 20-30
        this.gameTimeInterval = 0;
        this.gameHour = 5;

        this.mapNode = cc.Node.create();
        this.addChild(this.mapNode);

        this.sumPassangerCnt = 0;
        this.sumPassnagerCntLabel = 0;

        this.addStationIntervalTime = 0;
        this.addStationMaxIntervalTime = 60;

        this.isPushing   = false;
        this.pushingTime = 0;
        this.fallingTime = 0;
        this.carPosArr   = [];
        this.stations    = [];

        this.buildingsPosX = 0;
        this.carPosY = 100;

        //背景
        this.rectBaseNightOpacityRate = 1;
        this.rectBaseNight = cc.LayerColor.create(cc.c4b(25,25,112,255 * 1),640,960);
        this.rectBaseNight.setAnchorPoint(0,0);
        this.mapNode.addChild(this.rectBaseNight);

        this.rectBaseSunsetOpacityRate = 0;
        this.rectBaseSunset = cc.LayerColor.create(cc.c4b(255,140,0,255 * 0),640,960);
        this.rectBaseSunset.setAnchorPoint(0,0);
        this.mapNode.addChild(this.rectBaseSunset);

        this.rectBaseAfternoonOpacityRate = 0;
        this.rectBaseAfternoon = cc.LayerColor.create(cc.c4b(135,206,250,255 * 0),640,960);
        this.rectBaseAfternoon.setAnchorPoint(0,0);
        this.mapNode.addChild(this.rectBaseAfternoon);

        this.buildings = cc.Sprite.create("sprite/buildings.png");
        this.buildings.setAnchorPoint(0,0);
        this.mapNode.addChild(this.buildings);

        this.car = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car);

        this.car2 = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car2);

        this.car3 = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car3);

        this.car4 = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car4);

        this.car5 = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car5);

        this.car6 = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car6);

        this.car7 = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car7);

        this.car8 = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car8);

        this.car9 = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car9);

        this.car10 = cc.Sprite.create("sprite/car.png");
        this.mapNode.addChild(this.car10);

        this.resp = getTrainData();
//cc.log(this.resp);

        //バトルエフェクト
        var frameSeqEffect2= [];
        for (var y = 0; y <= 0; y++) {
            for (var x = 0; x < 10; x++) {
                var frame = cc.SpriteFrame.create("sprite/pipo-btleffect096.png",cc.rect(3240/9*x,240*y,3240/9,240));
                frameSeqEffect2.push(frame);
            }
        }
        this.wa = cc.Animation.create(frameSeqEffect2,0.1);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.effect = cc.Sprite.create("sprite/pipo-btleffect096.png",cc.rect(0,0,3240/9,240));
        this.effect.runAction(this.ra);
        this.effect.setScale(1.5,1.5);
        this.effect.setPosition(-100,10);
        this.car.addChild(this.effect);

        //ヘッダ
        this.header = cc.Sprite.create("back/header.png");
        this.header.setAnchorPoint(0,0);
        this.header.setPosition(0,830);
        this.addChild(this.header);

        this.passangerLabel = createLabel("本日の輸送 0人",30,600,20,cc.c4b(255,255,255,255));
        this.passangerLabel.setAnchorPoint(1,0);
        this.header.addChild(this.passangerLabel);

        this.timeLabel = createLabel("05:00",30,50,40,cc.c4b(255,255,255,255));
        this.timeLabel.setAnchorPoint(0,0);
        this.header.addChild(this.timeLabel);

        //チュートリアル
        this.tutorialBack = cc.LayerColor.create(cc.c4b(0,0,0,255 * 0.6),640,960);
        this.tutorialBack.setAnchorPoint(0,0);
        this.addChild(this.tutorialBack);

        this.tutorialWindow = cc.Sprite.create("back/tutorial.png");
        this.tutorialWindow.setAnchorPoint(0,0);
        this.tutorialBack.addChild(this.tutorialWindow);

        //ゲームFinish
        this.finishBack = cc.LayerColor.create(cc.c4b(0,0,0,255 * 0.6),640,960);
        this.finishBack.setAnchorPoint(0,0);
        this.addChild(this.finishBack);
        this.finishBack.setVisible(false);

        this.resultWindow = cc.Sprite.create("back/finish.png");
        this.resultWindow.setAnchorPoint(0,0);
        this.finishBack.addChild(this.resultWindow);

        //リザルト
        this.resultBack = cc.LayerColor.create(cc.c4b(0,0,0,255 * 0.6),640,960);
        this.resultBack.setAnchorPoint(0,0);
        this.addChild(this.resultBack);
        this.resultBack.setVisible(false);

        this.resultWindow = cc.Sprite.create("back/result.png");
        this.resultWindow.setAnchorPoint(0,0);
        this.resultBack.addChild(this.resultWindow);

        this.rankLabel = createLabel("RANK : S",70,320,550,cc.c4b(255,140,0,255));
        this.rankLabel.setAnchorPoint(0.5,0);
        this.resultBack.addChild(this.rankLabel);

        this.resultLabel = createLabel("0人",60,320,300,cc.c4b(255,140,0,255));
        this.resultLabel.setAnchorPoint(0.5,0);
        this.resultBack.addChild(this.resultLabel);


        var startButton = cc.MenuItemImage.create(
            "button/next.png",
            "button/next.png",
            this.onGameStart,
            this
        );
        startButton.setAnchorPoint(0.5,0);
        startButton.setPosition(320,300);

        var menu = cc.Menu.create(
            startButton
        );
        menu.setPosition(0,0);
        this.tutorialBack.addChild(menu);

        //カウントダウン
        this.countDownLabel = createLabel("始発まで..",50,300,480,cc.c4b(255,255,255,255));
        this.countDownLabel.setAnchorPoint(0.5,0);
        this.addChild(this.countDownLabel);
        this.countDownLabel.setVisible(false);

        this.scheduleUpdate();
        this.setTouchEnabled(true);
        return true;
    },

    update:function(dt){

        this.car.setPosition(320,this.carPosY);
        this.carPosArr.push(this.carPosY);
        if(this.carPosArr.length>30){    
            this.car2.setPosition(320 - 40 * 1,this.carPosArr[28]);
            this.car3.setPosition(320 - 40 * 2,this.carPosArr[26]);
            this.car4.setPosition(320 - 40 * 3,this.carPosArr[24]);
            this.car5.setPosition(320 - 40 * 4,this.carPosArr[22]);
            this.car6.setPosition(320 - 40 * 5,this.carPosArr[20]);
            this.car7.setPosition(320 - 40 * 6,this.carPosArr[18]);
            this.car8.setPosition(320 - 40 * 7,this.carPosArr[16]);
            this.car9.setPosition(320 - 40 * 8,this.carPosArr[14]);
            this.car10.setPosition(320 - 40 *9,this.carPosArr[12]);
            this.carPosArr.splice(1,1);
        }

        if(this.status == "tutorial"){
            this.tutorialBack.setVisible(true);
            return;
        }else{
            this.tutorialBack.setVisible(false);
        }

        if(this.status == "start"){
            this.countDownLabel.setVisible(true);
            var untilStart = Math.ceil((30*3-this.startCountDown)/30);
            this.countDownLabel.setString("始発まで " + untilStart + "秒");
            this.startCountDown++
            if(this.startCountDown>=30*3){
                this.countDownLabel.setVisible(false);
                this.status = "gaming";
            }
            return;
        }else{
            this.countDownLabel.setVisible(false);
        }

        if(this.gameHour>=25){
            this.gameFinishedTime++;
            if(this.gameFinishedTime>=30*2){
                this.status = "result";
                this.resultLabel.setString(this.sumPassangerCnt + "人");

                this.finishBack.setVisible(false);
                this.resultBack.setVisible(true);
            }else{
                this.status = "finish";
                this.finishBack.setVisible(true);
                this.resultBack.setVisible(false);
            }
            return;
        }

        this.gameTime++;
        this.gameTimeInterval++;
        if(this.gameTimeInterval>=30*1.5){
            this.gameTimeInterval = 0;
            this.gameHour++;
            if(this.gameHour>=25){
                this.gameHour = 25;
            }
        }
        this.timeLabel.setString("" + this.gameHour + ":00");

        //夜明け
        if(6 <= this.gameHour && this.gameHour <= 7){
            this.rectBaseSunsetOpacityRate+=0.025;
        }
        if(7 <= this.gameHour && this.gameHour <= 8){
            this.rectBaseAfternoonOpacityRate+=0.025;
        }
        //日が落ちる
        if(17 <= this.gameHour && this.gameHour <= 18){
            this.rectBaseAfternoonOpacityRate-=0.025;
        }
        if(18 <= this.gameHour && this.gameHour <= 19){
            this.rectBaseSunsetOpacityRate-=0.025;
        }

        if(this.rectBaseNightOpacityRate>=1){
            this.rectBaseNightOpacityRate=1;
        }
        if(this.rectBaseNightOpacityRate<0){
            this.rectBaseNightOpacityRate=0;
        }
        if(this.rectBaseSunsetOpacityRate>=1){
            this.rectBaseSunsetOpacityRate=1;
        }
        if(this.rectBaseSunsetOpacityRate<0){
            this.rectBaseSunsetOpacityRate=0;
        }
        if(this.rectBaseAfternoonOpacityRate>=1){
            this.rectBaseAfternoonOpacityRate=1;
        }
        if(this.rectBaseAfternoonOpacityRate<0){
            this.rectBaseAfternoonOpacityRate=0;
        }

        this.rectBaseNight.setOpacity(255*this.rectBaseNightOpacityRate);
        this.rectBaseSunset.setOpacity(255*this.rectBaseSunsetOpacityRate);
        this.rectBaseAfternoon.setOpacity(255*this.rectBaseAfternoonOpacityRate);

/*
        if(this.sumPassangerCnt > this.sumPassnagerCntLabel){
            if(this.sumPassangerCnt - this.sumPassnagerCntLabel >= 1000){
                this.sumPassnagerCntLabel += 1000;
            }else if(this.sumPassangerCnt - this.sumPassnagerCntLabel >= 100){
                this.sumPassnagerCntLabel += 100;
            }else{
                this.sumPassnagerCntLabel += 1;
            }
        }
*/
        this.passangerLabel.setString(
            "本日の輸送 " + this.sumPassangerCnt + "人"
        );


        this.addStationIntervalTime++;

        //getRandNumberFromRange(100,700)
        if(this.addStationIntervalTime>=this.addStationMaxIntervalTime){

            this.addStationMaxIntervalTime = getRandNumberFromRange(20,60)
            this.addStationIntervalTime = 0;

            var _randNum = getRandNumberFromRange(0,this.resp.length-1);
            this.station = new Station(
                this,
                this.resp[_randNum]['owl:sameAs'].substring(32,this.resp[_randNum]['owl:sameAs'].length-5),
                this.resp[_randNum]["odpt:passengerJourneys"]
            );

            this.mapNode.addChild(this.station);
            this.stations.push(this.station);
        }

        if(this.pushingTime>=1){
            this.pushingTime++;
            this.carPosY+=this.pushingTime/2;
        }
        if(this.fallingTime>=1){
            this.fallingTime++;
            this.carPosY-=this.fallingTime/2;
            if(this.carPosY<=100){
                this.carPosY=100;
            }
        }

        this.buildingsPosX--;
        if(this.buildingsPosX<=-640){
            this.buildingsPosX = 0;
        }
        this.buildings.setPosition(this.buildingsPosX,0);
    
        var distance = 0;
        for(var i=0;i<this.stations.length;i++){
            distance = cc.pDistance(this.car.getPosition(),this.stations[i].getPosition());
            if(distance <= 100){
                this.stations[i].isHit = true;
            }
            if(!this.stations[i].update()){
                this.removeChild(this.stations[i]);
                this.stations.splice(i, 1);
            }
        }
    },

    //デバイス入力----->
    onTouchesBegan:function (touches, event) {
        this.pushingTime = 1;
        this.fallingTime = 0;

        if(this.status == "result"){
            this.goToSysMenuLayer();
        }
    },

    onTouchesMoved:function (touches, event) {

    },

    onTouchesEnded:function (touches, event) {
        this.pushingTime = 0;
        this.fallingTime = 1;
    },

    onGameStart:function (){
        this.status = "start"
    },

    goToSysMenuLayer:function (stageNum) {
        //ローディング画像を変更
        var loaderScene = new cc.LoaderScene();
        loaderScene.init();
        loaderScene._logoTexture.src = "res/logo/train.png";
        loaderScene._logoTexture.width  = 320;
        loaderScene._logoTexture.height = 200;
        cc.LoaderScene._instance = loaderScene;
        loaderScene._bgLayer.setColor(cc.c4(0,0,0,255));

        cc.LoaderScene.preload(g_system_resources, function () {
            var scene = cc.Scene.create();
            scene.addChild(SysMenu.create(this.storage));
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    },

});


HomeLayer.create = function (storage) {
    var sg = new HomeLayer(storage);
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

