
    var $j = jQuery.noConflict();

    jQuery(document).ready(function($j) {
      $j("input[type=text].input-register,input[type=email].input-register,input[type=tel].input-register, .input-register ").each(function() {
        $j(this).qtip({
          content: $j(this).attr("data-message"),
          style: {
            tip: "bottomLeft",
            name: "blue",
            background: "#FFFFFF",
            color: "#223A6C"
          },
          position: {
            target: $j("#" + $j(this).attr("id")),
            corner: {
              target: "topMiddle",
              tooltip: "bottomLeft"
            },
            adjust: {
              x: 0,
              y: 0
            }
          },
          show: "focus",
          hide: "blur"
        });
      });
      $j("#enviar").click(function() {
        if (formValidator()) {
          $j("#lead").submit();
        }
        $j("#lead").attr("action", "https://www.efectivale.com/combustible/gracias.php");
      });
      $j("#lead").qtip({
        content: {
          title: {
            text: "Error",
            button: "Cerrar"
          },
          text: ""
        },
        position: {
          target: $j(document.body),
          corner: "center"
        },
        show: {
          when: false
        },
        hide: false,
        style: {
          width: 350,
          padding: "14px",
          border: {
            width: 9,
            radius: 9,
            color: "#666666"
          },
          name: "light"
        },
        api: {
          beforeShow: function() {
            $j("#qtip-blanket").fadeIn(this.options.show.effect.length);
          },
          beforeHide: function() {
            $j("#qtip-blanket").fadeOut(this.options.hide.effect.length);
            INVALID_ELEMENT.focus();
            if (INVALID_ELEMENT.type == "text") {
              INVALID_ELEMENT.select();
            }
          }
        }
      });
      $j('<div id="qtip-blanket">').css({
        position: "absolute",
        top: $j(document).scrollTop(),
        left: 0,
        height: $j(document).height(),
        width: "100%",
        opacity: .7,
        backgroundColor: "black",
        zIndex: 5e3
      }).appendTo(document.body).hide();
    });
  