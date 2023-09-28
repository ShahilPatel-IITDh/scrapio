
  var rt_rec = true;
  function getCookie(c_name) {
    var st = "";
    var ed = "";
    if (document.cookie.length > 0) {
      st = document.cookie.indexOf(c_name + "=");
      if (st != -1) {
        st = st + c_name.length + 1;
        ed = document.cookie.indexOf(";", st);
        if (ed == -1) ed = document.cookie.length;
        return unescape(document.cookie.substring(st, ed));
      }
    }
    return "";
  }
  if (getCookie("_optout") != "1") {
    Rtoaster.Popup.register({ id: "popup_01", "z-index": 20001 });
    Rtoaster.recommendNow(
      "rt_top_kv_k",
      "rt_top_kv_n",
      "rt_top_kv_con",
      "rt_newpd_common",
      "rt_sp_newpd_common",
      "rt_newpd_common2",
      "rt_pd_h",
      "rt_pd_g",
      "rt_tpoint_finish",
      "rt_sp_tpoint_finish",
      "rt_car_k",
      "rt_car_n",
      "rt_bnr_common",
      "rt_bnr_common2",
      "rt_con",
      "rt_text",
      "rt_btn",
      "rt_btn_2",
      "rt_btn_3",
      "popup_01",
      "popup_001",
      "rt_faq",
      "rt_cta_head",
      "rt_cta_body",
      "rt_btn_4",
      "rt_btn_5",
      "rt_btn_6",
      "rt_btn_7",
      "rt_btn_8",
      "rt_btn_9",
      "rt_btn_10",
      "rt_text_2",
      "rt_text_3",
      "rt_pd_side",
      "rt_pd_side2",
      "rt_pd_side3",
      "rt_en_top_kv"
    );
  }
