var CONFIG = CONFIG || {};


CONFIG.DEBUG_FLAG  = 0;
CONFIG.BGM_VOLUME  = 1;
CONFIG.SE_VOLUME   = 1;

CONFIG.API_ENDPOINT   = 'https://api.tokyometroapp.jp/api/v2/';
CONFIG.DATAPOINTS_URL = CONFIG.API_ENDPOINT + "datapoints?";
CONFIG.PassengerSurvey_URL = "rdf:type=odpt:PassengerSurvey";
CONFIG.ACCESS_TOKEN   = 'access_token';

/*

#アプリの説明　（800文字程度）

メトロの星空ダイヤ

あさはやくから、よるおそくまで、でんしゃはたくさんのひとをはこんでいます。
いちにちに、なんにんのひとを、でんしゃは、はこんでいるんだろう？
ひゃくにん？せんにん？それよりもっとかな？
しはつから、しゅうでんまで、メトロのいろいろな「えき」を、つうかして
たくさんのおきゃくさんをはこぶ、ゲームです。

*/