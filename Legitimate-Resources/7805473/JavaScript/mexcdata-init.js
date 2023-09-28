if(sensors) {
  if (sensors.registerPage) {
    sensors.registerPage({
      platform_type: 'WEB',
      env_language: () => window.sensorsEnvLanguage,
      is_in_login_status: () => document.cookie.indexOf('uc_token') > -1
    })
  }

  if(sensors.quick) {
    sensors.quick('autoTrack');
  }

  if(sensors.use) {
    sensors.use('PageLeave');

    if(window.sensorsAbtestUrl){
      window.sensorsAbtest = sensors.use('SensorsABTest', {
        url: window.sensorsAbtestUrl,
        // 首次进入导致闪烁，关闭此选项
        multilink: false
      })
    }
  }
}
