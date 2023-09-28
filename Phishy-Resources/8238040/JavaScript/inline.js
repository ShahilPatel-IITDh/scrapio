
      Sentry.init({
        dsn: 'https://2a0ad3811d1b4ba89b54145d91307233@o567079.ingest.sentry.io/5710642',
        integrations: [new Sentry.Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
        environment: 'production',
        release: '16aea2c',
        ignoreErrors: ['Non-Error exception captured', 'Non-Error promise rejection captured'],
      })
    