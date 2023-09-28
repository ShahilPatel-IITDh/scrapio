dla.helper.onAvailability("richInboxStore", function() {
  dla.richInboxPip = (function() {
    let isPipPresent = false;
    const getHeaderPip = () => $("#rich-inbox-pip");

    function appendSpan(element) {
      if (!element.find(".js-rich-inbox-counter").length) {
        element.append(
          '<span class="js-rich-inbox-counter rich-inbox-nav-pip"></span>'
        );
      }
    }

    function showImagePip() {
      const headerPip = getHeaderPip();
      if (!isPipPresent) {
        headerPip.addClass("growUp");
        isPipPresent = true;
      } else {
        headerPip.addClass("show");
      }
    }

    function hideImagePip() {
      getHeaderPip()
        .removeClass("growUp")
        .removeClass("show");
    }

    function addInboxCounters() {
      $(".js-rich-inbox-counter").each(function() {
        $(this)
          .removeClass("zero")
          .text(dla.richInboxStore.getMessageCount().unread);
      });
    }

    function inboxCountersToZero() {
      $(".js-rich-inbox-counter").each(function() {
        $(this)
          .addClass("zero")
          .text("0");
      });
    }

    function removeDesktopTabCounter() {
      $(".richInboxSubNavLink .js-rich-inbox-counter").remove();
    }

    function checkMessages() {
      const accountNavigation = $("#myLottoland .richInbox .message-content");
      const accountTab = $(".richInboxSubNavLink");

      appendSpan(accountNavigation);

      if (dla.richInboxStore.getMessageCount().unread) {
        appendSpan(accountTab);
        showImagePip();
        addInboxCounters();
      } else {
        inboxCountersToZero();
        removeDesktopTabCounter();
        hideImagePip();
        isPipPresent = false;
      }
    }

    window.addEventListener("ll-rich-inbox-store-getMessages", checkMessages);
    window.addEventListener("ll-rich-inbox-store-markAsRead", checkMessages);
    window.addEventListener(
      "ll-rich-inbox-store-markAsReadMultiple",
      checkMessages
    );
    window.addEventListener("ll-rich-inbox-store-markAsDeleted", checkMessages);
    window.addEventListener(
      "ll-rich-inbox-store-markAsDeletedMultiple",
      checkMessages
    );
    window.addEventListener("ll-rich-inbox-store-restoreBackup", checkMessages);

    return {
      checkMessages: checkMessages
    };
  })();

  $(window).trigger("available", "richInboxPip");
});
