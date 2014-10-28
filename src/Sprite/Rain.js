//
//  Station.js
//  Territory
//
//  Created by Fumitoshi Ogata on 5/30/14.
//  Copyright (c) 2014 http://oggata.github.io All rights reserved.
//

var Rain = cc.Node.extend({
    ctor:function (game) {
        this._super();
        this.game  = game;
        this.isHit = false;
        this.hitTime = 0;

        if(0 <= this.game.gameHour && this.game.gameHour < 12){
            this.speed = getRandNumberFromRange(3,5);
        }else if(12 <= this.game.gameHour && this.game.gameHour < 18){
            this.speed = getRandNumberFromRange(3,10);
        }else if(18 <= this.game.gameHour && this.game.gameHour <= 25){
            this.speed = getRandNumberFromRange(3,15);
        }

        this.mapX = 320*2;
        this.mapY = getRandNumberFromRange(100,700);
        this.rain = cc.Sprite.create("sprite/rain.png");
        this.addChild(this.rain);

        this.setPosition(this.mapX,this.mapY);
    },

    update:function(){

        //衝突したときの処理
        if(this.isHit){
            this.hitTime++;
            var rate = 1-this.hitTime*0.08;
            if(rate<0){rate = 0}
            this.rain.setOpacity(255*rate);
            //this.nameLabel.setOpacity(255*rate);
            //this.passengerNumLabel.setOpacity(255*rate);
            if(this.hitTime>=15){
                //this.game.sumPassangerCnt+=this.passangerNum;
                this.game.isRainy = true;
                return false;
            }
        }

        this.mapX-=this.speed;
        this.setPosition(this.mapX,this.mapY);
        if(this.mapX<=-700){
            return false;
        }
        return true;
    },

});
