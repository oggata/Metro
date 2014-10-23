//
//  Label.js
//
//
//  Created by Fumitoshi Ogata on 5/30/14.
//  Copyright (c) 2014 http://oggata.github.io All rights reserved.
//

var createLabel = function(text,fontSize,posX,posY,cc4b){
	if(!cc4b){
		cc4b = cc.c4b(0,0,0,255);
	}
    this.card001Text = cc.LabelTTF.create(text,"Arial",fontSize);
    //this.card001Text.setAnchorPoint(0,0);
    this.card001Text.setPosition(posX,posY);
    this.card001Text.setFontFillColor(cc4b);
    //this.card001Text.enableStroke(cc.c4b(255,255,255,5),2,false);
    this.card001Text.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
    return this.card001Text;
};
