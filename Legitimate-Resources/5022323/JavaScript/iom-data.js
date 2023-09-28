if (typeof window !== 'undefined') {
          var cmpStr = 'no-layer';
          var subStr = 'no-sub';
          document.cookie.split(';').forEach(function (cur) {
            if (cur.indexOf('cmp_cv_list=') !== -1) {
              cmpStr = cur.indexOf('adobe_analytics') !== -1 ? 'con' : 'no-con';
            }
            if (cur.indexOf('vauth=') !== -1) {
              subStr = 'sub';
            }
          });
          var INFOnline_data = {
            st: 'mobbild',
            cp: 'bild_home/home',
            sv: 'ke',
            co: cmpStr + '/' + subStr,
            sc: 'yes',
            contentCode: '100'
          };
    
          IOMm('pageview', INFOnline_data);
        }