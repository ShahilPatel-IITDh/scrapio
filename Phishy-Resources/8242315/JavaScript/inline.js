(function () {
        var src = 'https://cdn.bootcdn.net/ajax/libs/vConsole/3.4.1/vconsole.min.js';
        if (!/vconsole=true/.test(window.location)) return;
        document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
        document.write('<scr' + 'ipt>var vConsole = new VConsole();</scr' + 'ipt>');
      })();