// import ClipboardJS from "clipboard";

$(document).ready(function () {
  M.AutoInit();
  var elemTab = document.querySelector(".tabs");
  var instanceTab = M.Tabs.init(elemTab);
  var elemSelect = document.querySelectorAll("select");

  elemSelect.forEach(function (elem) {
    var extraClasses = "";
    if (elem.className) {
      extraClasses = elem.className;
    }

    var instances = M.FormSelect.init(elem, {
      classes: extraClasses
    });
  });

  document.querySelectorAll("[data-tab]").forEach(function (elem) {
    elem.addEventListener("click", function () {
      var target = this.getAttribute("data-tab");
      var targetElem = document.getElementById(target);
      if (!targetElem.className.match("active")) {
        instanceTab.select(target);
      }
      // instanceTab.select(target);

      setTimeout(function () {
        instanceTab.updateTabIndicator();
      }, 200);
    });
  });

  $(".sidebar-menu ul li").each(function (k, i) {
    var currLocation = $(i).find("a");
    currLocation.each(function (k, i) {
      if (location.href.indexOf($(this).attr("href")) !== -1) {
        $(this).addClass("active");
      }
    });
  });

  var datePicker = document.querySelectorAll(".datepicker");
  var datePickerInstances = M.Datepicker.init(datePicker, {
    format: "yyyy-mm-dd",
    i18n: {
      clear: "清除",
      cancel: "取消",
      done: "确定",
      months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      weekdaysShort: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      weekdaysAbbrev: ["日", "一", "二", "三", "四", "五", "六"]
    }
  });

  // loadDomainListSelectState(".modal-domain-list-table tr");

  new ClipboardJS("#password-modal .new-password");
  var userDomainClipboard = new ClipboardJS("[data-clipboard-text]");
  userDomainClipboard.on("success", function (e) {
    const tooltip = $('<div class="tooltip">复制成功</div>');
    $(e.trigger).parents(".card").find(".copy-safe-code").append(tooltip);
    setTimeout(function () {
      tooltip.remove();
    }, 700);
  });

  initTable(".blacklist-table");
  initTable(".dangerous-list-table");
  initTable(".domain-list-table");
  initTable(".user-domain-list-table");
  initTable(".domain-list-management-table");
  initTable(".user-list-table");
  initTable(".admin-list-table");
  initTable(".user-table");

  function initTable(tableSelector) {
    var that = tableSelector;
    var parents = $(that).parents(".main-content");
    var extensions = {
      sFilter: "dataTables_filter search-input",
      sLength: "dataTables_length page-show-item",
      sInfo: "dataTables_info page-total",
      sPaging: "dataTables_paginate pagination ",
      sPageButton: "waves-effect"
    };

    var language = {
      sProcessing: "处理中...",
      sLengthMenu: "显示 _MENU_ 项结果",
      sZeroRecords: "没有匹配结果",
      sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
      sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
      sInfoFiltered: "(由 _MAX_ 项结果过滤)",
      sInfoPostFix: "",
      sSearch: "搜索",
      sUrl: "",
      sEmptyTable: "表中数据为空",
      sLoadingRecords: "载入中...",
      sInfoThousands: ",",
      oPaginate: {
        sFirst: "首页",
        sPrevious: "上一页",
        sNext: "下一页",
        sLast: "末页"
      },
      oAria: {
        sSortAscending: ": 以升序排列此列",
        sSortDescending: ": 以降序排列此列"
      }
    };

	if ($('.table-wrapper').length) {
		// Used when bJQueryUI is false
		$.extend($.fn.dataTableExt.oStdClasses, extensions);

		$("table" + tableSelector).DataTable({
		  language: language,
		  drawCallback: function () {
			initTableFeatures();
		  }
		});
	}

    parents.find(".dataTables_wrapper .dataTables_filter.search-input").appendTo(parents.find(" .search-area .search-area-action"));

    parents.find(".search-area .search-area-action .dataTables_filter.search-input input").appendTo(parents.find(".search-area .search-area-action .dataTables_filter.search-input")).attr("placeholder", language.sSearch);

    parents.find(".search-area .search-area-action .dataTables_filter.search-input").append($('<i class="material-icons">search</i>'));

    parents.find(".search-area .search-area-action .dataTables_filter.search-input label").remove();

    parents.find(".dataTables_wrapper .dataTables_info.page-total").appendTo(parents.find(".table-footer-wrapper"));

    parents.find(".dataTables_wrapper .dataTables_length.page-show-item").appendTo(parents.find(".table-footer-wrapper"));
    parents.find(".dataTables_wrapper .dataTables_paginate").appendTo(parents.find(".table-footer-wrapper"));
  }

  function initTableFeatures() {
    //Initialize Checkbox state
    initSelectAllCheckbox(".domain-list", ".domain-list-table tr");
    initSelectAllCheckbox(".domain-list", ".user-domain-list-table tr");
    initSelectAllCheckbox(".domain-list", ".domain-list-management-table tr");
    initSelectAllCheckbox(".modal-domain-list", ".modal-domain-list-table tr");
    initSelectAllCheckbox(".blacklist", ".blacklist-table tr");
    initSelectAllCheckbox(".dangerous-list", ".dangerous-list-table tr");
    initSelectAllCheckbox(".user-list", ".user-list-table tr");
    initSelectAllCheckbox(".admin-list", ".admin-list-table tr");
    initSelectAllCheckbox(".user-domain-management", ".cards-wrapper .card");

    //Load Select value in table
    loadTableSelectState(".domain-list-table tr");
    loadTableSelectState(".user-domain-list-table tr");
    loadTableSelectState(".user-list-table tr");
    loadTableSelectState(".admin-list-table tr");
  }

  function initSelectAllCheckbox(pageSelector, tableSelector) {
    $(document).on("change", tableSelector + ' input[type="checkbox"]', function () {
      var mainContent = $(this).parents(".main-content");
      var checkbox = $(tableSelector).find('input[type="checkbox"]');
      var totalCheckox = 0;
      $(tableSelector).each(function (k, i) {
        totalCheckox += $(this).find('input[type="checkbox"]:checked').length;
        return totalCheckox;
      });

      if (totalCheckox === checkbox.length) {
        $(pageSelector).find(".select-all").prop("checked", true);
      } else {
        $(pageSelector).find(".select-all").prop("checked", false);
      }

      if (totalCheckox !== 0) {
        mainContent.find(".search-area-list .toggle-action").removeClass("disabled");
      } else {
        mainContent.find(".search-area-list .toggle-action").addClass("disabled");
      }
    });

    $(document).on("change", ".main-content" + pageSelector + " .select-all", function () {
      var mainContent = $(this).parents(".main-content");
      if ($(this).is(":checked")) {
        $(tableSelector).find('input[type="checkbox"]').prop("checked", true);
        mainContent.find(".search-area-list .toggle-action").removeClass("disabled");
      } else {
        $(tableSelector).find('input[type="checkbox"]').prop("checked", false);
        mainContent.find(".search-area-list .toggle-action").addClass("disabled");
      }
    });
  }

  function loadTableSelectState(tableSelector) {
    $(tableSelector).each(function (k, i) {
      var selector = $(i).find(".select-wrapper.small-select");

      var selectedVal = selector.find("option:selected").val();
      if (selectedVal === "enable") {
        selector.addClass("enable").removeClass("disable");
      } else {
        selector.addClass("disable").removeClass("enable");
      }
    });

    $(document).on("change", tableSelector + " .select-wrapper.small-select", function () {
      var selectedVal = $(this).find("option:selected").val();
      if (selectedVal === "enable") {
        $(this).addClass("enable").removeClass("disable");
      } else {
        $(this).addClass("disable").removeClass("enable");
      }
    });
  }

  function loadDomainListSelectState(tableSelector) {
    $(tableSelector).each(function (k, i) {
      var selector = $(i).find(".select-wrapper.small-select");

      var selectedVal = selector.find("option:selected").val();
      if (selectedVal === "blacklist") {
        selector.addClass("blacklist").removeClass("dangerous").removeClass("normal");
      } else if (selectedVal === "dangerous") {
        selector.addClass("dangerous").removeClass("blacklist").removeClass("normal");
      } else {
        selector.addClass("normal").removeClass("dangerous").removeClass("blacklist");
      }
    });

    $(document).on("change", tableSelector + " .select-wrapper.small-select", function () {
      var selectedVal = $(this).find("option:selected").val();
      if (selectedVal === "blacklist") {
        $(this).addClass("blacklist").removeClass("dangerous").removeClass("normal");
      } else if (selectedVal === "dangerous") {
        $(this).addClass("dangerous").removeClass("blacklist").removeClass("normal");
      } else {
        $(this).addClass("normal").removeClass("dangerous").removeClass("blacklist");
      }
    });
  }

  function pushSiteRow(elem) {
    var timestamp = Date.now();
    var newSite = $(`
      <div class="row">
        <div class="input-field col s3">
          <input type="text" name="webName[]" class="webName">
          <label for="webName">端口名称</label>
        </div>
        <div class="input-field col s9">
          <input type="text" name="webDomain[]" class="webDomain">
          <label for="webDomain">网址</label>
		  <div class="helper-text">网址前面记得加上http://或https://</div>
        </div>
		<input name="status[]" type="hidden" value="">
		<input name="regdate[]" type="hidden" value="">
        <div class="remove">
          <i class="material-icons">remove_circle_outline</i>
        </div>
      </div>
    `);

    elem.append(newSite);
  }
  
  function pushAnnouncement(elem) {
    var timestamp = Date.now();
    var newSite = $(`
    <div class="row">
      <div class="input-field col s12">
        <input type="text" name="announcement[]" >
        <label for="announcement">公告内容</label>
      </div>
	  <input name="regdate2[]" type="hidden" value="">
      <div class="remove">
        <i class="material-icons">remove_circle_outline</i>
      </div>
    </div>
  `);

    elem.append(newSite);
  }

  $(".modal").click(function (e) {
   // console.log(e.target);
    if ($(e.target).hasClass("remove")) {
      if ($(e.target).parents(".row").siblings().length) {
        $(e.target).parents(".row").remove();
      }
    }
  });

  $('body').on('click', 'a#addSite', function() {
    console.log("add site clicked");
    var group = $(this).parents("form").find(".site-name-group");
    var amount = group.children().length + 1;
    pushSiteRow(group, amount);
  });
  
  $('body').on('click', 'a#addAnnouncement', function() {
    console.log("add announcement clicked");
    var group = $(this).parents("form").find(".site-announcement-group");
    var amount = group.children().length + 1;
    pushAnnouncement(group, amount);
  });

  $(".modal-close").click(function () {
    var elem = $(this).parents("form").find(".site-name-group");
    elem.find(".row").remove();
    pushSiteRow(elem);
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50 && window.innerWidth <= 720) {
      $("nav, .search-area").css("transform", "translateY(-50px)");
    } else {
      $("nav, .search-area").removeAttr("style");
    }
  });
});
//# sourceMappingURL=../maps/bundle.js.map

function emailValidation(emailcheck) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailcheck);
}

function makeid() {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function validURL(userInput) {
    var res = userInput.match(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i);
    if(res == null)
        return false;
    else
        return true;
}

