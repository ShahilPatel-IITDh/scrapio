$(function(){
  var CountDown = function($el) {
    this.$wrap = $el;
    this.$startBox = this.$wrap.find('.js-countdown-start');
    this.$endBox = this.$wrap.find('.js-countdown-end');
    this.$d = this.$wrap.find('.js-countdown-d');
    this.$h = this.$wrap.find('.js-countdown-h');
    this.$m = this.$wrap.find('.js-countdown-m');
    this.$s = this.$wrap.find('.js-countdown-s');
    this.FADE_SPEED = 500;
    this.flag = false;
  };

  CountDown.prototype.getDiff = function() {
    var today = new Date();
    return this.limitDate - today;
  }

  CountDown.prototype.renderTime = function() {
    this.setDate();

    var self = this,
      startTimer;

    startTimer = setInterval((function t() {
      self.splitDate();

      if (self.diffDate >= 0 ) {
        if (self.diffDay > 0) {
          self.$d.html(self.diffDay + '<span class="js-countdown-date-param">日</span>');
        } else if (!self.flag) {
          self.$d.hide();
        } else {
          self.$d.fadeOut(self.FADE_SPEED);
        }

        if (self.diffHour > 0) {
          self.$h.html(self.diffHour + '<span class="js-countdown-date-param">時間</span>');
          self.$h.show();
        } else if (!self.flag) {
          self.$h.hide();
        } else {
          self.$h.fadeOut(self.FADE_SPEED);
        }

        if (self.diffMin > 0) {
          self.$m.html(self.diffMin + '<span class="js-countdown-date-param">分</span>');
          self.$m.show();
        } else if (!self.flag) {
          self.$m.hide();
        } else {
          self.$m.fadeOut(self.FADE_SPEED);
        }

        self.$s.html(self.diffSec + '<span class="js-countdown-date-param">秒</span>');
      } else {
        if (!self.flag) {
          self.$startBox.hide();
          self.$endBox.show();
        } else {
          self.$startBox.hide();
          self.$endBox.fadeIn(self.FADE_SPEED);
        }
        self.stopTimer();
      }
      self.flag = true;
      return t;
    }()), 1000);
  }

  CountDown.prototype.stopTimer = function() {
    clearInterval(this.startTimer);
  }

  CountDown.prototype.setDate = function() {
    this.year = this.$wrap.data('year');
    this.month = this.$wrap.data('month');
    this.day = this.$wrap.data('day');
    this.hour = this.$wrap.data('hour');
    this.min = this.$wrap.data('min');
    this.sec = this.$wrap.data('sec');
    this.limitDate = new Date(this.year, this.month - 1, this.day, this.hour, this.min, this.sec);
  }

  CountDown.prototype.splitDate = function() {
    var oneM = 60 * 1000,
      oneH = oneM * 60,
      oneD = oneH * 24;
    this.diffDate = this.getDiff();
    this.diffDay = Math.floor(this.diffDate / oneD);
    this.diffHour = Math.floor((this.diffDate % oneD) / oneH);
    this.diffMin = Math.floor(((this.diffDate % oneD) / oneM) % 60);
    this.diffSec = Math.floor((this.diffDate % oneD) / 1000) % 60 % 60;
  }

  var $countDownWrap = $('.js-countdown-wrap');

  for (var i = 0, len = $countDownWrap.length; i < len; i++) {
    var countdown = new CountDown($countDownWrap.eq(i));
    countdown.renderTime();
  };
});