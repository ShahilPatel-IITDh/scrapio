var afterLogoutUrl = "https://www.mbhbank.hu/internetbank-logout"; 
		if (!afterLogoutUrl || (afterLogoutUrl||'').indexOf('pegasus.internetbank.sessionmanager.logoutredirectpage') > -1)
		{
			afterLogoutUrl = 'https://www.mkb.hu/';
		}
		window.afterLogoutUrl = afterLogoutUrl;
		Pegasus.bea.BackgroundImageSequancerFallbackSupport.imageResource = "https://images.mbhbank.hu/background/nyar/summer_10.jpg";