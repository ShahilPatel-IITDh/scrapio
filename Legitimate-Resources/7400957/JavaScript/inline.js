
      window._host = 'http://ajuntament.barcelona.cat';
      window._marker = '/images/gomet.svg';
      if (typeof bcn === 'object' && typeof bcn.statistics === 'function') {
        bcn.statistics({ keys: ['UA-32435729-1'] });
      }
    