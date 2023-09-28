
    var tracker = new window.Tracker({
        uidResolver: function () {
            // 具体获取 userId 逻辑自行实现
            return "dbabb06eec25f222fd3da8ecf77afbbc__1.1.1";
        }, pid: 'punish-page', plugins: [[window.interfaceTrackerPlugin], [window.performanceTrackerPlugin, { sampleRate: 1 }]]
    });
    tracker.install();
  	var urlAction = window.location.href.match(/action=([^&]+)/);
  	urlAction = urlAction ? urlAction[1] : window._config_.action;
    tracker.log({
        code: 11,  // 系统自动生成，请勿修改 100%
        c1: 'dbabb06eec25f222fd3da8ecf77afbbc',
  		c2: '0.1.36',
        msg: '新版处置模板 ' + templateName + ' ' + urlAction,  // 异常信息，推荐传入
        sampleRate: 1.00,  // 目前采样率为 100.00%
    });
