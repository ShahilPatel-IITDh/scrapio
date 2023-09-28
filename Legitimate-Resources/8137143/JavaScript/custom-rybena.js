ryb_ready(function () {
  ryb_includeBar({
  'typeBar': 'sideBar', /*Options: default, sideBar*/
  'positionBar': 'right', /*Options: right, left*/
  'visCloseBar': 'visible', /*Options: hidden, visible*/
  'visCloseBarMobile': 'hidden' /*Options: hidden, visible*/
  });
  ryb_initRybena({
  'dimension' : '3D', /*Options: '2D' , '3D' (Default)*/
  'enableMobile' : 'true', /*Options: 'false' , 'true'(Default)*/
  'positionPlayer' : 'left' /*Options: 'right' , 'left'*/
  });

  AUI().ready(function(A){
      AUI().one('a.areaRybenaLibras img')._node.setAttribute('src','/o/sicoob-theme/images/icons/menu_lat_rybena_sinais.svg');

      AUI().one('a.areaRybenaTTS img')._node.setAttribute('src','/o/sicoob-theme/images/icons/menu_lat_rybena_voz.svg');
  });
});