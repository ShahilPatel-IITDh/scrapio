const pageLoadPromise = new Promise(resolve => {
	// document.readyState cannot be 'complete' here
	window.addEventListener('load', () => {
		const interval = setInterval(() => {
			const timing = performance.getEntriesByType('navigation')[0].toJSON();
			timing.start = performance.timing.requestStart;
			delete timing.serverTiming;
			if (timing.duration > 0) {
				clearInterval(interval);
				resolve(timing.duration);
			}
		}, 100);
	});
});

const onPageLoadOrTimeout = maxTimeout => new Promise(resolve => {
	// Timeout.
	setTimeout(() => { resolve(-1); }, maxTimeout);

	// Load event.
	pageLoadPromise.then(resolve);
});

const copyScript = (s, type) => {
	const script = document.createElement('script');
	script.async = s.async;
	script.defer = s.defer;
	script.innerHTML = s.innerHTML;
	if (s.src) {
		script.src = s.src;
	}
	script.type = type;
	s.remove();
	document.body.appendChild(script);
};

const headScriptsTimeout = 2500;
const minScriptsTimeout = 3500;

// Restore advertisement-related scripts first (within 2.5s).
onPageLoadOrTimeout(headScriptsTimeout).then(() => {
	document.querySelectorAll('script[type="text/defer"].headscript')
		.forEach(s => {
			const type = s.classList.contains('3rdparty') ? 'text/javascript' : 'module';
			copyScript(s, type);
		});

	// Restore public scripts later (in min 3.5s).
	document.querySelectorAll('script[type="text/defer"]')
		.forEach(s => {
			const deferTimeoutAttr = s.getAttribute('data-defer-timeout');
			const deferTimeout = Math.max(parseInt(deferTimeoutAttr) || 0, minScriptsTimeout) - headScriptsTimeout;
			onPageLoadOrTimeout(deferTimeout).then(() => {
				copyScript(s, 'text/javascript');
			});
		});
});
