//
// $Id: wim_help.js,v 1.1 2005/03/21 08:50:48 look Exp $
//
// wim_help.js
//
// 2005/03/21 OKAZAKI Hiroki (okaz@teshigoto.net, http://www.teshigoto.net)
//
// This file includes Japanese character set which coded in Shift JIS.
//
//

function writeMenu(sel_item) {
  var clv = new Array;  // css class values

  clv[0] = (sel_item == 0) ? 'm_item_a_sel' : 'm_item_a'; // ヘルプの使い方
  clv[1] = (sel_item == 1) ? 'm_item_a_sel' : 'm_item_a'; // WIM について
  clv[20]= (sel_item == 20) ? 'm_item_a_sel' : 'm_item_a'; // アクセス権について

  // 各画面の説明
  clv[2] = (sel_item == 2) ? 'm_item_sel' : 'm_item'; // ホーム
  clv[3] = (sel_item == 3) ? 'm_item_sel' : 'm_item'; // ドキュメントボックス
  clv[4] = (sel_item == 4) ? 'm_item_sel' : 'm_item'; // ファクス蓄積受信文書
  clv[5] = (sel_item == 5) ? 'm_item_sel' : 'm_item'; // プリンター文書印刷
  clv[6] = (sel_item == 6) ? 'm_item_sel' : 'm_item'; // フォーム一覧
  clv[7] = (sel_item == 7) ? 'm_item_sel' : 'm_item'; // ジョブ
  clv[8] = (sel_item == 8) ? 'm_item_sel' : 'm_item'; // アドレス帳
  clv[9] = (sel_item == 9) ? 'm_item_sel' : 'm_item'; // 設定

  // 操作説明
  clv[10] = (sel_item == 10) ? 'm_item_sel' : 'm_item'; // ドキュメントボックス
  clv[11] = (sel_item == 11) ? 'm_item_sel' : 'm_item'; // ファクス蓄積受信文書
  clv[12] = (sel_item == 12) ? 'm_item_sel' : 'm_item'; // プリンター文書印刷
  clv[13] = (sel_item == 13) ? 'm_item_sel' : 'm_item'; // フォーム一覧
  clv[14] = (sel_item == 14) ? 'm_item_sel' : 'm_item'; // ジョブ
  clv[15] = (sel_item == 15) ? 'm_item_sel' : 'm_item'; // アドレス帳
  clv[16] = (sel_item == 16) ? 'm_item_sel' : 'm_item'; // 設定

  clv[17] = (sel_item == 17) ? 'm_item_a_sel' : 'm_item_a'; // 使用上の注意
  clv[18] = (sel_item == 18) ? 'm_item_a_sel' : 'm_item_a'; // 用語
  clv[19] = (sel_item == 19) ? 'm_item_a_sel' : 'm_item_a'; // 商標


  document.write(
    '<a class="'+clv[0]+'" href="p_help.html">ヘルプの使い方</a>' +
    '<a class="'+clv[1]+'" href="p_top010.html">Web Image Monitor について</a>' +
    '<a class="'+clv[20]+'" href="access_right.html">アクセス権について</a>' +

    '<p class="m_title">各画面の説明</p>' +
    '<a class="'+clv[2]+'" href="index.html">ホーム</a>' +
    '<a class="'+clv[3]+'" href="box0000.html">ドキュメントボックス</a>' +
    '<a class="'+clv[4]+'" href="lsb0000.html">ファクス蓄積受信文書</a>' +
    '<a class="'+clv[5]+'" href="pri0000.html">プリンター文書印刷</a>' +
    '<a class="'+clv[6]+'" href="iol2910.html">プリンターフォーム一覧</a>' +
    '<a class="'+clv[7]+'" href="job2600.html">ジョブ</a>' +
    '<a class="'+clv[8]+'" href="adr0000.html">アドレス帳</a>' +
    '<a class="'+clv[9]+'" href="set4000.html">設定</a>' +

    '<p class="m_title">操作説明</p>' +
    '<a class="'+clv[10]+'" href="p_box000.html">ドキュメントボックス</a>' +
    '<a class="'+clv[11]+'" href="p_fax000.html">ファクス蓄積受信文書</a>' +
    '<a class="'+clv[12]+'" href="p_pri000.html">プリンター文書印刷</a>' +
    '<a class="'+clv[13]+'" href="p_iol010.html">プリンターフォーム一覧</a>' +
    '<a class="'+clv[14]+'" href="p_job000.html">ジョブ</a>' +
    '<a class="'+clv[15]+'" href="p_adr000.html">アドレス帳</a>' +


    '<a class="'+clv[17]+'" href="note.html">使用上の注意</a>' +
    '<a class="'+clv[18]+'" href="yougo.html">用語</a>' +
    '<a class="'+clv[19]+'" href="copyright.html">商標</a>'
  );
}
