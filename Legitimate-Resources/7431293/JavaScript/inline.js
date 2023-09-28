
const wpvViewHead = document.getElementsByTagName( "head" )[ 0 ];
const wpvViewExtraCss = document.createElement( "style" );
wpvViewExtraCss.textContent = '<!--[if IE 7]><style>.wpv-pagination { *zoom: 1; }</style><![endif]-->';
wpvViewHead.appendChild( wpvViewExtraCss );
