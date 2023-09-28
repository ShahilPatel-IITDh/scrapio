
          var socket = io.connect('http://freegame-notifier.herokuapp.com');
          socket.on('notification', function (data) {
            var $wrapper = $('#notification-data-wrapper');
            $wrapper.prepend(data.partial);
          });
        