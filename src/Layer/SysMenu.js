//
//  SysMenu.js
//
//
//  Created by Fumitoshi Ogata on 5/30/14.
//  Copyright (c) 2014 http://oggata.github.io All rights reserved.
//

cc.dumpConfig();

var responses  = [];
var SysMenu = cc.Layer.extend({

    init:function () {
        //3:android 4:iphone 5:ipad 100:mobile_web 101:pc_web
        var platform = cc.Application.getInstance().getTargetPlatform();
        this.storage = new Storage();  
        if(platform == 100 || platform == 101){
            //データのロード
            if (!window.localStorage) {
                alert("このブラウザではゲーム状態の保存ができません。(ERR:localStorage)");
                return;
            }
            try{
                var storageData = JSON.parse(window.localStorage.getItem("metoroStorage"));
                if(storageData["saveData"] == true){
                    cc.log("保存されたデータがあります");
                    //cc.log(this.storage);
                    this.storage.setJson(storageData);

                    if(this.storage.user_name == 'nothing'){
                        cc.log('名前が登録されていません.');
                        this.isGettingGameID = false;
                    }else{
                        cc.log('名前は' + this.storage.user_name + 'です.');
                        this.isGettingGameID = true;
                    }
                    cc.log(this.storage);
                    userGameStatus = 2;
                }else{
                    cc.log("保存されたデータはありません");
                }
            }catch(e){
                cc.log("保存されたデータはありません");
            }
        }

        this.wallPaper = cc.Sprite.create(s_screen);
        this.wallPaper.setAnchorPoint(0,0);
        this.addChild(this.wallPaper,0,1);

        this.carPosX = 500;
        this.carPosY = 400;

        this.carPosArr = [];

        this.mapNode = cc.Node.create();
        this.addChild(this.mapNode);

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

        this.car.setPosition(this.carPosX,this.carPosY);
        this.car2.setPosition(this.carPosX - 40 * 1,this.carPosY);
        this.car3.setPosition(this.carPosX - 40 * 2,this.carPosY);
        this.car4.setPosition(this.carPosX - 40 * 3,this.carPosY);
        this.car5.setPosition(this.carPosX - 40 * 4,this.carPosY);
        this.car6.setPosition(this.carPosX - 40 * 5,this.carPosY);
        this.car7.setPosition(this.carPosX - 40 * 6,this.carPosY);
        this.car8.setPosition(this.carPosX - 40 * 7,this.carPosY);
        this.car9.setPosition(this.carPosX - 40 * 8,this.carPosY);
        this.car10.setPosition(this.carPosX - 40 *9,this.carPosY);

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

        this.update();

        this.scheduleUpdate();
        this.setTouchEnabled(true);

        return true;
    },

    update:function(dt){

        this.carPosY += getRandNumberFromRange(-4,5);
        this.car.setPosition(this.carPosX,this.carPosY);
        this.carPosArr.push(this.carPosY);
        if(this.carPosArr.length>30){    
            this.car2.setPosition(this.carPosX - 40 * 1,this.carPosArr[28]);
            this.car3.setPosition(this.carPosX - 40 * 2,this.carPosArr[26]);
            this.car4.setPosition(this.carPosX - 40 * 3,this.carPosArr[24]);
            this.car5.setPosition(this.carPosX - 40 * 4,this.carPosArr[22]);
            this.car6.setPosition(this.carPosX - 40 * 5,this.carPosArr[20]);
            this.car7.setPosition(this.carPosX - 40 * 6,this.carPosArr[18]);
            this.car8.setPosition(this.carPosX - 40 * 7,this.carPosArr[16]);
            this.car9.setPosition(this.carPosX - 40 * 8,this.carPosArr[14]);
            this.car10.setPosition(this.carPosX - 40 *9,this.carPosArr[12]);
            this.carPosArr.splice(1,1);
        }
    },

    onTweet:function(){
        goTwitter();
    },

    onIE:function(){
        this.windowIE.setVisible(true);
    },

    onFacebook:function(){
        this.goToFacebookLayer();
    },

    onTwitter:function(){
        this.goToTwitterLayer();
    },

    onMusic:function(){
        this.goToMusicLayer();
    },

    onErr:function(){
        this.goToErrLayer();
    },

    onSetting:function(){
        this.goToSettingLayer();
    },

    //デバイス入力----->
    onTouchesBegan:function (touches, event) {
        this.touched = touches[0].getLocation();
        this.goToHomeLayer();
    },

    onTouchesMoved:function (touches, event) {
        this.touched = touches[0].getLocation();
    },

    onTouchesEnded:function (touches, event) {
    },

    goToHomeLayer:function (stageNum) {
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
            scene.addChild(HomeLayer.create(this.storage));
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    },
});

SysMenu.create = function () {
    var sg = new SysMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

SysMenu.scene = function () {
    var scene = cc.Scene.create();
    var layer = SysMenu.create();
    scene.addChild(layer);
    return scene;
};

//for XCode Compile
var MyScene = cc.Scene.extend({
    ctor:function() {
        this._super();
        //cc.associateWithNative( this, cc.Scene );
    },
    onEnter:function () {
        this._super();
        var layer = new SysMenu();
        this.addChild(layer);
        layer.init();
    }
});

