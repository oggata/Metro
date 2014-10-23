//
//  Storage.js
//
//
//  Created by Fumitoshi Ogata on 5/30/14.
//  Copyright (c) 2014 http://oggata.github.io All rights reserved.
//

var Storage = cc.Class.extend({

    ctor:function () {
        var jsonFile       = cc.FileUtils.getInstance().getStringFromFile(metro_station_dict);
        this.stationDict   = JSON.parse(jsonFile);

        this.user_identification_id = 0;
        this.user_name     = 'nothing';
        this.user_icon_url = 'icon/charactor/default.png';
        this.wall_paper_id = 0;
    },

    init:function () {
    },

    getJson:function(){
        var rtn = '{';
        rtn += '"saveData": true,';
        rtn += '"userIdentificationId":' + this.user_identification_id + ',';
        rtn += '"userName":"' + this.user_name + '",';
        rtn += '"userIconUrl":"' + this.user_icon_url + '",';
        rtn += '"wallPaperId":' + this.wall_paper_id + '';
        rtn += '}';
        return rtn;
    },

    setJson:function(JsonData){
        this.user_identification_id = JsonData["userIdentificationId"];
        this.user_name      = JsonData["userName"];
        this.user_icon_url  = JsonData["userIconUrl"];
        this.wall_paper_id  = JsonData["wallPaperId"];
    },

    resetJson:function(){
        this.user_identification_id = 0;
        this.user_name     = 'nothing';
        this.user_icon_url = 'icon/charactor/default.png';
        this.wall_paper_id = 0;
    }

});

var saveToStorage = function(storage){
    //3:android 4:iphone 5:ipad 100:mobile_web 101:pc_web
    var platform = cc.Application.getInstance().getTargetPlatform(); 
    if(platform == 100 || platform == 101){
        var toObjString = storage.getJson();
        cc.log(toObjString);
        var toObj = JSON.parse(toObjString);
        window.localStorage.setItem("metoroStorage",JSON.stringify(toObj));
    }
};
