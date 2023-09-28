
		//한글처리

		var href = location.host;
		if (href.indexOf("www") <= -1 )
		{
			location.href = "http://www.istarbucks.co.kr/index.do";
		}
		else
		{
			location.href = "/index.do";
		}

		
	