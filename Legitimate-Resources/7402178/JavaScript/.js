/**
 * v1
 */
/* todo remove jQuery (4 x) */
(function ($, undefined) {

  /* js-cookie 2.1.4, extend & init funtion only */
  var cookie = (function() {

    function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){result[key]=attributes[key];}}
    return result;}
    function init(converter){function api(key,value,attributes){var result;if(typeof document==='undefined'){return;}
    if(arguments.length>1){attributes=extend({path:'/'},api.defaults,attributes);if(typeof attributes.expires==='number'){var expires=new Date();expires.setMilliseconds(expires.getMilliseconds()+attributes.expires*864e+5);attributes.expires=expires;}
    attributes.expires=attributes.expires?attributes.expires.toUTCString():'';try{result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result;}}catch(e){}
    if(!converter.write){value=encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent);}else{value=converter.write(value,key);}
    key=encodeURIComponent(String(key));key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);key=key.replace(/[\(\)]/g,escape);var stringifiedAttributes='';for(var attributeName in attributes){if(!attributes[attributeName]){continue;}
    stringifiedAttributes+='; '+attributeName;if(attributes[attributeName]===true){continue;}
    stringifiedAttributes+='='+attributes[attributeName];}
    return(document.cookie=key+'='+value+stringifiedAttributes);}
    if(!key){result={};}
    var cookies=document.cookie?document.cookie.split('; '):[];var rdecode=/(%[0-9A-Z]{2})+/g;var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split('=');var cookie=parts.slice(1).join('=');if(cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1);}
    try{var name=parts[0].replace(rdecode,decodeURIComponent);cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent);if(this.json){try{cookie=JSON.parse(cookie);}catch(e){}}
    if(key===name){result=cookie;break;}
    if(!key){result[name]=cookie;}}catch(e){}}
    return result;}
    api.set=api;api.get=function(key){return api.call(api,key);};api.getJSON=function(){return api.apply({json:true},[].slice.call(arguments));};api.defaults={};api.remove=function(key,attributes){api(key,'',extend(attributes,{expires:-1}));};api.withConverter=init;return api;}
    return init(function(){});

  }());

  /**
   * params
   * Table of available parameters
   * priorities
   * List of priorities
   */

  

  var
    params = ['agency', 'agent', 'CookieID', 'idk', 'membercode', 'portal', 'promotion', 'saleschannel', 'wid', 'wid01', 'wid02', 'wid03', 'wid04', 'wid05', 'wid06', 'wid07', 'wid08', 'wid09', 'wid10', 'wid2'],
  priorities = {
  
  portal: [
    
  { v: '380', p: '1' },
  { v: '460', p: '1' },
  { v: '310', p: '1' },
  { v: '311', p: '1' },
  { v: '390', p: '1' },
  { v: '430', p: '1' },
  { v: '360', p: '1' },
  { v: '361', p: '1' },
  { v: '450', p: '1' },
  { v: '480', p: '1' },
  { v: '051', p: '1' },
  { v: '370', p: '1' },
  { v: '320', p: '1' },
  { v: '420', p: '1' },
  { v: '150', p: '1' },
  { v: '350', p: '1' },
  { v: '440', p: '1' },
  { v: '340', p: '1' },
  { v: '300', p: '1' },
  { v: '131', p: '1' },
  { v: '470', p: '1' },
  { v: '330', p: '1' },
  { v: '001', p: '1' },
  { v: '998', p: '3' },
  { v: '996', p: '3' },
  { v: '201', p: '1' },
  { v: '200', p: '1' },
  { v: '202', p: '2' },
  { v: '400', p: '1' },
  { v: '141', p: '1' },
  { v: '071', p: '1' },
  { v: '171', p: '1' },
  { v: '410', p: '1' },
  { v: '000', p: '1' },
  { v: '020', p: '1' },
  { v: '010', p: '1' },
  { v: '030', p: '1' },
  { v: '050', p: '1' },
  { v: '190', p: '1' },
  { v: '070', p: '1' },
  { v: '080', p: '1' },
  { v: '090', p: '1' },
  { v: '040', p: '1' },
  { v: '110', p: '1' },
  { v: '180', p: '1' },
  { v: '120', p: '1' },
  { v: '130', p: '1' },
  { v: '140', p: '3' },
  { v: '100', p: '1' },
  { v: '191', p: '1' },
  { v: '205', p: '1' },
  { v: '143', p: '1' },
  { v: '471', p: '1' },
  { v: '441', p: '1' },
  { v: '203', p: '1' },
  { v: '345', p: '1' },
  { v: '192', p: '1' },
  { v: '305', p: '1' },
  { v: '375', p: '1' },
  { v: '395', p: '1' },
  { v: '385', p: '1' },
  { v: '315', p: '1' },
  { v: '144', p: '1' },
  { v: '335', p: '1' },
  { v: '160', p: '1' },
  { v: '145', p: '2' },
  { v: '146', p: '2' },
  { v: '147', p: '2' },
  { v: '008', p: '1' },
  { v: '391', p: '1' },
  { v: '376', p: '1' },
  { v: '392', p: '1' },
  { v: '490', p: '1' },
  { v: '132', p: '1' },
  { v: '091', p: '1' },
  { v: '335', p: '1' },
  { v: '239', p: '1' },
  { v: '240', p: '1' },
  { v: '431', p: '1' },
  { v: '495', p: '1' },
  { v: '500', p: '1' },
  { v: '502', p: '1' },
  { v: '504', p: '1' },
  { v: '506', p: '1' },
  { v: '508', p: '1' },
  { v: '510', p: '1' },
  { v: '512', p: '1' },
  { v: '514', p: '1' },
  { v: '516', p: '1' },
  { v: '126', p: '1' },
  { v: '518', p: '1' },
  { v: '520', p: '1' },
  { v: '536', p: '1' },
  { v: '522', p: '1' },
  { v: '524', p: '1' },
  { v: '530', p: '1' },
  { v: '526', p: '1' },
  { v: '528', p: '1' },
  { v: '532', p: '1' },
  { v: '534', p: '1' },
  { v: '538', p: '1' },
  { v: '540', p: '1' },
  { v: '545', p: '1' },
  { v: '405', p: '1' },
  { v: '531', p: '1' },
  { v: '561', p: '1' },
  { v: '542', p: '1' },
  { v: '544', p: '1' },
  { v: '546', p: '1' },
  { v: '548', p: '1' },
  { v: '550', p: '1' },
  { v: '555', p: '1' },
  { v: '552', p: '1' },
  { v: '301', p: '1' },
  { v: '563', p: '1' },
  { v: '142', p: '2' },
  { v: '565', p: '1' },
  { v: '567', p: '1' },
  { v: '700', p: '1' },
  { v: '701', p: '1' },
  { v: '702', p: '1' },
  { v: '703', p: '1' },
  { v: '704', p: '1' },
  { v: '705', p: '1' },
  { v: '706', p: '1' },
  { v: '707', p: '1' },
  { v: '708', p: '1' },
  { v: '709', p: '1' },
  { v: '710', p: '1' },
  { v: '711', p: '1' },
  { v: '712', p: '1' },
  { v: '713', p: '1' },
  { v: '714', p: '1' },
  { v: '715', p: '1' },
  { v: '716', p: '1' },
  { v: '717', p: '1' },
  { v: '718', p: '1' },
  { v: '719', p: '1' },
  { v: '720', p: '1' },
  { v: '721', p: '1' },
  { v: '722', p: '1' },
  { v: '723', p: '1' },
  { v: '724', p: '1' },
  { v: '569', p: '1' },
  { v: '571', p: '1' },
  { v: '573', p: '1' },
  { v: '575', p: '1' },
  { v: '577', p: '1' },
  { v: '505', p: '1' },
  { v: '148', p: '1' },
  { v: '072', p: '1' },
  { v: '432', p: '1' },
  { v: '442', p: '1' },
  { v: '431', p: '1' },
  { v: '302', p: '1' },
  { v: '568', p: '1' },
  { v: '579', p: '1' },
  { v: '073', p: '1' },
  { v: '503', p: '1' },
  { v: '433', p: '1' },
  { v: '443', p: '1' },
  { v: '581', p: '1' },
  { v: '451', p: '1' },
  { v: '583', p: '1' },
  { v: '585', p: '1' },
  { v: '362', p: '1' },
  { v: '172', p: '2' },
  { v: '363', p: '1' },
  { v: '587', p: '1' },
  { v: '002', p: '1' },
  { v: '576', p: '1' },
  { v: '539', p: '1' },
  { v: '588', p: '1' },
  { v: '589', p: '1' },
  { v: '591', p: '1' },
  { v: '193', p: '1' },
  { v: '101', p: '1' },
  { v: '566', p: '1' },
  { v: '175', p: '1' },
  { v: '176', p: '1' },
  { v: '600', p: '1' },
  { v: '601', p: '1' },
  { v: '177', p: '1' },
  { v: '365', p: '1' },
  { v: '593', p: '1' },
  { v: '595', p: '1' },
  { v: '597', p: '1' },
  { v: '074', p: '1' },
  { v: '434', p: '1' },
  { v: '306', p: '1' },
  { v: '194', p: '1' },
  { v: '195', p: '1' },
  { v: '610', p: '1' },
  { v: '206', p: '1' },
  { v: '207', p: '1' },
  { v: '599', p: '1' },
  { v: '241', p: '1' },
  { v: '161', p: '1' },
  { v: '162', p: '1' },
  { v: '163', p: '1' },
  { v: '605', p: '1' },
  { v: '196', p: '1' },
  { v: '651', p: '1' },
  { v: '590', p: '1' },
  { v: '620', p: '1' },
  { v: '621', p: '1' },
  { v: '622', p: '1' },
  { v: '623', p: '1' },
  { v: '624', p: '1' },
  { v: '625', p: '1' },
  { v: '626', p: '1' },
  { v: '627', p: '1' },
  { v: '628', p: '1' },
  { v: '629', p: '1' },
  { v: '630', p: '1' },
  { v: '631', p: '1' },
  { v: '632', p: '1' },
  { v: '633', p: '1' },
  { v: '634', p: '1' },
  { v: '635', p: '1' },
  { v: '075', p: '1' },
  { v: '589', p: '1' },
  { v: '076', p: '1' },
  { v: '652', p: '1' },
  { v: '653', p: '1' },
  { v: '800', p: '1' },
  { v: '801', p: '1' },
  { v: '654', p: '1' },
  { v: '636', p: '1' },
  { v: '637', p: '1' },
  { v: '638', p: '1' },
  { v: '639', p: '1' },
  { v: '640', p: '1' },
  { v: '641', p: '1' },
  { v: '642', p: '1' },
  { v: '643', p: '1' },
  { v: '644', p: '1' },
  { v: '645', p: '1' },
  { v: '646', p: '1' },
  { v: '647', p: '1' },
  { v: '648', p: '1' },
  { v: '649', p: '1' },
  { v: '650', p: '1' },
  { v: '655', p: '1' },
  { v: '210', p: '1' },
  { v: '6999', p: '1' },
  { v: '7000', p: '1' },
  { v: '602', p: '1' },
  { v: '6001', p: '1' },
  { v: '6007', p: '1' },
  { v: '6008', p: '1' },
  { v: '6002', p: '1' },
  { v: '6003', p: '1' },
  { v: '6004', p: '1' },
  { v: '6005', p: '1' },
  { v: '6006', p: '1' },
  { v: '6009', p: '1' },
  { v: '6010', p: '1' },
  { v: '6020', p: '1' },
  { v: '6021', p: '1' },
  { v: '6022', p: '1' },
  { v: '6023', p: '1' },
  { v: '6024', p: '1' },
  { v: '6025', p: '1' },
  { v: '6026', p: '1' },
  { v: '6027', p: '1' },
  { v: '6028', p: '1' },
  { v: '6029', p: '1' },
  { v: '6030', p: '1' },
  { v: '6011', p: '1' },
  { v: '6012', p: '1' },
  { v: '6013', p: '1' },
  { v: '6014', p: '1' },
  { v: '6015', p: '1' },
  { v: '6016', p: '1' },
  { v: '6017', p: '1' },
  { v: '6018', p: '1' },
  { v: '6019', p: '1' },
  { v: '656', p: '1' },
  { v: '211', p: '1' },
  { v: '220', p: '1' },
  { v: '221', p: '1' },
  { v: '222', p: '1' },
  { v: '230', p: '1' },
  { v: '6031', p: '1' },
  { v: '6032', p: '1' },
  { v: '6033', p: '1' },
  { v: '6034', p: '1' },
  { v: '6035', p: '1' },
  { v: '6036', p: '1' },
  { v: '6037', p: '1' },
  { v: '6038', p: '1' },
  { v: '6039', p: '1' },
  { v: '6040', p: '1' },
  { v: '6041', p: '1' },
  { v: '6042', p: '1' },
  { v: '6043', p: '1' },
  { v: '6044', p: '1' },
  { v: '6045', p: '1' },
  { v: '6046', p: '1' },
  { v: '6047', p: '1' },
  { v: '6048', p: '1' },
  { v: '6049', p: '1' },
  { v: '6050', p: '1' },
  { v: '435', p: '1' },
  { v: '900', p: '1' },
  { v: '6051', p: '1' },
  { v: '6052', p: '1' },
  { v: '6053', p: '1' },
  { v: '6054', p: '1' },
  { v: '6055', p: '1' },
  { v: '6056', p: '1' },
  { v: '6057', p: '1' },
  { v: '6058', p: '1' },
  { v: '6059', p: '1' },
  { v: '6060', p: '1' },
  { v: '436', p: '1' },
  { v: '657', p: '1' },
  { v: '658', p: '1' },
  { v: '659', p: '1' },
  { v: '231', p: '1' },
  { v: '6061', p: '1' },
  { v: '6062', p: '1' },
  { v: '6063', p: '1' },
  { v: '6064', p: '1' },
  { v: '6065', p: '1' },
  { v: '6066', p: '1' },
  { v: '6067', p: '1' },
  { v: '6068', p: '1' },
  { v: '6069', p: '1' },
  { v: '6070', p: '1' },
  { v: '670', p: '1' },
  { v: '6071', p: '1' },
  { v: '6072', p: '1' },
  { v: '6073', p: '1' },
  { v: '6074', p: '1' },
  { v: '6075', p: '1' },
  { v: '6076', p: '1' },
  { v: '6077', p: '1' },
  { v: '6078', p: '1' },
  { v: '6079', p: '1' },
  { v: '6080', p: '1' },
  { v: '6081', p: '1' },
  { v: '6082', p: '1' },
  { v: '6083', p: '1' },
  { v: '6084', p: '1' },
  { v: '6085', p: '1' },
  { v: '6086', p: '1' },
  { v: '6087', p: '1' },
  { v: '6087', p: '1' },
  { v: '6088', p: '1' },
  { v: '6089', p: '1' },
  { v: '6090', p: '1' },
  { v: '6091', p: '1' },
  { v: '6092', p: '1' },
  { v: '6093', p: '1' },
  { v: '6094', p: '1' },
  { v: '6095', p: '1' },
  { v: '6096', p: '1' },
  { v: '6097', p: '1' },
  { v: '6098', p: '1' },
  { v: '6099', p: '1' },
  { v: '6100', p: '1' },
  { v: '578', p: '1' },
  { v: '6101', p: '1' },
  { v: '6102', p: '1' },
  { v: '6103', p: '1' },
  { v: '6104', p: '1' },
  { v: '6105', p: '1' },
  { v: '6106', p: '1' },
  { v: '6107', p: '1' },
  { v: '6108', p: '1' },
  { v: '6109', p: '1' },
  { v: '6110', p: '1' },
  { v: '6111', p: '1' },
  { v: '6112', p: '1' },
  { v: '6113', p: '1' },
  { v: '6114', p: '1' },
  { v: '6115', p: '1' },
  { v: '6116', p: '1' },
  { v: '6117', p: '1' },
  { v: '6118', p: '1' },
  { v: '6119', p: '1' },
  { v: '6120', p: '1' },
  { v: '149', p: '1' },
  { v: '6121', p: '1' },
  { v: '6122', p: '1' },
  { v: '6123', p: '1' },
  { v: '6124', p: '1' },
  { v: '6125', p: '1' },
  { v: '6126', p: '1' },
  { v: '6127', p: '1' },
  { v: '6128', p: '1' },
  { v: '6129', p: '1' },
  { v: '6130', p: '1' },
  { v: '1000', p: '1' },
  { v: '6131', p: '1' },
  { v: '6132', p: '1' },
  { v: '6133', p: '1' },
  { v: '6134', p: '1' },
  { v: '6135', p: '1' },
  { v: '6136', p: '1' },
  { v: '6137', p: '1' },
  { v: '6138', p: '1' },
  { v: '6139', p: '1' },
  { v: '6140', p: '1' },
  { v: '6141', p: '1' },
  { v: '6142', p: '1' },
  { v: '6143', p: '1' },
  { v: '6144', p: '1' },
  { v: '6145', p: '1' },
  { v: '6146', p: '1' },
  { v: '6147', p: '1' },
  { v: '6148', p: '1' },
  { v: '6149', p: '1' },
  { v: '6150', p: '1' },
  { v: '253', p: '2' },
  { v: '6151', p: '1' },
  { v: '6152', p: '1' },
  { v: '6153', p: '1' },
  { v: '6154', p: '1' },
  { v: '6155', p: '1' },
  { v: '6156', p: '1' },
  { v: '6157', p: '1' },
  { v: '6158', p: '1' },
  { v: '6159', p: '1' },
  { v: '6160', p: '1' },
  { v: '6161', p: '1' },
  { v: '6162', p: '1' },
  { v: '6163', p: '1' },
  { v: '6164', p: '1' },
  { v: '6165', p: '1' },
  { v: '270', p: '1' },
  { v: '6166', p: '1' },
  { v: '6167', p: '1' },
  { v: '6168', p: '1' },
  { v: '6169', p: '1' },
  { v: '6170', p: '1' },
  { v: '6171', p: '1' },
  { v: '6172', p: '1' },
  { v: '6173', p: '1' },
  { v: '6174', p: '1' },
  { v: '6175', p: '1' },
  { v: '6176', p: '1' },
  { v: '6177', p: '1' },
  { v: '6178', p: '1' },
  { v: '6179', p: '1' },
  { v: '6180', p: '1' },
  { v: '6181', p: '1' },
  { v: '6182', p: '1' },
  { v: '6183', p: '1' },
  { v: '6184', p: '1' },
  { v: '6185', p: '1' },
  { v: '6186', p: '1' },
  { v: '6187', p: '1' },
  { v: '6188', p: '1' },
  { v: '6189', p: '1' },
  { v: '6190', p: '1' },
  { v: '6191', p: '1' },
  { v: '6192', p: '1' },
  { v: '6193', p: '1' },
  { v: '6194', p: '1' },
  { v: '6195', p: '1' },
  { v: '6196', p: '1' },
  { v: '6197', p: '1' },
  { v: '6198', p: '1' },
  { v: '6199', p: '1' },
  { v: '6200', p: '1' },
  { v: '6201', p: '1' },
  { v: '6202', p: '1' },
  { v: '6203', p: '1' },
  { v: '6204', p: '1' },
  { v: '6205', p: '1' },
  { v: '6206', p: '1' },
  { v: '6207', p: '1' },
  { v: '6208', p: '1' },
  { v: '6209', p: '1' },
  { v: '6210', p: '1' },
  { v: '6211', p: '1' },
  { v: '6212', p: '1' },
  { v: '6213', p: '1' },
  { v: '6214', p: '1' },
  { v: '6215', p: '1' },
  { v: '6216', p: '1' },
  { v: '6217', p: '1' },
  { v: '6218', p: '1' },
  { v: '6219', p: '1' },
  { v: '6220', p: '1' },
  { v: '6221', p: '1' },
  { v: '6222', p: '1' },
  { v: '6223', p: '1' },
  { v: '6224', p: '1' },
  { v: '6225', p: '1' },
  { v: '6226', p: '1' },
  { v: '6227', p: '1' },
  { v: '6228', p: '1' },
  { v: '6229', p: '1' },
  { v: '6230', p: '1' },
  { v: '6231', p: '1' },
  { v: '6232', p: '1' },
  { v: '6233', p: '1' },
  { v: '6234', p: '1' },
  { v: '6235', p: '1' },
  { v: '6236', p: '1' },
  { v: '6237', p: '1' },
  { v: '6238', p: '1' },
  { v: '6239', p: '1' },
  { v: '6240', p: '1' },
  { v: '6241', p: '1' },
  { v: '6242', p: '1' },
  { v: '6243', p: '1' },
  { v: '6244', p: '1' },
  { v: '6245', p: '1' },
  { v: '6246', p: '1' },
  { v: '6247', p: '1' },
  { v: '6248', p: '1' },
  { v: '6249', p: '1' },
  { v: '6250', p: '1' },
  { v: '6251', p: '1' },
  { v: '6252', p: '1' },
  { v: '6253', p: '1' },
  { v: '6254', p: '1' },
  { v: '6255', p: '1' },
  { v: '6256', p: '1' },
  { v: '6257', p: '1' },
  { v: '6258', p: '1' },
  { v: '6259', p: '1' },
  { v: '6260', p: '1' },
  { v: '6261', p: '1' },
  { v: '6262', p: '1' },
  { v: '6263', p: '1' },
  { v: '6264', p: '1' },
  { v: '6265', p: '1' },
  { v: '6266', p: '1' },
  { v: '6267', p: '1' },
  { v: '6268', p: '1' },
  { v: '6269', p: '1' },
  { v: '6270', p: '1' },
  { v: '178', p: '1' },
  { v: '151', p: '3' }

  ],
  
  agent: [
    
  { v1: '0362', v2: '0362', p: '1' },
  { v1: '0365', v2: '0365', p: '1' },
  { v1: '1365', v2: '1365', p: '1' },
  { v1: '1362', v2: '1362', p: '1' },
  { v1: '1600', v2: '1600', p: '1' },
  { v1: '1610', v2: '1610', p: '1' },
  { v1: '0363', v2: '0363', p: '1' },
  { v1: '0001', v2: '0002', p: '1' },
  { v1: '1020', v2: '1023', p: '4' },
  { v1: '253', v2: '253', p: '1' }

  ]
  
},
  widButtons = $( '.widBtn' );

  function getUrlVars() {
    var vars = [],
      hash,
      hashes = window.location.href.split('#')[0].slice(window.location.href.indexOf('?') + 1).split('&'),
      i;

    for (i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }

    return vars;
  }

  function getUrlVar(name) {
    return getUrlVars()[name];
  }

  function checkUrlParams() {
    var portal = getUrlVar('portal'),
      agency = getUrlVar('agency'),
      agent = getUrlVar('agent');
    if (portal !== null && portal !== undefined) {
      return checkPiorities('portal', portal);
    } else if (agency !== null && agency !== undefined && agent !== null && agent !== undefined) {
      return checkPiorities('agent', agent, agency);
    } else {
      return null;
    }
  }

  function checkPiorities(param, v1, v2) {

    var p = null,
      i, j, k;

    switch (param) {
      case 'portal':
        for (i = 0, j = priorities[param], k = j.length; i < k; i++) {
          if (j[i].v === v1) {
            p = j[i].p;
          }
        }
        break;
      case 'agent':
        for (i = 0, j = priorities[param], k = j.length; i < k; i++) {
          if (j[i].v1 === v1 && j[i].v2 === v2) {
            p = j[i].p;
          }
        }
        break;
    }
    return p;
  }

  function clearCookies(more) {
    var i,
      j;
    for (i = 0, j = params.length; i < j; i++) {
      cookie.remove(params[i], {
        path: '/'
      });
    }
  }

  function init() {

    var urlPriority = checkUrlParams(),
      portal = cookie('portal'),
      urlParams,
      i, j, k, l;

    if (urlPriority != null && ( ( portal != null && urlPriority <= checkPiorities('portal', portal) ) || ( cookie('agent') != null && cookie('agency') != null && urlPriority <= checkPiorities('agent', cookie('agent'), cookie('agency')) ) || ( portal == null && cookie('agent') == null && cookie('agency') == null ) )) {

      urlParams = getUrlVars();

      clearCookies();

      for (i = 0, j = params.length; i < j; i++) {
        for (k = 0, l = urlParams.length; k < l; k++) {
          if (urlParams[k] === params[i]) {
            cookie(urlParams[k], urlParams[params[i]], {
              expires: 3,
              path: '/'
            });
          }
        }
      }

    }

    additionalCheck();

  }

  function additionalCheck() {

    var referrer = document.referrer,
      regex = /^http(s?):\/\/((www\.)?)google\.(((co|com)\.)?)([a-z]{2,3})(\/(.*))?$/i,
      locationPath = window.location.pathname,
      portal = cookie('portal');

    /*
     regex:
     http://google.pl,
     https://google.com,
     http://www.google.co.uk,
     http://google.com.ua/ds
     ...
     */

    if (referrer && regex.test(referrer) && parseInt(portal, 10) !== 200) {

      // przejście na strone z google, ważniejsze niż parametry w url, oprócz 200, cookie portal jest ważniejsze

      clearCookies();
      if (( locationPath === '/' || locationPath === '' ) && !/\/lp(k|p)\//i.test(locationPath)) {
        // strona główna
        cookie('portal', 203, {
          expires: 3,
          path: '/'
        });
      } else {
        // inna strona
        cookie('portal', 202, {
          expires: 3,
          path: '/'
        });
      }

    } else if (!/\/lp(k|p)\//i.test(locationPath) && portal == null && cookie('agent') == null && cookie('agency') == null) {

      // referrerem nie jest google, nie jesteśmy w LP i nie mamy cookie portal || agent/agency

      clearCookies();
      cookie('portal', 140, {
        expires: 3,
        path: '/'
      });

    }

    setLinks();

  }

  function accordionAllServices(val) {
    var valArray,
      sign = ( val.split('#')[0].indexOf('?') > -1 ) ? '&' : '?',
      portalParam = 'portal=140';
    if (val !== '') {
      if (val.indexOf('#') > -1) {
        valArray = val.split('#');
        val = valArray[0] + sign + portalParam + '#' + valArray.slice(1).join('#');
        // slice gdy case jak pare hashy ;)
      } else {
        val += sign + portalParam;
      }
      clearCookies();
      window.location.assign(val);
    }
  }

  function setEvents() {
    // strona zbiorcza wniosków, dodanie 140
    $('ul.accordionWid select').on('change', function () {
      var val = $(this).val();
      if (val !== '') {
        accordionAllServices(val);
      }
    });
  }

  function setLinks() {

    var linkParams = [],
      locationPath = window.location.pathname,
      query = '',
      i, j,
      sign,
      customCampaign;

    // tylko gdy mamy jakieś guziki
    if (widButtons.length) {

      for (i = 0, j = params.length; i < j; i++) {
        if (cookie(params[i]) != null) {
          linkParams.push(params[i] + '=' + cookie(params[i]));
        }
      }

      customCampaign = getUrlVar('customcampaign');

      if (customCampaign) {
        linkParams.push('customcampaign=' + customCampaign);
      }

      if (linkParams.length) {

        query = linkParams.join('&');

        widButtons.each(function () {
          var $this = $(this),
            href,
            hrefFinal,
            sign;
          if (!$this.attr('wid')) {
            href = $this.attr('href');
            sign = ( href.indexOf('?') !== -1 ) ? '&' : '?';
            hrefFinal = href + sign + query;
            $this.attr('href', hrefFinal).attr('wid', true);
          }
        });
      }

    }
  }

  init();

  setEvents();

})(jQuery);
