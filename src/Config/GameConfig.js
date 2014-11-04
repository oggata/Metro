var CONFIG = CONFIG || {};


CONFIG.DEBUG_FLAG  = 0;
CONFIG.BGM_VOLUME  = 1;
CONFIG.SE_VOLUME   = 0.6;

CONFIG.API_ENDPOINT   = 'https://api.tokyometroapp.jp/api/v2/';
CONFIG.DATAPOINTS_URL = CONFIG.API_ENDPOINT + "datapoints?";
CONFIG.PassengerSurvey_URL = "rdf:type=odpt:PassengerSurvey";
CONFIG.ACCESS_TOKEN   = 'f51607b1ea60bdb68d860e5ac63dc5f2f1705eb4a31abea04a0fe5aa2475100f';

/*
使用素材

ぴぽや
http://piposozai.blog76.fc2.com/

SILHOUETTE DESIGN(シルエットデザイン)
http://kage-design.com/wp/?p=1055

無料イラスト素材ドットコム
http://www.xn--eckzb3bzhw32znfcp1zduw.com/data/weather.php

地図アイコン無料素材
http://map-icon.com/transportation/transportation-dl-01.html

アプリの説明　（800文字程度）

あさはやくから、よるおそくまで、でんしゃはたくさんのひとをはこんでいます。
いちにちに、なんにんのひとを、でんしゃは、はこんでいるんだろう？
ひゃくにん？せんにん？それよりもっとかな？
しはつから、しゅうでんまで、メトロのいろいろな「えき」を、つうかして
たくさんのおきゃくさんをはこんでみましょう！

写真、スナップショット　（5枚以内）

説明動画（最大再生時間5分）
アプリケーションマニュアル（アプリケーションの動作、操作方法）

1.ゲーム開始されると、電車が自動的に進みます。
画面のどこでも良いので、長押しすると電車の高度が上昇します。

2.電車の高度を調整しながら、右から左に流れてくる「駅」のマーカーを
ゲットしてください（電車とマーカーが接触するとゲットしたことになります）

3.「駅」マーカーをゲットすると、その駅の１日の利用客数がそのまま、
自身が運んだ人数としてカウントされます。

4.「雨雲」マーカーにぶつかってしまうと、一定時間雨が降ります。
雨が降ると、電車の高度調整が難しくなってしまうので、なるべくぶつからないようにしましょう。

アプリケーション公開URL　（Google Play、App Store、Windowsストアのほか、応募者が設定した任意のWebサイト）
http://oggata.sakura.ne.jp/metro/

アプリ内で利用したデータ
各駅の乗降人員数
rdf:type=odpt:PassengerSurvey

Core
Controllers
	|-LoginLayerController.js
Models
	|-User.js
Views
	|-hogeButton.js
Utils
	|-logger.ks
Extensions
	|-json
Networking
	|-ParseApp.js

*/