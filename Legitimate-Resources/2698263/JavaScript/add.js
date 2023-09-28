    function sample6_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullAddr = ''; // 최종 주소 변수
                var extraAddr = ''; // 조합형 주소 변수

                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    fullAddr = data.roadAddress;

                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    fullAddr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                if(data.userSelectedType === 'R'){
                    //법정동명이 있을 경우 추가한다.
                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('mb_zipall').value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('mb_addr1').value = fullAddr;

                // 커서를 상세주소 필드로 이동한다.
                document.getElementById('mb_addr2').focus();
            }
        }).open();
    }



$(document).ready(function(){
  var $doc           = $(document);
  var position       = 0;
  var top = $doc.scrollTop(); //현재 스크롤바 위치
  var screenSize     = 0;        // 화면크기
  var halfScreenSize = 0;    // 화면의 반

  /*사용자 설정 값 시작*/
  var pageWidth      = 1000; // 페이지 폭, 단위:px
  var leftOffet      = 460;  // 중앙에서의 폭(왼쪽 -, 오른쪽 +), 단위:px
  var leftMargin     = 900; // 페이지 폭보다 화면이 작을때 옵셋, 단위:px, leftOffet과 pageWidth의 반만큼 차이가 난다.
  var speed          = 500;     // 따라다닐 속도 : "slow", "normal", or "fast" or numeric(단위:msec)
  var easing         = 'swing'; // 따라다니는 방법 기본 두가지 linear, swing
  var $layer         = $('#floating'); // 레이어 셀렉팅
  var layerTopOffset = 140;   // 레이어 높이 상한선, 단위:px
  $layer.css('z-index', 1);   // 레이어 z-인덱스
  /*사용자 설정 값 끝*/

  //좌우 값을 설정하기 위한 함수
  function resetXPosition()
  {
    $screenSize = $('body').width();// 화면크기
    halfScreenSize = $screenSize/2;// 화면의 반
    xPosition = halfScreenSize + leftOffet;
	//xPosition = 0;
    if ($screenSize < pageWidth)
      xPosition = leftMargin;
    $layer.css('left', xPosition);
  }

  // 스크롤 바를 내린 상태에서 리프레시 했을 경우를 위해
  if (top > 0 )
    $doc.scrollTop(layerTopOffset+top);
  else
    $doc.scrollTop(0);

  // 최초 레이어가 있을 자리 세팅
  $layer.css('top',layerTopOffset);
  resetXPosition();

  //윈도우 크기 변경 이벤트가 발생하면
  $(window).resize(resetXPosition);

  //스크롤이벤트가 발생하면
  $(window).scroll(function(){
	  var cur = $doc.scrollTop();
	  //console.log(cur);
	yPosition = $doc.scrollTop()+layerTopOffset;
	if(cur > 200) {
		yPosition = cur+20;
		$layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
	} else {
	//yPosition = $doc.scrollTop();
	yPosition = 140;
    $layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
	}
  });
});


$(document).ready(function(){
  var $doc           = $(document);
  var position       = 0;
  var top = $doc.scrollTop(); //현재 스크롤바 위치
  var screenSize     = 0;        // 화면크기
  var halfScreenSize = 0;    // 화면의 반

  /*사용자 설정 값 시작*/
  var pageWidth      = 1000; // 페이지 폭, 단위:px
  var leftOffet      = -568;  // 중앙에서의 폭(왼쪽 -, 오른쪽 +), 단위:px
  var leftMargin     = 409; // 페이지 폭보다 화면이 작을때 옵셋, 단위:px, leftOffet과 pageWidth의 반만큼 차이가 난다.
  var speed          = 500;     // 따라다닐 속도 : "slow", "normal", or "fast" or numeric(단위:msec)
  var easing         = 'swing'; // 따라다니는 방법 기본 두가지 linear, swing
  var $layer         = $('#floating1'); // 레이어 셀렉팅
  var layerTopOffset = 140;   // 레이어 높이 상한선, 단위:px
  $layer.css('z-index', 1);   // 레이어 z-인덱스
  /*사용자 설정 값 끝*/

  //좌우 값을 설정하기 위한 함수
  function resetXPosition()
  {
    $screenSize = $('body').width();// 화면크기
    halfScreenSize = $screenSize/2;// 화면의 반
    xPosition = halfScreenSize + leftOffet;
	//xPosition = 0;
    if ($screenSize < pageWidth)
      xPosition = leftMargin;
    $layer.css('left', xPosition);
  }

  // 스크롤 바를 내린 상태에서 리프레시 했을 경우를 위해
  if (top > 0 )
    $doc.scrollTop(layerTopOffset+top);
  else
    $doc.scrollTop(0);

  // 최초 레이어가 있을 자리 세팅
  $layer.css('top',layerTopOffset);
  resetXPosition();

  //윈도우 크기 변경 이벤트가 발생하면
  $(window).resize(resetXPosition);

  //스크롤이벤트가 발생하면
  $(window).scroll(function(){
	  var cur = $doc.scrollTop();
	  //console.log(cur);
	yPosition = $doc.scrollTop()+layerTopOffset;
	if(cur > 200) {
		yPosition = cur+20;
		$layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
	} else {
	//yPosition = $doc.scrollTop();
	yPosition = 140;
    $layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
	}
  });
});

$(document).ready(function(){

	var menu_tab = $('.menu a.tab'), menu_item = $('.menu ul.list');

	menu_tab.click(function(e){
		  e.preventDefault();
		  menu_tab.removeClass('active');
		  menu_item.slideUp('normal');

		  if($(this).next().is(':hidden') == true) {
				 $(this).addClass('active');
				 $(this).next().slideDown('normal');
		  }
	});

});
