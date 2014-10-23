//
//  HttpClient.js
//
//
//  Created by Fumitoshi Ogata on 5/30/14.
//  Copyright (c) 2014 http://oggata.github.io All rights reserved.
//

var getTrainData = function(){
    var xhr = new XMLHttpRequest();
    var requestURL = CONFIG.DATAPOINTS_URL + CONFIG.PassengerSurvey_URL + "&acl:consumerKey=" + CONFIG.ACCESS_TOKEN;
    xhr.open('GET',requestURL,false); //非同期リクエスト
    xhr.send(null);
	if((200 <= xhr.status && xhr.status < 300) || (xhr.status == 304)){
		console.log("リクエスト成功");
		return JSON.parse(xhr.responseText);
	}else{
		console.log("リクエスト失敗したのでダミーデータを取得します.");
        var resp = cc.FileUtils.getInstance().getStringFromFile(metro_station_resp);
        return JSON.parse(resp);
	}
};

var goTwitter = function(){
	var res = "http://twitter.com/share?url=http://oggata.github.io/Territory/&text=ステージクリア!!";
	window.open(res,'_blank');
};

var goFacebook = function(){
	var url = encodeURIComponent('http://oggata.github.io/Territory/');
	var res = "https://www.facebook.com/sharer/sharer.php?u=" + url;
	window.open(res,'_blank')
};