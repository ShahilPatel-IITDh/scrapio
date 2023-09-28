const validDomain = ['https://www.hotelxcaret.com', 'https://www.hotelxcaretmexico.com'];

const isSameDomainFn = () => {
  let isValid = false;
  if (window) {
    const { host, protocol } = window.location;
    let hostname = String(host).toLowerCase();
    const hasProtocolRegex = RegExp(/https?:\/\/[^/$\s]+/);

    if (!hasProtocolRegex.test(hostname)) {
      hostname = `${protocol}//${hostname}`;
    }
    if (validDomain.some((item) => item == hostname)) {
      isValid = true;
    }
  }
  return isValid;
};

const isPreviewDomainFn = () => {
  let isPreview = false;
  const regexValidDomains = RegExp(/([a-z0-9A-Z-]+\.preview.xcaret\.com)/);
  if (window) {
    const { host } = window.location;
    const validate = regexValidDomains.test(host);
    if (validate) {
      isPreview = true;
    }
  }
  return isPreview;
};

if (!isSameDomainFn() && !isPreviewDomainFn()) {
  const url = 'https://api-parks.ci.xcaret.com/api/v1/reporting';
  const { host } = window.location;
  let data = {
    "error": "INVALID_DOMAIN",
    "params": {
        "eventType": "reportError",
        "componentName": "DOMAIN",
        "message": `Invalid Domain, this site is using assets: ${host}`
    }
 };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
    }).then(console.log('done'));
}
