
		soundManager.setup({
			url: "/wp-content/themes/SLAM/SLAM/widgets/qantumplayer/360-player/swf/",
			useHighPerformance: true
		});
		threeSixtyPlayer.config.scaleFont = (navigator.userAgent.match(/msie/i)?false:true);
		threeSixtyPlayer.config.showHMSTime = false;
		threeSixtyPlayer.config.useWaveformData = true;
		threeSixtyPlayer.config.useEQData = true;
		threeSixtyPlayer.config.waveformDataColor = "#F712FF";
		threeSixtyPlayer.config.playRingColor = "#FF1F3D";
		threeSixtyPlayer.config.loadRingColor = "#FFE817";
		soundManager.flash9Options.useWaveformData = true; 
		soundManager.flash9Options.useEQData = true;
		soundManager.flash9Options.usePeakData = true;
		soundManager.preferFlash = true;
		