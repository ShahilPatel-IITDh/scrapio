

<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="google-site-verification" content="h6q0Xk7bFQzw8FmBQAQpOHZSiEzaDrrFxYWlBBvbPcw" /><link rel="shortcut icon" href="master/favicon.ico" />

  <!--font-awesome link for icons-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" /><link rel="stylesheet" href="/WebForms/axis-support/assetsNew/css/bootstrap/bootstrap.css" /><link rel="stylesheet" href="/WebForms/axis-support/assetsNew/css/OwlCarousel/OwlCarousel2/dist/assets/owl.carousel.min.css" /><link rel="stylesheet" href="/WebForms/axis-support/assetsNew/css/OwlCarousel/OwlCarousel2/dist/assets/owl.theme.default.min.css" /><link rel="stylesheet" href="/WebForms/axis-support/assetsNew/js/select2/dist/css/select2.min.css" /><link rel="stylesheet" href="/WebForms/axis-support/assetsNew/css/component.css" /><link rel="stylesheet" href="/WebForms/axis-support/assetsNew/css1/style.css" />
  
  <!-- <!-- start 16th feb 2023 --> 
   <!-- <!-- <link rel="stylesheet" href="/WebForms/axis-support/assetsNew/css/common.css" />   -->
  <!-- <link rel="stylesheet" href="/WebForms/axis-support/assetsNew/css/debit_common.css" /> -->
 <!-- <link rel="stylesheet" href="/WebForms/axis-support/assetsNew/css/inner_template.css" /> -->
    <!-- <link rel="stylesheet" href="/WebForms/axis-support/Blogs/asset-css/mystyle.css" />    -->
	<!-- end 16th feb 2023 -->
	<!-- start 13th mar 2023 
  <link rel="stylesheet" href="/WebForms/axis-support/assets_rd/css/axisbank-style.css" />-->
  <!-- end 13th mar 2023 -->
   <!-- <link rel="stylesheet" href="/WebForms/axis-support/assetsNew/css/common.css" />  -->
   
   <link href="/WebForms/axis-support/assetsNew/css/chatboat.css" rel="stylesheet" type="text/css" />

<style>
@media (max-width:500px){
	.nav-container li .mob {
		padding: 19px 5px;
	}
}

</style>
  <script src="/WebForms/axis-support/assetsNew/js/modernizr-custom.js"></script>
  
 
<script type="text/javascript">
//below code for dynamic Lang selection drop down 100302023
function langname1()
{
	const firstpath=location.pathname.split('/')[1];
	var lang=firstpath;
		  if(lang==='webforms')
		  {
			  $('#hdnLang').val('English');
		  }
		  else
		  {
			$('#hdnLang').val(firstpath);
		  }
}

function abc()
{
	const params=new URLSearchParams(window.location.search);
	var serviceid=params.get('serviceid');
	var geturl=params;
	if(serviceid==='instaservice')
	{
	
	  $('#serviceDropdown').show();
	}
	else if(serviceid==='faq')
	{
	  //$('#queryDropdown').show();
	  $('#queryDropdown').css("display","flex");
	  
	}
	else
	{
	 // $('#serviceDropdown').hide();
	}
}

function hidePanel()
{
$('#serviceDropdown').hide();
}

function showPanel()
{
$('#serviceDropdown').toggle();
$('#queryDropdown').hide();

}

function showfaqPanel()
{
alert(1);
//$('#queryDropdown').toggle();
$('#queryDropdown').css("display","flex");
$('#serviceDropdown').hide();
}
function hidefaqPanel()
{
$('#queryDropdown').hide();
}


function getGTM()
{
			//$('#queryDropdown').toggle();
			
			if($("#queryDropdown").is(":visible"))
			{
			
			$('#queryDropdown').hide();
			}
			else
			{
			
			$('#queryDropdown').css("display","flex");
			}
			$('#serviceDropdown').hide();
			
			dataLayer.push({
			'category' :'support_section',	
			'action' :'top navigation | cta click',
			'label' :'FAQs',
			'event':'event_support_section',
			'page':'',
			'title':''
			});
}
	function createPopupWin(pageURL,pageTitle,popupWinWidth,popupWinHeight){
	
		dataLayer.push({
			'category' :'support_section',	
			'action' :'top navigation | cta click',
			'label' :'Service Request Status',
			'event':'event_support_section',
			'page':'',
			'title':''
			});
	
	
		var left=(screen.width-popupWinWidth)/2;
		var top=(screen.height-popupWinHeight)/2;
		var myWindow=window.open(pageURL,pageTitle,'resizable=no,width='+popupWinWidth+',height='+popupWinHeight+',top='+top+',left='+left+',toolbar=no,menubar=no,location=no,directories=no,status=no,alwaysRaised=no');
		
	}
	
</script>
   
    

    <!-- Google Tag Manager -->
    <script>        (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({ 'gtm.start':
new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-MNZNPK');</script>
    <!-- End Google Tag Manager -->

       
   
    
    

<meta name="description" content="Connect with Axis Bank's Insta Services to block your card, report unauthorized transaction and much more. Explore our FAQs/Queries, connect with agent or email us to get instant answers to your queries" />
  
<meta name="keywords" content="axis bank insta services, block axis bank card, report unauthorised transaction, cheque book request, axis bank service requests, axis bank chat, axis bank customer care, axis bank complaint, important customer information" />


<title>
	Axis Support - Customer Support - Axis Bank
</title></head>
<body>
    <!-- Google Tag Manager (noscript) -->
	
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MNZNPK" height="0" width="0"
            style="display: none; visibility: hidden"></iframe>
    </noscript>
    <form method="post" action="./index.aspx" id="form1" autocomplete="off">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="WyPQy/UCKp97jCrAckM3h+QSehDEvuHjknB46aidDzlfx9jkbAh+clXU5J5HZQ3GnY1wm2L1A7myAkDZnwABsdlNvJD6ZWHz0sZlvMj8hog8ERyzjwmBpVKpzezJL6rIeG/ze9l/bdS+TMPfGRJIFtj4IZftzgtrPolkNM/2iC6kzycMp55l1iw8KbS6tWaVM6py4VC4pKIykP4nLZ939fkQQTBanSacWnHQpVQERb9Py1AEYXQDXlARU5FszEPialD//QBDjYKiuy84jkuHXPs+asemopQOX2B0RG7AvFtXkaaPV4NkXIH2Z9Yfs1+rocXbwff9+kTkQbSnBzuUmrCWGj2f60KwnaxnbRSWnIZA33lW3LNxnv3SxLVDkcUbcMwU8S4xtUvbiMiY0u9o9ko9Q/0928FI4cTpHTNR5UCsgU6HfFze60GzvOYEU2TaBE2Nzj53wjkPTYKCGJE0vV+qDnAv9z5qTX11ydxm/Q8gP9GD1thHCle91LsOaJQ33hwE3GQuDE2+j9wQCtVconUZpFOxCIJyg4Ueay0FC123DYxqsGZxK1uSmVRWv2VGm05+VtcwFheeuYS//aFX3ROmm4FCKE2Srt19fskfAsR15pXHGY0OgG8uGkSL8D89fVmnZspbwLBKzWaQ98UjgaicqQQn879ugLtlHRjH65lFRzeo5+XmyY5mFKPpJTBJB0PGGZjHcfY3VnQPh91IOjR/v2+Q5ThV6IGz0ZZ/DdISneGdeC1osTSmMQl6G0Q4Gog/MJ8qnraqyaVA8z5u3JfWASRXYs5UbQLP/tsQfKY7dPMDCaEQ4Ppy9eG+Jm5W5Hfcoess5otLhHVgYMQdC82N5nQJhEZkBUtGSWHFXY9wNUSTPMHcjjHnRTyX5qbZQHlyV+GT5WZZhaXTbz7OVHNgWelK6TBl9FWOcnKYCzCUlDphVo527CpbcrS1WOay1BF6b42LYeV1Av+hjmxOPB3G0rwlyGTb/5A+1TzQPYQHn4eQNna7GIvkl8MY4gC4Z4brRgVfO19zuuEZnqV2zapU4jJZiXnajvuNra8NGXoxfnilfmNH0FkI+XPUKu1mO5/8rtXd1sculXg8Oju2c4X1Drz7FxknObiuhYAlarzQFWZHHoMItwCmllC6HTfKHS7QTuPNRvTz2KbXa7NQomsW2yaeTPPX090LsgrTgWoObFyDg8jb5ptvq47jqabujN+B8JjmVevLYvoTsitC9T/7PhES93x40PAwKSDhLt2L/PyWM1eOtV7X+a5PWPvCLQVvnoKuwCkyFxIxErW6RJhgLDoCmCsNS0JNvA0DAK1ZX+fYMb/S9BSSeJGk56k/P9fZMoM2KhiIEfdtb0opA1St1ynCVfM19Hq0Sw9+5Y0nSY7f3SyzaDBwTF1SWoJzkIvJkLcP547ZZbzJMJcO3rJkxYus1muCMy0jmVtTfk2SXXPpDJowOrTY6fujS5pPhNkZ7Ln535H6zSYqGTaLOeofVglg31yMyneVVSiQrpXq1hOSvVV7vK20Z8BB2vHPNHLhFqUQcLWzLcDom8NBNaAoQi557VitynpoiZnYoBHB0T+MaYBHjsxv68bQlJOJN4XtUvQXSU5ee/aHPFWBi413Q2wyCo6Ur7wLsyTIVDFv3b2BAGXmOAOQCv3rWJ4pQ6MR+f36mQRNL1nmO4rWJjmE6Movlkd0UDiWJXIOhMtwNJHOFd7RHRl39m+Rovm2m9wSI/QoEZxGqZ9/RjQQcKy3PfFNKRtgVjEOisxwZSt7kWVRd9KfnyXfb6ycjTGDr1oExGruX300ounjferT8UfXfqrmOwuBtHhWesuecEmTrxTvSBdORTvFbdzN/BIsXnPZ+fmGcFDKT9TV8j00QUQw4kaOn9DlO+vBhwfEoaJD3Nv5G3DuwZnshqEjbdXHzCqyr2SA9W1QA/TJ1RnDQnbGcoggHYT1h8k+llEqwx/HjJszsiouivS5Imq8FuoXVOJpE0aWxwm1LZvrtx4cvzVfQky6MskYsBl9vFrawBZgBsOP2hjdo8SJfoXS8JEcxp9Avy5wo37yHnjX/fZEej3bIJPNC7bOvkUJaz2a7aTn5qWq6tAGwEYxNA9/4Wdr3EuD5Yc/iIryUjBF5a8x9HhHbVF/KvGv6mBzILD4huvIrgH0qGmQ02+KoDwczFkR+ff1/OPnDWfJdQ7PEsQlt9iiJAvB474fTedjebc2JeDxYn0H6UcITkm9diPi5Tl+U8GH6lWLi7yi8Yi63J3en5N4qZDWXNquABX5AAeKnHbCSB30EW7F9PQEiiR4LeQz1O5hjcGG/VAvFzurrp8Vskw+QEsi1nbieh2qBo8bxUvmyT4KIShnqRm6nO3jpv8N9JD/wCE1bg3lkPlbZ7a5ggUasq6SHHGnFY1XGsaXgGBZnLrGv/B/IMbFOjSjxwsIQgqMYShryiXPSeELM4nZFP88/lB0CpBzc44yDr6Pjm8q8i+6zKs6dO/fn48bJbI/gUnT5pAHzZ0VKhcXjh0626u1p7QZ99Yf7aVUBv6SIEoDZVULlT2ufI0GdiqNH4eArR643tZAghTOWTTb/sTSLKSRBVLmEYyKfJQJK41FePf2HWGo6IH8cRm5Gs9NuNQ2UBQmfSQLPN10Gk+/z9mYdlafN2j1JI9au+icFvhRvj9rNyEad/T3nw6em7PBCG+4kxdqUS0S7s6gCsQebicvbc4Xtks3jFRdCJBQ7Zi0vSKznQTR0Jpuq3y4mh+cZ+BkAxt8craWXIP4UbHkLBkUgmxhV+/EG7XWw31/6HyVJEgdulyxpNwWu6qMq2CevkzmdQ8nXyzhp5SbzMfQILtfeQt3iNxYNwSth6iw9T2WO4I6ADqr/McsX29+9xaDhLlZdfkTyKzkz3r5tRwy9k9JKsnbG+1jsXdZX1LAq/gj3S7o2tMyUrUjPLNd27OG04ZB/+myKbXCSLFw2KQ88WaDWd7ERuZYzM/ZQ2PYlffozAQ7eEodvrT/pLl4/MKCS+fsHPPwx57KwVpWd6B02a+7z6POsFX5QNxFyqbtxlmdQbD+WtLrlCzHzflz5FXr134vrS9nyTF1tu7rZmKe4qDhsruHyvnBBWWtqneqFu7P1iicxvkUjZpnusRl6yWqaqK08dS2k1NXZGikwkqHi3NPSUoLoufykfzsDoCkgIRfhoR1OfdOQxl+hoWQq9X7pOE47xlVy8mszEjeVAPsSkB2SQ/YbiZfworB3/0iJUc88FXQrld6hGC3wfhoiGoD+UadbzOF5zJXexTLDqFzV9fT7bxOoiH61MSphMhTfjWeUTRwyOdY09H1Q/HV0lxoFHXhsmDLCN4f83YDBEjcn9aLI3SR2+AhvmXxeqQEEsyzjVexIt/BHH6E+QsQih4okwb/VGESeBJr2YR1usVIf3mEL7P4YENTl2/fXWgVMxwJ7Wq0VgDlosjLHLMdX/YaILZxXWZ97pqg9b1fi8WRK5uL/koDF9Vsn2IvXLXcXYQ6Fvc7A4XHx2n3a4W3q0WoJnh44jsmXLQoijA1Q39K2pGgaRBa3+K6upJ57XK9mOajS9/93BCMCMjmFJy9KjZEj0s/9JgMJjzTFeNiELB+Il1WmuifW0ue9UI1RFG+Fu9lBNMOQqh0mP2Mp7p6DxNKbmXvcjOPXdGfHYGGw4JmfVBsSVAkhg4CfC3qPfxIM/l+64tOBx4pHhrwcnoGeAe8HXrGrOVoqJniOvA9HtWJYgn3kZwaQ4vT8hy0xedk+1RArzj+3zqQeEZsr+vL13AqJ+K8w45e3WgtHAWhBPxgolyamc13iLpen1zbntQeNGP3IHdZES34jVTNB3g7YUrl4lwuILVdB6C+azPQFDZIPNT/V9baP6k3zHevcFyacytuGc7RYokEu+G9bS+B1/B036cGt2qoFsAxwEEHwNEmfzSobWsElSCZ1pyql4uDdV7YJSTT+Iylc/2ue+htLmL2wY8kzw1Lr76WIzoUVDBBPZYwOWWi8cjSZ01Rs1C10wwSvLQlGLuzUZOE0mJKCo2aToWd06IKKpRldHGcUMBw1uzAxpVNIPZ3zV2N8mGOMxHLdH1LgfvFbJakavg03zNKfboAv1AqbBxC4dd1hzDbJN3lkZ6MmxYHi987o24Ya4Oqe2/QdKkOUT26f6HQaoagZGRqorNVQ1CWsKhYBYYkhSmGsYBQJY3RnMFTzO/zDjJ+ZIoUkTVf5kwiQL0C6m1LV+Mswi/1Ojwz3nIcu3jDBQBtcAEiJ0LyguRV5jl42D8WdAPJNn+krko/bfMOe9H7j3hh2zbJ+SWEZmd/B7e3cE3OJR6lG2GlfxSWfx2Yy0qgbdRHkMSkptdGewWe693sViiv+8Jf3kTyI00qbb5jFY1lErewHPtbmnoHiTRHMTvtzADVdkdztf4DUODQIgyiLLq+ge905NxhS3omazFgVxQChpnU2csB1s0C0TZgva6yOBAGbJu+NaWpXgZw1Ws+lVGKceChuq0e684Q1OTUJ0ijKt416o2H4fCvv8Y1dB0D7In8lS7NphIdkqd6L/VZZD2yb7oyksdaA1p/TUZPghyGl49n+JUicHOFtEEoo9dubiutaxAUUsxU4uf3S0pHyDHJKFat4wfB33SyHJn2eXVf4sJ2cyxqcu23mWuyP2gPoGjOTJT2q1s0bCk7JIHJWw36/ovvDkKVRYc5D5lNMIGT3SsRytT8qyi3D9CVFSPNRXsy6h6VHIlvBtI3IKXfnmW2hzpUtnhHr2wSbVE3OGMvYWMmzO4HYxmkr3+/OIL8fqmYDw7SOgNZxtWIWcmvx1FAIIXdIB9wdji9a25+mfkWPQiLjB3DEoZ/WrYRevwDbCQ6VVO9qbe6bADoZgrL/9SFQDBcnQlxz0gv6IZgIzJOwvu2L/QxEBxwU3KgaucwZnFCamOxNMFlAAKV9NsUmMCNXeKea4vet461qQLjY4QlnmGYPehOHg7lRD3KJXexGQA1+/ZPIe9RxgZhx/YTu5aBe3dNdYx3jvzlOfclMlD878UazmwLLDCZ3k/ylKlT5rRwn2raIKATp3PAAf4sH+eNEyMdGBPnLHHbyozP9tYJTv8MOM3W8/9tfAVVwM/wpfJvhcxayDLNBFaLp5OU5TCRnqh9pn5a6nIl5xb6/UMdy09wYkT7vxK684eceICfRfNDmdo3DKYn97ueWZO8jsjzA/p7z24UPhj4ZGVLpzC111saVAR14JSfPtkzFpokm8XTtBBVQETS7GJFrbxdp3OjmmJ9pJKX8u+X4K/HLaAe2CTZ0I9aNdMnRCajnH5/5fkL1YNsIueLdyss3dple90PVEr3C+lb9iOc72rTtxWNAvBNZ3UkKc+7B0hIc22xWGxtp0MozebYizt4VMkWcxSdeIEC4Z5Su8jTLlhv2q2v0ekZDS4CXSbBXQU6m0fnVobws/KMZgKhu66zZKnCZToF8/8K7AYTp8VmpbU48MclPr6Krn5f0Ytku723hhxNl30G6dD3tCRrReO5puY2wLLgvJOPjeDQDACfDo5YynuZ38zae3ZVXxffrve+AoLvcyfSM0ONFeBWTAwUafDNEHHR3ex8url4t0qzSNqoO61PQoGtfDALO6V3PoE6YuBmJoJThtpv7YGX5En6dS/aQc4Ypgidb0KfvMlW2xfRP/g3Vks2oaTFf0hXdBxLK9BHvnjo7G8auFriYFXBjpW73924pxaozG64rGDV3456pBJcrOFtASO3TSbWTKBADgfThcMil+LNqzGLlNLKogqCATxHddm3J7/bROrfh9sYfT0sL5BH/iYQEyRLvCMoT2QvL+dt65aOlBIw2144qNOJQKCwOyXsaUr4cbRDuVq+w9etkgoc6MqBP2H7VojOLRVl+6S0wuqQbqDdV3OIpvOfREb0M/zvE/6PpYAZNZeBS9ogK/Ibu9UxT0Me1Z5sVvpoA6LAxNrr7rSG1XBI3QgPIJBjutAri8YjN7GfUvuZN/Wnrae7Q3oPMzFPQ7IVjdsDsYZ4whGJkSi2rfdv9HgCvrgZZXhxRII3mMwz6o4UsogthjrEQEJDNCZAVDLpx3laAkXqOjpqWvwWYq9y3TjdZBXteQmJtOWkcM6GUZz2X3zAb6t/6okyYfsdzu2NiPHSGXs3ygAGmi3rM9kxBnSK4U0V1PjtSnio6XHDsKvQ64eoHZv5jXc8Ae1Nde9VxIlywUOD5ftNLIJakM+XnMUJNUwNEbS3j2MahCLw17jJQ/OK0ZSiHprvcYB7yLUF0/7q/6PqelLYfGoAR1+JDfzLBgUuizRdSTwpAFGfR0a2eFMdn7TIXeottEECqDwW9p32SnyLQtjMwG4E0/w6zgxrSV+XwUI6w0b6oWSbJG2NP1eDBg+KeOLBxc2duh8XY0z4Jqt3HSquPCWs1VE3KiW8BScDGE9r5X1CIP623VvSKsVp5dZMGm3x87Pavocx+OMJkQHRYnG9EuPTzip+EKorIgebearuRYXjAF78QO0bQS/mDz7XOPdn2p5x2BV19UcD6LITNlTqrhRQFcffvcXSyknvX37ybL9eiQXFahSwskpD8Io0hXW1+74wGnXIKfKJf/XPpKSsGzJxgyl3fkY2l1xZSyqeBei/xgusFLWUbj7G/6+GR3uO9A5rwjtC5uQGXFZChBbqN15fGpKm0SIaHCVKKVAUWOzlJNVnVIR4Z3A3Po3VBknQrAFoq+arJhyOYjFVWHxJPS1CvclILBtxzNYNlTyPECQwMIdQfDcgtxt/kczJ+tCwL8TLj0wM9FJBkfWJo1haS6VB6ShNCMNYioKzpbeHM7BF8EuLx3/YATFajrRHg7qM+ENpEAaecUSbT2fUu3IVgOFEvDGhdKKDF9R43ggZKtWV0QJOPKuXkd5vo6ekPVW459r+OojtUKaN6lTl6oBLDphleOofaZQQQWSLoHeWPrOJ7ErK7lg1U+OUEhzBrje+JfGIHH4lyAFsTQRsY1ofife8YgMYLe7muSadgvmDPc1SX8LwcMXyWWv22vqnffLUhJQi4HhFglYN0gDCLMgteiqM+uLjJVXDZ8qAqKwe49gJG4ofXdh1DtmXILRmGgcpvICLeMMQ1oBslUr6AyNZ7+x+4V2vjisNZwWBYh+w5oG7B+FHAxbGvQ83fskVJTYnxv7x9H8VB6nL61D+8ia4i1tpYhtHZBDOwGqXZuEhnJA1X3Xhjrbda5lJrK49AMutKnIbcDmwIqZLCFPNwGDk9FniUlsLVjl0uxmJc7DbZIp0bR2sUytKfHc5uCRjQEVUl9gorqrxREr2nmcHXOT10CgheNi0K9h4ktJ+83PZQ79uSC13S28743TYUPeXU54WSUWmiyDaA+L30w2HXlL8bn14YS+BmaDF9pLcNDYFuDGwqUiY1QzJ/xNenqhiKNGuUVS/6K1fl0fOp+fllmopgFvkq7cYG9sljrtWpXez2hPlFaQQ5qiXGmuFC9rAdZTjwOwg8TyJJ6KUDMt6FNPM4ASvKm/hRjtKxEgWFr3cRVaA4k43VvsxDKgxWc6wf3W7vVro+bG2p9EY6gwEkGlBaBbKWoeSu7SDMyDtf/SGikWR776QIpUo6z5YzjDVVsKAAEDkd3EFjr8NEoLbLiDdgAhqF/z3aeSGSWx6/tL3zJikw4RgweeYa8iQHqm9OHaChv2E37KTRVkpRSJ0nZgIVbjt4T7Vc9k6XnSxr8SI+f1dxdN+qLR5U5PRUToAK8jHeUehLjLmsq++XSnRqqXhy5kVlT4qwuVeuw7LKxlDXX6JxRu9S+aTnQsqhHmeM4OM+PbSNi4cyfIQ0mCKGOGUkimVQ2M0dsHw5fQg9pTV8mB3aMdFHa9180i+d9GgBp6DYMliHQ6ijpjdhMmuMD4LdCTxBUHF1SpkhJsMqQDbIxotCAfSfjDg7Ko/C7/VpsQNLC/d/4fpyKu1hHTrEP/QUHbdRvITOmK+b5qZgC0oRMsOoE4RzC+j1VFgErg2vroAO5DbZj4PTJd3EFtd6Ex6CX+5H41NsxzeKDObblGBCYoBwz04D4pBleoP30A4pTFU80sOH5t7/o0Lcf8Y6sYZmDQsRcVWb7ymwcfEZAHTWKpMBBdCf/8nrswSn8+y1gJ+LFdKNx9c09VHxf4jVhkOBKu6eSEgvCYKfUL/X1eln7RHRSCwoiGPSnu3uIQ6TllxjtJ1ritEFqSY0YSOe5MjAhb9qmcev+KasnTVjbAllmuL9LKOPTKz1yyy4MxKNi7K4Jtz0n+1jsDFYDtukZIJyWyyGOb3oWgwJLwZstW4HvDb7ExOeoDdGSnOyCx7Y9zbogWzvhqLmglKnx7d9vB7SNWMSv8/QrqjWxqclZeH9/hDtYM1ohmEL0GMnk9xHMwswXH3ET3yJJ/197oNYIakR9y+KtNc6lL/unThFTTGwWbq43JMnZyeexMXZUxKwFIH/3lJsgSt2bcBTiBeZWBFWkaIh9MssNsJInjG+HkwnVuBmBlnxhTQhDsHX7BVHcH0QjtarkZ4ti0JHL9kJ4tpvcG81nmR5HEkRo9J7aXetkTcAUOH9lr5z1+x+KZJvka2aro9N5F1C4x0YLWfFluXjzg+3h91iqqrGUv7c6Ytby4TckcG4fsLIjBg4BN/5QM6ng71C1Eh+1raDvLiUs+ofwhmT5UHYnq+nw6cIXEml53U+lqlKvuJLZ6yqGp3F9CZQnxAkuaV4QZ/QaZr1bRbUjMFDL8fl7g29ZlTo7psWvfX/abuGKnhYt2EH778He4V0pVemG41N2tC4Urj6Zyrrx1sG8meWU2bNUMxTBWnFtc9d/bH5NqusIbnA/zCmff/4cU01F4AmvcS4Dai9/79fjMBGuYygPZUXaMwEWUkTOOzSYWJm/r4J0+yaKWmtudmtQypvrwnHPxK7B5XQD3LiTnIL5MmhMDczk0TENTg/EC4rAKVHrb+inTHORgXl7BgwUX3w2FL0jbJc82e+wpJVbTwuTCFqelmG209j2ty/JarjoCHKmYoND13RbYyk9sHgECF1O5IJ2OLtjfEzC5WKN3AKyj8+uhEvIqO90merZHDtRGa29Ai+ndgBwxlPh+1dTfWK3Ciwai2wWbggpbwCEJTEXE9/fBTX7FTEF0N5DpLqyMpU+Q6tRDYrVuP9j/WhUyv1Kow1dQs9l9UUd2IcnryEcjvFZ8jtK0xND4YixqKDUvJMHBFW38DYWJlUFhdBT0F42z8I0Dj1cvFjuxZ2nGNmQDQrfRvaSud4Y014lA89h8EDWLk8iqYYBPJSjyzWpt+6ZXkAsTUkZ3LYtYU0EuJNQl1Lq9fQ/JmW7R0PLa1nfAWQRoIWdplC+8Gjmc71yyZ9Lw9qM7QlXdoJlN78u2mqLRr3xP8+9GDDNs1WEOPDDVwXYJgKlDj8k/a77olNTekR/Tl4EZTNOT4RrxkknajVVbC5ozf12wnh41rAiExeJUeKEBMxalaPNYhDx/1AlL2aGE3MAhw1gKSmWS46S9RGoysZxqD1uznvLREuPSkqY3rs21LYJsk2j19U6+n9a0/5Sm92LAHmvYz6ecRQVkb7yUfseDz8DoR0HQAw3+sr17mi70PUWQiuyyRhlwoBJJGjGoEI+bW7l/Z521J5OUMyiEV2ZaTNahQ+43dvdura479QmX6Kf8RBeiibyg/oU4M2NZWOcZvMuXKGpYieYGp/OqqHqatOcHlAc070P5Da7nn9qg0lZqgfSannfOApyb455+rpEPFoWZ4IeN/XsHcNJsCf89qjyd9WZED1gkVGD/eAPrgq9nGkNUBpoh/Q/zeVmxFPoRuAqzmqrUGVGpnKk1AeLMYiDv9x7q7S965fe2ESF7NNVESNReWcNdp4+zYegT9VPLa74Co1++5oaniaMzGBPm746R0gWrc9yF14aMgYXyeVVIsCu1Dm0h+hOyBwgKgTtQtPwBXNXCqie3OBDvd1sZl7zbh+EggydNKGNLrSczVLy2KroiKP3c7I9tqjPbVReaJeN7A5WzBim6zpnn8Tzo8XRCG/iAa5zXlQWCQb8XobMxbJe0whfX+YmkdZXNUfCvwQ3ZgsyPjGQSxvN0DoBC/X7lj6ulFyOlMXAbZdHIhk3pl9/+TGRnzz5FRNmBZ2WL2/nvLA1I8rEOU5PiH1UH3JHT7eTGgzYXbtuchzxb+wwL9EJhCt01aZqNyr3eghkKu4LoLU/QF5ijJRLcmk/b9VVry0SKz+cvbpL7k4kOoKFYhB2r5ynmamYZlw19sN90iZlr+AMr5IPXI2JFc4IB+UHZYsk1M/jO1p+MHDsyBYOmT1CvH1BXTbwxSfNA34DBddRFHg/znIs9JveSS1uE3Yao4TuYl5fqJD2OGZFTinHDTl6udoYwWoEyTrGjj5v9ls4QFq/s8ecBnJd3aAZA4if8ktMr3JNjXj6w/EcGX0cH/peR3Fz3Zkh8buLIDwm/JlluH1ZzjfTEtw12gbc/Xa1j62hRujcbPx1msANiykjFUToc0OzJueQ5PosUcxXs01qmf8QB7Io87Mt12qBbwkNsoNU5AuVob+rpHRGxEDguqwmWQ06S+Kz8mL+t6pdnm6gyCnMazueHuLUCoZ6moY8JouRkP1fIoQgFczf/J5Kawc4+mdoXT5+uV3geeR1P36mkuK2oGlQKJz4ICMy+CDCJ/72vcBD8YC8XeqZ5P1TLhkvyUJpTQUonUyE4G/RzkqmX2hDijbSHsyKCt1cSKvY/mrJqxQPjn+ACR+ohTWADI28YyX3OlimSWUwuwIPiFQ2L68EKH3nRJw8PzE8vhuHwcsnyizVz4dEw9rWwxSG/H/pY1sRc8XzIPzbJtrSjNdeIYE/kytSULpkdWZtTB/9KFGlYxfz0pBrdwGJkNKChp0OQi44t4L3afV4xS+JXpehHtY4stY1QvSc68sNEzoezreEH++h1pbQ+WbFxZZNW2nEQpZ9zt7i+YBu4Cp/acpVSAGcNqI3lGcNuvKRxVjlOr9uG4Bb9H2H+pFd6ZNM1jq+FVDHdITRKvxqAAqjv1nSfjj34jDrg5uT5WFK9eN6DMuvQ7WIEwhvD4EtLPyratktIua+NwJzjrqpcvgfP4oPHu3qOicTtQ9YKhq+euOdz3xtAK8IKRV2b5RTgXHbCSpsu4IhF64/ENnnJdRg/Sz7CvSlGOMoZTQVK06R/Bhb/k+Cj8VezOEebsCTu2n1NBpLLHittOyxIUFe+RvMyw4vH7/BR8/3dBbeMBm1eWvv6HHCeZLNCdlEQTDaMOexUH3fGA4UitCmpdFj7D0S7pfCaSaSOkeTT4cjGQoWkaFq4/Q6dtmFwTmldH/OViy8zbz29p7bK55R6mvIUTZ6C89tJnDozgCJo/NR3mrV+tsRFnbewYP8D9XVPv04FUO+2voIVuO766CwcZNpFTcxZ3iph5Pi5puzH13GnGDxmi/GDymMLD169nMDfpVp+qfXFGstoTXvu0XGfJSX01FE1W65iBfD8sDVNB8ltNBovYOIUYtidi2h7ACPZ0NZHnqIi9pGvKsy2VWT2MXN8WZlnFA7qFHV20ZqSuOTdJodxHEOowE2DYgX9as7UwD5QsBgV9yvG/Nn8737loSatnehvEtRqYd5Srb6QJeyvDAQMhy+u1UYtC1tlpTb5O/bkSpaLXIg==" />


<script src="/ScriptResource.axd?d=slwJQm_26LXHsF0OcD_evqcFmj-a9w2ybD4LAbLBV8Tf1MJ3k0t-QaaCcUIMdyTvMg_2p0Y_DKcwIdlX5cQK4SCt5cXLnltCig798bkB6D8Pq0VuCzd0WioNDNE6GYH_OnZF-T7qb0ME6kUosG5FjCnM-auq79IecripYb5jK1s1&amp;t=49337fe8" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
var PageMethods = function() {
PageMethods.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
PageMethods.prototype = {
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return PageMethods._staticInstance.get_path();},
GetsubProduct:function(pkProductId,SubProductId,IssueId,SubIssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetsubProduct',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId,SubIssueId:SubIssueId},succeededCallback,failedCallback,userContext); },
GetsubProductChatEmail:function(pkProductId,SubProductId,IssueId,SubIssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetsubProductChatEmail',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId,SubIssueId:SubIssueId},succeededCallback,failedCallback,userContext); },
GetsubProductForChat:function(pkProductId,SubProductId,IssueId,SubIssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetsubProductForChat',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId,SubIssueId:SubIssueId},succeededCallback,failedCallback,userContext); },
GetsubProductForEmail:function(pkProductId,SubProductId,IssueId,SubIssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetsubProductForEmail',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId,SubIssueId:SubIssueId},succeededCallback,failedCallback,userContext); },
GetsubProductForSpeak:function(pkProductId,SubProductId,IssueId,SubIssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetsubProductForSpeak',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId,SubIssueId:SubIssueId},succeededCallback,failedCallback,userContext); },
GetissuenotsubproductChatEmail:function(pkProductId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetissuenotsubproductChatEmail',false,{pkProductId:pkProductId},succeededCallback,failedCallback,userContext); },
GetIssueifnotsubproductChat:function(pkProductId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetIssueifnotsubproductChat',false,{pkProductId:pkProductId},succeededCallback,failedCallback,userContext); },
GetIssueifnotsubproductEmail:function(pkProductId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetIssueifnotsubproductEmail',false,{pkProductId:pkProductId},succeededCallback,failedCallback,userContext); },
GetIssueifnotsubproductSpeak:function(pkProductId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'GetIssueifnotsubproductSpeak',false,{pkProductId:pkProductId},succeededCallback,failedCallback,userContext); },
Getissuenotsubproduct:function(pkProductId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'Getissuenotsubproduct',false,{pkProductId:pkProductId},succeededCallback,failedCallback,userContext); },
SearchCustomers:function(prefixText,count,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'SearchCustomers',false,{prefixText:prefixText,count:count},succeededCallback,failedCallback,userContext); },
RedirectToIssue:function(SubIssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'RedirectToIssue',false,{SubIssueId:SubIssueId},succeededCallback,failedCallback,userContext); },
ButtonEnableChatEmail:function(pkProductId,SubProductId,IssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'ButtonEnableChatEmail',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId},succeededCallback,failedCallback,userContext); },
ChatClick:function(pkProductId,SubProductId,IssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'ChatClick',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId},succeededCallback,failedCallback,userContext); },
AgentChatClick:function(pkProductId,SubProductId,IssueId,SubIssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'AgentChatClick',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId,SubIssueId:SubIssueId},succeededCallback,failedCallback,userContext); },
EmailClick:function(pkProductId,SubProductId,IssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'EmailClick',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId},succeededCallback,failedCallback,userContext); },
AgentEmailClick:function(pkProductId,SubProductId,IssueId,SubIssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'AgentEmailClick',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId,SubIssueId:SubIssueId},succeededCallback,failedCallback,userContext); },
AgentSpeakClick:function(pkProductId,SubProductId,IssueId,SubIssueId,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'AgentSpeakClick',false,{pkProductId:pkProductId,SubProductId:SubProductId,IssueId:IssueId,SubIssueId:SubIssueId},succeededCallback,failedCallback,userContext); },
RedirectToSubIssue:function(subIssue,succeededCallback, failedCallback, userContext) {
return this._invoke(this._get_path(), 'RedirectToSubIssue',false,{subIssue:subIssue},succeededCallback,failedCallback,userContext); }}
PageMethods.registerClass('PageMethods',Sys.Net.WebServiceProxy);
PageMethods._staticInstance = new PageMethods();
PageMethods.set_path = function(value) { PageMethods._staticInstance.set_path(value); }
PageMethods.get_path = function() { return PageMethods._staticInstance.get_path(); }
PageMethods.set_timeout = function(value) { PageMethods._staticInstance.set_timeout(value); }
PageMethods.get_timeout = function() { return PageMethods._staticInstance.get_timeout(); }
PageMethods.set_defaultUserContext = function(value) { PageMethods._staticInstance.set_defaultUserContext(value); }
PageMethods.get_defaultUserContext = function() { return PageMethods._staticInstance.get_defaultUserContext(); }
PageMethods.set_defaultSucceededCallback = function(value) { PageMethods._staticInstance.set_defaultSucceededCallback(value); }
PageMethods.get_defaultSucceededCallback = function() { return PageMethods._staticInstance.get_defaultSucceededCallback(); }
PageMethods.set_defaultFailedCallback = function(value) { PageMethods._staticInstance.set_defaultFailedCallback(value); }
PageMethods.get_defaultFailedCallback = function() { return PageMethods._staticInstance.get_defaultFailedCallback(); }
PageMethods.set_enableJsonp = function(value) { PageMethods._staticInstance.set_enableJsonp(value); }
PageMethods.get_enableJsonp = function() { return PageMethods._staticInstance.get_enableJsonp(); }
PageMethods.set_jsonpCallbackParameter = function(value) { PageMethods._staticInstance.set_jsonpCallbackParameter(value); }
PageMethods.get_jsonpCallbackParameter = function() { return PageMethods._staticInstance.get_jsonpCallbackParameter(); }
PageMethods.set_path("index.aspx");
PageMethods.GetsubProduct= function(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetsubProduct(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext); }
PageMethods.GetsubProductChatEmail= function(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetsubProductChatEmail(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext); }
PageMethods.GetsubProductForChat= function(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetsubProductForChat(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext); }
PageMethods.GetsubProductForEmail= function(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetsubProductForEmail(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext); }
PageMethods.GetsubProductForSpeak= function(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetsubProductForSpeak(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext); }
PageMethods.GetissuenotsubproductChatEmail= function(pkProductId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetissuenotsubproductChatEmail(pkProductId,onSuccess,onFailed,userContext); }
PageMethods.GetIssueifnotsubproductChat= function(pkProductId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetIssueifnotsubproductChat(pkProductId,onSuccess,onFailed,userContext); }
PageMethods.GetIssueifnotsubproductEmail= function(pkProductId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetIssueifnotsubproductEmail(pkProductId,onSuccess,onFailed,userContext); }
PageMethods.GetIssueifnotsubproductSpeak= function(pkProductId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetIssueifnotsubproductSpeak(pkProductId,onSuccess,onFailed,userContext); }
PageMethods.Getissuenotsubproduct= function(pkProductId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.Getissuenotsubproduct(pkProductId,onSuccess,onFailed,userContext); }
PageMethods.SearchCustomers= function(prefixText,count,onSuccess,onFailed,userContext) {PageMethods._staticInstance.SearchCustomers(prefixText,count,onSuccess,onFailed,userContext); }
PageMethods.RedirectToIssue= function(SubIssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.RedirectToIssue(SubIssueId,onSuccess,onFailed,userContext); }
PageMethods.ButtonEnableChatEmail= function(pkProductId,SubProductId,IssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.ButtonEnableChatEmail(pkProductId,SubProductId,IssueId,onSuccess,onFailed,userContext); }
PageMethods.ChatClick= function(pkProductId,SubProductId,IssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.ChatClick(pkProductId,SubProductId,IssueId,onSuccess,onFailed,userContext); }
PageMethods.AgentChatClick= function(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.AgentChatClick(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext); }
PageMethods.EmailClick= function(pkProductId,SubProductId,IssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.EmailClick(pkProductId,SubProductId,IssueId,onSuccess,onFailed,userContext); }
PageMethods.AgentEmailClick= function(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.AgentEmailClick(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext); }
PageMethods.AgentSpeakClick= function(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext) {PageMethods._staticInstance.AgentSpeakClick(pkProductId,SubProductId,IssueId,SubIssueId,onSuccess,onFailed,userContext); }
PageMethods.RedirectToSubIssue= function(subIssue,onSuccess,onFailed,userContext) {PageMethods._staticInstance.RedirectToSubIssue(subIssue,onSuccess,onFailed,userContext); }
//]]>
</script>

<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="030174FE" />
<input type="hidden" name="__VIEWSTATEENCRYPTED" id="__VIEWSTATEENCRYPTED" value="" />
<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="YF0T/Z/2KpjMQT4FWGLlhDP51uW/+yy7AdMv1g41JbseQTaLnj40AjN46TlnL3tSs8jqXqDmlHjy9k9NVmyS1LnPj/k46AorqypB8Cmz2nEUuUIp5d5w0JlmIwXIOyUxcN+PjC1v5cpWNz2zy3JJGj0j7NW3lKMlJdzxhgBuvZ9TpNuVEUVDxiM5c0M9/d6QNVC1kz+Nt7MafoSLTu/qx29/D3kC65dWwyKVJ6icGSxytPD8/PFHhj0iOL1553O2wZU0y/wj98poPnE8mNi7GDX8HI9m4Q/IkzHdYEZPJ7++YBSXgl0sjTMtE+o3MrrcO44kj27aPXlIglqGHQjgCnmxuUP1l+f37B6sJtL5a01LzHrUjMP8qpipNZOkbEECI/E13gcvEjsoYMqhnrzBBJ+NNM/OgCjuaILlfjpphMWAU75FtlhP34Fw1yyvorQ2QMyyaWQ3og5+iPfEC2we7xVwDikhT2gJJxOwASmonMBDQxdDZQX+Io3TplR1pr1MfEFp6jACoGZX2PiX2oDmFBfGbaZn8w1nB/Yotap+Ow48K3e720QXLBo6DzeEzXfVTQiq82TI2sdwbR32mE37ni7ioDXVFjkTGsvIvFYqeR1iMpIQRgd13p4uQgKhCy1mPQgf2jCXmGDYC72+Ye+SJQH4mFFwi0iCkPaTPDb4tTlOI1Hy/QotCzwH0DTKDoRA03LfB74z7M5RE2czkMzpslqS2ZhI2GuPIJC9QrDClL6LBC3pOE7ldgQiySPjEaGEzFZDKnm3u1erXqK5SgEWczMm40Ig8N+rBn1nfAfIq1XtKJkYh+2s5NNLFpNANULw3ADq9bAdjjBL37HX4h3mtQBt5X/QjOffS1ISeU+SBZvoDb31Bdbe2Dqks+yNa8P0ftZPB3e2SPK9ha90P2afkrRO9krInTQHXY8GpzCYToJtzoK4bjb/RBTxFsp6noRXkY4yeOwM1KgKb/Pqx/9l/aX82Jj+9sX1kcqgL1RWiV8FbRB4UmtLv3E+FUp45YsOK/kMr5h6SpZAtZdDc4eXy2pPTM5kM+VGy6mdW5QVc73GZjcuNR19u/u35JRXTG37x5ECYNYG0jeWsDUgOO8f2lDOL1Zfn1msegO5YSeinvKVd2qFLtKpOhFH42TfRabBP64DXvnw1WHDhTQBnRt1fgjAWWNnMCx1brcgJ4PLsCFZOokHIzCW2kLLJq41ZiqQtrik0+bAGCPtFvvA3+erb/mumn9BCO0l8FddDzp0JNjEv1KaixLuMIf4/SPLQek7lZ15g6it4UIgP15lgSUp9kbCfUQC9xdbQcjJwRF7ot4HIhT0EKRroQXZDq3F9M4+eVhMxO8IClkUOqq2kplcV845o+RLwNDspfulrkUyTrRpUVbeZwJU0hfAPzucAchQAZlcb3WYROWJ5CEiaW7wDIyp+y60nBP96bsG5x8p1j0HjDkbtu3nzkd3j+aIqKtu1yIahkOFV82ZCdqKsdkyNZl1o1WNlMF55HVNjLTaH48EHEC5lDCiFM4Js1/IKlTL8EICFakGxDSMdHgZfDc0tVxaJGJsk1t8UEGiLHQMNYQPGZ3oEQmHfxKjmvlnRGmu+MOBeyeysRYL4KcF1Y82uMecJniZzaiSqSbZ5PmZVnjw+fuKKBzAezmL7gM7UFc2vOAQ+0IXsMVsJsYGugWPr2NBcyqD6BQx2EeUUip88m6iolPRvRKirACfu13zeSQz1RSqEjSBnaXhVWlFN5/lpDkqNePtEeuwzRLJK7EZkFyxj0B3z54D39zcFltNDFhs7UlUYiVtyjGu5XW7L4MtEg==" />
    
	
	<input type="hidden" name="ctl00$hdnLang" id="hdnLang" />
	
    <!--container start-->
  <header>
    <div class="header__SkipToMainContainer">
      <div class="container">
        <div class="header__SkipToMainContent d-flex flex-row justify-content-end align-items-center">
          <a href="#header_container" class="pr-2 text-capitalize skip_content">skip <span
              class="text-lowercase">to</span> main
            content</a>
          <ul class="sizes text-uppercase ml-3">
		   <select class="Select_language">
              <option value="" disabled selected hidden></option>
            </select>
            <li><a href="javascript:void(0);" id="f-small" class="f-small zoom ml-2 mr-1">a-</a></li>
            <li><a href="javascript:void(0);" id="normal" class="normal zoom mx-1">a</a></li>
            <li><a href="javascript:void(0);" id="big" class="big zoom ml-1 mr-2">a+</a></li>
            <li><button type="button" class="pr-2 pl-2 contrast1 mr-2 text-uppercase">a</button></li>
            <li><button type="button" class="pr-2 pl-2 contrast2 text-uppercase">a</button></li>
          </ul>
        </div>
      </div>
    </div>
  <!--  <a href="https://ai.axisbank.co.in/morfeuswebsdk/" target="_blank" class="axis_aha"><img
        src="/WebForms/axis-support/assetsNew/images/axis-aha2.png" alt="Axis Bot"></a>-->
  </header>
  <!--header section start-->
  <!-- navbar part start here -->
  <div class="container-fluid d-flex flex-row justify-content-between align-items-end" id="header_container">
    <div class="bg-image">
      <figure><img src="/WebForms/axis-support/assetsNew/images/bg-axisbank.jpg" alt=""></figure>
    </div>
    <div class="navbar-container d-flex flex-row justify-content-center align-items-center">
      <nav class="navbar navbar-expand-md d-flex flex-row justify-content-center align-items-center">
        <a class="navbar-brand" href="https://www.axisbank.com/"><img src="/WebForms/axis-support/assetsNew/images/brand-name.png" alt="Axis Bank"></a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"
          aria-expanded="false">
          <span class="navbar-toggler-icon ham-icon"></span>
          <span class="navbar-toggler-icon ham-icon"></span>
          <span class="navbar-toggler-icon ham-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav navigation-nav text-capitalize d-flex flex-row align-items-center">
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0)">insta services</a>
            </li>
            <li class="nav-item">
             <!--<a class="nav-link" href="javascript:void(0)">queries & requests</a>-->
			  <a class="nav-link" href="javascript:void(0)">FAQs</a>
            </li>
			 <li class="nav-item">
            <!-- <a class="nav-link" onclick="createPopupWin('https://mobiapp.axisbank.co.in/SRStatus/AxisSRTracker/GetSRStatus','bjhb',1093,600)" href="#" >Service Request Status</a> -->
			 <a class="nav-link" href="https://mobiapp.axisbank.co.in/AxisPreLogin/home" target="_blank">Service Request Status</a>
			 </li>
          </ul>
        </div>
      </nav>
    </div>
    <ul class="nav-container d-flex justify-content-around align-items-center">
	  <li class="nav-item icon_spacing">
        <a class="nav-link home_icon" href="index.aspx"><span class="icon-home-_nav"></span></a>
      </li>
      <li class="dropdown_wrap">
        <a href="javascript:void(0)" onclick="showPanel()" class="dropdownServiceButton text-capitalize mob">insta
          <span>services</span></a>
        <div id="serviceDropdown" class="serviceDropdown dropdown-menu accordion"
          aria-labelledby="dropdownServiceButton">
          <div class="close_service" onclick="hidePanel()">
            <span class="icon-close"></span>
          </div>
           <div class="owl-carousel owl-theme d-flex">
            <div class="items">
              <a href="javascript:void(0)" id="headingOne" class="services_card card d-flex flex-column"
                data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <span class="insta_service_icons services">
					
					<svg id="debit" xmlns="http://www.w3.org/2000/svg" width="40.105" height="40.065" viewBox="0 0 40.105 40.065">
                    <g id="Group_1083" data-name="Group 1083">
                      <path id="Path_4366" data-name="Path 4366" d="M39.826,14.63,35.345,2.98A4.274,4.274,0,0,0,29.82.53l-.1.038L7.333,9.85A4.254,4.254,0,0,0,4.97,15.293l.616,1.643H4.173A4.178,4.178,0,0,0,0,21.11V36.134a4.178,4.178,0,0,0,4.173,4.173h28.38a4.178,4.178,0,0,0,4.173-4.173V21.11a4.1,4.1,0,0,0-.06-.676l.775-.314A4.289,4.289,0,0,0,39.826,14.63ZM4.173,18.272h28.38a2.834,2.834,0,0,1,2.821,2.671H1.352A2.834,2.834,0,0,1,4.173,18.272Zm6.712-4.023S14,12,15.348,12.017s.917,2.3.917,2.3L11.8,16.544ZM35.391,36.134a2.841,2.841,0,0,1-2.838,2.838H4.173a2.841,2.841,0,0,1-2.838-2.838V27.62H35.391Zm0-9.849H1.336V22.278H35.391Zm1.55-7.4-.7.282a4.175,4.175,0,0,0-3.69-2.232H14l3.409-1.7a.668.668,0,0,0,.322-.845l-1.416-3.539a.668.668,0,0,0-.868-.372L15.4,10.5,9.738,13.33a.668.668,0,0,0-.321.845l1.1,2.76H7.011l-.791-2.109a2.923,2.923,0,0,1,1.624-3.739l22.39-9.282a2.934,2.934,0,0,1,3.834,1.586l.028.07,4.481,11.65A2.948,2.948,0,0,1,36.941,18.886Z" transform="translate(0 -0.243)"/>
                      <path id="Path_4367" data-name="Path 4367" d="M265.874,359.7a4.006,4.006,0,0,0,4.025,0,4.007,4.007,0,1,0,0-6.929,4.007,4.007,0,1,0-4.025,6.929Zm5.142-5.972a2.671,2.671,0,1,1,0,5.016A3.991,3.991,0,0,0,271.016,353.728Zm-1.116.76a2.622,2.622,0,0,1,0,3.5A2.622,2.622,0,0,1,269.9,354.488Zm-2-.923a2.642,2.642,0,0,1,.887.163,3.991,3.991,0,0,0,0,5.016,2.666,2.666,0,1,1-.887-5.179Z" transform="translate(-241.853 -322.849)" fill="#97144d"/>
                      <rect id="Rectangle_177" data-name="Rectangle 177" width="1.336" height="6.971" transform="translate(28.71 15.001) rotate(-113.966)" fill="#990d4c"/>
                      <rect id="Rectangle_178" data-name="Rectangle 178" width="10.134" height="1.335" transform="matrix(0.908, -0.419, 0.419, 0.908, 23.915, 12.369)" fill="#990d4c"/>
                    </g>
                  </svg>
				</span>
                <span class="services_link " class="text-capitalize text-center">Cards</span>
              </a>
              <div id="collapseOne" class="collapse sub_services mob_sub_services" aria-labelledby="headingOne"
                data-parent="#serviceDropdown">
                <a href="/WebForms/axis-support/Block-dccard.aspx" class="card-body sub_services_link text-capitalize">
                  Block Debit Card
                </a>
                <a href="/WebForms/axis-support/Block-cccard.aspx" class="card-body sub_services_link text-capitalize">
                  Block Credit Card
                </a>
				<!--End of copy-->
				<a target="_blank" href="https://digiserv.axisbank.com/api/insta/wb/redirect/ZWufW9utwnnV7LzD7%2FOcIABs6Uyes7YwAY%2FxbsUFxTSoUjrV3cAaFyOSFIaFKiGjIoWghvqxuldx4cmn1eSkLPRmY1E58rsWPyGM%2FdJq%2FeUZemfBO%2BUuaJf62OfkLuAWhBU2iEQB8trSuj08ai2Ik42MsZNB1I1yNsfb0ryHJjZeBLnNNSMNsxESIjr0UN02tEyTVNO0MUEuhQxO5CSfGGHOVWw8VAbYkV%2Bkd1bn0PfqZrx9a5wNBLRPb%2BsK3y2DhsDJR5K%2FeIOWbbCYcSE3gwZZ2jOy4HnAsie8qrW%2B%2FNoe6UDCxoz6ZdXSljQ7%2FWj6Kh%2BIggEdC752WHQ%2F%2FjWVsw%3D%3D" class="card-body sub_services_link text-capitalize">
                  UPGRADE DEBIT CARD
                </a>
              </div>
            </div>
			
			<!--Preferred Lang Start -->
			<div class="items">
              <a href="/webforms/preferredlang/preferredlang.aspx" target="_blank" class="services_card card d-flex flex-column" aria-expanded="false">
                <span class="insta_service_icons services">
					<img src="/WebForms/axis-support/assetsNew/images/PL.jpg" alt="PL"> 
					<!--<svg xmlns="http://www.w3.org/2000/svg" width="48.064" height="43.289" viewBox="0 0 48.064 43.289">
                    
                  </svg>-->
				</span>
                <span class="services_link services" class="text-capitalize text-center">Change 
				Communication 
				Language</span>
              </a>
              <!--<div id="collapseTwoPL" class="collapse sub_services mob_sub_services" aria-labelledby="headingTwoPL"
                data-parent="#serviceDropdown">
                <a href="report-fraud.aspx" class="card-body sub_services_link text-capitalize">
                  Report a fraud
                </a>
                <a href="report-fraud-dispute.aspx" class="card-body sub_services_link text-capitalize">
                  Report a dispute
                </a>
              </div>-->
            </div>
			<!--Preferred Lang End -->
			
			
            <!--<div class="items">
              <a href="javascript:void(0)" id="headingTwo" class="services_card card d-flex flex-column" data-paths="4"
                data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <span class="insta_service_icons services">
					<svg xmlns="http://www.w3.org/2000/svg" width="48.064" height="43.289" viewBox="0 0 48.064 43.289">
                    <g id="credit-card" transform="translate(0 -0.344)">
                      <path id="Path_4404" data-name="Path 4404" d="M72.4,323.115a3.59,3.59,0,0,0-3.453,2.627,3.584,3.584,0,1,0,0,1.914,3.584,3.584,0,1,0,3.453-4.54Zm-6.906,5.821a2.237,2.237,0,1,1,2.237-2.237A2.237,2.237,0,0,1,65.494,328.935Zm6.906,0a2.237,2.237,0,1,1,2.237-2.237A2.237,2.237,0,0,1,72.4,328.935Zm0,0" transform="translate(-55.955 -291.724)" fill="#454545"/>
                      <path id="Path_4405" data-name="Path 4405" d="M35.117.344A12.953,12.953,0,0,0,22.31,11.41H4.655A4.68,4.68,0,0,0,0,16.057V39a4.664,4.664,0,0,0,4.655,4.629H40.961A4.643,4.643,0,0,0,45.593,39V20.9A12.951,12.951,0,0,0,35.117.344ZM4.655,12.757H22.187c-.007.192-.011.352-.011.524A12.864,12.864,0,0,0,23.2,18.335H1.347V16.057A3.332,3.332,0,0,1,4.655,12.757Zm26.5,12.889H1.347V19.682H23.868A13.29,13.29,0,0,0,31.158,25.646Zm9.8,16.641H4.655A3.316,3.316,0,0,1,1.347,39V26.992h42.9V39A3.3,3.3,0,0,1,40.961,42.286ZM39.076,25.646a13.625,13.625,0,0,0,5.171-3.172v3.172Zm-3.96-.753A11.594,11.594,0,1,1,46.711,13.3,11.595,11.595,0,0,1,35.117,24.893Zm0,0" fill="#454545"/>
                      <path id="Path_4406" data-name="Path 4406" d="M293.43,38.082l-.124-.718a4.01,4.01,0,0,0-2.4-3.091,4.11,4.11,0,0,0-3.207,0,4.066,4.066,0,0,0-2.4,3.083l-.123.711-.049.011c-2.573.538-3.99,1.509-3.99,2.732,0,.828.66,1.5,1.718,2v2.044a.69.69,0,0,0-.244.239.673.673,0,0,0,.017.715l.228.346v3.362a1.882,1.882,0,0,0,.882,1.6L288.3,54a1.9,1.9,0,0,0,2.02,0l4.553-2.883a1.869,1.869,0,0,0,.87-1.6V46.161l.239-.346a.674.674,0,0,0,.011-.715.7.7,0,0,0-.25-.239V42.837c1.443-.659,1.73-1.432,1.73-2.006C297.474,39.594,296.045,38.618,293.43,38.082Zm-6.8-.5a2.707,2.707,0,0,1,3.748-2.067,2.671,2.671,0,0,1,1.6,2.065.09.09,0,0,1,0,.011l.314,1.819-.544.169a7.879,7.879,0,0,1-4.9,0l-.537-.167Zm2.681,6.38a19.137,19.137,0,0,0,5.089-.63v1.525l-4.046.343a1.762,1.762,0,0,0-2.1,0l-4.052-.343V43.318A18.9,18.9,0,0,0,289.309,43.959Zm4.8,2.273-1.119,1.7L291.6,46.444Zm-7.085.212-1.386,1.486-1.119-1.7Zm7.376,3.078a.53.53,0,0,1-.242.46l-4.56,2.883a.542.542,0,0,1-.578,0l-4.563-2.883a.54.54,0,0,1-.253-.46V48.2l.78,1.182a.674.674,0,0,0,.506.3l.057,0a.673.673,0,0,0,.492-.214l2.915-3.124a.5.5,0,0,1,.721,0l2.915,3.123a.673.673,0,0,0,.492.214l.056,0a.653.653,0,0,0,.495-.3L294.4,48.2Zm-5.077-6.91c-4.51,0-6.836-1.261-6.836-1.8,0-.233.628-.851,2.443-1.3l-.044.251a.674.674,0,0,0,.463.758l1.092.34a9.193,9.193,0,0,0,2.857.457,9.3,9.3,0,0,0,2.859-.454l1.1-.343a.674.674,0,0,0,.463-.758l-.042-.241c1.844.455,2.46,1.066,2.46,1.313,0,.533-2.32,1.782-6.818,1.782Zm0,0" transform="translate(-254.095 -30.373)" fill="#97144d"/>
                    </g>
                  </svg>
				</span>
                <span class="services_link services" class="text-capitalize text-center">Report
                  Unauthorized
                  Transaction</span>
              </a>
              <div id="collapseTwo" class="collapse sub_services mob_sub_services" aria-labelledby="headingTwo"
                data-parent="#serviceDropdown">
                <a href="report-fraud.aspx" class="card-body sub_services_link text-capitalize">
                  Report a fraud
                </a>
                <a href="report-fraud-dispute.aspx" class="card-body sub_services_link text-capitalize">
                  Report a dispute
                </a>
              </div>
            </div>-->
           
            <div class="items">
              <a href="javascript:void(0)" id="headingFour" class="services_card card d-flex flex-column"
                data-paths="23" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false"
                aria-controls="collapseFour">
                <span class="insta_service_icons services">
					
					<svg xmlns="http://www.w3.org/2000/svg" width="36.962" height="47.289" viewBox="0 0 36.962 47.289">
                    <g id="download" transform="translate(-55.907)">
                      <path id="Path_4427" data-name="Path 4427" d="M92.666,10.916,89.128,7.379V2.1a2.1,2.1,0,0,0-2.1-2.1H57.983a2.078,2.078,0,0,0-2.076,2.076V36.9a2.078,2.078,0,0,0,2.076,2.076h1.174v1.157a2.078,2.078,0,0,0,2.076,2.076h4.5a.693.693,0,1,0,0-1.385h-4.5a.691.691,0,0,1-.69-.69V12.28a.693.693,0,0,0-1.385,0V37.589H57.983a.691.691,0,0,1-.69-.69V2.076a.691.691,0,0,1,.69-.69H87.026a.717.717,0,0,1,.717.717V5.993L85.185,3.435a.693.693,0,0,0-.49-.2H61.233a2.078,2.078,0,0,0-2.076,2.076V9.056a.693.693,0,1,0,1.385,0V5.308a.691.691,0,0,1,.69-.69H84V11.4a.693.693,0,0,0,.693.693h6.789V40.132a.691.691,0,0,1-.69.69H86.344a.693.693,0,0,0,0,1.385h4.449a2.078,2.078,0,0,0,2.076-2.076V11.406a.693.693,0,0,0-.2-.49Zm-7.278-.2V5.6L90.5,10.713Z" transform="translate(0 0)" fill="#454545"/>
                      <path id="Path_4428" data-name="Path 4428" d="M193.833,175.456H177.261a.693.693,0,1,0,0,1.385h16.572a.693.693,0,1,0,0-1.385Z" transform="translate(-109.516 -159.25)" fill="#97144d"/>
                      <path id="Path_4429" data-name="Path 4429" d="M193.833,219.688H177.261a.693.693,0,1,0,0,1.385h16.572a.693.693,0,1,0,0-1.385Z" transform="translate(-109.516 -199.397)" fill="#454545"/>
                      <path id="Path_4430" data-name="Path 4430" d="M324.51,264.8h-3.274a.693.693,0,1,0,0,1.385h3.274a.693.693,0,1,0,0-1.385Z" transform="translate(-240.194 -240.344)" fill="#454545"/>
                      <path id="Path_4431" data-name="Path 4431" d="M187.3,266.187a.693.693,0,1,0,0-1.385H177.261a.693.693,0,1,0,0,1.385Z" transform="translate(-109.516 -240.344)" fill="#454545"/>
                      <path id="Path_4432" data-name="Path 4432" d="M239.744,370.542l-1.847,1.847v-6.7a.693.693,0,1,0-1.385,0v6.7l-1.847-1.847a.693.693,0,0,0-.98.98l3.029,3.029a.693.693,0,0,0,.98,0l3.029-3.029a.693.693,0,0,0-.98-.98Z" transform="translate(-161.174 -331.287)" fill="#97144d"/>
                      <path id="Path_4433" data-name="Path 4433" d="M188.28,323.61a8.7,8.7,0,1,0,8.7,8.7A8.71,8.71,0,0,0,188.28,323.61Zm0,16.015a7.315,7.315,0,1,1,7.315-7.314A7.323,7.323,0,0,1,188.28,339.625Z" transform="translate(-112.25 -293.721)" fill="#454545"/>
                    </g>
                  </svg> 
				</span>
                <span class="services_link " class="text-capitalize text-center">Downloads</span>
              </a>
              <div id="collapseFour" class="collapse sub_services mob_sub_services" aria-labelledby="headingFour"
                data-parent="#serviceDropdown">
                <a href="/WebForms/axis-support/E-statement.aspx" class="card-body sub_services_link text-capitalize">
                  savings & agri account statement
                </a>
                <a href="/WebForms/axis-support/CC-statement.aspx" class="card-body sub_services_link text-capitalize">
                  credit card statement
                </a>                
              </div>
            </div>
            <div class="items">
              <a href="javascript:void(0)" id="headingFive" class="services_card card d-flex flex-column" data-paths="5"
                data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                <span class="insta_service_icons services">
					
					 <svg id="_008---IT-Request" data-name="008---IT-Request" xmlns="http://www.w3.org/2000/svg" width="41.482" height="41.51" viewBox="0 0 41.482 41.51">
                    <path id="Shape" d="M36.01,9.872a.691.691,0,0,0-1.128-.219l-3.477,3.495h-2v-2.02l3.479-3.5A.691.691,0,0,0,32.664,6.5a6.319,6.319,0,0,0-8.435,7.871l-.409.415-3.055-3.074.011-.011a.691.691,0,0,0-.064-1.033L16.243,7.176a.691.691,0,0,0-.916.057L13.341,9.227a.691.691,0,0,0-.057.911l3.476,4.494a.691.691,0,0,0,1.043.059l3.052,3.068-7.033,7.068a2.82,2.82,0,0,0,0,3.968,2.765,2.765,0,0,0,3.958,0l6.036-6.063,6.41,6.437a3.484,3.484,0,0,0,4.948,0,3.526,3.526,0,0,0,0-4.963l-5.539-5.569A6.32,6.32,0,0,0,36.01,9.872ZM18.294,13.225a.7.7,0,0,0-.919-.057L14.748,9.776l1.126-1.131,3.375,2.638a.708.708,0,0,0-.057.106.463.463,0,0,0-.081.257c-.045.449-.043.324,3.727,4.121L21.829,16.78ZM16.8,27.823a1.419,1.419,0,0,1-2-2.017c5.08-5.109-4.851,4.877,9.451-9.5.009-.007.013-.019.021-.026.158-.138-.379.4,1.244-1.244a.691.691,0,0,0,.146-.755,4.95,4.95,0,0,1,5.429-6.808l-2.87,2.888a.691.691,0,0,0-.2.487v2.993a.691.691,0,0,0,.691.691h2.977a.691.691,0,0,0,.49-.2l2.864-2.878A4.935,4.935,0,0,1,28.281,16.9a.691.691,0,0,0-.76.149l-1.215,1.222c-1.477,1.483-3.055,3.063-2.983,2.99-.666.669,2.419-2.429-6.523,6.56Zm17.394.374a2.156,2.156,0,0,1-2.987,0l-6.414-6.442,3-3.01,6.405,6.439a2.143,2.143,0,0,1,0,3.009Z" transform="translate(-4.014 -1.853)" fill="#97144d"/>
                    <path id="Shape-2" data-name="Shape" d="M36.642,0H4.84A4.845,4.845,0,0,0,0,4.84V28.346a4.845,4.845,0,0,0,4.84,4.84h6.94A7.616,7.616,0,0,1,9.3,39.047a1.383,1.383,0,0,0,.946,2.461c3.422-.234,9.3-1.652,11.029-8.323H36.642a4.845,4.845,0,0,0,4.84-4.84V4.84A4.845,4.845,0,0,0,36.642,0ZM40.1,28.346A3.461,3.461,0,0,1,36.642,31.8c-16.8,0-15.905-.022-16.109.041a.665.665,0,0,0-.39.319c-.028.049-.081.186-.081.186-1.341,6.269-6.788,7.565-9.89,7.767,3.457-2.835,2.98-7.5,2.959-7.7,0-.008-.057-.195-.069-.224a1.1,1.1,0,0,0-.156-.207c-.276-.253.1-.184-8.067-.184a3.461,3.461,0,0,1-3.457-3.457V4.84A3.461,3.461,0,0,1,4.84,1.383h31.8A3.461,3.461,0,0,1,40.1,4.84Z" fill="#454545"/>
                    <path id="Shape-3" data-name="Shape" d="M6.383,4H5.691a.691.691,0,0,0,0,1.383h.691A.691.691,0,1,0,6.383,4Z" transform="translate(-1.543 -1.235)" fill="#454545"/>
                    <path id="Shape-4" data-name="Shape" d="M14.84,4.691A.691.691,0,0,0,14.148,4H10.691a.691.691,0,1,0,0,1.383h3.457A.691.691,0,0,0,14.84,4.691Z" transform="translate(-3.086 -1.235)" fill="#454545"/>
                    <path id="Shape-5" data-name="Shape" d="M44.383,42h-.691a.691.691,0,0,0,0,1.383h.691a.691.691,0,1,0,0-1.383Z" transform="translate(-13.272 -12.963)" fill="#454545"/>
                    <path id="Shape-6" data-name="Shape" d="M52.148,42H48.691a.691.691,0,0,0,0,1.383h3.457a.691.691,0,1,0,0-1.383Z" transform="translate(-14.815 -12.963)" fill="#454545"/>
                  </svg>
				</span>
                <span class="services_link services " class="text-capitalize text-center">Other
                  Requests
                </span>
              </a>
              <div id="collapseFive" class="collapse sub_services mob_sub_services" aria-labelledby="headingFive"
                data-parent="#serviceDropdown">
                 <a data-toggle='modal' data-target='#UPemail-login-modal'  class='card-body sub_services_link text-uppercase UPemail'  target='_blank' >Update Email ID (Savings Account)</a><a data-toggle='modal' data-target='#UpAdd-login-modal'  class='card-body sub_services_link text-uppercase UpAdd'  target='_blank' >Update Address (Savings Account)</a><a data-toggle='modal' data-target='#GenDebPin-login-modal'  class='card-body sub_services_link text-uppercase GenDebPin'  target='_blank' >Generate Debit Card PIN </a><a data-toggle='modal' data-target='#GenCrePin-login-modal'  class='card-body sub_services_link text-uppercase GenCrePin'  target='_blank' >Generate Credit Card PIN </a><a data-toggle='modal' data-target='#LoanRepSc-login-modal'  class='card-body sub_services_link text-uppercase LoanRepSc'  target='_blank' >Loan Repayment Schedule </a>
              </div>
            </div>
           
            <div class="items">
              <a href="/WebForms/axis-support/retail_loan_list.aspx" id="headingSeven" class="services_card card d-flex flex-column"
                >
                <span class="insta_service_icons services">
					
					 <svg xmlns="http://www.w3.org/2000/svg" width="32.734" height="42.697" viewBox="0 0 32.734 42.697">
                    <g id="tax" style="isolation: isolate">
                      <path id="Path_5077" data-name="Path 5077" d="M11.577,11.911a2.123,2.123,0,0,1-.274-.537,2.076,2.076,0,0,0-.818.327,3.131,3.131,0,0,1-1.673.535,3.244,3.244,0,0,1-.562-.051,2.988,2.988,0,0,1-1.936-1.219,1.629,1.629,0,0,0-2.37-.418,2.989,2.989,0,0,1-2.237.483l.248-1.4a1.628,1.628,0,0,0,1.277-.314,3.029,3.029,0,0,1,4.172.736,1.63,1.63,0,0,0,1.093.732,1.41,1.41,0,0,0,.621-.015,2.83,2.83,0,0,1-1.139-.6A2.989,2.989,0,0,1,6.911,8.14a1.626,1.626,0,0,0-.581-1.18,1.6,1.6,0,0,0-1.262-.367,2.927,2.927,0,0,1-2.178-.7L3.806,4.8a1.7,1.7,0,0,0,1.263.367A3.03,3.03,0,0,1,8.315,7.894,1.628,1.628,0,0,0,10.156,9.44a3.163,3.163,0,0,1,1.31.175,2.135,2.135,0,0,1,.826-.807L9.111,2.452a.712.712,0,0,1,.64-1.03A1.836,1.836,0,0,0,11.083.867a3.281,3.281,0,0,1,4.446,0,1.88,1.88,0,0,0,1.335.556A1.879,1.879,0,0,0,18.2.867a3.286,3.286,0,0,1,4.449,0,1.843,1.843,0,0,0,1.336.555.712.712,0,0,1,.637,1.03L21.442,8.808a2.112,2.112,0,0,1,.716,3.1A14.956,14.956,0,0,1,33.234,26.329V39.138A3.562,3.562,0,0,1,29.676,42.7H4.058A3.563,3.563,0,0,1,.5,39.138V26.329A14.957,14.957,0,0,1,11.577,11.911ZM21.759,1.978a1.882,1.882,0,0,0-2.671,0,3.285,3.285,0,0,1-4.448,0,1.877,1.877,0,0,0-2.667,0,3.781,3.781,0,0,1-1.155.7l2.931,5.862h6.237l2.93-5.861A3.8,3.8,0,0,1,21.759,1.978Zm-1.334,9.407a.712.712,0,1,0,0-1.423H13.309a.712.712,0,1,0,0,1.423ZM1.923,39.138a2.135,2.135,0,0,0,2.135,2.135H29.676a2.135,2.135,0,0,0,2.135-2.135V26.329A13.535,13.535,0,0,0,18.29,12.808H15.444A13.536,13.536,0,0,0,1.923,26.329Zm0,0" transform="translate(-0.5 0.001)"/>
                      <path id="Path_5078" data-name="Path 5078" d="M140.386,266.875l-8.54-8.539-1.006,1.006,8.539,8.54Zm0,0" transform="translate(-119.245 -235.356)" fill="#97144d"/>
                      <path id="Path_5079" data-name="Path 5079" d="M194.635,320a2.135,2.135,0,1,1-2.135,2.135A2.135,2.135,0,0,1,194.635,320Zm0,2.847a.712.712,0,1,0-.712-.712A.711.711,0,0,0,194.635,322.843Zm0,0" transform="translate(-181.114 -291.532)" fill="#97144d"/>
                      <path id="Path_5080" data-name="Path 5080" d="M130.635,260.266a2.135,2.135,0,1,1,2.135-2.135A2.135,2.135,0,0,1,130.635,260.266Zm0-2.846a.712.712,0,1,0,.712.712A.712.712,0,0,0,130.635,257.419Zm0,0" transform="translate(-111.421 -233.225)" fill="#97144d"/>
                      <path id="Path_5081" data-name="Path 5081" d="M82.463,200a9.963,9.963,0,1,1-9.963,9.963A9.962,9.962,0,0,1,82.463,200Zm0,18.5a8.539,8.539,0,1,0-8.539-8.539A8.539,8.539,0,0,0,82.463,218.5Zm0,0" transform="translate(-66.095 -182.206)" fill="#97144d"/>
                    </g>
                  </svg>     
				</span>
                <span class="services_link" class="text-capitalize text-center">Loan Services
                </span>
              </a>
             
            </div>
			<div class="items">
              <a href="javascript:void(0)" id="headingSeven" class="services_card card d-flex flex-column"
                data-paths="23" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false"
                aria-controls="collapseSeven">
                <span class="insta_service_icons services">
					
					<svg version="1.1" id="Layer_1"  width="50.734" class="my_details_svg" height="42.697" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						 viewBox="0 0 1200 1200" style="enable-background:new 0 0 1200 1200;" xml:space="preserve">
					
					<g>
						<path class="st0" d="M599.9,933c-160.1,0-320.2-0.2-480.3,0.2c-32.9,0.1-53.6-25.4-53.5-53.6c0.5-187.4,0.3-374.8,0.3-562.2
							c0-23.5,14.9-42.9,37.4-48.7c4.5-1.2,9.4-1.7,14-1.7c321.6-0.1,643.2-0.1,964.8,0c29.5,0,51.2,21.8,51.2,51.4
							c0,187-0.3,374,0.3,561c0.1,28.6-20.7,54.1-53.8,54C958,932.7,835.9,933,713.7,933C675.8,933,637.8,933,599.9,933z M600.5,280.8
							c-160.5,0-321,0-481.5,0c-3.5,0-7.2,0-10.6,0.8c-18.5,4.2-28.6,18.6-28.6,40.2c0,185.4,0,370.8,0,556.2c0,2.2,0.1,4.4,0.3,6.5
							c2,21.2,16.4,34.5,37.7,34.5c321.6,0,643.2,0,964.8,0c2.9,0,6-0.1,8.8-0.7c18.5-4.2,28.9-18.5,28.9-40c0-83.8,0-167.6,0-251.4
							c0-101.8-0.2-203.6,0.2-305.4c0.1-28-20.4-41.1-40.2-41C920.3,281,760.4,280.8,600.5,280.8z"/>
						<path class="st0" d="M904.8,787c0,47.8-38.9,86.7-86.6,86.7c-47.5,0-86.6-39.3-86.5-87c0.1-47.5,38.8-86.1,86.4-86.2
							C866.2,700.5,904.8,739,904.8,787z M891.1,787.2c0-40.4-32.8-73.3-73-73.2c-39.9,0.1-72.4,32.9-72.4,73.1
							c0,40.2,32.5,72.7,72.6,72.7C858.5,859.8,891.1,827.3,891.1,787.2z"/>
						<path class="st0" d="M818.1,583.4c62.8,0,125.6,0,188.4,0c1.8,0,4-0.6,5.2,0.2c2.5,1.8,5.7,4,6.3,6.6c0.9,3.9-2.3,6.4-6.3,7
							c-1.5,0.2-3.2,0.1-4.7,0.1c-125.6,0-251.3,0-376.9,0c-8.2,0-11.6-2-11.7-6.7c-0.2-5,3.4-7.2,11.8-7.2
							C692.9,583.4,755.5,583.4,818.1,583.4z"/>
						<path class="st0" d="M818.1,667.5c-62.8,0-125.6,0-188.4,0c-2,0-4.4,0.6-5.8-0.3c-2.2-1.5-5-4-5.1-6.2s2.4-5,4.5-6.6
							c1.5-1.1,4.2-0.7,6.3-0.7c125.8,0,251.6,0,377.5,0c1.6,0,3.2-0.1,4.7,0.1c4,0.6,6.7,3,6.5,7.1c-0.2,4-2.8,6.4-7,6.6
							c-1.6,0.1-3.2,0-4.7,0C943.7,667.5,880.9,667.5,818.1,667.5z"/>
						<path class="st0" d="M817.6,386.4c-62.5,0-124.9,0-187.4,0c-1.8,0-4,0.7-5.2-0.2c-2.5-1.7-6-4.2-6.1-6.4c-0.1-2.3,3.2-5,5.5-6.9
							c1.1-0.9,3.4-0.3,5.2-0.3c125.7,0,251.4,0,377.1,0c0.6,0,1.2,0,1.8,0c6.2,0.1,9.8,2.7,9.8,7c0,4.5-3.3,6.8-9.8,6.8
							C944.9,386.4,881.3,386.4,817.6,386.4z"/>
						<path class="st0" d="M818.2,456.5c-63,0-126.1,0-189.1,0c-1.8,0-4.1,0.6-5.2-0.3c-2.1-1.6-5.1-4.1-5-6.1c0.1-2.4,2.8-5,5-6.7
							c1.3-1,3.8-0.3,5.8-0.3c125.7,0,251.4,0,377.1,0c8.2,0,11.6,2,11.6,6.8s-3.4,6.7-11.6,6.7C943.9,456.6,881,456.6,818.2,456.5z"/>
						<path class="st0" d="M817.6,526.8c-62.5,0-124.9,0-187.4,0c-1.6,0-3.2,0-4.7,0c-4.2-0.1-6.9-2.2-7-6.4c-0.1-4.4,2.4-6.9,7-7.1
							c1.4,0,2.8,0,4.2,0c125.5,0,251,0,376.5,0c1,0,2,0,3,0c6,0.1,9.2,2.5,9.2,6.8s-3.3,6.7-9.3,6.7
							C945.3,526.8,881.4,526.8,817.6,526.8z"/>
						<path class="st0" d="M675.9,737.6c-16.2,0-32.4,0-48.6,0c-6.1,0-9.2-2.4-8.8-6.9c0.4-5.3,4-6.5,8.7-6.5c32.6,0.1,65.1,0.1,97.7,0
							c4.8,0,8.8,0.9,9.1,6.7c0.2,4.6-2.7,6.7-9,6.7C708.6,737.7,692.3,737.6,675.9,737.6z"/>
						<path class="st0" d="M960.1,737.6c-16.2,0-32.4,0-48.6,0c-6,0-9.3-2.5-9-6.8c0.4-5.2,3.9-6.6,8.7-6.6c32.8,0.1,65.6,0.1,98.3,0
							c4.8,0,8.2,1.5,8.7,6.6c0.4,4.3-3.1,6.8-9,6.8C992.9,737.7,976.5,737.6,960.1,737.6z"/>
						<path class="st0" d="M669.8,805.9c-14,0-28,0-42.1,0c-4.9,0-8.8-1.1-9.2-6.8c-0.3-4.6,3.1-7.1,9.5-7.1c27.6,0,55.3,0,82.9,0
							c6.3,0,9.8,2.6,9.6,7c-0.1,4.5-3.5,6.8-9.9,6.8C697,806,683.4,806,669.8,805.9C669.8,806,669.8,805.9,669.8,805.9z"/>
						<path class="st0" d="M967,806c-13.8,0-27.6,0-41.5,0c-4.7,0-8.9-0.8-9.2-6.7c-0.3-4.8,2.9-7.1,9.4-7.2c27.6,0,55.3,0,82.9,0
							c6.3,0,9.8,2.6,9.7,7s-3.5,6.8-9.9,6.9C994.7,806,980.9,806,967,806z"/>
						<path class="st0" d="M812.6,820.4c14.1-23.8,27.7-46.6,41.2-69.5c1-1.7,1.9-3.5,3.1-5c2.5-3.4,6.3-4.5,9.2-1.8
							c1.9,1.8,1.9,5.7,2.5,8.7c0.1,0.7-0.9,1.7-1.4,2.5c-15.9,26.8-31.7,53.6-47.8,80.3c-1.5,2.6-5,5.8-7.3,5.6c-2.7-0.3-6-3.5-7.5-6.2
							c-12.1-23-23.8-46.3-35.6-69.5c-0.2-0.4-0.4-0.7-0.5-1c-2.1-4-2.1-7.9,2.2-10.2c4.6-2.5,7.9-0.2,10.1,4
							c8.6,16.9,17.2,33.7,25.8,50.6C808.4,812.5,810.3,816.1,812.6,820.4z"/>
					</g>
					<path class="st1" d="M449.7,466.3c-1.7,30.4-12.2,63.1-37,90.4c-2.4,2.6-4.9,5.3-7.9,7.1c-3.8,2.3-4.5,5.4-4.4,9.4
						c0.1,3.4,1.1,4.7,4.5,5.5c18.4,4.5,36.7,9.2,55,14c4.2,1.1,8.2,2.9,12.2,4.4c25.5,9.3,37.4,28.2,38.8,54.6c0.2,3.6,0.1,7.1,0.3,10.7
						c0.2,4.9-1.6,8.4-6.9,8.4c-4.9,0-6.5-3.4-6.7-8c-0.3-6.5-0.8-13-1.6-19.5c-2.1-15.2-10.5-26.2-24.7-31.5
						c-14.9-5.6-30.3-9.9-45.7-14.2c-10.4-2.9-21.1-5.1-31.7-7.4c-5-1.1-7.6-3.8-7.4-9c0-0.8,0.1-1.6,0-2.4c-1.3-11.8,1.6-20.2,12.1-28.5
						c19.7-15.6,28.2-38.9,34-62.9c4.5-18.5,4.8-37.2-0.6-55.6c-10.1-34-40.3-57.9-76.1-61c-21.2-1.8-41.4,1.1-60,11.7
						c-32.4,18.4-44.8,47.7-43.1,83.6c1.2,25.3,9.1,49,23.9,69.6c5.6,7.9,13.7,14,20.6,21c0.3,0.3,0.7,0.4,1,0.6c7.2,8,3.1,17.7,3.3,26.6
						c0.1,5.4-5.4,5.8-9.7,6.9c-19.7,4.9-39.4,9.9-59.1,14.9c-1.7,0.4-3.4,1-5.1,1.6c-26.9,9.5-35.3,20.8-36.8,49.3
						c-0.1,1.4-0.1,2.8-0.1,4.1c-0.1,7.1-2.3,10.3-6.9,10.2c-4.6-0.1-6.8-3.3-6.4-10.6c0.3-7.1,0.7-14.2,1.9-21.2
						c3.2-18.5,13.5-32.5,30.9-39c19.1-7.1,39-12.2,58.6-18.1c4.5-1.3,9.3-2,13.8-3.4c1.9-0.6,5-2.2,5-3.4c0.1-3.2,0-7.9-2.1-9.5
						c-25.1-20.4-37.2-48-43.9-78.5c-4.9-22.4-4.5-44.9,4-66.4c13.9-35.1,40.6-55.3,77.1-62c37.9-7,71.9,2.1,99.5,29.9
						C442,408.5,449.6,433.2,449.7,466.3z"/>
					<path class="st1" d="M345,761.1c52.2,0,104.4,0,156.5,0c9.1,0,10.6,1.5,10.6,10.7c0,26.3,0,52.6,0,78.9c0,8-2.1,10.1-10.2,10.1
						c-105,0-209.9,0-314.9,0c-7.5,0-9.6-2-9.6-9.4c0-27.1,0-54.2,0-81.2c0-7.4,1.7-9,9.1-9C239.4,761.1,292.2,761.1,345,761.1z
						 M191.5,774.9c0,24.1,0,47.8,0,71.6c102.4,0,204.3,0,306.4,0c0-24.1,0-47.8,0-71.6C395.4,774.9,293.6,774.9,191.5,774.9z"/>
					<path class="st1" d="M345,703.3c36.3,0,72.7,0,109,0c1.8,0,4.1-0.5,5.2,0.3c2.2,1.8,5.2,4.4,5.2,6.6c0,2.3-3,4.9-5.3,6.6
						c-1.3,1-3.8,0.3-5.8,0.3c-72.3,0-144.6,0-216.9,0c-8.3,0-11.5-1.9-11.7-6.7c-0.2-5.1,3.2-7.2,11.8-7.2
						C272.7,703.3,308.9,703.3,345,703.3z"/>
					</svg>		
				</span>
                <span class="services_link " class="text-capitalize text-center">My Details</span>
              </a>
              <div id="collapseSeven" class="collapse sub_services mob_sub_services" aria-labelledby="headingSeven"
                data-parent="#serviceDropdown">
<a href="https://digiserv.axisbank.com/api/insta/wb/redirect/dIB7%2BCbuPe%2BYkbxHxE7jD%2FptLCrQ4M3n9JmhDiUCNWibpumFN5oYI4lxgr0BLipKk63gDUB7%2BXeCN0nEXx%2FpJqb5AhI5RynZ0Hm%2F8s72wD3AA%2Bbv1r0ahJu%2B9rGt%2FmyrrX3iXPaj8XAyYbN9QsDhMmTG3630xLeaQGRA2Lq1T%2BzTeOORj%2FraH4NgTV4hh6mXq7YSZlXX1zPIFgBEJ%2FhSK%2F2eopw9xpfbpR812KRzhZlT49crkUns9sRdSC04ggI14ihv0fjg7C2OhN%2FoqtbdCSMPD58EGsLBQfNTuamOz6g8ha4Sg5TvEjLu5mJNX84bwKtZlQsY5kvhBPl%2Fwm%2BbfQ%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                 Update Address
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/gDgv8P3u6UHPBawgB6DIvN1O7Q%2FG2RlRc3Of%2Ff700EHyICly%2BJi8s7NntFN%2B%2FkxwHjscsbyIoS%2Bi%2FNJ9oV6SXHq7ftmiCGrxIzbtOxCLekVhj%2Fm2Zcis9uusW209Q7r8zIO9QU%2BHQiCVMhAkuOAFEqQTzH2cOm01nbEMTWUhi5Hn3FARJHlbuQB%2BjYilMwcRXmYzhnCvLvy99kgDif5gLIXFM7kkLAzLM3IgOnYDKNHSvO3evV%2BKBLVWg5aeDwPcrMiSaVtaAIimk1JSVcG1sZxcFh3HHhyBloxhlvOcr8WEFNhnmHOLAqgnQG5kGRUdbTsc%2FrxTgMfP5b7QvhbYkA%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update Name
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/mZ%2B%2FkFIBwQ6m0QyrlvWx0Tvj73BPxQ0CuXDg7Ltg%2F0LYsEpJ3%2FyHybY7dfz1barfj6SHFwZf4YMP%2BwZAVQ0fAGBlA4hAmikTR7dMjhazZGOO%2FbgEaD1WLWrevqpYX8OWG07GVw0OTKNvYFj9SeZw0Xo4DrY7UWJBkVtKJ0h4pFCv2ZQ0zY%2FpoEjc6dYSbeFyXl76N8kWbSkGuiG18fBYMHDTEic2zgoYgGQoK17LxqTv3r84aOZN5z8gmVQFUVtLrRhhuaQ9qsdPxr5rVeTPRSF2VMqhOJZMIDTUX1oPyqEwTpk2Knt961EG76hcifKpvcYYibl7y40juh2eCR6N8w%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update PAN
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/JDDcXMWkY8HJCKGY%2BQxyK%2F8w2yiC8YHI22pq9FcPISk9%2F8IhHjFLDfx0DZr0B%2BcPt07v%2BjY%2BHtkejcV8of%2F4DwEHTIJ0m5VDPyxDdJX4OF%2BWJezhgquBh%2FeUdQ0CE1X%2BjMtPkIvhzG%2FRfN%2FuKRCncg9nXMvvQHFRMKVx3IUr4zldtFOlSvi4qRQVWIxcfCSp4FeRAeDHIYMCBzzJidO77QsrGL3r%2BAxa11SFvBRaYulSoR%2BvguwJjp9Raf77nlvSATIDZFVjQhRY94qBe64pmS14VPll6PPqo%2B8RKY8osBmx0G0%2B95u8%2Brm2fC%2Fg3zflfxXvBsuzT8DmajZku7y3fw%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update Date of Birth
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/h0iN454jPpYkfL6KpMn2tuno3MknKIc3SdwTEnlqX%2BM%2FV%2Bvq%2BGD%2BgsDqQD5wGW1W%2BNcq62nIOu5XvtD%2BP2GgSgKRL5ArFxRzWBfZlxoR%2BrDBdOYNEFCv7lVVkxLAhUvUtfmu7h9IoEJrOpDY9ipHYACnFzxjmGB3Lk6%2FTFaSCnVwEGunY%2FF4dd9JECCXfQeloVBCjlt4j0x2WqA4%2B0qqVeftYZs5Pkn1QYjwFUtlj0Zfd1Mpbf0Cmd%2Bucgj0OnnYJfGRSCljBB9hjxGlvGa7TgKMVXSWpsxYczmKZk4CqSKbXRTHPll8OHHt5JxoiS4hSTlsjMxR1DhmKPsrAyg8qA%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update KYC
                </a>
				<a href="https://digiserv.axisbank.com/api/insta/wb/redirect/IcnhbfjskLB7n84KQ0zh0VTG0FgOhIPTvJxYDnxlE4yQ1Tw9c83zixEdXYkfkYBN5s21n%2FW5UN2sDflIqqggVqu395i6d8wo618SS1F8X0tq8rfSjzn0vikJe7FPal5LZ0dVnH6ROLqgkotBwsqWTDWj2pfhAEZ2xbcFndgteNxr5eJvD3ITcdDcdIy%2FNvJPks%2FpIagOsxDn3n8q45MoiGhw7HIvFZngqnb0QzWXSsQP9A2Pa2pHPiWGzyr5YouHnhlxknu2pUTDT3hMfNd2AA94kpq%2Fz12%2FYyCpWm0u7h3FesGSzXMupdvl6jrhV%2FpwWFJrPubmIMwX7YlIVSiWUA%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update Passport Details
                </a>
				<a href="https://digiserv.axisbank.com/api/insta/wb/redirect/Bumq6C6zL%2Fex9PqMcHkMMFsDCxsKSwQppEZdWNeeJY5ld4EEk89Da48A9V2sf6nAcaNfk%2Fmb9ELuBPF5ZBnFha0Zb2YpM7s02zTWm7FsyyDzEG%2Bvv0DtSjdQeYqXPUKKk3CxJzSNMvvVsZLDIW8dqxvryGnrYAf9v5iu952Z8Jp0FSCqB7j0TanmOCEo0JdMJS%2BIuQ3Wwg2iOY176oH1CokOR7xYba%2FDJNIYapdF8k%2FfGs0oQUAi3wZIl0SSXPe%2FVWpkaQPk4OmwljleFfIOXKZ0e%2BpxWz0F6uyEO%2BdYa%2BLVpBiFlRs85WMnBjW%2FNGxFXd1GHDS1%2FfyMsTFIohtluQ%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                 Update Visa
                </a>
				<a href="https://digiserv.axisbank.com/api/insta/wb/redirect/tTOZrCmVhqO%2BU1Cni%2BpmxX3bLAbr7Uyq3yoNftc1QjdROvIPz3Xn2A%2BIHUPfw2tKLrJri2D1FtqK7%2FOwJ4kQW4XVPrMkIXdza6XD31kfQwi2CM5KZqurYvuky%2B3uD8BXpOaWUNUHXfAvI85BdQTflRgOcF0malXEQnPSLct8xx7GRpgSxEMjRWJkudzhgeGOPh7gbc%2Fxi26E8HFMugJDre6yL5OvQZcyI2rWmIQrWrGGZnKuREg%2FOZ34ICojZzBBR0Om9iVrfP1FDr5s29tanju%2Fy0%2Fz6QqNbqgeWoTXq0vVCg0QZW%2BkZRDyxfHEl%2F%2F50C07mEMFWQ5uzqo3GjY9Bg%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update & Seed Aadhaar
                </a>
				
              </div>
            </div>
			<div class="items">
              <a href="javascript:void(0)" id="headingEight" class="services_card card d-flex flex-column"
                data-paths="23" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false"
                aria-controls="collapseEight">
                <span class="insta_service_icons services">
					<svg version="1.1" id="Layer_1" class="account_details_svg" width="50.734" height="42.697" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						 viewBox="0 0 1200 1200" style="enable-background:new 0 0 1200 1200;" xml:space="preserve">
					
					<g>
						<path class="st0" d="M57.5,933.9c-6.7-25.4,2.4-34.6,26.1-33.3c23.6,1.2,47.3,0.3,67,0.3c-3.8-21.9-10-41.8-10.1-61.6
							c-0.8-164.9-0.5-329.8-0.5-494.7c0-48.1,12.2-59.9,61-59.9c38.5,0,77.1,0,117.9,0c0.6-11.1,1.3-20,1.4-28.9
							c0.5-43.7,9.7-52.8,54.4-52.9c69.1-0.1,138.2-0.1,207.3-0.1c79.2,0,158.4,0,237.7,0c52.8,0,59.3,6.5,60.3,57.9
							c0.1,6.3,0.6,12.7,1.2,23.9c29.5,0,58.5,0,87.5,0c13.8,0,27.6-0.2,41.5,0.1c35.3,0.8,50.2,15.5,50.3,51
							c0.2,120.7,0.1,241.4,0.1,362c0,47.9,1,95.8-0.5,143.7c-0.6,19-6.6,37.9-10.7,59.5c19.1,0,42.5,1.1,65.9-0.3
							c24.6-1.5,34.8,7.2,27.2,33.4C781.3,933.9,420,933.9,57.5,933.9z M857.6,513.1c0-84.7-1-169.4,0.6-254c0.5-27.3-9.2-34.3-35-34.2
							c-149.1,0.9-298.2,0.9-447.3,0.1c-24.3-0.1-34.2,6.1-34.1,32.6c1.1,169.3,1.1,338.7,0.1,508.1c-0.1,26.2,9.1,32.7,33.9,32.5
							c149.1-0.9,298.2-1.2,447.3,0.2c29,0.3,35.6-9.8,35.1-36.7C856.7,678.8,857.6,595.9,857.6,513.1z M193.3,850.5
							c271.8,0,542.1,0,814,0c0-171.4,0-341.9,0-512.4c-43.3,0-84.2,0-127.5,0c0,11.9,0,21.9,0,31.8c0,133.6,0.1,267.2-0.1,400.7
							c0,39.3-9.8,48.8-49.1,48.8c-153.8,0.1-307.7,0.1-461.5,0c-38.2,0-48.8-10.7-48.8-49.4c-0.1-133.6,0-267.2,0-400.7
							c0-10.5,0-21,0-31.8c-45.1,0-85.2,0-127.1,0C193.3,509.1,193.3,678.9,193.3,850.5z"/>
						<path class="st1" d="M1134,948.4c-18.9,33.2-37.3,48.9-71.6,48.9c-307.5,0-615.1,0-922.6,0c-35.2,0-56.5-14.9-74.7-48.9
							C425.7,948.4,772.4,948.4,1134,948.4z"/>
					</g>
					<g>
						<path class="st2" d="M799.5,546.8c0,6.6-5.4,12-12,12h-376c-6.6,0-12-5.4-12-12v-1.5c0-6.6,5.4-12,12-12h376c6.6,0,12,5.4,12,12
							V546.8z"/>
					</g>
					<g>
						<path class="st2" d="M800,598.6c0,6.6-5.4,12-12,12H412c-6.6,0-12-5.4-12-12v-1.5c0-6.6,5.4-12,12-12h376c6.6,0,12,5.4,12,12V598.6
							z"/>
					</g>
					<g>
						<path class="st2" d="M800.5,650.4c0,6.6-5.4,12-12,12h-376c-6.6,0-12-5.4-12-12v-1.5c0-6.6,5.4-12,12-12h376c6.6,0,12,5.4,12,12
							V650.4z"/>
					</g>
					<g>
						<path class="st2" d="M800,702.2c0,6.6-5.4,12-12,12H412c-6.6,0-12-5.4-12-12v-1.5c0-6.6,5.4-12,12-12h376c6.6,0,12,5.4,12,12V702.2
							z"/>
					</g>
					<g>
						<path class="st2" d="M800.5,753c0,6.6-5.4,12-12,12h-376c-6.6,0-12-5.4-12-12v-1.5c0-6.6,5.4-12,12-12h376c6.6,0,12,5.4,12,12V753z
							"/>
					</g>
					<path class="st3" d="M722.5,493.1c-82.6,0-163.3,0-243.8,0c-2.3-34,6.2-44.2,46.2-56.9c38.9-12.3,41.3-13.6,21.3-49.7
						c-15.4-27.8-11.5-55.1-7.5-82.7c4.6-31.2,33.8-50.6,67.1-48.4c31.1,2.1,53.8,25.3,57.3,56.6c3.1,27.6,3,53.3-10.9,79.5
						c-16.5,30.9-13.7,33.2,18.9,43C713.5,447.1,722.8,457.3,722.5,493.1z"/>
					</svg>	
				</span>
                <span class="services_link " class="text-capitalize text-center">Account Details</span>
              </a>
              <div id="collapseEight" class="collapse sub_services mob_sub_services" aria-labelledby="headingEight"
                data-parent="#serviceDropdown">
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/f%2BHv%2FdjWyaj%2BP87%2FcdjyUYFdgYntAnlw6ZgCnHhfL8gpD8zuu1f7xwMV0X5opAHwqxMwba%2FhMXE0nIKtguC02JVZtCSnDXY5jwI3Uat5V3ewZ2OFYu02VFuIODVn9dXcj33V2cfuDvsZlL18gjqmsaVgbT90CKCISHIKsvS7C02kqg9%2FqXtaOq%2FiRMH05PIRpbSvqZ8pb4FeKu1GQGjWV1QGu9zNrz%2BFyAJh0JdrGU6P2qg6oGptoTy5Y7GFgUGuSo2FDktz5e86oOGdAQQ0UCs5W83hX3eQGpcE5JdSNE6aOAhco1G%2FLO2aivMyGus9SBUVwF5vhabdVbmmJjEAVw%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                 Change of Home Branch
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/GX%2Fea%2BpcOpD2%2BXlYNT0xelhmzJKOxtzB35yAgKl1URmD7YtM%2BsL9nEEc2l9C2WOliGep5mYDMD26EXxLE2riRneyauH%2F7%2Bwwo4sBUQ49uAeUPLO3BvOiZ4XidfSD5hfc1OjYdOQl6zWnvgIR9J4NO%2BdioZkuHMWRVQsJepA8BB%2F2Fw3nj%2FSulrSxLs6GegbFak%2BoJXcbA53sHN7iTdi3c7VCjL0FWk2461d6qZRhBRTV%2B78TB7E1b0xeHdc3TvKRYgzybOJ59%2BvDq%2BCXC7U1HsszHW%2F26gIv09woqQaqZjkYfSDpo9k01uMCsGYCIKUaLgItHA4bwCEieBin7ph9uw%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Migrate to Salary Account
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/tdp6lA7Dcf3rTq03cIpbP%2BqLsl9SaJjJeH6hSkB5cEQ3l7C%2Fin4DDGS5wR6TYj5pmmttXtpjkBZ1wrd2FRtNxzmLWXy88kagXJgGq8VC36FJud2PnRgEJH8tVgEVokJ%2B1Z1LL1P%2B0rYb2hVjdRNWgCEuVS%2BDjt2TCKgb2XI8er9r5dYFMTI9xj821eNHS1w69Adjn5B%2BUrhKlcd2Ly8A25QHIK4M0kGmFWl6pLWRSA9NRwMmydAwiTZlirBu5x78bl8GkzdT4BKhKX9cmStRoxM34f3Lk5SsN86Llrvkf%2FtcKhO8idkNLmfGz3LSXhE6v86JQ8j4m7MyCEKocIpEGw%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Family Banking
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/JFWouCJ2QvQNT21OsMod9bItOBdJb3KRayH9GobhGWxxzej5Ow2HfLNqwBAP%2Fys%2FETEaIqdGTem%2FEFaniFkgqMGNj8puwH6TqtPy4CZTbytMycGIkt5Es5sqINAG0OJGrfutRniKMSjH00caTsLub5NvrEhTCnOyI8d7jyDZ5OWIvIKJh4fARBdYnfttwY2UFUVjUa1KjAm5zCk8w0%2BUXij6%2Fe7W8fHM9FuOBHeFNMgG9Pp0czcukca8FysafRcCGuH7LIgYhWa04PBlieNaId8MQ84RBEv1szEKIYZWBBqsG16Y1F6e7lPT79Jy9rWhw4SgL%2F7FktayTdT0XM8geA%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Submit Form 15G/H
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/AbUkpv1ftau9gRl6d8kT9QhgNF53gWAN4xek43Zy7K0vamLmxKuqU6L5ivU%2FQDQqknc8oa2FmVYcL%2BQvM8exdXmqonycJvLtt4Ojvi81ABNTtyhB5arEm4fzSqHZ81yUOXouUI57o%2FiQNmaPPQ9ovbgMFM%2FD7fcLyKshuikKqsryvPHfVkpHatwuimZSCs%2BXUFY35zWzWxjF0wl8eBhnn26vQWvsAE%2FfyML45IjpTcuXFuG%2F7ZJzdu01aBPJIw3T5kob2yWZvAmeizo%2BzzFudJgIbYEuHEei70ASAOGpkzXwTCCHWqA8mCM0zz4HiJE98XgiJdUalV94sn4ncbmxFg%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                 Request Chequebook
                </a>
				
                 <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/dCi5DAMPJ46Ygt87HG%2Brk9xvlJtCqa3rukveb8uzhDT00lK%2FeJ4mCCPbO6Q3EdzmEokt4xWlJdhfB%2B1HQUdhQZrxRAD8j4%2FfzggrdNh006u0PrVVFO%2FuxuKHy7pOaNxGQkjlIZ50RwyQ17sPI%2FyByLOY7AZCUfdv03mAIK38ckIN2ydbE%2Bfysa15gU5KhqzXeUgi0Pc82bbqpTotDeWNItlJLlf%2BfvDv70UvJ0iJJs2pCy60byRm%2Bff2d3ZJO2n2VclQJzGS2M3txMwNLWGpSMP3rXrCD67Wa0CucBAPfhV4NZcCvnrucUFQDbDqSM6Hr3YOHfX4sYVS2Ytrxhgd5A%3D%3D" target="_blank" class="card-body sub_services_link text-capitalize">
                 DD request
                </a>
              </div>
            </div>
          </div>
		  
          <div class="web_sub_services">
            <div id="collapseOne" class="sub_services collapse" aria-labelledby="headingOne"
              data-parent="#serviceDropdown">
              <a href="/WebForms/axis-support/Block-dccard.aspx" class="card-body sub_services_link text-uppercase">
                block debit card
              </a>
              <a href="/WebForms/axis-support/Block-cccard.aspx" class="card-body sub_services_link text-uppercase">
                block credit card
              </a>
			  <!--End of copy-->
			  <a target="_blank" href="https://digiserv.axisbank.com/api/insta/wb/redirect/ZWufW9utwnnV7LzD7%2FOcIABs6Uyes7YwAY%2FxbsUFxTSoUjrV3cAaFyOSFIaFKiGjIoWghvqxuldx4cmn1eSkLPRmY1E58rsWPyGM%2FdJq%2FeUZemfBO%2BUuaJf62OfkLuAWhBU2iEQB8trSuj08ai2Ik42MsZNB1I1yNsfb0ryHJjZeBLnNNSMNsxESIjr0UN02tEyTVNO0MUEuhQxO5CSfGGHOVWw8VAbYkV%2Bkd1bn0PfqZrx9a5wNBLRPb%2BsK3y2DhsDJR5K%2FeIOWbbCYcSE3gwZZ2jOy4HnAsie8qrW%2B%2FNoe6UDCxoz6ZdXSljQ7%2FWj6Kh%2BIggEdC752WHQ%2F%2FjWVsw%3D%3D" class="card-body sub_services_link text-capitalize">
                  UPGRADE DEBIT CARD
              </a>
            </div>
           <!-- <div id="collapseTwo" class="sub_services collapse" aria-labelledby="headingTwo"
              data-parent="#serviceDropdown">
              <a href="report-fraud.aspx" class="card-body sub_services_link text-uppercase">
                report a fraud
              </a>
              <a href="report-fraud-dispute.aspx" class="card-body sub_services_link text-uppercase">
                report a dispute
              </a>
            </div>-->
           
            <div id="collapseFour" class="sub_services collapse" aria-labelledby="headingFour"
              data-parent="#serviceDropdown">
              <a href="/WebForms/axis-support/E-statement.aspx" class="card-body sub_services_link text-uppercase">
                savings & agri account statement
              </a>
              <a href="/WebForms/axis-support/CC-statement.aspx" class="card-body sub_services_link text-uppercase">
                credit card statement
              </a>
			<!--Prashant 13-09-2022 <a href="/WebForms/axis-support/LoanAccountStatement.aspx" class="card-body sub_services_link text-uppercase">
                Loan Account Statement
              </a>-->
             
            </div>
            <div id="collapseFive" class="sub_services collapse" aria-labelledby="headingFive"
              data-parent="#serviceDropdown">

			   <a data-toggle='modal' data-target='#UPemail-login-modal'  class='card-body sub_services_link text-uppercase UPemail'  target='_blank' >Update Email ID (Savings Account)</a><a data-toggle='modal' data-target='#UpAdd-login-modal'  class='card-body sub_services_link text-uppercase UpAdd'  target='_blank' >Update Address (Savings Account)</a><a data-toggle='modal' data-target='#GenDebPin-login-modal'  class='card-body sub_services_link text-uppercase GenDebPin'  target='_blank' >Generate Debit Card PIN </a><a data-toggle='modal' data-target='#GenCrePin-login-modal'  class='card-body sub_services_link text-uppercase GenCrePin'  target='_blank' >Generate Credit Card PIN </a><a data-toggle='modal' data-target='#LoanRepSc-login-modal'  class='card-body sub_services_link text-uppercase LoanRepSc'  target='_blank' >Loan Repayment Schedule </a>
            </div>
			<div id="collapseSeven" class="sub_services collapse" aria-labelledby="headingSeven"
              data-parent="#serviceDropdown">
              <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/dIB7%2BCbuPe%2BYkbxHxE7jD%2FptLCrQ4M3n9JmhDiUCNWibpumFN5oYI4lxgr0BLipKk63gDUB7%2BXeCN0nEXx%2FpJqb5AhI5RynZ0Hm%2F8s72wD3AA%2Bbv1r0ahJu%2B9rGt%2FmyrrX3iXPaj8XAyYbN9QsDhMmTG3630xLeaQGRA2Lq1T%2BzTeOORj%2FraH4NgTV4hh6mXq7YSZlXX1zPIFgBEJ%2FhSK%2F2eopw9xpfbpR812KRzhZlT49crkUns9sRdSC04ggI14ihv0fjg7C2OhN%2FoqtbdCSMPD58EGsLBQfNTuamOz6g8ha4Sg5TvEjLu5mJNX84bwKtZlQsY5kvhBPl%2Fwm%2BbfQ%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                 Update Address
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/gDgv8P3u6UHPBawgB6DIvN1O7Q%2FG2RlRc3Of%2Ff700EHyICly%2BJi8s7NntFN%2B%2FkxwHjscsbyIoS%2Bi%2FNJ9oV6SXHq7ftmiCGrxIzbtOxCLekVhj%2Fm2Zcis9uusW209Q7r8zIO9QU%2BHQiCVMhAkuOAFEqQTzH2cOm01nbEMTWUhi5Hn3FARJHlbuQB%2BjYilMwcRXmYzhnCvLvy99kgDif5gLIXFM7kkLAzLM3IgOnYDKNHSvO3evV%2BKBLVWg5aeDwPcrMiSaVtaAIimk1JSVcG1sZxcFh3HHhyBloxhlvOcr8WEFNhnmHOLAqgnQG5kGRUdbTsc%2FrxTgMfP5b7QvhbYkA%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update Name
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/mZ%2B%2FkFIBwQ6m0QyrlvWx0Tvj73BPxQ0CuXDg7Ltg%2F0LYsEpJ3%2FyHybY7dfz1barfj6SHFwZf4YMP%2BwZAVQ0fAGBlA4hAmikTR7dMjhazZGOO%2FbgEaD1WLWrevqpYX8OWG07GVw0OTKNvYFj9SeZw0Xo4DrY7UWJBkVtKJ0h4pFCv2ZQ0zY%2FpoEjc6dYSbeFyXl76N8kWbSkGuiG18fBYMHDTEic2zgoYgGQoK17LxqTv3r84aOZN5z8gmVQFUVtLrRhhuaQ9qsdPxr5rVeTPRSF2VMqhOJZMIDTUX1oPyqEwTpk2Knt961EG76hcifKpvcYYibl7y40juh2eCR6N8w%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update PAN
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/JDDcXMWkY8HJCKGY%2BQxyK%2F8w2yiC8YHI22pq9FcPISk9%2F8IhHjFLDfx0DZr0B%2BcPt07v%2BjY%2BHtkejcV8of%2F4DwEHTIJ0m5VDPyxDdJX4OF%2BWJezhgquBh%2FeUdQ0CE1X%2BjMtPkIvhzG%2FRfN%2FuKRCncg9nXMvvQHFRMKVx3IUr4zldtFOlSvi4qRQVWIxcfCSp4FeRAeDHIYMCBzzJidO77QsrGL3r%2BAxa11SFvBRaYulSoR%2BvguwJjp9Raf77nlvSATIDZFVjQhRY94qBe64pmS14VPll6PPqo%2B8RKY8osBmx0G0%2B95u8%2Brm2fC%2Fg3zflfxXvBsuzT8DmajZku7y3fw%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update Date of Birth
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/h0iN454jPpYkfL6KpMn2tuno3MknKIc3SdwTEnlqX%2BM%2FV%2Bvq%2BGD%2BgsDqQD5wGW1W%2BNcq62nIOu5XvtD%2BP2GgSgKRL5ArFxRzWBfZlxoR%2BrDBdOYNEFCv7lVVkxLAhUvUtfmu7h9IoEJrOpDY9ipHYACnFzxjmGB3Lk6%2FTFaSCnVwEGunY%2FF4dd9JECCXfQeloVBCjlt4j0x2WqA4%2B0qqVeftYZs5Pkn1QYjwFUtlj0Zfd1Mpbf0Cmd%2Bucgj0OnnYJfGRSCljBB9hjxGlvGa7TgKMVXSWpsxYczmKZk4CqSKbXRTHPll8OHHt5JxoiS4hSTlsjMxR1DhmKPsrAyg8qA%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update KYC
                </a>
				<a href="https://digiserv.axisbank.com/api/insta/wb/redirect/IcnhbfjskLB7n84KQ0zh0VTG0FgOhIPTvJxYDnxlE4yQ1Tw9c83zixEdXYkfkYBN5s21n%2FW5UN2sDflIqqggVqu395i6d8wo618SS1F8X0tq8rfSjzn0vikJe7FPal5LZ0dVnH6ROLqgkotBwsqWTDWj2pfhAEZ2xbcFndgteNxr5eJvD3ITcdDcdIy%2FNvJPks%2FpIagOsxDn3n8q45MoiGhw7HIvFZngqnb0QzWXSsQP9A2Pa2pHPiWGzyr5YouHnhlxknu2pUTDT3hMfNd2AA94kpq%2Fz12%2FYyCpWm0u7h3FesGSzXMupdvl6jrhV%2FpwWFJrPubmIMwX7YlIVSiWUA%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update Passport Details
                </a>
				<a href="https://digiserv.axisbank.com/api/insta/wb/redirect/Bumq6C6zL%2Fex9PqMcHkMMFsDCxsKSwQppEZdWNeeJY5ld4EEk89Da48A9V2sf6nAcaNfk%2Fmb9ELuBPF5ZBnFha0Zb2YpM7s02zTWm7FsyyDzEG%2Bvv0DtSjdQeYqXPUKKk3CxJzSNMvvVsZLDIW8dqxvryGnrYAf9v5iu952Z8Jp0FSCqB7j0TanmOCEo0JdMJS%2BIuQ3Wwg2iOY176oH1CokOR7xYba%2FDJNIYapdF8k%2FfGs0oQUAi3wZIl0SSXPe%2FVWpkaQPk4OmwljleFfIOXKZ0e%2BpxWz0F6uyEO%2BdYa%2BLVpBiFlRs85WMnBjW%2FNGxFXd1GHDS1%2FfyMsTFIohtluQ%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                 Update Visa
                </a>
				<a href="https://digiserv.axisbank.com/api/insta/wb/redirect/tTOZrCmVhqO%2BU1Cni%2BpmxX3bLAbr7Uyq3yoNftc1QjdROvIPz3Xn2A%2BIHUPfw2tKLrJri2D1FtqK7%2FOwJ4kQW4XVPrMkIXdza6XD31kfQwi2CM5KZqurYvuky%2B3uD8BXpOaWUNUHXfAvI85BdQTflRgOcF0malXEQnPSLct8xx7GRpgSxEMjRWJkudzhgeGOPh7gbc%2Fxi26E8HFMugJDre6yL5OvQZcyI2rWmIQrWrGGZnKuREg%2FOZ34ICojZzBBR0Om9iVrfP1FDr5s29tanju%2Fy0%2Fz6QqNbqgeWoTXq0vVCg0QZW%2BkZRDyxfHEl%2F%2F50C07mEMFWQ5uzqo3GjY9Bg%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Update & Seed Aadhaar
                </a>
            </div>
			<div id="collapseEight" class="sub_services collapse" aria-labelledby="headingEight"
              data-parent="#serviceDropdown">
              <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/f%2BHv%2FdjWyaj%2BP87%2FcdjyUYFdgYntAnlw6ZgCnHhfL8gpD8zuu1f7xwMV0X5opAHwqxMwba%2FhMXE0nIKtguC02JVZtCSnDXY5jwI3Uat5V3ewZ2OFYu02VFuIODVn9dXcj33V2cfuDvsZlL18gjqmsaVgbT90CKCISHIKsvS7C02kqg9%2FqXtaOq%2FiRMH05PIRpbSvqZ8pb4FeKu1GQGjWV1QGu9zNrz%2BFyAJh0JdrGU6P2qg6oGptoTy5Y7GFgUGuSo2FDktz5e86oOGdAQQ0UCs5W83hX3eQGpcE5JdSNE6aOAhco1G%2FLO2aivMyGus9SBUVwF5vhabdVbmmJjEAVw%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                 Change of Home Branch
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/GX%2Fea%2BpcOpD2%2BXlYNT0xelhmzJKOxtzB35yAgKl1URmD7YtM%2BsL9nEEc2l9C2WOliGep5mYDMD26EXxLE2riRneyauH%2F7%2Bwwo4sBUQ49uAeUPLO3BvOiZ4XidfSD5hfc1OjYdOQl6zWnvgIR9J4NO%2BdioZkuHMWRVQsJepA8BB%2F2Fw3nj%2FSulrSxLs6GegbFak%2BoJXcbA53sHN7iTdi3c7VCjL0FWk2461d6qZRhBRTV%2B78TB7E1b0xeHdc3TvKRYgzybOJ59%2BvDq%2BCXC7U1HsszHW%2F26gIv09woqQaqZjkYfSDpo9k01uMCsGYCIKUaLgItHA4bwCEieBin7ph9uw%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Migrate to Salary Account
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/tdp6lA7Dcf3rTq03cIpbP%2BqLsl9SaJjJeH6hSkB5cEQ3l7C%2Fin4DDGS5wR6TYj5pmmttXtpjkBZ1wrd2FRtNxzmLWXy88kagXJgGq8VC36FJud2PnRgEJH8tVgEVokJ%2B1Z1LL1P%2B0rYb2hVjdRNWgCEuVS%2BDjt2TCKgb2XI8er9r5dYFMTI9xj821eNHS1w69Adjn5B%2BUrhKlcd2Ly8A25QHIK4M0kGmFWl6pLWRSA9NRwMmydAwiTZlirBu5x78bl8GkzdT4BKhKX9cmStRoxM34f3Lk5SsN86Llrvkf%2FtcKhO8idkNLmfGz3LSXhE6v86JQ8j4m7MyCEKocIpEGw%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Family Banking
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/JFWouCJ2QvQNT21OsMod9bItOBdJb3KRayH9GobhGWxxzej5Ow2HfLNqwBAP%2Fys%2FETEaIqdGTem%2FEFaniFkgqMGNj8puwH6TqtPy4CZTbytMycGIkt5Es5sqINAG0OJGrfutRniKMSjH00caTsLub5NvrEhTCnOyI8d7jyDZ5OWIvIKJh4fARBdYnfttwY2UFUVjUa1KjAm5zCk8w0%2BUXij6%2Fe7W8fHM9FuOBHeFNMgG9Pp0czcukca8FysafRcCGuH7LIgYhWa04PBlieNaId8MQ84RBEv1szEKIYZWBBqsG16Y1F6e7lPT79Jy9rWhw4SgL%2F7FktayTdT0XM8geA%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                  Submit Form 15G/H
                </a>
                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/AbUkpv1ftau9gRl6d8kT9QhgNF53gWAN4xek43Zy7K0vamLmxKuqU6L5ivU%2FQDQqknc8oa2FmVYcL%2BQvM8exdXmqonycJvLtt4Ojvi81ABNTtyhB5arEm4fzSqHZ81yUOXouUI57o%2FiQNmaPPQ9ovbgMFM%2FD7fcLyKshuikKqsryvPHfVkpHatwuimZSCs%2BXUFY35zWzWxjF0wl8eBhnn26vQWvsAE%2FfyML45IjpTcuXFuG%2F7ZJzdu01aBPJIw3T5kob2yWZvAmeizo%2BzzFudJgIbYEuHEei70ASAOGpkzXwTCCHWqA8mCM0zz4HiJE98XgiJdUalV94sn4ncbmxFg%3D%3D" target="_blank" class="card-body sub_services_link text-uppercase">
                 Request Chequebook
                </a>

                <a href="https://digiserv.axisbank.com/api/insta/wb/redirect/dCi5DAMPJ46Ygt87HG%2Brk9xvlJtCqa3rukveb8uzhDT00lK%2FeJ4mCCPbO6Q3EdzmEokt4xWlJdhfB%2B1HQUdhQZrxRAD8j4%2FfzggrdNh006u0PrVVFO%2FuxuKHy7pOaNxGQkjlIZ50RwyQ17sPI%2FyByLOY7AZCUfdv03mAIK38ckIN2ydbE%2Bfysa15gU5KhqzXeUgi0Pc82bbqpTotDeWNItlJLlf%2BfvDv70UvJ0iJJs2pCy60byRm%2Bff2d3ZJO2n2VclQJzGS2M3txMwNLWGpSMP3rXrCD67Wa0CucBAPfhV4NZcCvnrucUFQDbDqSM6Hr3YOHfX4sYVS2Ytrxhgd5A%3D%3D" target="_blank" class="card-body sub_services_link text-capitalize">
                 DD request
                </a>
            </div>
           
          </div>
        </div>
      </li>
      <li class="dropdown_wrap">
         
		   <a href="javascript:void(0)" onclick="getGTM();" class="dropdownQueryButton text-capitalize mob"> FAQs
          </a>
        <div id="queryDropdown"  class="queryDropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div class="close_service" onclick="hidefaqPanel()">
            <span class="icon-close"></span>
          </div>
          <div class="query_section">
            <span class="query_helper">I have a query related to</span>
            <span class="sub_dropdown_menu notruncate">
			 <select name="ctl00$product" id="product" title="Start selection here" class="select2_dropdown query js-states form-control Query_Product" onchange="GetsubProduct();">
	<option value="0">Start selection here</option>
	<option value="24">Report A Fraud Or Dispute</option>
	<option value="1">Bank Accounts</option>
	<option value="23">Cards</option>
	<option value="2">Loans</option>
	<option value="37">Digital Banking</option>
	<option value="34">ATM And Cash Deposit Machines</option>
	<option value="14">EDGE REWARD Program</option>
	<option value="33">Deposits</option>
	<option value="8">Business Banking Services</option>
	<option value="32">Demat Accounts</option>
	<option value="18">Remittances</option>
	<option value="38">Insurance</option>
	<option value="40">Unique Customer Identification Code</option>

</select>
                                     
            
            </span>
            <span class="query_step notruncate" id="query2_wrap">
              <span class="query_helper">specific to</span>
              <span class="sub_dropdown_menu">
				 <select name="ctl00$sub_product" id="sub_product" title="Continue Selecting" class="select2_dropdown query js-states form-control Query_SubProduct" onchange="GetIssue();">
	<option selected="selected" value="0">Continue Selecting</option>

</select>
              
              </span>
            </span>
            <span class="query_step notruncate" id="query3_wrap">
              <span class="query_helper">for which I have an issue</span>
              <span class="sub_dropdown_menu">
			    <select name="ctl00$ddlissue" id="ddlissue" title="Choose your Query" class="select2_dropdown query js-states form-control Query_Issue" onchange="GetsubIssue();">
	<option selected="selected" value="0">Choose your Query</option>

</select>
                                     
            
              </span>
            </span>
            <span class="query_step notruncate" id="query4_wrap">
              <span class="query_helper">with sub issue</span>
              <span class="sub_dropdown_menu">
			   <select name="ctl00$ddlsubissue" id="ddlsubissue" title="Select Specifics" class="select2_dropdown query js-states form-control Query_SubIssue">
	<option selected="selected" value="0">Select Specifics</option>

</select>
                                     
             
              </span>
            </span>
          </div>
          <div class="submit_query">
           
		   <span id="lblmsg" class="error-message" style="padding-top:20px;display:block"></span>
			<a onclick="return redirection();" id="btn_query" tabindex="26" class="submit_query_btn" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$btn_query&quot;, &quot;&quot;, true, &quot;r&quot;, &quot;&quot;, false, true))">Submit</a>
          </div>
		  
        </div>
      </li>
		 <li class="dropdown_wrap">
		<!--  <a onclick="createPopupWin('https://application.axisbank.co.in/webforms/Inoperative/unclaim_search.aspx','abc',500,430)" href="#"><u style="color:blue">CLICK HERE</u></a> -->
		
		 <!-- <a class="nav-link mob" onclick="createPopupWin('https://mobiapp.axisbank.co.in/SRStatus/AxisSRTracker/GetSRStatus','bjhb',1093,600)" href="#" >Service Request Status</a> -->
		  <a class="nav-link" href="https://mobiapp.axisbank.co.in/AxisPreLogin/home" target="_blank">Service Request Status</a>
	 <!--  <a class="nav-link " href="https://ecrmuat.axisb.com:5113/AxisSRTracker/GetSRStatus">Track SR</a> -->
	</li>
	  <!-- <li class="nav-item icon_spacing">
        <a class="nav-link search_icon mob" href="search-page.aspx"><span class="icon-search"></span></a>
      </li>-->
    </ul>
    <div id="DivCount" class="queries-resolved d-flex flex-row justify-content-center align-items-end" style="display: none !important;">
      <p class="text-capitalize pr-3 mb-0" style="background: linear-gradient(to right,#B1B1B1,#FFFFFF );">queries<span class="resolved d-block">resolved*</span></p>
      <!--<span class="count pr-4">345459</span>-->
	  <span class="count pr-3 mb-0"><span id="QueryCount" style="font-size:18px;font-family: lato-regular;
}">2,129,595</span></span>
    </div>
  </div>
  <!-- navbar part ends here -->
  
<!-- track modal -->
  <div class="modal_container track_modal_open">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      
      hello
    </div>
  </div>
  
     <div class='credit_modal_2' id='UPemail-login-modal'><div class='credit_modal_content'> <div class='internet_banking'><p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your email ID:
            <span class="d-block follow_light">
              Click on Services >> Insta Services >> Enter Code received through SMS >> Select Contact >> Click on Update Email ID >> Enter Email ID >> Update
            </span>
          </span>
        </div></div><div class='confirmation_buttons'><h3 class='confirm_text UPemail'>Do you want to continue?</h3><div class='btn_option'><button type='button' onClick=window.open('https://retail.axisbank.co.in'); class='confirm_btn internet_banking_btn_open_email text-capitalize' data-dismiss='modal' >Yes</button><button type='button' class='confirm_btn internet_banking_btn_close text-capitalize' data-dismiss='modal'>No</button></div></div></div></div></ br> <div class='credit_modal_2' id='UpAdd-login-modal'><div class='credit_modal_content'> <div class='internet_banking'> <p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your address:
            <span class="d-block follow_light">
              Click on Services >> Insta Services >> Enter Code received through SMS >> Select Contact >> Click on Update Address >> Enter Address >> Update
            </span>
          </span>
        </div></div><div class='confirmation_buttons'><h3 class='confirm_text UpAdd'>Do you want to continue?</h3><div class='btn_option'><button type='button' onClick=window.open('https://retail.axisbank.co.in'); class='confirm_btn internet_banking_btn_open_email text-capitalize' data-dismiss='modal' >Yes</button><button type='button' class='confirm_btn internet_banking_btn_close text-capitalize' data-dismiss='modal'>No</button></div></div></div></div></ br> <div class='credit_modal_2' id='GenDebPin-login-modal'><div class='credit_modal_content'> <div class='internet_banking'><p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your Debit Card PIN:
            <span class="d-block follow_light">
              Click on Accounts >> My Debit Cards >> Click on More Services >> Select Set Debit Card PIN >> Enter New PIN & Expiry Date >> Enter Netsecure Code
            </span>
          </span>
        </div></div><div class='confirmation_buttons'><h3 class='confirm_text GenDebPin'>Do you want to continue?</h3><div class='btn_option'><button type='button' onClick=window.open('https://retail.axisbank.co.in'); class='confirm_btn internet_banking_btn_open_email text-capitalize' data-dismiss='modal' >Yes</button><button type='button' class='confirm_btn internet_banking_btn_close text-capitalize' data-dismiss='modal'>No</button></div></div></div></div></ br> <div class='credit_modal_2' id='GenCrePin-login-modal'><div class='credit_modal_content'> <div class='internet_banking'><p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your Credit Card PIN:
            <span class="d-block follow_light">
              Click on 3 bar menu >> Services & Support >>  Credit Cards : Set / Reset PIN >> Send OTP >> Enter OTP >> Enter New PIN >> Confirm New PIN >> Click Set PIN >> Enter mPIN >> PIN will be changed
            </span>
          </span>
        </div></div><div class='confirmation_buttons'><h3 class='confirm_text GenCrePin'>Do you want to continue?</h3><div class='btn_option'><button type='button' onClick=window.open('https://retail.axisbank.co.in'); class='confirm_btn internet_banking_btn_open_email text-capitalize' data-dismiss='modal' >Yes</button><button type='button' class='confirm_btn internet_banking_btn_close text-capitalize' data-dismiss='modal'>No</button></div></div></div></div></ br> <div class='credit_modal_2' id='LoanRepSc-login-modal'><div class='credit_modal_content'> <div class='internet_banking'><p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your Repayment Schedule:
            <span class="d-block follow_light">
              Home Page >> Click on Accounts >> Click on Loans >> Select Loan Account No.>> Select ‘View Repayment Schedule’
            </span>
          </span>
        </div></div><div class='confirmation_buttons'><h3 class='confirm_text LoanRepSc'>Do you want to continue?</h3><div class='btn_option'><button type='button' onClick=window.open('https://retail.axisbank.co.in'); class='confirm_btn internet_banking_btn_open_email text-capitalize' data-dismiss='modal' >Yes</button><button type='button' class='confirm_btn internet_banking_btn_close text-capitalize' data-dismiss='modal'>No</button></div></div></div></div></ br>
  
        
    
	
 <script src="/WebForms/axis-support/assetsNew/css/jquery.js"></script>
 <script src="/WebForms/axis-support/assetsNew/js/chatboat.js" type="text/javascript"></script>

  <link rel="stylesheet" href="/WebForms/axis-support/assets_rd/css/axisbank-style.css">
  <link rel="stylesheet" href="./assets/ico/icomoon/style.css">
  
  <link href="/WebForms/axis-support/assets_rd/css/main_prod.css" rel="stylesheet" />
<style>

#firstfour
{
	display:block;
}
#nextbal
{
	display:block;
}
#bottomviewall
{
	display:none;
}
#bottomviewall
  {
	display:none;
  }
@media (max-width: 1000px) {
  #firstfour {
    display:block;
  }
  #nextbal
  {
	display:none;
  }
  #bottomviewall
  {
	display:block;
	text-align: center;
  }
  
}

</style>
<script type="text/javascript">

function showimportant(id)
{
$('#btntoggle').text($('#btntoggle').text() =="View All" ? "View Less" : "View All");
//$('#nextbal').show();
$('#nextbal').toggle(1000);
//$('#btntoggle').text("less");

}

$("#divCounts").text("234234");

$(document).ready(function () {

	$(".reachus-anchor").click(function() {$('html,body').animate({ scrollTop: $("#scroll-to").offset().top - 100 }, 'slow'); });
	
});

$(document).ready(function () {

	$('.settlement_links').click(function(){
	$(".settlementinfo_links").show();
		//document.getElementById('productpopupBody').style.display='block';
	});
	
});
$(document).ready(function(){
//
const params=new URLSearchParams(window.location.search);
var chatagentyes=params.get('chatagent')
var geturl=params;
if(chatagentyes==='yes')
{
$('#chatagentpopup').show();
console.log("geturl:" + params);
}
else
{
$('#chatagentpopup').hide();
console.log("no geturl");
}




});


function touchpointClick()
{
$("#popup_touchpoint").modal('show');
}

function touchpointClose()
{
$("#popup_touchpoint").modal('hide');
}


$(document).ready(function(){
 
	//alert("1");
 
});

</script>

<div id="ContentPlaceHolder1_product1_updatepanel2">
	

  <!--main section start rs-->
  <main class="mb-5" id="main_body">
    <section class="updateinfo-sec row m-0">
        <div class="col-md-9 p-0 position-relative updateinfo-secCol">
		
            <div class="heading-content">
                <h2 class="heading text-capitalize mb-2">Axis Bank Support <span>DilSe Open</span></h2>
                <!--<p class="comm-para mb-0 ">For Quick Assistance, start typing your query here OR select from the list of Insta Services</p>-->
                <div id="chatbotUI"></div> 
                <div class="searchbar d-flex align-items-center" tabindex="1" id="searchbarfix">
                    <div class="profile-wrapper mr-3">
                        <img src="/WebForms/axis-support/assets_rd/images/Image-Option-New.png" alt="pic"/>
                    </div>
                    <p class="input-data mb-0 searchbar-close" id="searchbar">How may I help you?</p>
                    <button type="button" class="inputfield-btn"> 
					<span class="searchVoice icon-mice-icon" id="searchVoice"></span> 
                    </button>
                    <!-- <button type="button" class="inputfield-btn"><span class="icon-send-icon"></span></button> -->

                    <!-- Search bar popup modal -->
                    <div class="searchbar-modal" id="searchbar-popup">
                      <div class="searchbar-modal__inputfield">
                        <!--<input type="text" id="result" class="result" name="result" value="" placeholder="Get your answers easily" autocomplete="off"/>-->
						<div class="d-flex align-items-center w-100">
						<input name="ctl00$ContentPlaceHolder1$product1$result" type="text" id="result" class="result" placeholder="Get your answers easily" />
							 <div class="d-flex align-items-center">
							  <!--<button type="button" class="inputfield-btn"><span class="searchVoice icon-mice-icon" id="searchVoice"></span></button>-->
							  <input type="image" name="ctl00$ContentPlaceHolder1$product1$btn_search" id="btn_search" class="icon-search search_icon" src="images/search.svg" onclick="getGTMSearch1();" style="margin-left:15px" />							  
							  <button type="button" class="inputfield-btn"><span class="icon-close" id="searchclose-btn"></span></button>
							</div> 
						</div>
						<div id="listPlacement" class="search_val_item" style="height:100px; overflow-y:scroll;padding-left:20px; z-index:999;background-color:white" ></div>
                                    
								
						<div class="icon-input">
						  <!-- <span type="button" id="searchVoice" class="searchVoice icon-microphone search_icon"></span> -->
						  <!-- <span type="button" id="searchClear" class="searchClear icon-close search_close_icon"></span>               -->
						 
						 
						</div>
                       <!-- <div class="d-flex align-items-center">
                          <button class="inputfield-btn"><span class="searchVoice icon-mice-icon" id="searchVoice"></span></button>
                          <button class="inputfield-btn"><span class="icon-close" id="searchclose-btn"></span></button>
                        </div>-->
                      </div>
                      <div class="searchbar-modal__content">
                        <div class="row m-0">
                          <div class="col-lg-9 faq-tab__wrapper">
                            <!-- FQA tab -->
                            <ul class="nav faq-tab mb-3" id="faq-tab" role="tablist">
                              <!--<li class="nav-item">
                                <a class="nav-link active" id="popular-tab" data-toggle="pill" href="#pills-popular" role="tab" aria-controls="pills-popular" aria-selected="true">
                                  Popular
                                  <span class="count">5</span>
                                </a>
                              </li>-->
                              <li class="nav-item">
                                <a class="nav-link" id="recommended-tab" data-toggle="pill" href="#pills-recommended" role="tab" aria-controls="pills-recommended" aria-selected="false">
                                  Recommended
                                  <span class="count">5</span>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" id="videos-tab" data-toggle="pill" href="#pills-videos" role="tab" aria-controls="pills-videos" aria-selected="false">
                                  Videos
                                  <span class="count">4</span>
                                </a>
                              </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                              <!--<div class="popular-tab__pane fade show active" id="pills-popular" role="tabpanel" aria-labelledby="popular-tab">
                                <ul class="popular-tab__pane-list">
                                  <li><a href="#">Static link of FAQs</a></li>
                                  <li><a href="#">Static link of FAQs</a></li>
                                  <li><a href="#">Static link of FAQs</a></li>
                                  <li><a href="#">Static link of FAQs</a></li>
                                </ul>
                                
                              </div>-->
                              <div class="tab-pane fade show active" id="pills-recommended" role="tabpanel" aria-labelledby="recommended-tab">
                                <ul class="popular-tab__pane-list">
                                  <li><a href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/Cards-Credit-statement-2.aspx">Credit Card Statement</a></li>
                                  <li><a href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/sub-issues/loans-home-stmtintcertrps-1.aspx">Home Loan Statement</a></li>
                                  <li><a href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/sub-issues/sub-issues/loans-home-stmtintcertrps-2.aspx">Repayment Schedule</a></li>
                                  <li><a href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/sub-issues/sub-issues/sub-issues/deposits-FD-CreateFD-5.aspx">FD Statement Online</a></li>
								  <li><a href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/sub-issues/sub-issues/sub-issues/sub-issues/ins-li-mli-2.aspx">MAX Life Insurance Plan</a></li>
                                </ul>
                              </div>
                              <div class="tab-pane fade" id="pills-videos" role="tabpanel" aria-labelledby="pills-videos">
                                <div class="videos-content">
                                  <h5 class="title">Videos</h5>
                                  <div class="videos-content__wrapper">
                                    <div class="video">
                                     <!-- <div class="video-tab">
                                        <iframe width="560" height="315" src="https://www.youtu.be/GONyslBlMWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                      </div>-->
									  <a href="https://youtu.be/2FxLk9HplzQ" class="video-title">How do I generate a Debit Card PIN?</a>
                                      <!--<a href="https://m.youtube.com/watch?v=GONyslBlMWc&feature=youtu.be" class="video-title">How to download your Credit Card Statement?</a>-->
                                    </div>
									<div class="video">
                                     <!-- <div class="video-tab">
                                        <iframe width="560" height="315" src="https://www.youtu.be/GONyslBlMWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                      </div>-->
									  <a href="https://youtu.be/imR-f8VEskl" class="video-title">How do I enhance my fund transfer limit?</a>
                                    </div>
                                    <div class="video">
                                      <!--<div class="video-tab">
                                        <iframe width="560" height="315" src="https://www.youtu.be/GbpydQs-OTs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                      </div>-->
                                      <a href="https://www.youtube.com/watch?v=GbpydQs-OTs&feature=youtu.be" class="video-title">How to report a Fraudulent Transaction?</a>
                                    </div>
                                    <div class="video">
                                      <!--<div class="video-tab">
                                        <iframe width="560" height="315" src="https://www.youtu.be/4jywfvqY6cs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                      </div>-->
                                      <a href="https://m.youtube.com/watch?v=4jywfvqY6cs&feature=youtu.be" class="video-title">How do I check the status of my Credit Card application?</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- tab content end -->
    
                            <div class="insta-query">
                              <p class="title"> <span>Insta Query?</span></p>
                              <div class="insta-query__list d-flex flex-wrap">                                
                                <a href="https://digiserv.axisbank.com/signIn/M2IwZDUwYjYtYWIzOC00ZTE3LWE3ZjAtNWZlMDBlOThjMTI3" class="nav-link" target="_blank">Chequebook Request</a>
                                <a href="https://application.axisbank.co.in/WebForms/axis-support/retail_loan_list.aspx" class="nav-link" target="_blank">Loan Services</a>
                                <a href="https://application.axisbank.co.in/WebForms/axis-support/E-statement.aspx" class="nav-link" target="_blank">Download Savings and Agri Account Statement</a>
                                <a href="https://application.axisbank.co.in/webforms/axis-support/report-fraud.aspx" class="nav-link" target="_blank">Fraudulent Transaction</a>
                                <!-- <a href="#" class="nav-link">Other Requests</a> -->
								<a href="https://application.axisbank.co.in/WebForms/axis-support/Block-cccard.aspx" class="nav-link" target="_blank">Block And Replace Credit Card</a>								
                              </div>
                            </div>
    
                           
                          </div>
    
                          <div class="col-lg-3 searchbar-modal__banner">
                            <div class="banner">
                              <div class="banner-wrapper">
                                <div class="owl-carousel banner-carousel owl-theme">
                                  <div class="banner-carousel__content">
                                    <a href="https://application.axisbank.co.in/webforms/axis-support/loanforms/LeadForms.aspx?UTM_SOURCE=WS">
                                      <img src="/WebForms/axis-support/assets_rd/images/apply-now.png" alt="">
                                    </a>
                                   </div>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                
            </div>

            <!-- slider code -->
            <div class="selectionopt-slider">
                <div class="owl-carousel selectionopt-carousel owl-theme">
                    <div class="slide">
                        <a class="comm-para" href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/FND-Dispute-fc-1.aspx">Disputed Transaction</a>
                    </div>
                    <div class="slide">
                        <a class="comm-para" href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/Bank-SB-otherqueries-4.aspx">Get my Customer ID</a>
                    </div>
                    <div class="slide">
                        <a class="comm-para" href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/sub-issues/digibkg-IB-retail-firstimeuser-1.aspx">Internet banking</a>
                    </div>
                    <div class="slide">
                        <a class="comm-para" href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/Cards-Credit-limitenhancement-1.aspx">Increase credit limit</a>
                    </div>
                   
                    <div class="slide">
                        <a class="comm-para" href="https://application.axisbank.co.in/WebForms/axis-support/sub-issues/Cards-Credit-ApplicationRelated-1.aspx">Status of credit card application</a>
                    </div>
                    <div class="slide">
                      <a class="comm-para" href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/sub-issues/FND-Fraud-fc-1.aspx">Report a fraudulent transaction</a>
                  </div>
				  <div class="slide">
                      <a class="comm-para" href="https://application.axisbank.co.in/WebForms/axis-support/sub-issues/Cards-Debit-PIN-1.aspx">Generate a Debit Card PIN</a>
                  </div>
                </div>
            </div>

            <!-- Latest News -->
            <!-- slider code -->
            <div class="latestupdate-wrapper d-flex">
              <div class="title">
                <h4 class="text-capitalize">Latest</h4>
                <p class="text-capitalize">updates</p>
              </div>
              <div class="latestupdate-slider">
                <div class="owl-carousel latestupdate-carousel owl-theme">
				  <!-- <div class="slide update">
                    <div>
<p><b>Due to a maintenance activity, our Email & Chat services will not be available on 17th Jun' 23 from 11:00 PM to 03:00 AM (IST).During this time, please use our other digital channels.</b></p>
                     </div>
                  </div>-->
				<div class="slide">
                      <div>
                        <a href="#">
                          <img src="/WebForms/axis-support/assets_rd/images/New-Look-Banner.jpg" alt=" Protect Yourself 
                        from UPI Fraud - Give our Blogs a read! - Know More">
                        </a>
                        
                      </div>
                    </div>
                  <!--<div class="slide update">
                    <div>
                     <p class="iosonly">
					 Axis Bank launches a service initiative, Banking Dhyaan Se. 
					<a href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/FND-Fraud-FAI.aspx?utm_source=supportsection&amp;utm_medium=website&amp;utm_campaign=fraud-awareness" target="_blank" style="display:inline;">Click here</a> to read the Fraud Awareness Repository.
					It is present in support website now.
					 </p>
                     </div>
                  </div>-->
                    
                    
					<div class="slide">
                      <div>
                        <a href="https://application.axisbank.co.in/WebForms/axis-support/Blogs/blog_3.aspx">
                          <img src="/WebForms/axis-support/assets_rd/images/UPIfraud.jpg" alt="">
                        </a>
                        
                      </div>
                    </div>
                    <div class="slide">
                      <div>
                        <a href="https://application.axisbank.co.in/hindi/webforms/axis-support/index.aspx">
                          <img src="/WebForms/axis-support/assets_rd/images/ServiceAvailable.jpg" alt="">
                        </a>
                        
                      </div>
                    </div>
<div class="slide">
                      <div>
                        <a href="https://mobiapp.axisbank.co.in/AxisPreLogin/home" target="_blank">
                          <img src="/WebForms/axis-support/assets_rd/images/Axis-Bank-SUPPORT.jpg" alt="">
                        </a>
                       
                      </div>
                    </div>
                    
					<div class="slide update">
                    <div>
                     <p><b>
					 Axis Bank launches a service initiative, Banking Dhyaan Se. 
					<a href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/FND-Fraud-FAI.aspx?utm_source=supportsection&amp;utm_medium=website&amp;utm_campaign=fraud-awareness" target="_blank" style="display:inline;">Click here</a> to read the Fraud Awareness Repository.
					It is present in support website now.
					</b></p>
                     </div>
                  </div>
                    <!--<div class="slide">
                      <div>
                        <a href="#">
                          <img src="/WebForms/axis-support/assets_rd/images/banner-dia.png" alt="">
                        </a>
                        
                      </div>
                    </div>-->
                </div>
              </div>
            </div>

            <!-- complaint content -->
            <div class="complaint-wrapper d-flex flex-nowrap">
              <div class="title modal_tab">
                <h3 class="text-capitalize mb-0">Raise A Complaint</h3>
                <a class="text-capitalize" href="#">Click here</a>
              </div>
             
            </div>

            <!-- Quick links section for mobile view below 768px 
            <div class="mobileQuicklinks">
              
              <div class="quicklinks-sec">
                <h5 class="title text-capitalize">Quick Links</h5>
                <ul class="quicklinks-sec__list">
                  <li>
                     <a href="javascript:void(0)" id="chat_agent" class="list-title open-chatbot">Chat With Us</a> 
                    
                  
                  </li>
                  <li>
                    <a href="javascript:void(0)" id="speak_us" class="speak_us list-title">Call Us</a>
                   
                  </li>
                  <li>
                    <a href="https://application.axisbank.co.in/webforms/axis-support/report-fraud.aspx" class="list-title" target="_blank">Report a Fraud</a>
                    <a href="https://application.axisbank.co.in/webforms/axis-support/report-fraud-dispute.aspx" class="list-title" target="_blank">Raise a Dispute</a>
                  </li>
                </ul>
              </div>
            </div> -->
        </div>
        <div class="col-md-3 videos-wrapper">
          <div class="videos-sec">
            <p class="hashtag-text text-uppercase mb-2">#EasyBanking</p>
            <p class="para">Watch our latest videos & solve your queries in seconds</p>
            <p class="video-title text-uppercase">New Video</p>
            <div class="video-wrapper">
              <iframe width="560" height="315" scrolling="NO" src="https://www.axisbank.com/axis-support-video/axis-support-video.html" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			  <!-- <embed type="video/webm" width="260" height="115" src="https://www.youtube.com/embed/GONyslBlMWc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></embed> -->
            </div>
            <a href="https://youtu.be/2FxLk9HplzQ" class="video-caption" target="_blank">How do I generate a Debit Card PIN?</a>
            <a href="https://www.axisbank.com/videos-page/videos.html" class="viewall-btn text-capitalize" target="_blank">View All</a>
          </div>
          		  
          <div class="quicklinks-sec">
           <h5 class="title text-capitalize">Quick Links</h5>
            <ul class="quicklinks-sec__list">
              <li>
                  <a href="javascript:void(0)" onclick="getGTMChatwithus();" class="list-title open-chatbot">Chat With Us</a>   
				  <!-- <button type="button" class="open-chatbot" >Chat With Us</button>  -->
				
				<!-- <a class="open-chatbot">Chat With Us</a>  -->
              </li>
              <li>
                <a href="javascript:void(0)" id="speak_us" class="speak_us list-title">Call Us</a>
               
              </li>
              <li>
                <a href="https://application.axisbank.co.in/webforms/axis-support/report-fraud.aspx" class="list-title">Report a Fraud</a>
                <a href="https://application.axisbank.co.in/webforms/axis-support/report-fraud-dispute.aspx" class="list-title">Raise a Dispute</a>
              </li>
            </ul>
          </div>
          <a class="reachus-anchor">Reach us on other mediums</a>
		  <div class="raise-complaint-link" style="display:none;">
              <a href="#" class="modal_tab">Raise A Complaint <span class="icon-right-arrow"></span></a>
          </div>
        </div>
		<div class="raise-complaint-link mobileonlyras">
              <a href="#" class="modal_tab">Raise A Complaint <span class="icon-right-arrow"></span></a>
          </div>
    </section>

    <!-- Products Sontent section -->
    <section class="products-content">
      <div class="row m-0">
        <div class="col-lg-4 col-xl-3 pl-0">
          <div class="info-card">
            <h2 class="title">Be a part of <b>Axis Bank family</b></h2>
            <p class="desc">Products to meet your life goals</p>
            <button class="avail-btn text-uppercase">
              <a href="https://application.axisbank.co.in/webforms/axis-support/loanforms/LeadForms.aspx?UTM_SOURCE=WS" target="_blank">Avail Now</a></button>
          </div>
        </div>
        <div class="col-lg-8 col-xl-9 pr-0">
          <div class="d-flex align-items-center flex-nowrap w-100 h-100">
            <div class="products-carousel w-100">
              <div class="owl-carousel products-carousel__wrapper owl-theme">
			  
                <div class="slide products-carousel__card">
                  <div>
                    <a href="https://www.axisbank.com/sr" target="_blank">
                    <span class="icon-Creditcard card-icon">
					<img src="/WebForms/axis-support/assets_rd/images/credit-card.svg" alt="CreditCard">
					</span>
                    <h4 class="card-title mb-0">
                      <b>Credit Card</b> 
                     </h4>
                    </a>
                  </div>
                </div>
				
				<!--desktop view link-->
				<div class="slide products-carousel__card">                  
				  <!--desktop view link-->				
				  <span class="desktoponly"><a href="https://omni.axisbank.co.in/axisretailbanking/#/99/DEEPLINK/GENOLIVE/c2VydmljZU5hbWU9aW5zdGFudGxvYW4maXNEZWVwTGluaz10cnVl?utm_source=SRDS&utm_medium=website&utm_campaign=ILC" target="_blank">
                    <span class="icon-PersonalLoan card-icon">
					<img src="/WebForms/axis-support/assets_rd/images/emiOnCC.svg" alt="PersonalLoan">					
					</span>
                    <h4 class="card-title mb-0"><b>EMI On Credit Card </b> </h4>
                  </a></span>
				  <!--mobile view link-->
				  <span class="mobileonly">
				  <a href="https://axisbank.onelink.me/967567770?pid=website&c=cc-olive-convert-to-emi&af_dp=axisbank://axis.com/EMISLIDR?utm_source=SRDS&utm_medium=website&utm_campaign=EMI" target="_blank">
                    <span class="icon-PersonalLoan card-icon">
					<img src="/WebForms/axis-support/assets_rd/images/emiOnCC.svg" alt="PersonalLoan">					
					</span>
                    <h4 class="card-title mb-0"><b>EMI On Credit Card </b> </h4>
                  </a>
				  </span>
                </div>
				<!--mobile view link-->
				<!--<div class="slide products-carousel__card d-block d-sm-none">
                  <a href="https://axisbank.onelink.me/967567770?pid=website&c=cc-olive-convert-to-emi&af_dp=axisbank://axis.com/EMISLIDR?utm_source=SRDS&utm_medium=website&utm_campaign=EMI" target="_blank">
                    <span class="icon-PersonalLoan card-icon">
					<img src="/WebForms/axis-support/assets_rd/images/emiOnCC.svg" alt="PersonalLoan">					
					</span>
                    <h4 class="card-title mb-0"><b>EMI On Credit Card</b> </h4>
                  </a>
                </div>-->
				
				<div class="slide products-carousel__card">   
				<!--desktop view link-->				
				  <span class="d-none d-sm-block"><a href="https://omni.axisbank.co.in/axisretailbanking/#/99/DEEPLINK/GENOLIVE/c2VydmljZU5hbWU9aW5zdGFudGxvYW4maXNEZWVwTGluaz10cnVl?utm_source=SRDS&utm_medium=website&utm_campaign=ILC" target="_blank" >
				    <span class="icon-PersonalLoan card-icon">
					<img src="/WebForms/axis-support/assets_rd/images/LoanonCreditCard.svg" alt="PersonalLoan">					
					</span>
                    <h4 class="card-title mb-0"><b>Instant Loan on Credit Card</b> </h4>
                  </a></span>
				  <!--mobile view link-->
				  <span class="d-block d-sm-none">
				  <a href="https://axisbank.onelink.me/967567770?pid=website&c=cc-olive-instant-loan&af_dp=axisbank://axis.com/WTLLIST?utm_source=SRDS&utm_medium=website&utm_campaign=ILC" target="_blank">
                    <span class="icon-PersonalLoan card-icon">
					<img src="/WebForms/axis-support/assets_rd/images/LoanonCreditCard.svg" alt="PersonalLoan">					
					</span>
                    <h4 class="card-title mb-0"><b>Instant Loan on Credit Card</b> </h4>
                  </a></span>
                </div>
				<!--mobile view link-->
				<!--<div class="slide products-carousel__card d-block d-sm-none">
                  <a href="https://axisbank.onelink.me/967567770?pid=website&c=cc-olive-instant-loan&af_dp=axisbank://axis.com/WTLLIST?utm_source=SRDS&utm_medium=website&utm_campaign=ILC" target="_blank">
                    <span class="icon-PersonalLoan card-icon">
					<img src="/WebForms/axis-support/assets_rd/images/LoanonCreditCard.svg" alt="PersonalLoan">					
					</span>
                    <h4 class="card-title mb-0"><b>Instant Loan on Credit Card</b> </h4>
                  </a>
                </div>-->
				
                <div class="slide products-carousel__card">
                  <a href="/Webforms/axis-support/LoanForms/PersonalLoan.aspx?UTM_SOURCE=WS&UTM_PRODUCT=PersonalLoan" target="_blank">
                    <span class="icon-PersonalLoan card-icon">
					<img src="/WebForms/axis-support/assets_rd/images/personal-loan.svg" alt="PersonalLoan">					
					</span>
                    <h4 class="card-title mb-0"><b>Personal Loans</b> </h4>
                  </a>
                </div>

                <div class="slide products-carousel__card">
                  <div>
                    <a href="/Webforms/axis-support/LoanForms/BusinessLoan.aspx?UTM_SOURCE=WS&UTM_PRODUCT=BusinessLoan" target="_blank">
                    <span class="icon-businessLoans card-icon">
					<img src="/WebForms/axis-support/assets_rd/images/business-loan.svg" alt="BusinessLoan">
					</span>
                    <h4 class="card-title mb-0"><b>Business Loans</b> </h4>
                    </a>
                  </div>
                </div>

                <div class="slide products-carousel__card">
                  <div>
                    <a href="/Webforms/axis-support/LoanForms/AutoLoan.aspx?UTM_SOURCE=WS&UTM_PRODUCT=AutoLoan" target="_blank">
                      <span class="icon-AutoLoans card-icon">
					  <img src="/WebForms/axis-support/assets_rd/images/auto-loan.svg" alt="">
					  </span>
                      <h4 class="card-title mb-0"><b>Auto Loans</b> </h4>
                    </a>
                  </div>
                </div>

                <div class="slide products-carousel__card">
                  <div>
                   <a href="/Webforms/axis-support/LoanForms/EducationLoan.aspx?UTM_SOURCE=WS&UTM_PRODUCT=EducationLoan" target="_blank">
                    <span class="icon-AutoLoans card-icon"><img src="/WebForms/axis-support/assets_rd/images/education.svg" alt=""></span>
                    <h4 class="card-title mb-0"><b>Education Loans</b> </h4>
                  </a>
                  </div>
                </div>

                <div class="slide products-carousel__card">
                  <div>
                    <a href="/Webforms/axis-support/LoanForms/HomeLoan.aspx?UTM_SOURCE=WS&UTM_PRODUCT=HomeLoan" target="_blank">
                    <span class="icon-AutoLoans card-icon"><img src="/WebForms/axis-support/assets_rd/images/homeloan.svg" alt=""></span>
                    <h4 class="card-title mb-0"><b>Home Loans</b> </h4>
                    </a>
                  </div>
                </div>

                <div class="slide products-carousel__card">
                  <div>
                    <a href="/Webforms/axis-support/LoanForms/LAP.aspx?UTM_SOURCE=WS&UTM_PRODUCT=LAP" target="_blank">
                    <span class="icon-AutoLoans card-icon"><img src="/WebForms/axis-support/assets_rd/images/LAP.svg" alt=""></span>
                    <h4 class="card-title mb-0"><b>Loan against Property</b></h4>
                    </a>
                  </div>
                </div>
				
				<div class="slide products-carousel__card">
                  <div>
                    <a href="https://digitalbanking.axisbank.com/vkyc-fd/landing-page?utm_source=axisws&utm_medium=website&utm_campaign=dbat-vcipfd&utm_content=vkyc-fd-bde-axisws" target="_blank">
                    <span class="icon-AutoLoans card-icon"><img src="/WebForms/axis-support/assets_rd/images/Fixed-Deposit.svg" alt=""></span>
                    <h4 class="card-title mb-0"><b>Fixed Deposit</b></h4>
                    </a>
                  </div>
                </div>
				
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Download here and quick read section -->
    <section class="downloadarticle-content">
      <div class="row m-0">
        <div class="col-lg-5">
          <div class="download-content mx-auto">
            <h3 class="mb-4 title w-100">Looking for forms? <b class="d-block">Download here</b></h3>
     
            <ul class="card-wrapper"  id="download-content-All">
              <li class="cards">
                <a href="https://www.axisbank.com/retail/accounts" target="_blank">
                  <div class="card-icons__wrapper">
                    <span class="icon-savings card-icons"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                  </div>
                  <p class="title">Account</p>
                </a>
              </li>

              <li class="cards">
                <a href="https://www.axisbank.com/retail/cards/debit-cards" target="_blank">
                  <div class="card-icons__wrapper">
                    <span class="icon-debit features icons"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                  </div>
                  <p class="title">Debit Cards</p>
                </a>
              </li>

              <li class="cards">
                <a href="https://www.axisbank.com/retail/cards/credit-card" target="_blank">
                  <div class="card-icons__wrapper">
                    <span class="icon-credit card-icons"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span></span>
                  </div>
                  <p class="title">Credit Cards</p>
                </a>
              </li>

              <li class="cards">
                <a href="https://www.axisbank.com/retail/forex" target="_blank">
                  <div class="card-icons__wrapper">
                    <span class="icon-forex features icons"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span></span>
                  </div>
                  <p class="title">Forex</p>
                </a>
              </li>

              <li class="cards">
                <a href="https://www.axisbank.com/retail/loans" target="_blank">
                  <div class="card-icons__wrapper">
                    <span class="icon-loan card-icons"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
                  </div>
                  <p class="title">Loans</p>
                </a>
              </li>

              <li class="cards">
                <a href="https://www.axisbank.com/retail/investment" target="_blank">
                  <div class="card-icons__wrapper">
                    <span class="icon-investment features icons"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                  </div>
                  <p class="title">Investment</p>
                </a>
              </li>

              <li class="cards">
                <a href="https://www.axisbank.com/download-forms/smart-forms#menuTab" target="_blank">
                  <div class="card-icons__wrapper">
                    <span class="icon-smartForm features icons"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span></span>
                  </div>
                  <p class="title">Smart Forms</p>
                </a>
              </li>

              <li class="cards">
                <a href="https://www.axisbank.com/download-forms/nri#menuTab" target="_blank">
                  <div class="card-icons__wrapper">
                    <span class="icon-nri card-icons"></span>
                  </div>
                  <p class="title">NRI</p>
                </a>
              </li>

              <li class="cards">
                <a href="https://www.axisbank.com/download-forms/business-banking#menuTab" target="_blank">
                  <div class="card-icons__wrapper">
                    <span class="icon-businessBanking card-icons"><span class="path1"></span><span class="path2"></span></span>
                  </div>
                  <p class="title">Business Banking</p>
                </a>
              </li>
            </ul>
            <!--<button class="viewall-btn text-uppercase viewall-btn__mobile download-close" id="Download-viewAll_BtnMobile">View all</button>-->
			<button type="button" class="viewall-btn text-uppercase viewall-btn__mobile download-close" id="Download-viewAll_BtnMobile">View all</button>
          </div>
        </div>
		<div class="col-lg-7 p-0">
          <div class="quickread-wrapper">
            <div class="mx-auto quickread-content">
              <h2 class="heading">Quick reads of <b>Articles</b></h2>
              <div class="article-wrapper d-flex">
			  
                <!-- <div class="article-content"> 
                   <img class="banner-img" src="/WebForms/axis-support/assetsNew/images/Blogs/02_Grievance_Thumbnail_HomeScreen_200x101.jpg" alt="blog"/> 
                   <div class="d-flex flex-column"> 
                     <a href="Blogs/blog_1.aspx" target="_blank" class="text-capitalize readmore-link"><p class="para"> 
						A guide to an Effective Grievance Redressal Mechanism 
						</p></a> 
					</div> 
                </div> -->				
				
				 <!-- <div class="article-content"> 
                  <img class="banner-img" src="/WebForms/axis-support/assetsNew/images/Blogs/03_VideoLibrary_Thumbnail_HomeScreen_200x101.jpg" alt="blog"/> 
                   <div class="d-flex flex-column">                     
                    <a class="text-capitalize readmore-link" href="Blogs/blog_2.aspx" target="_blank"><p class="para"> 
						Simplifying your banking experience - Visit Self-help Video Library 
						</p></a> 
					</div> 
					</div> -->

                <!-- <div class="article-content"> 
                  <img class="banner-img" src="/WebForms/axis-support/assetsNew/images/Blogs/01_UPI_Thumbnail_HomeScreen_200x101.jpg" alt="blog"/> 
                  <div class="d-flex flex-column">  
                   <a class="text-capitalize readmore-link" href="Blogs/blog_3.aspx" target="_blank"><p class="para"> 
                   UPI Fraud Scam - how you can avoid falling prey to scams 
                   </p></a> 
                  </div> 
                 </div> -->
				
				 <div class="article-content">
				 <a href="Blogs/blog_1.aspx?utm_source=ws-blog1&utm_medium=website" target="_blank" class="text-capitalize readmore-link">
					<div class="d-flex flex-column">
						<img class="banner-img" src="/WebForms/axis-support/assetsNew/images/Blogs/02_Grievance_Thumbnail_HomeScreen_200x101.jpg" alt="blog"/>
						<p class="para" > 							
						A guide to an Effective Grievance Redressal Mechanism 
						</p> 
					</div> 
					</a>
                </div> 		
				
                <!-- <div class="article-content">
				<a class="text-capitalize readmore-link" href="Blogs/blog_2.aspx?utm_source=ws-blog2&utm_medium=website" target="_blank">					 
                  <div class="d-flex flex-column">                    
                    <img class="banner-img" src="/WebForms/axis-support/assetsNew/images/Blogs/03_VideoLibrary_Thumbnail_HomeScreen_200x101.jpg" alt="blog"/>
					<p class="para" >
                     Simplifying your banking experience - Visit Self-help Video Library
                    </p>
                  </div>
				  </a>
                </div>-->

                 <div class="article-content">
				 <a class="text-capitalize readmore-link" href="Blogs/digitalbanking.aspx?utm_source=ws-digital-banking-blog&utm_medium=website" target="_blank">
                  <div class="d-flex flex-column"> 
                    <img class="banner-img" src="/WebForms/axis-support/assetsNew/images/Blogs/DigitalBanking_200x101.jpg" alt="blog"/>
					<p class="para" >                   
					  Digital Banking - Make Life Easy 
                    </p>
                  </div>
				  </a>
                </div>
				
				<div class="article-content">
				 <a class="text-capitalize readmore-link" href="Blogs/pharmingfraud.aspx?utm_source=ws-pharming-fraud-blog&utm_medium=website" target="_blank">
                  <div class="d-flex flex-column"> 
                    <img class="banner-img" src="/WebForms/axis-support/assetsNew/images/Blogs/PharmingFraud_200x101.jpg" alt="blog"/>
					<p class="para" >                   
					 Pharming Fraud and protect your security online
                    </p>
                  </div>
				  </a>
                </div>
				
               <!-- <div class="article-content">
				 <a class="text-capitalize readmore-link" href="Blogs/blog_3.aspx?utm_source=ws-blog3&utm_medium=website" target="_blank">
                  <div class="d-flex flex-column"> 
                    <img class="banner-img" src="/WebForms/axis-support/assetsNew/images/Blogs/01_UPI_Thumbnail_HomeScreen_200x101.jpg" alt="blog"/>
					<p class="para" >                   
					  UPI Fraud Scam - how you can avoid falling prey to scams
                    </p>
                  </div>
				  </a>
                </div>-->
				
              </div>
              <a href="Blogs/index-blog.aspx" target="_blank" class="text-uppercase viewall-btn">View All</a>
            </div>
          </div>
        </div>
      
		
      </div>
    </section>

    <!-- Reach us and complaint section -->
    <section id="scroll-to" class="reachncomplaint-content">
      <div class="row m-0">
        <div class="reachus-wrapper col-lg-7">
          <div class="row m-0 w-90">
            <div class="col-lg-3 d-flex flex-column justify-content-center">
              <h3 class="heading">Reach Us<b class="d-block">Here</b></h3>
            </div>
            <div class="reachus-options col-lg-9">
			
				<div class="reachus-options__content">
                <a href="https://www.axisbank.com/contact-us/locator" class="d-flex justify-content-between align-items-center">
                  <p class="name">Branch /ATM</p>
                  <div class="icon-wrapper">
                    <span class="icon-atm"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span></span>
                  </div>
                </a>
              </div>
			  
				  <div class="reachus-options__content">
					<a href="javascript:void(0)" id="chat_agent" class="chat_agent d-flex justify-content-between align-items-center">
					  <p class="name">Chat With Agent</p>
					  <div class="icon-wrapper">
						<span class="icon-instant-chat"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></span>
					  </div>
					</a>
				  </div>

              <div class="reachus-options__content">
                <a href="javascript:void(0)" id="speak_us" class="speak_us d-flex justify-content-between align-items-center">
                  <p class="name">Speak with us</p>
                  <div class="icon-wrapper">
                    <span class="icon-speak"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span></span>
                  </div>
                </a>
              </div>

              <div class="reachus-options__content">
                <a href="javascript:void(0)" id="connect_email" class="connect_email d-flex justify-content-between align-items-center">
                  <p class="name">Connect Via email</p>
                  <div class="icon-wrapper">
                    <span class="icon-email"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>

        <div class="escomplaint-wrapper col-lg-5">
          <h3 class="heading">Do you want to <b class="d-block">Escalate your Complaint?</b></h3>

          <div class="escomplaint-content">
            <div class="mb-4">
              <!-- data-toggle="collapse" href="#nodal-collapse" role="button" aria-expanded="false" aria-controls="nodal-collapse" -->
              <a class="officerinfo-title nodal_modal_tab" >
                <div class="d-flex align-items-center">
                  <span class="icon-support icon"></span>
                  <p class="title">Escalate to <b>Nodal Officer</b></p>
                </div>
                <span class="icon-right-arrow"></span>
              </a>
              <div class="collapse" id="nodal-collapse">
                <div class="officerinfo-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                </div>
              </div>
            </div>

            <div>
              <!-- data-toggle="collapse" href="#priciplenodal-collapse" role="button" aria-expanded="false" aria-controls="priciplenodal-collapse" -->
              <a class="officerinfo-title principal_nodal_modal_tab" >
                <div class="d-flex align-items-center">
                  <span class="icon-justice icon"></span>
                  <p class="title">Escalate to <b>Principal Nodal Officer</b></p>
                </div>
                <span class="icon-right-arrow"></span>
              </a>
              <div class="collapse" id="priciplenodal-collapse">
                <div class="officerinfo-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>

    <!-- Additional information section -->
    <section class="additionalinfo">
      <div class="row m-0">
        <div class="col-lg-2 heading-wrapper">
          <div class="">
            <h3 class="heading"><b class="d-block">Additional</b> Information</h3>
            <button type="button" class="viewall-btn text-uppercase viewall-btn__desktop" id="addInfo-viewAll_Btn">View all</button>
          </div>
        </div>

        <div class="col-lg-10 additionalinfo-card__wrapper">
          <div class="additionalinfo-card__content" id="additionalinfo-card__content">
           <div class="additionalinfo-card">
              <a href="https://rbidocs.rbi.org.in/rdocs/content/pdfs/RBIOS2021_121121.pdf" target="_blank" class="d-flex align-items-center">
                <span class="icon-Banking-Ombudsman bank-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">RBI - Integrated Ombudsman Scheme, 2021</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/docs/default-source/default-document-library/grievance-redressal/grievance-redressal-policy.pdf?sfvrsn=2&_ga=2.188690600.1498359946.1620366863-1848737689.1618222791" target="_blank" class="d-flex align-items-center">
                <span class="icon-Grievance-Redressal-Policy bank-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></span>
                <p class="title">Grievance Redressal Policy</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://application.axisbank.co.in/docs/Operating_Guideline_on_Customer_Complaints.pdf" target="_blank" class="d-flex align-items-center">
                <span class="icon-Operating-Guideline-onCustomer-Complaints bank-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>
                <p class="title">Operating Guideline on Customer Complaints</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://application.axisbank.co.in/docs/Turnaround_Times.pdf" target="_blank" class="d-flex align-items-center">
                <span class="icon-TurnAroundTime bank-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span></span>
                <p class="title">Turnaround Times</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://application.axisbank.co.in/docs/Roles_and_Responsibilities_of_PNO.pdf" target="_blank" class="d-flex align-items-center">
                <span class="icon-PNO bank-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
                <p class="title">Roles and Responsibilities of PNO</p>
              </a>
            </div>

			<div class="additionalinfo-card">
              <a href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/FND-Fraud-FAI.aspx?utm_source=supportsection&utm_medium=website&utm_campaign=fraud-awareness" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/BookIcon.jpg" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Customer Education & Awareness</p>
              </a>
            </div>
            <!--
            <div class="additionalinfo-card">
              <a href="https://application.axisbank.co.in/webforms/axis-support/sub-issues/FND-Fraud-FAI.aspx?utm_source=supportsection&utm_medium=website&utm_campaign=fraud-awareness" target="_blank" class="d-flex align-items-center">
                <span class="icon-Banking-Ombudsman bank-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">fraud awareness Repository</p>
              </a>
            </div>-->

			<div class="additionalinfo-card">
              <a href="https://www.axisbank.com/docs/default-source/default-document-library/kyc/periodic-kyc-update.pdf" target="_blank" class="d-flex align-items-center">
                <span class="icon-Operating-Guideline-onCustomer-Complaints customer_icon icons"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Intimation to customers for Re-KYC</p>
              </a>
            </div>
			
            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/noticeboard/CustomerServiceInformation" class="d-flex align-items-center">
                <span class="icon-Operating-Guideline-onCustomer-Complaints customer_icon icons"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Notice Board</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/webforms/code-of-commitment" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/BankingCodesStandardsBOI.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">banking code & standards Board of India</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/e-brochures-leaflets" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/CustEduBrochure.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">E Brochures & Leaflets</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/docs/default-source/noticeboard/importantnotice/comprehensive-deposit-policy.pdf" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/DepositorsPolicy.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Depositors' Policy</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/noticeboard/importantnotice" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/BankingPolicies.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Banking Policies</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://application.axisbank.co.in/webforms/axis-support/UnclaimedAccount.aspx" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/UnclaimedDeposInopAccnt.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Unclaimed Accounts to DEA Fund</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/docs/default-source/noticeboard/importantnotice/customer--rights-policy.pdf" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/RightsOfBanksCust.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Rights of Banks’ Customer</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://branch.axisbank.com/?type=branches" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/BankBranchIFSC_MICRCodes.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Bank Branch IFSC codes</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/noticeboard/importantnotice" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/CodeofConduct_04.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Code of Conduct</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/docs/default-source/noticeboard/customerserviceinformation/acceptance-of-mutilated-soiled-currency-notes-and-coins-of-all-denominations.pdf" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/FacilityforExchangeCoinsAndNotes.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Facility for Exchange Coins and Notes</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.rbi.org.in/commonman/English/Scripts/rbikehtahai.aspx" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/RBIAndMinistryOfFinanceAdvisory.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">RBI and Ministry of Finance Advisory</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/media-centre/senior-management" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/SeniorManagementContactDetails_02.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Senior Management Details</p>
              </a>
            </div>

            <div class="additionalinfo-card more_links">
              <a href="javascript:void(0)" class="d-flex align-items-center">
                <!--<span class="icon-PNO customer_icon icons"></span><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span>
                <p class="title">List of Branches/ ATM with Ramps</p>-->				
				<span class="icon-PNO bank-icon"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
                <p class="title">List of Branches/ ATM with Ramps</p>
				
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.dicgc.org.in/" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/DepositInsuranceandCreditGuaranteeCorporation.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Deposit Insurance and Credit Guarantee Corporation</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/noticeboard/importantnotice" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/MandatoryNoticesDisplayedatBranches.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Mandatory Notices Displayed at Branches</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/business-banking/government-business/taxes/goods-and-services-tax/payment" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/GoodsServicesTax.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Goods & Services Tax(GST)</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.rbi.org.in/scripts/HolidayMatrixDisplay.aspx" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/RBIBankHolidayList.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">RBI-Bank Holiday List</p>
              </a>
            </div>

            <div class="additionalinfo-card settlement_links">
              <a href="javascript:void(0)" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/DocumentsforsettlementofDeathClaim.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">Document for Settlement of Death Cliam</p>
              </a>
            </div>

            <div class="additionalinfo-card">
              <a href="https://www.axisbank.com/docs/default-source/default-document-library/faqs-ombudsman-under-nps.pdf" class="d-flex align-items-center">
                <img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/FAQs_Ombudsman-under-NPS_APY.png" class="customer_icon_img" /><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
                <p class="title">FAQs Ombudsman under NPs/APY</p>
              </a>
            </div>
          </div>

          <!-- View all button in mobile view -->
          <button type="button" class="viewall-btn text-uppercase viewall-btn__mobile" id="addInfo-viewAll_BtnMobile">View all</button>
        </div>
      </div>
    </section>
	
  </main>

  <!--main section end rs-->
  
  
    <!--footer section start-->
  <footer>
    <ul class="corner_links d-flex align-items-center">
      <li class="corner_links_item"><a class="corner_links_item_link"
          href="https://application.axisbank.co.in/webforms/axis-support/feedback.aspx" class="text-capitalize"
          data-toggle="tooltip" data-placement="top" title="Click here to post an appreciation.">appreciation <span
            class="d-block">corner</span></a></li>
      <li class="corner_links_item"><a class="corner_links_item_link"
          href="https://application.axisbank.co.in/webforms/axis-support/SupportSurvey.aspx"
          class="text-capitalize" data-toggle="tooltip" data-placement="top"
          title="Click here to submit feedback on our Support Section">survey <span class="d-block">corner</span></a>
      </li>
	  <!-- Start by Yogesh on 5/03/2022 -->
	  <li class="corner_links_item"><a class="corner_links_item_link"
          href="https://www.axisbank.com/contact-us"
          class="text-capitalize" data-toggle="tooltip" data-placement="top"
          title="Click here to submit feedback on our Support Section">Contact <span class="d-block">Us</span></a>
      </li>
     <!-- End by Yogesh on 5/03/2022 -->
    </ul>
    <div class="footer_content" >
      <div class="container d-flex flex-row justify-content-between align-items-center">
        <ul class="nav_links d-flex justify-content-between align-items-center">
          <li class="nav_links_item"><a class="nav_links_item_link text-capitalize"
              href="https://www.axisbank.com/disclaimer">disclaimer</a></li>
          <li class="nav_links_item"><a class="nav_links_item_link text-capitalize"
              href="https://www.axisbank.com/privacy-policy">privacy
              policy</a></li>
          <li class="nav_links_item"><a class="nav_links_item_link text-capitalize"
              href="https://www.axisbank.com/webforms/code-of-commitment">code of
              commitment</a></li>
			  <!-- start by Prashant on 5/07/2022 
			  <li class="nav_links_item"><a class="nav_links_item_link">*Queries Resolved count consists of resolved chat and email interactions for the current FY. </a></li>
			   <!-- End by Prashant on 5/07/2022 -->			  
        </ul>

		<!-- start by Prashant on 5/07/2022 color: #fff;-->
		<!--<br>&nbsp;<br> 
			  <p class="nav_links_item" style="word-wrap:break-word;" >*Queries Resolved consists Of resolved chat and email interactions for the current FY commitment</p>-->
			   <!-- End by Prashant on 5/07/2022 -->
        <p class="copyright text-capitalize mb-0">copyright &#169; 2021. all rights reserved by axis bank </p>
      </div>
    </div>
  </footer>
  <!--footer section end-->
  
<!-- modal start RS -->

  <!-- modal start here  -->

  <!-- Documents for settlement of Death Claim-->
  <div class="modal_container settlementinfo_links">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="customerinfo_content">
        <ul class=" d-flex align-items-center" style="padding-bottom: 20px;">
          <li  class="service" >
              <a href="https://www.axisbank.com/docs/default-source/download-document/personal/claim-forms/claim-form-for-settlement-of-claims-in-deceased-depositor-39-s-account-(with-nomination-or-survivorship-clause).pdf" target="_blank" class="d-flex align-items-center"><img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/DocumentsforsettlementofDeathClaim.png" class="customer_icon_img" /><span class="customer_links">To download form for settlement of claim in deceased depositors account (with nomination of survivorship clause), kindly click here.</span>
              </a>
            </li>
          <li  class="service" >
              <a href="https://www.axisbank.com/docs/default-source/download-document/personal/claim-forms/claim-form-for-settlement-of-claims-in-deceased-depositor-39-s-account-(without-nomination-or-survivorship-clause).pdf" target="_blank" class="d-flex align-items-center"><img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/DocumentsforsettlementofDeathClaim.png" class="customer_icon_img" /><span class="customer_links">To download form for settlement of claim in deceased depositors account (without nomination of survivorship clause), kindly click here.</span>
              </a>
            </li>
			
          
        </ul>
      </div>
    </div>
  </div>
  <!--End of Settlement of Death Claim-->
  
  <!-- customer information more links -->
  <div class="modal_container customerinfo_links">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="customerinfo_content">
        <ul class="info d-flex align-items-center">
          <li  class="service" >
              <a href="https://www.axisbank.com/docs/default-source/default-document-library/list-of-axis-branches-with-ramps.pdf" target="_blank" class="d-flex align-items-center"><img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/ListOfBranches_ATMsWithRamps.png" class="customer_icon_img" /><span class="customer_links">List of Branches with Ramps</span>
              </a>
            </li>
          <li  class="service" >
              <a href="https://www.axisbank.com/docs/default-source/default-document-library/list-of-atms-with-ramp.pdf" target="_blank" class="d-flex align-items-center"><img src="/Webforms/axis-support/assetsNew/images/ImpCustInfo/ListOfBranches_ATMsWithRamps.png" class="customer_icon_img" /><span class="customer_links">List of ATMs with Ramps</span>
              </a>
            </li>
          
        </ul>
      </div>
    </div>
  </div>
  
  
    <!-- nodal officer modal -->
  <div class="modal_container nodal_officer_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="nodal_modal_content">
        <div class="container_nodal">
          <h3 class="nodal_content_header">Escalate to <span class="bold">Nodal Officer</span></h3>
          <p class="nodal_content_description">Not satisfied with first level response then connect with our Nodal
            Officer
            using below option</p>
          <div class="nodal_card_wrapper">
            <a href="LogAQuery.aspx?Level=2" class="nodal_card">
              <span class="nodal_card_icon">
				
				<svg id="write_here" xmlns="http://www.w3.org/2000/svg" width="38.987" height="38.987" viewBox="0 0 38.987 38.987">
                  <g id="Group_1353" data-name="Group 1353" transform="translate(0 0)">
                    <path id="Path_4362" data-name="Path 4362" d="M38.981,14.909a.614.614,0,0,0-.027-.132.65.65,0,0,0-.037-.112.583.583,0,0,0-.065-.1.613.613,0,0,0-.086-.1c-.01-.009-.015-.021-.026-.031L32.49,9.581V4.551A1.95,1.95,0,0,0,30.541,2.6H23.5L20.679.412a1.927,1.927,0,0,0-2.37,0L15.489,2.6H8.447A1.949,1.949,0,0,0,6.5,4.551v5.03L.25,14.434c-.011.009-.016.021-.026.031a.61.61,0,0,0-.086.1.58.58,0,0,0-.065.1.641.641,0,0,0-.037.112.616.616,0,0,0-.027.13c0,.014-.008.025-.008.039v22.1a1.928,1.928,0,0,0,.381,1.147c0,.006,0,.013.009.018s.014.011.021.018a1.94,1.94,0,0,0,1.536.766h35.09a1.94,1.94,0,0,0,1.541-.769c.005-.006.013-.008.018-.015s.005-.012.009-.018a1.928,1.928,0,0,0,.381-1.147V14.948C38.988,14.934,38.981,14.922,38.981,14.909ZM19.1,1.437a.623.623,0,0,1,.775,0l1.5,1.164H17.609ZM2.112,37.692,19.1,24.493a.624.624,0,0,1,.775,0l17,13.2Zm35.577-1.013L20.679,23.468a1.928,1.928,0,0,0-2.37,0L1.3,36.679V15.937l10.649,8.269a.65.65,0,0,0,.8-1.027l-10.818-8.4L6.5,11.226v5.021a.65.65,0,0,0,1.3,0V4.551a.65.65,0,0,1,.65-.65H30.541a.65.65,0,0,1,.65.65v11.7a.65.65,0,0,0,1.3,0V11.226l4.572,3.553L26.224,23.194a.65.65,0,1,0,.8,1.027l10.667-8.283V36.679Z" transform="translate(-0.001 -0.004)"/>
                    <path id="Path_4363" data-name="Path 4363" d="M169.17,78.634v-2.6a7.8,7.8,0,1,0-7.8,7.8.65.65,0,1,0,0-1.3,6.5,6.5,0,1,1,6.5-6.5v2.6a1.3,1.3,0,1,1-2.6,0v-2.6a.65.65,0,1,0-1.3,0,2.6,2.6,0,1,1-2.6-2.6.65.65,0,0,0,0-1.3A3.9,3.9,0,1,0,164,78.908a2.592,2.592,0,0,0,5.171-.274Z" transform="translate(-141.879 -63.041)" fill="#97144d"/>
                  </g>
                </svg>
			  </span>
              <h4 class="nodal_card_header">write here</h4>
              <p class="nodal_card_description">Click here to send an email to our Nodal Officer</p>
            </a>
            <a href="https://www.axisbank.com/docs/default-source/grievance/grievance-form_grievance-form-version-3.pdf?sfvrsn=4" class="nodal_card">
              <span class="nodal_card_icon">
				
				<svg xmlns="http://www.w3.org/2000/svg" width="39.03" height="38.987" viewBox="0 0 39.03 38.987">
                  <g id="send_letter" transform="translate(0 -0.277)">
                    <g id="Group_1356" data-name="Group 1356" transform="translate(0 0.277)">
                      <g id="Group_1355" data-name="Group 1355" transform="translate(0 0)">
                        <path id="Path_5207" data-name="Path 5207" d="M26.641,21.07a.65.65,0,0,0-.65.65V37.314a.65.65,0,0,1-.65.65H1.949a.65.65,0,0,1-.65-.65V2.226a.65.65,0,0,1,.65-.65H25.341a.65.65,0,0,1,.65.65v3.9a.65.65,0,1,0,1.3,0v-3.9A1.949,1.949,0,0,0,25.341.277H1.949A1.949,1.949,0,0,0,0,2.226V37.314a1.949,1.949,0,0,0,1.949,1.949H25.341a1.949,1.949,0,0,0,1.949-1.949V21.72A.65.65,0,0,0,26.641,21.07Z" transform="translate(0 -0.277)"/>
                        <path id="Path_5208" data-name="Path 5208" d="M84.54,17.453a3.249,3.249,0,0,0-4.585-.01h0L75.679,21.72,53.308,44.092c-.007.006-.008.014-.014.02a.645.645,0,0,0-.123.183l-.005.011-2.752,6.421a.65.65,0,0,0,.6.906.643.643,0,0,0,.256-.053l6.421-2.752.011-.005a.63.63,0,0,0,.183-.123c.006-.006.014-.008.02-.014l22.371-22.37,4.277-4.278A3.249,3.249,0,0,0,84.54,17.453Zm-32.3,32.3,1.739-4.057L56.3,48.01Zm5.2-2.441-2.757-2.757L76.139,23.1,78.9,25.855ZM79.814,24.936,77.058,22.18l1.061-1.062,2.757,2.757Zm3.819-3.815h0l-1.838,1.838L79.038,20.2l1.838-1.835a1.949,1.949,0,1,1,2.757,2.757Z" transform="translate(-46.462 -15.245)" fill="#97144d"/>
                        <path id="Path_5209" data-name="Path 5209" d="M83.392,75.818H67.8a.65.65,0,0,0,0,1.3H83.392a.65.65,0,1,0,0-1.3Z" transform="translate(-61.95 -69.97)"/>
                        <path id="Path_5210" data-name="Path 5210" d="M84.042,126.829a.65.65,0,0,0-.65-.65H67.8a.65.65,0,1,0,0,1.3H83.392A.65.65,0,0,0,84.042,126.829Z" transform="translate(-61.95 -116.432)"/>
                        <path id="Path_5211" data-name="Path 5211" d="M67.8,176.539a.65.65,0,0,0,0,1.3h11.7a.65.65,0,0,0,0-1.3Z" transform="translate(-61.95 -162.894)"/>
                      </g>
                    </g>
                  </g>
                </svg>
			  </span>
              <h4 class="nodal_card_header">Send Letter</h4>
              <p class="nodal_card_description">Download the Grievance Form and send it to the address mentioned on it
              </p>
            </a>
            <a href="https://www.axisbank.com/docs/default-source/default-document-library/list-of-nodal-officers-at-regional-offices-under-banking-ombudsman-scheme.pdf" class="nodal_card">
              <span class="nodal_card_icon">
				
				<svg xmlns="http://www.w3.org/2000/svg" width="38.987" height="38.987" viewBox="0 0 38.987 38.987">
                <g id="branch_related" transform="translate(-2 -2)">
                  <path id="Path_5212" data-name="Path 5212" d="M40.408,18.542H2.75a.557.557,0,0,1-.557-.557V13.922a.557.557,0,0,1,.269-.477L21.287,2.08a.557.557,0,0,1,.575,0L40.7,13.446a.557.557,0,0,1,.269.477v4.062A.557.557,0,0,1,40.408,18.542Zm-37.1-1.114H39.851V14.236L21.576,3.208,3.307,14.235Z" transform="translate(-0.086)"/>
                  <path id="Path_5213" data-name="Path 5213" d="M34.35,19.013a3.331,3.331,0,1,1,3.331-3.331A3.331,3.331,0,0,1,34.35,19.013Zm0-5.549a2.217,2.217,0,1,0,2.217,2.217A2.217,2.217,0,0,0,34.35,13.464Z" transform="translate(-12.857 -4.586)" fill="#97144d"/>
                  <path id="Path_5214" data-name="Path 5214" d="M59.3,34.332H53.374a1.2,1.2,0,0,1-1.2-1.2V30.257a.557.557,0,0,1,.557-.557h7.219a.557.557,0,0,1,.557.557V33.13A1.2,1.2,0,0,1,59.3,34.332Zm-6.015-3.52v2.316a.09.09,0,0,0,.089.09H59.3a.09.09,0,0,0,.089-.09V30.814Z" transform="translate(-22.228 -12.272)"/>
                  <path id="Path_5215" data-name="Path 5215" d="M59.711,48.38H54.795a.557.557,0,0,1-.557-.557V36.573a.557.557,0,0,1,.557-.557h4.916a.557.557,0,0,1,.557.557V47.823A.557.557,0,0,1,59.711,48.38Zm-4.359-1.114h3.8V37.13h-3.8Z" transform="translate(-23.144 -15.07)"/>
                  <path id="Path_5216" data-name="Path 5216" d="M59.947,60.85H52.728a.557.557,0,0,1-.557-.557V57.42a1.2,1.2,0,0,1,1.2-1.2H59.3a1.2,1.2,0,0,1,1.2,1.2v2.873a.557.557,0,0,1-.557.557Zm-6.662-1.114h6.1V57.42a.09.09,0,0,0-.089-.09H53.374a.09.09,0,0,0-.089.09Z" transform="translate(-22.228 -24.02)"/>
                  <path id="Path_5217" data-name="Path 5217" d="M36.649,34.332H30.723a1.2,1.2,0,0,1-1.2-1.2V30.257a.557.557,0,0,1,.557-.557H37.3a.557.557,0,0,1,.557.557V33.13A1.2,1.2,0,0,1,36.649,34.332Zm-6.015-3.518V33.13a.09.09,0,0,0,.089.09h5.926a.09.09,0,0,0,.089-.09V30.814Z" transform="translate(-12.193 -12.272)"/>
                  <path id="Path_5218" data-name="Path 5218" d="M37.058,48.38h-4.9a.557.557,0,0,1-.557-.557V36.573a.557.557,0,0,1,.557-.557h4.9a.557.557,0,0,1,.557.557V47.823A.557.557,0,0,1,37.058,48.38Zm-4.344-1.114H36.5V37.13H32.714Z" transform="translate(-13.114 -15.07)"/>
                  <path id="Path_5219" data-name="Path 5219" d="M37.3,60.85H30.077a.557.557,0,0,1-.557-.557V57.42a1.2,1.2,0,0,1,1.2-1.2h5.926a1.2,1.2,0,0,1,1.2,1.2v2.873A.557.557,0,0,1,37.3,60.85Zm-6.662-1.114h6.1V57.42a.09.09,0,0,0-.089-.09H30.723a.09.09,0,0,0-.089.09Z" transform="translate(-12.193 -24.02)"/>
                  <path id="Path_5220" data-name="Path 5220" d="M15,34.332H9.071a1.2,1.2,0,0,1-1.2-1.2V30.257a.557.557,0,0,1,.557-.557h7.219a.557.557,0,0,1,.557.557V33.13a1.2,1.2,0,0,1-1.2,1.2ZM8.982,30.814V33.13a.09.09,0,0,0,.089.09H15a.09.09,0,0,0,.089-.09V30.814Z" transform="translate(-2.6 -12.272)"/>
                  <path id="Path_5221" data-name="Path 5221" d="M15.414,48.38H10.457a.557.557,0,0,1-.557-.557V36.573a.557.557,0,0,1,.557-.557h4.957a.557.557,0,0,1,.557.557V47.823A.557.557,0,0,1,15.414,48.38Zm-4.4-1.114h3.843V37.13H11.014Z" transform="translate(-3.5 -15.07)"/>
                  <path id="Path_5222" data-name="Path 5222" d="M15.644,60.85H8.425a.557.557,0,0,1-.557-.557V57.42a1.2,1.2,0,0,1,1.2-1.2H15a1.2,1.2,0,0,1,1.2,1.2v2.873A.557.557,0,0,1,15.644,60.85ZM8.982,59.736h6.1V57.42A.09.09,0,0,0,15,57.33H9.071a.09.09,0,0,0-.089.09Z" transform="translate(-2.6 -24.02)"/>
                  <path id="Path_5223" data-name="Path 5223" d="M40.43,67.807H2.557A.557.557,0,0,1,2,67.25V63.093a.557.557,0,0,1,.557-.557H40.43a.557.557,0,0,1,.557.557V67.25A.557.557,0,0,1,40.43,67.807ZM3.114,66.693H39.873V63.65H3.114Z" transform="translate(0 -26.82)"/>
                </g>
              </svg>
			  </span>
              <h4 class="nodal_card_header">For branch related complaints</h4>
              <p class="nodal_card_description">Click here to get Circle Nodal Officer details</p>
            </a>
          </div>
        </div>
         <div class="principal_notes">
          <p class="notes_heading text-capitalize">notes:</p>
          <div class="notes_guide">
            <p class="notes_para">
		  We recommend that you use the above structured format to submit your complaints and
              receive an expeditious response. However, if you wish to write to us directly, you may do so at <b><a
                href="mailto: email.services@axisbank.com" class="notes_mail">email.services@axisbank.com</a></b>
		 </p>
		 <p class="notes_para">
		  Please send your queries related to CMS product (Paypro/Power Access) to <img src="/WebForms/axis-support/assetsNew/images/thumbnail_imagenopno.png" style="width: inherit; !important" alt="thumbnail_imagenopno"> and for queries related to Corporate Internet Banking, write to <b> 
		 <a href="mailto: corporate.ib@axisbank.com"><img src="/WebForms/axis-support/assetsNew/images/imgCorpIbmail.png"></a>		  
		  </b> from your registered email ID.
		</p>
            <ul class="notes_points">
              <li class="notes_point_item">
			  
			  
                To know the status of your existing complaint, you can <a href="#" style="font-size:14px;" class="highlight_notes" onclick="createPopupWin('https://mobiapp.axisbank.co.in/AxisPreLogin/home','bjhb',1093,600)">click here</a> or call us on <a href="tel:18004190068"
                  class="call">18004190068</a>
              </li>
              <li class="notes_point_item">If your issue is not resolved within 30 days, you can approach the Banking Ombudsman</li>
              <li class="notes_point_item"><a
                  href="https://application.axisbank.co.in/docs/Ombudsman_Scheme_English.pdf"
                  target="_blank" class="highlight_notes">Banking Ombudsman
                  Scheme 2006</a></li>
              <li class="notes_point_item">
                <a href="https://www.axisbank.com/docs/default-source/noticeboard/importantnotice/grievance-redressal-policy.pdf?sfvrsn=2&_ga=2.188690600.1498359946.1620366863-1848737689.1618222791"
                  target="_blank" class="highlight_notes">Grievance Redressal
                  Policy</a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Operating_Guideline_on_Customer_Complaints.pdf"
                  target="_blank" class="highlight_notes">Operating Guideline on
                  Customer Complaints
                </a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Turnaround_Times.pdf" target="_blank"
                  class="highlight_notes">Turnaround Times</a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Roles_and_Responsibilities_of_PNO.pdf" target="_blank"
                  class="highlight_notes">Roles and
                  Responsibilities of PNO
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
<!-- principal nodal officer modal -->
  <div class="modal_container principal_nodal_officer_modal">
    <div class="modal_content ">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="principal_nodal_modal_content">
        <div class="container_principal_nodal">
          <h3 class="principal_nodal_content_header">Escalate to <span class="bold">Principal Nodal Officer</span></h3>
          <p class="principal_nodal_content_description">Not satisfied with second level response then connect with our
            Principal Nodal Officer using below option</p>
          <div class="principal_nodal_card_wrapper">
            <a href="LogAQuery.aspx?Level=3" class="principal_nodal_card">
              <span class="principal_nodal_card_icon">
				
				<svg id="write_here" xmlns="http://www.w3.org/2000/svg" width="38.987" height="38.987" viewBox="0 0 38.987 38.987">
                  <g id="Group_1353" data-name="Group 1353" transform="translate(0 0)">
                    <path id="Path_4362" data-name="Path 4362" d="M38.981,14.909a.614.614,0,0,0-.027-.132.65.65,0,0,0-.037-.112.583.583,0,0,0-.065-.1.613.613,0,0,0-.086-.1c-.01-.009-.015-.021-.026-.031L32.49,9.581V4.551A1.95,1.95,0,0,0,30.541,2.6H23.5L20.679.412a1.927,1.927,0,0,0-2.37,0L15.489,2.6H8.447A1.949,1.949,0,0,0,6.5,4.551v5.03L.25,14.434c-.011.009-.016.021-.026.031a.61.61,0,0,0-.086.1.58.58,0,0,0-.065.1.641.641,0,0,0-.037.112.616.616,0,0,0-.027.13c0,.014-.008.025-.008.039v22.1a1.928,1.928,0,0,0,.381,1.147c0,.006,0,.013.009.018s.014.011.021.018a1.94,1.94,0,0,0,1.536.766h35.09a1.94,1.94,0,0,0,1.541-.769c.005-.006.013-.008.018-.015s.005-.012.009-.018a1.928,1.928,0,0,0,.381-1.147V14.948C38.988,14.934,38.981,14.922,38.981,14.909ZM19.1,1.437a.623.623,0,0,1,.775,0l1.5,1.164H17.609ZM2.112,37.692,19.1,24.493a.624.624,0,0,1,.775,0l17,13.2Zm35.577-1.013L20.679,23.468a1.928,1.928,0,0,0-2.37,0L1.3,36.679V15.937l10.649,8.269a.65.65,0,0,0,.8-1.027l-10.818-8.4L6.5,11.226v5.021a.65.65,0,0,0,1.3,0V4.551a.65.65,0,0,1,.65-.65H30.541a.65.65,0,0,1,.65.65v11.7a.65.65,0,0,0,1.3,0V11.226l4.572,3.553L26.224,23.194a.65.65,0,1,0,.8,1.027l10.667-8.283V36.679Z" transform="translate(-0.001 -0.004)"/>
                    <path id="Path_4363" data-name="Path 4363" d="M169.17,78.634v-2.6a7.8,7.8,0,1,0-7.8,7.8.65.65,0,1,0,0-1.3,6.5,6.5,0,1,1,6.5-6.5v2.6a1.3,1.3,0,1,1-2.6,0v-2.6a.65.65,0,1,0-1.3,0,2.6,2.6,0,1,1-2.6-2.6.65.65,0,0,0,0-1.3A3.9,3.9,0,1,0,164,78.908a2.592,2.592,0,0,0,5.171-.274Z" transform="translate(-141.879 -63.041)" fill="#97144d"/>
                  </g>
                </svg>
			  </span>
              <h4 class="principal_nodal_card_header">write here</h4>
              <p class="principal_nodal_card_description">Click here to send an email to our Principal Nodal Officer on email ID <img src="/WebForms/axis-support/assetsNew/images/imgPNOmail.png" style="width:inherit"></p>
            </a>
            <a href="https://www.axisbank.com/docs/default-source/grievance/complaint-form_complaint-form-version-3.pdf?sfvrsn=4" class="principal_nodal_card">
              <span class="principal_nodal_card_icon">
				
				<svg xmlns="http://www.w3.org/2000/svg" width="39.03" height="38.987" viewBox="0 0 39.03 38.987">
                  <g id="send_letter" transform="translate(0 -0.277)">
                    <g id="Group_1356" data-name="Group 1356" transform="translate(0 0.277)">
                      <g id="Group_1355" data-name="Group 1355" transform="translate(0 0)">
                        <path id="Path_5207" data-name="Path 5207" d="M26.641,21.07a.65.65,0,0,0-.65.65V37.314a.65.65,0,0,1-.65.65H1.949a.65.65,0,0,1-.65-.65V2.226a.65.65,0,0,1,.65-.65H25.341a.65.65,0,0,1,.65.65v3.9a.65.65,0,1,0,1.3,0v-3.9A1.949,1.949,0,0,0,25.341.277H1.949A1.949,1.949,0,0,0,0,2.226V37.314a1.949,1.949,0,0,0,1.949,1.949H25.341a1.949,1.949,0,0,0,1.949-1.949V21.72A.65.65,0,0,0,26.641,21.07Z" transform="translate(0 -0.277)"/>
                        <path id="Path_5208" data-name="Path 5208" d="M84.54,17.453a3.249,3.249,0,0,0-4.585-.01h0L75.679,21.72,53.308,44.092c-.007.006-.008.014-.014.02a.645.645,0,0,0-.123.183l-.005.011-2.752,6.421a.65.65,0,0,0,.6.906.643.643,0,0,0,.256-.053l6.421-2.752.011-.005a.63.63,0,0,0,.183-.123c.006-.006.014-.008.02-.014l22.371-22.37,4.277-4.278A3.249,3.249,0,0,0,84.54,17.453Zm-32.3,32.3,1.739-4.057L56.3,48.01Zm5.2-2.441-2.757-2.757L76.139,23.1,78.9,25.855ZM79.814,24.936,77.058,22.18l1.061-1.062,2.757,2.757Zm3.819-3.815h0l-1.838,1.838L79.038,20.2l1.838-1.835a1.949,1.949,0,1,1,2.757,2.757Z" transform="translate(-46.462 -15.245)" fill="#97144d"/>
                        <path id="Path_5209" data-name="Path 5209" d="M83.392,75.818H67.8a.65.65,0,0,0,0,1.3H83.392a.65.65,0,1,0,0-1.3Z" transform="translate(-61.95 -69.97)"/>
                        <path id="Path_5210" data-name="Path 5210" d="M84.042,126.829a.65.65,0,0,0-.65-.65H67.8a.65.65,0,1,0,0,1.3H83.392A.65.65,0,0,0,84.042,126.829Z" transform="translate(-61.95 -116.432)"/>
                        <path id="Path_5211" data-name="Path 5211" d="M67.8,176.539a.65.65,0,0,0,0,1.3h11.7a.65.65,0,0,0,0-1.3Z" transform="translate(-61.95 -162.894)"/>
                      </g>
                    </g>
                  </g>
                </svg> 
			  </span>
              <h4 class="principal_nodal_card_header">Send Letter</h4>
              <p class="principal_nodal_card_description">Download the Grievance Form and send it to the address
                mentioned
                on it</p>
              </a>
          </div>
        </div>

         <div class="principal_notes">
          <p class="notes_heading text-capitalize">notes:</p>
          <div class="notes_guide">
            <p class="notes_para">
		  We recommend that you use the above structured format to submit your complaints and
              receive an expeditious response. However, if you wish to write to us directly, you may do so at <b><a
                href="mailto: email.services@axisbank.com" class="notes_mail">email.services@axisbank.com</a></b>
		 </p>
		 <p class="notes_para">
		  Please send your queries related to CMS product (Paypro/Power Access) to <img src="/WebForms/axis-support/assetsNew/images/thumbnail_imagenopno.png" style="width: inherit; !important" alt="thumbnail_imagenopno"> and for queries related to Corporate Internet Banking, write to 
		  <a href="mailto: corporate.ib@axisbank.com"><img src="/WebForms/axis-support/assetsNew/images/imgCorpIbmail.png"></a>
				 from your registered email ID.
		</p>
            <ul class="notes_points">
              <li class="notes_point_item">
                To know the status of your existing complaint, you can <a href="#" style="font-size:14px;" class="highlight_notes" onclick="createPopupWin('https://mobiapp.axisbank.co.in/AxisPreLogin/home','bjhb',1093,600)">click here</a> or call us on <a href="tel:18004190068"
                  class="call">18004190068</a>
              </li>
              <li class="notes_point_item">If your issue is not resolved within 30 days, you can approach the Banking Ombudsman</li>
              <li class="notes_point_item"><a
                  href="https://application.axisbank.co.in/docs/Ombudsman_Scheme_English.pdf"
                  target="_blank" class="highlight_notes">Banking Ombudsman
                  Scheme 2006</a></li>
              <li class="notes_point_item">
                <a href="https://www.axisbank.com/docs/default-source/noticeboard/importantnotice/grievance-redressal-policy.pdf?sfvrsn=2&_ga=2.188690600.1498359946.1620366863-1848737689.1618222791"
                  target="_blank" class="highlight_notes">Grievance Redressal
                  Policy</a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Operating_Guideline_on_Customer_Complaints.pdf"
                  target="_blank" class="highlight_notes">Operating Guideline on
                  Customer Complaints
                </a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Turnaround_Times.pdf" target="_blank"
                  class="highlight_notes">Turnaround Times</a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Roles_and_Responsibilities_of_PNO.pdf" target="_blank"
                  class="highlight_notes">Roles and
                  Responsibilities of PNO
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  <!-- raise a complaint modal -->
 <!-- <div class="modal_container raise_complaint_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="complaint_container">
        <div id="modalDropdown" class="modalDropdown modal-dropdown-menu d-flex flex-column"
          aria-labelledby="dropdownMenuButton">
          <div class="query_section">
            <span class="modal_helper">I have a <span class="modal_bold"> complaint related</span> to</span>
            <span class="sub_dropdown_menu notruncate">
              <select id='modal1' class="select2_dropdown query js-states form-control">
                <option>volvo</option>
              </select>
            </span>
            <span class="query_step notruncate raise_modal_dropdown_wrap2" id="modal2_wrap">
              <span class="modal_helper"><span class="modal_bold">specific</span> to</span>
              <span class="sub_dropdown_menu">
                <select id='modal2' class="select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>
            <span class="query_step raise_modal_dropdown_wrap3" id="modal3_wrap">
              <span class="modal_helper">for which I have an <span class="modal_bold">issue</span></span>
              <span class="sub_dropdown_menu ">
                <select id='modal3' class="raise_modal_dropdown3 select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>
          </div>
          <div class="raise_query">
            <p class="via">via</p>
            <a type="submit" class="submit_query_btn raise_query_btn text-capitalize mr-2">email</a>
            <a  type="submit" class="submit_query_btn raise_query_btn text-capitalize">chat</a>
          </div>
          <div class="query_image">
            <img src="/WebForms/axis-support/assets_rd/images/modal.png" alt="Modal">
          </div>
        </div>
        <div class="principal_notes">
          <p class="notes_heading text-capitalize">notes:</p>
          <div class="notes_guide">
            <p class="notes_para">We recommend that you use the above structured format to submit your complaints and
              receive an expeditious response. However, if you wish to write to us directly, you may do so at <a
                href="mailto: email.services@axisbank.com" class="notes_mail">email.services@axisbank.com</a>

            </p>
            <ul class="notes_points">
              <li class="notes_point_item">
                To know the status of your existing complaint, you can call us on <a href="tel:18004190068"
                  class="call">18004190068</a>
              </li>
              <li class="notes_point_item">approach the Banking Ombudsman</li>
              <li class="notes_point_item"><a
                  href="https://www.axisbank.com/docs/default-source/default-document-library/revised-bankingombudsmanscheme.pdf?sfvrsn=0&_ga=2.188690600.1498359946.1620366863-1848737689.1618222791"
                  target="_blank" class="highlight_notes">Banking Ombudsman
                  Scheme 2006</a></li>
              <li class="notes_point_item">
                <a href="https://www.axisbank.com/docs/default-source/noticeboard/importantnotice/grievance-redressal-policy.pdf?sfvrsn=2&_ga=2.188690600.1498359946.1620366863-1848737689.1618222791"
                  target="_blank" class="highlight_notes">Grievance Redressal
                  Policy</a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Operating_Guideline_on_Customer_Complaints.pdf"
                  target="_blank" class="highlight_notes">Operating Guideline on
                  Customer Complaints
                </a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Turnaround_Times.pdf" target="_blank"
                  class="highlight_notes">Turnaround Times</a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Roles_and_Responsibilities_of_PNO.pdf" target="_blank"
                  class="highlight_notes">Roles and
                  Responsibilities of PNO
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>-->
  <!-- reach us here modal -->
  
  <!-- reach us here start modal old file code 13032023-->
  
    <!-- reach us here modal -->
  <div class="modal_container chat_agent_modal" id="chatagentpopup">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="complaint_container">
        <div id="agentDropdown" class="modalDropdown modal-dropdown-menu d-flex flex-column"
          aria-labelledby="dropdownMenuButton">
          <div class="query_section">
            <span class="modal_helper">Chat with agent for Product</span>
            <span class="sub_dropdown_menu notruncate">
			<select name="ctl00$ContentPlaceHolder1$product1$ddlProductChat" id="ddlProductChat" title="Start selection here" class="select2_dropdown query js-states form-control Complaint_Product" onchange="GetsubProductForChat();">
		<option value="0">Start selection here</option>
		<option value="24">Report A Fraud Or Dispute</option>
		<option value="1">Bank Accounts</option>
		<option value="23">Cards</option>
		<option value="2">Loans</option>
		<option value="37">Digital Banking</option>
		<option value="14">EDGE REWARD Program</option>
		<option value="34">ATM And Cash Deposit Machines</option>
		<option value="33">Deposits</option>

	</select>
			 
			
              
            </span>
            <span class="query_step agent2_query_wrap notruncate" id="agent2_query">
              <span class="modal_helper"><span class="modal_bold">specific</span> to</span>
              <span class="sub_dropdown_menu">
			    <select name="ctl00$ContentPlaceHolder1$product1$ddlsubproductchat" id="ddlsubproductchat" title="Continue Selecting" class="select2_dropdown query js-states form-control Complaint_SubProduct" onchange="GetIssueChat();">
		<option selected="selected" value="0">Continue Selecting</option>

	</select>
             
              </span>
            </span>
            <span class="query_step agent3_query_wrap notruncate" id="agent3_query">
              <span class="modal_helper">for which I have an <span class="modal_bold">issue</span></span>
              <span class="sub_dropdown_menu">
			  
			  <select name="ctl00$ContentPlaceHolder1$product1$ddlissuechat" id="ddlissuechat" title="Choose your Query" class="select2_dropdown query js-states form-control Complaint_Issue" onchange="GetSubIssueChat();">
		<option selected="selected" value="0">Continue Selecting</option>

	</select>
                                     
									
            
              </span>
            </span>
            <span class="query_step notruncate agent4_query_wrap" id="agent4_query">
              <span class="modal_helper">with sub issue</span>
              <span class="sub_dropdown_menu">
			  
			    <select name="ctl00$ContentPlaceHolder1$product1$ddlsubissuechat" id="ddlsubissuechat" title="Select Specifics" class="select2_dropdown query js-states form-control Complaint_SubIssue">
		<option selected="selected" value="0">Select Specifics</option>

	</select>
                                     
               
              </span>
            </span>

          </div>
          <div class="raise_query">
            <p class="via">via</p>
         
			 <a onclick="return AgentChatClick();" id="link_Agentchat" class="agent raise_query_btn text-capitalize" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentPlaceHolder1$product1$link_Agentchat&quot;, &quot;&quot;, true, &quot;Chat&quot;, &quot;&quot;, false, true))">Chat</a>
			 <span id="lblchatError" class="error-message" style="padding-top:20px;display:block"></span>
          </div>
        </div>
        <div class="query_image">
          <img src="/WebForms/axis-support/assetsNew/images/modal.png" alt="Modal">
        </div>
      </div>
      
    </div>
  </div>
  
  <div class="modal_container speak_us_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="complaint_container">
        <div id="speakDropdown" class="modalDropdown modal-dropdown-menu d-flex flex-column"
          aria-labelledby="dropdownMenuButton">
          <div class="query_section">
            <span class="modal_helper">Speak with us for product</span>
            <span class="sub_dropdown_menu notruncate">
			
			<select name="ctl00$ContentPlaceHolder1$product1$ddlProductspeak" id="ddlProductspeak" title="Start selection here" class="select2_dropdown query js-states form-control Complaint_Product" onchange="GetsubProductForSpeaks();">
		<option value="0">Start selection here</option>
		<option value="24">Report A Fraud Or Dispute</option>
		<option value="1">Bank Accounts</option>
		<option value="23">Cards</option>
		<option value="2">Loans</option>
		<option value="37">Digital Banking</option>
		<option value="14">EDGE REWARD Program</option>
		<option value="34">ATM And Cash Deposit Machines</option>
		<option value="33">Deposits</option>
		<option value="8">Business Banking Services</option>
		<option value="18">Remittances</option>
		<option value="38">Insurance</option>

	</select>
			 
			
			
             
            </span>
            <span class="query_step speak2_query_wrap notruncate" id="speak2_query">
              <span class="modal_helper"><span class="modal_bold">specific</span> to</span>
              <span class="sub_dropdown_menu">
				 <select name="ctl00$ContentPlaceHolder1$product1$ddlsubproductspeak" id="ddlsubproductspeak" title="Continue Selecting" class="select2_dropdown query js-states form-control Complaint_SubProduct" onchange="GetIssuespeak();">
		<option selected="selected" value="0">Continue Selecting</option>

	</select>
			  
               
              </span>
            </span>
            <span class="query_step speak3_query_wrap notruncate" id="speak3_query">
              <span class="modal_helper">for which I have an <span class="modal_bold">issue</span></span>
              <span class="sub_dropdown_menu">
				
				 <select name="ctl00$ContentPlaceHolder1$product1$ddlissuespeak" id="ddlissuespeak" title="Choose your Query" class="select2_dropdown query js-states form-control Complaint_Issue" onchange="GetSubIssueSpeak();">
		<option selected="selected" value="0">Continue Selecting</option>

	</select>
                                     
									
			  
              
              </span>
            </span>
            <span class="query_step notruncate speak4_query_wrap" id="speak4_query">
              <span class="modal_helper">with sub issue</span>
              <span class="sub_dropdown_menu">
			  
			   <select name="ctl00$ContentPlaceHolder1$product1$ddlsubissuespeak" id="ddlsubissuespeak" title="Select Specifics" class="select2_dropdown query js-states form-control Complaint_SubIssue">
		<option selected="selected" value="0">Select Specifics</option>

	</select>
                                     
            
                </select>
              </span>
            </span>

          </div>
          <div class="raise_query">
          
			 <a onclick="return AgentSpeakClick();" id="link_AgentSpeak" class="agent raise_query_btn text-capitalize" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentPlaceHolder1$product1$link_AgentSpeak&quot;, &quot;&quot;, true, &quot;Speak&quot;, &quot;&quot;, false, true))">Call</a>
			 <span id="lblspeakError" class="error-message" style="padding-top:20px;display:block"></span>
          </div>
		  
		 <div style="font-size: 0.875rem;font-family: lato-regular;color: #171717;">
			Unlock the answers to your questions with a click - explore Our self-help Video Library now!				   
			<a onclick="createPopupWin('https://axisbank.com/videos-page/videos.html','bjhb',1093,600)" style="color: #97144D; font-family: lato-regular; font-size:14px; !important">Click Here 
			</a>
		</div>

        </div>
        <div class="query_image">
          <img src="/WebForms/axis-support/assetsNew/images/modal.png" alt="Modal">
        </div>
      </div>
      
    </div>
  </div>
  
  <div class="modal_container connect_email_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="complaint_container">
        <div id="emailDropdown" class="modalDropdown modal-dropdown-menu d-flex flex-column"
          aria-labelledby="dropdownMenuButton">
          <div class="query_section">
            <span class="modal_helper">Connect via email for product</span>
            <span class="sub_dropdown_menu notruncate">
			
			<select name="ctl00$ContentPlaceHolder1$product1$ddlProductemail" id="ddlProductemail" title="Start selection here" class="select2_dropdown query js-states form-control Complaint_Product" onchange="GetsubProductForEmail();">
		<option value="0">Start selection here</option>
		<option value="24">Report A Fraud Or Dispute</option>
		<option value="1">Bank Accounts</option>
		<option value="23">Cards</option>
		<option value="2">Loans</option>
		<option value="37">Digital Banking</option>
		<option value="14">EDGE REWARD Program</option>
		<option value="34">ATM And Cash Deposit Machines</option>
		<option value="33">Deposits</option>
		<option value="18">Remittances</option>

	</select>
			 
             
            </span>
            <span class="query_step email2_query_wrap notruncate" id="email2_query">
              <span class="modal_helper"><span class="modal_bold">specific</span> to</span>
              <span class="sub_dropdown_menu">
			  
			  <select name="ctl00$ContentPlaceHolder1$product1$ddlsubproductemail" id="ddlsubproductemail" title="Continue Selecting" class="select2_dropdown query js-states form-control Complaint_SubProduct" onchange="GetIssueEmail();">
		<option selected="selected" value="0">Continue Selecting</option>

	</select>
                
              </span>
            </span>
            <span class="query_step email3_query_wrap notruncate" id="email3_query">
              <span class="modal_helper">for which I have an <span class="modal_bold">issue</span></span>
              <span class="sub_dropdown_menu">
			  
			  <select name="ctl00$ContentPlaceHolder1$product1$ddlissueemail" id="ddlissueemail" title="Choose your Query" class="select2_dropdown query js-states form-control Complaint_Issue" onchange="GetSubIssueEmail();">
		<option selected="selected" value="0">Continue Selecting</option>

	</select>
                                     
			  
                
              </span>
            </span>
            <span class="query_step notruncate email4_query_wrap" id="email4_query">
              <span class="modal_helper">with sub issue</span>
              <span class="sub_dropdown_menu">
			  
			    <select name="ctl00$ContentPlaceHolder1$product1$ddlsubissueemail" id="ddlsubissueemail" title="Select Specifics" class="select2_dropdown query js-states form-control Complaint_SubIssue">
		<option selected="selected" value="0">Select Specifics</option>

	</select>
                                     
               
              </span>
            </span>

          </div>
          <div class="raise_query">
            <p class="via">via</p>
          
		  <a onclick="return AgentChatClick_ForEmailOption();" id="link_Agentchat1" class="agent raise_query_btn text-capitalize" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentPlaceHolder1$product1$link_Agentchat1&quot;, &quot;&quot;, true, &quot;Chat&quot;, &quot;&quot;, false, true))">Chat</a>
		  
			 
			 <a onclick="return AgentEmailClick();" id="link_Agentemail" class="agent raise_query_btn text-capitalize" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentPlaceHolder1$product1$link_Agentemail&quot;, &quot;&quot;, true, &quot;Email&quot;, &quot;&quot;, false, true))" style="margin-left:25px;">Email</a>
			 
			 
			 <span id="lblemailError" class="error-message" style="padding-top:20px;display:block;color:red;font-weight:900"></span>
			 <br>
			 <!--<p>For Demat & Trading account related queries, please <a href="https://simplehai.axisdirect.in/contactus" target="_blank">click here</a></p>-->
			 <p>For Demate & Trading account related queries as well as regarding its relevant charges, please <a href="https://simplehai.axisdirect.in/contactus" target="_blank">click here</a></p>
			<p style="color:#97144d;">For an Instant Response to your query, you may also CHAT with our executive.<br>
			   * Chat window: 7:00 am to 11:00 pm <br>
			   * For NRI customers: 24 by 7
			</p>
			<!--<p>Greetings from Axis Bank. There may be a delay in response on 10th May'23 due to elections in certain regions of India. We request your support and cooperation in the interim. Thank you.</p>-->
          </div>
        </div>
        <div class="query_image">
          <img src="/WebForms/axis-support/assetsNew/images/modal.png" alt="Modal">
        </div>
      </div>
      <!-- <div class="principal_notes">
        <p class="notes_heading text-capitalize">notes:</p>
        <div class="notes_guide">
          <p class="notes_para">We recommend that you use the above structured format to submit your complaints
            and
            receive an expeditious response. However, if you wish to write to us directly, you may do so at <a
              href="mailto: email.services@axisbank.com" class="notes_mail">email.services@axisbank.com</a>
		  <span class="d-block">
              To know the status of your existing complaint, you can call us on 18004190068
            </span>
            <span class="d-block">If your issue is not resolved within 30 days, you can approach the Banking
              Ombudsman</span>
          </p>
        </div>
      </div> -->
    </div>
  </div>
  
  <!-- raise a complaint modal -->
  <div class="modal_container raise_complaint_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="complaint_container">
        <div id="modalDropdown" class="modalDropdown modal-dropdown-menu d-flex flex-column"
          aria-labelledby="dropdownMenuButton">
          <div class="query_section">
            <span class="modal_helper">I have a <span class="modal_bold"> complaint related</span> to</span>
            <span class="sub_dropdown_menu notruncate">
			
			<select name="ctl00$ContentPlaceHolder1$product1$ddlProduct" id="ddlProduct" title="Start selection here" class="select2_dropdown query js-states form-control Complaint_Product" onchange="GetsubProductChatEmail();">
		<option value="0">Start selection here</option>
		<option value="24">Report A Fraud Or Dispute</option>
		<option value="1">Bank Accounts</option>
		<option value="23">Cards</option>
		<option value="2">Loans</option>
		<option value="37">Digital Banking</option>
		<option value="14">EDGE REWARD Program</option>
		<option value="34">ATM And Cash Deposit Machines</option>
		<option value="33">Deposits</option>
		<option value="18">Remittances</option>

	</select>
			 
			
             
              </select>
            </span>
            <span class="query_step raise_modal_dropdown_wrap2 notruncate" id="modal2_wrap">
              <span class="modal_helper"><span class="modal_bold">specific</span> to</span>
              <span class="sub_dropdown_menu">
			  
			   <select name="ctl00$ContentPlaceHolder1$product1$ddlsubproduct" id="ddlsubproduct" title="Continue Selecting" class="select2_dropdown query js-states form-control Complaint_SubProduct" onchange="GetIssueChatEmail();">
		<option selected="selected" value="0">Continue Selecting</option>

	</select>
              
              </span>
            </span>
            <span class="query_step raise_modal_dropdown_wrap3 notruncate" id="modal3_wrap">
              <span class="modal_helper">for which I have an <span class="modal_bold">issue</span></span>
              <span class="sub_dropdown_menu">
			  
			    <select name="ctl00$ContentPlaceHolder1$product1$ddlissuecomplain" id="ddlissuecomplain" title="Choose your Query" class="select2_dropdown query js-states form-control Complaint_Issue" onchange="GetButtonEnableChatEmail();">
		<option selected="selected" value="0">Choose your Query</option>

	</select>
                                     
			  
               
              </span>
            </span>

          </div>
          <div class="raise_query">
            <p class="via">via</p>
          
			
			<div id="divchat" style="display:none;margin-right:20px">
			 <a onclick="return ChatClick();" id="link_chat" class="raise_query_btn text-capitalize" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentPlaceHolder1$product1$link_chat&quot;, &quot;&quot;, true, &quot;s&quot;, &quot;&quot;, false, true))">Chat</a>
				 </div>
					<div  id="divemail" style="display:none;margin-right:20px">
				  <a onclick="return EmailClick();" id="link_email" class="raise_query_btn text-capitalize" href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$ContentPlaceHolder1$product1$link_email&quot;, &quot;&quot;, true, &quot;s&quot;, &quot;&quot;, false, true))">Email</a>
				  </div>
				   <span id="lblchat" class="error-message" style="padding-top:20px;display:block"></span>
          </div>
		   <div class="query_image">
          <img src="/WebForms/axis-support/assetsNew/images/modal.png" alt="Modal">
        </div>
        </div>
       <div class="principal_notes">
          <p class="notes_heading text-capitalize">notes:</p>
          <div class="notes_guide">
           <p class="notes_para">
		  We recommend that you use the above structured format to submit your complaints and
              receive an expeditious response. However, if you wish to write to us directly, you may do so at <b><a
                href="mailto: email.services@axisbank.com" class="notes_mail">email.services@axisbank.com</a></b>
		 </p>
		 <p class="notes_para">
		  Please send your queries related to CMS product (Paypro/Power Access) to <img src="/WebForms/axis-support/assetsNew/images/thumbnail_imagenopno.png" style="width: inherit; !important" alt="thumbnail_imagenopno"> and for queries related to Corporate Internet Banking, write to 
		  <a href="mailto: corporate.ib@axisbank.com"><img src="/WebForms/axis-support/assetsNew/images/imgCorpIbmail.png"></a>
				from your registered email ID.
		</p>
            <ul class="notes_points">
              <li class="notes_point_item">
                To know the status of your existing complaint, you can <a href="#" style="font-size:14px;" class="highlight_notes" onclick="createPopupWin('https://mobiapp.axisbank.co.in/AxisPreLogin/home','bjhb',1093,600)">click here</a> or call us on <a href="tel:18004190068"
                  class="call">18004190068</a>
              </li>
              <li class="notes_point_item">If your issue is not resolved within 30 days, you can approach the Banking Ombudsman</li>
              <li class="notes_point_item"><a
                  href="https://application.axisbank.co.in/docs/Ombudsman_Scheme_English.pdf"
                  target="_blank" class="highlight_notes">Banking Ombudsman
                  Scheme 2006</a></li>
              <li class="notes_point_item">
                <a href="https://www.axisbank.com/docs/default-source/noticeboard/importantnotice/grievance-redressal-policy.pdf?sfvrsn=2&_ga=2.188690600.1498359946.1620366863-1848737689.1618222791"
                  target="_blank" class="highlight_notes">Grievance Redressal
                  Policy</a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Operating_Guideline_on_Customer_Complaints.pdf"
                  target="_blank" class="highlight_notes">Operating Guideline on
                  Customer Complaints
                </a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Turnaround_Times.pdf" target="_blank"
                  class="highlight_notes">Turnaround Times</a>
              </li>
              <li class="notes_point_item">
                <a href="https://application.axisbank.co.in/docs/Roles_and_Responsibilities_of_PNO.pdf" target="_blank"
                  class="highlight_notes">Roles and
                  Responsibilities of PNO
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
	</div>
    </div>
  
     <div class="modal_container contact_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="contact_container ">
	  
	 <span class="modal_helper">Speak with us for product test</span>
       <div class="numbers">		
			<!--<img src="/WebForms/axis-support/assetsNew/images/phone-call.svg" class="contact_icon" alt="contact">	   -->
			<!---->
			<!--<a class="contact_link" href="tel: 1860-419-5555"> 1860-419-5555</a>-->
			
			<span id="lblspeak" class="contact_link"></span>
			
		</div>
        
       
      </div>
    </div>
	
	  <!-- Annoucement Popup Start By Yogesh on 5/03/2022--> 
  <center>
		<div class="modal fade" id="popup_touchpoint" style="padding-top: 8%;">
		  <div class="modal-dialog modal-xl" style="max-width:557px" role="document">
			<div class="modal-content">
				<div class="modal-header">
				 
				 <button type="button" class="close" data-dismis="modal" onclick="touchpointClose();">&times</button>
				
				</div>
				<div class="modal-body">
				 <a href="https://www.axisbank.com/contact-us" ><img src="/WebForms/axis-support/assetsNew/images/MB-Push-Banner-512-256.jpg"></a>
			</div>
			</div>			
		  </div>    
		</div>
	</center>
  <!-- Annoucement Popup End By Yogesh on 5/03/2022--> 
  
  <!-- reach us here end modal old file code 13032023-->
  
  <!--<div class="modal_container chat_agent_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="complaint_container">
        <div id="agentDropdown" class="modalDropdown modal-dropdown-menu d-flex flex-column"
          aria-labelledby="dropdownMenuButton">
          <div class="query_section">
            <span class="modal_helper">Chat with agent for Product</span>
            <span class="sub_dropdown_menu">
              <select id='agent1' class="select2_dropdown query js-states form-control">
                <option></option>
              </select>
            </span>
            <span class="query_step agent2_query_wrap" id="agent2_query">
              <span class="modal_helper"><span class="modal_bold">specific</span> to</span>
              <span class="sub_dropdown_menu">
                <select id='agent2' class="select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>
            <span class="query_step agent3_query_wrap" id="agent3_query">
              <span class="modal_helper">for which I have an <span class="modal_bold">issue</span></span>
              <span class="sub_dropdown_menu">
                <select id='agent3' class="select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>
            <span class="query_step notruncate agent4_query_wrap" id="agent4_query">
              <span class="modal_helper">with sub issue</span>
              <span class="sub_dropdown_menu">
                <select id='agent4' class="agent4 select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>

          </div>
          <div class="raise_query">
            <p class="via">via</p>
            <a href="javascript:void(0)" id="agent" class="submit_query_btn agent raise_query_btn text-capitalize">chat</a>
          </div>
        </div>
        <div class="query_image">
          <img src="/WebForms/axis-support/assets_rd/images/modal.png" alt="Modal">
        </div>
      </div>
     
    </div>
  </div>
  <div class="modal_container speak_us_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="complaint_container">
        <div id="speakDropdown" class="modalDropdown modal-dropdown-menu d-flex flex-column"
          aria-labelledby="dropdownMenuButton">
          <div class="query_section">
            <span class="modal_helper">Speak with us for product</span>
            <span class="sub_dropdown_menu">
              <select id='speak1' class="select2_dropdown query js-states form-control">
                <option></option>
              </select>
            </span>
            <span class="query_step speak2_query_wrap" id="speak2_query">
              <span class="modal_helper"><span class="modal_bold">specific</span> to</span>
              <span class="sub_dropdown_menu">
                <select id='speak2' class="select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>
            <span class="query_step speak3_query_wrap" id="speak3_query">
              <span class="modal_helper">for which I have an <span class="modal_bold">issue</span></span>
              <span class="sub_dropdown_menu">
                <select id='speak3' class="select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>
            <span class="query_step notruncate speak4_query_wrap" id="speak4_query">
              <span class="modal_helper">with sub issue</span>
              <span class="sub_dropdown_menu">
                <select id='speak4' class="speak4 select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>

          </div>
          <div class="raise_query">
            <a href="javascript:void(0)" id="speak" class="submit_query_btn speak raise_query_btn text-capitalize mr-2">submit</a>
          </div>
        </div>
        <div class="query_image">
          <img src="/WebForms/axis-support/assets_rd/images/modal.png" alt="Modal">
        </div>
      </div>
    </div>
  </div>-->
  
  <!--<div class="modal_container contact_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="contact_container ">
        <div class="numbers">
          <img src="/WebForms/axis-support/assets_rd/images/phone-call.svg" class="contact_icon" alt="contact">
          <a href="tel:98989899" class="contact_link">98989898</a>
        </div>
        <div class="numbers">
          <img src="/WebForms/axis-support/assets_rd/images/phone-call.svg" class="contact_icon" alt="contact">
          <a href="tel:98989899" class="contact_link">98989898</a>
        </div>
        <div class="numbers">
          <img src="/WebForms/axis-support/assets_rd/images/phone-call.svg" class="contact_icon" alt="contact">
          <a href="tel:98989899" class="contact_link">98989898</a>
        </div>
        <div class="numbers">
          <img src="/WebForms/axis-support/assets_rd/images/phone-call.svg" class="contact_icon" alt="contact">
          <a href="tel:98989899" class="contact_link">98989898</a>
        </div>
       
      </div>
    </div>
  </div>-->
 <!-- <div class="modal_container connect_email_modal">
    <div class="modal_content">
      <div class="close d-inline-block">
        <span class="icon-close"></span>
      </div>
      <div class="complaint_container">
        <div id="emailDropdown" class="modalDropdown modal-dropdown-menu d-flex flex-column"
          aria-labelledby="dropdownMenuButton">
          <div class="query_section">
            <span class="modal_helper">Connect via email for product</span>
            <span class="sub_dropdown_menu">
              <select id='email1' class="select2_dropdown query js-states form-control">
                <option></option>
              </select>
            </span>
            <span class="query_step email2_query_wrap" id="email2_query">
              <span class="modal_helper"><span class="modal_bold">specific</span> to</span>
              <span class="sub_dropdown_menu">
                <select id='email2' class="select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>
            <span class="query_step email3_query_wrap" id="email3_query">
              <span class="modal_helper">for which I have an <span class="modal_bold">issue</span></span>
              <span class="sub_dropdown_menu">
                <select id='email3' class="select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>
            <span class="query_step notruncate email4_query_wrap" id="email4_query">
              <span class="modal_helper">with sub issue</span>
              <span class="sub_dropdown_menu">
                <select id='email4' class="email4 select2_dropdown query js-states form-control">
                  <option></option>
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </span>
            </span>

          </div>
          <div class="raise_query">
            <p class="via">via</p>
            <a href="javascript:void(0)" id="email" class="submit_query_btn email raise_query_btn text-capitalize mr-2">email</a>
          </div>
        </div>
        <div class="query_image">
          <img src="/WebForms/axis-support/assets_rd/images/modal.png" alt="Modal">
        </div>
      </div>
	  
    </div>
  </div>-->

  <!-- modal end here  -->

  <div class="credit_modal_2 modal_email">
    <div class="credit_modal_content">
      <div class="internet_banking">
        <p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your email ID:
            <span class="d-block follow_light">
              Click on Services >> Insta Services >> Enter Code received through SMS >> Select Contact >> Click on Update Email ID >> Enter Email ID >> Update
            </span>
          </span>
        </div>
      </div>
      <div class="confirmation_buttons">
        <p class="confirm_text ">Do you want to continue?</p>
        <div class="btn_option">
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_open_email text-capitalize">yes</a>
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_close text-capitalize">no</a>
        </div>
      </div>
    </div>
  </div>
  <div class="credit_modal_2 modal_address">
    <div class="credit_modal_content">
      <div class="internet_banking">
        <p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your address:
            <span class="d-block follow_light">
              Click on Services >> Insta Services >> Enter Code received through SMS >> Select Contact >> Click on Update Address >> Enter Address >> Update
            </span>
          </span>
        </div>
      </div>
      <div class="confirmation_buttons">
        <p class="confirm_text ">Do you want to continue?</p>
        <div class="btn_option">
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_open_address text-capitalize">yes</a>
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_close text-capitalize">no</a>
        </div>
      </div>
    </div>
  </div>
  <div class="credit_modal_2 modal_debit">
    <div class="credit_modal_content">
      <div class="internet_banking">
        <p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your Debit Card PIN:
            <span class="d-block follow_light">
              Click on Accounts >> My Debit Cards >> Click on More Services >> Select Set Debit Card PIN >> Enter New PIN & Expiry Date >> Enter Netsecure Code
            </span>
          </span>
        </div>
      </div>
      <div class="confirmation_buttons">
        <p class="confirm_text ">Do you want to continue?</p>
        <div class="btn_option">
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_open_debit text-capitalize">yes</a>
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_close text-capitalize">no</a>
        </div>
      </div>
    </div>
  </div>
  <div class="credit_modal_2 modal_credit">
    <div class="credit_modal_content">
      <div class="internet_banking">
        <p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your Credit Card PIN:
            <span class="d-block follow_light">
              Click on Accounts >> My Debit Cards >> Click on More Services >> Select Set Debit Card PIN >> Enter New PIN & Expiry Date >> Enter Netsecure Code
            </span>
          </span>
        </div>
      </div>
      <div class="confirmation_buttons">
        <p class="confirm_text ">Do you want to continue?</p>
        <div class="btn_option">
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_open_credit text-capitalize">yes</a>
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_close text-capitalize">no</a>
        </div>
      </div>
    </div>
  </div>
  <div class="credit_modal_2 modal_loan">
    <div class="credit_modal_content">
      <div class="internet_banking">
        <p class="internet_header">You will be redirected to Internet Banking Login Page.</p>
        <div class="internet_content">
          <span class="d-block follow_bold">Follow the below path to update your Repayment Schedule:
            <span class="d-block follow_light">
              Home Page >> Click on Accounts >> Click on Loans >> Select Loan Account No.>> Select ‘View Repayment Schedule’
            </span>
          </span>
        </div>
      </div>
      <div class="confirmation_buttons">
        <p class="confirm_text ">Do you want to continue?</p>
        <div class="btn_option">
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_open_loan text-capitalize">yes</a>
          <a href="javascript:void(0)" class="confirm_btn internet_banking_btn_close text-capitalize">no</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Overlay for searchbar -->
  <div class="overlay-searchbar" id="overlay-searchbar"></div>

  <!--container end
  <script src="./assets/css/jquery.js"></script>
  <script src="./assets/js/select2-4.1.0-rc.0/select2-4.1.0-rc.0/dist/js/select2.min.js"></script>
  <script src="./assets/css/bootstrap/bootstrap-popper.js"></script>
  <script src="./assets/css/bootstrap/bootstrap.bundle.min.js"></script>
  <script src="./assets/css/bootstrap/bootstrap.min.js"></script>
  <script src="./assets/css/OwlCarousel/OwlCarousel2-2.3.4/dist/owl.carousel.min.js"></script>
  <script src="./assets/js/classie.js"></script>
  <script src="./assets/js/dynamics.min.js"></script>
  <script src="./assets/js/yudaAnimation.js"></script>
  <script src="./assets/js/script.js"></script>

<!-- slider of heading content -->


<script src="/WebForms/axis-support/assets_rd/js/main_prod.js"></script>
 
<script>

/* Contrast button code 
  document.getElementById('excontrast_btn').addEventListener('click', function(){ 
    document.getElementById("main_body").classList.add('black_theme');
  });*/
  
	 /*Additional information cards open all functionality */
  <!-- addInfo_cardWrapper= document.getElementById('additionalinfo-card__content'); -->

  document.getElementById('addInfo-viewAll_Btn').addEventListener('click', function(){
  addInfo_cardWrapper= document.getElementById('additionalinfo-card__content');
  console.log('addInfo_cardWrapper: ',addInfo_cardWrapper);
    addInfo_cardWrapper.style.overflowY= 'auto';
    addInfo_cardWrapper.style.paddingBottom= '10px';
  });
  document.getElementById('addInfo-viewAll_BtnMobile').addEventListener('click', function(){
  addInfo_cardWrapper= document.getElementById('additionalinfo-card__content');
    addInfo_cardWrapper.style.overflowY= 'auto';
    addInfo_cardWrapper.style.paddingBottom= '10px';
  });

	<!-- document.getElementById('addInfo-viewAll_Btn').addEventListener('click', function(){ -->
	<!-- addInfo_cardWrapper= document.getElementById('additionalinfo-card__content'); -->
	<!-- addInfo_cardWrapper.classList.add('overflowAuto'); -->
	
	<!-- <!--addInfo_cardWrapper.style.paddingBottom= '10px';-->	 -->
	<!-- }); -->
  
    $(document).ready(function () {
        $(".owl-carousel.selectionopt-carousel").owlCarousel({
            items: 2,
            margin: 20,
            nav:true,
            navText:['<img class="prev-arrow" src="/WebForms/axis-support/assets_rd/images/icons/left-arow.svg" alt="left">', '<img class="next-arrow" src="/WebForms/axis-support/assets_rd/images/icons/left-arow.svg" alt="left">'],
            dots:false,
            loop:true,
            infinite: true,
            autoplay:true,
            autoplaySpeed: 500,
            smartSpeed:500,
            autoplayHoverPause:true,
            rewind: true,
            responsive:{
              0:{
                items: 1
              },
              375:{
                items: 5
              },
              1441:{
                items: 7
              },
              1800:{
                items: 10
              }
            }
        });
        /* Latest update carousel */
        $(".owl-carousel.latestupdate-carousel").owlCarousel({
          margin: 19,
          loop:true,
          nav: false,
          dots: false,
          dotsEach: 1,
          autoplay:true,
          autoplaySpeed:500,
          smartSpeed:500,
          autoplayHoverPause:true,
          rewind: true,
          responsive:{
            1280:{
              items: 4,
              dots: true
            },
            992:{
              items: 3,
              dots: true
            },
            768: {
              items:2,
              dots: true
            },
            
            0: {
              items: 1.2
            }

          }
        });
        
        

        /* Products carousel */
        $(".owl-carousel.products-carousel__wrapper").owlCarousel({
		    margin: 23,
            autoplay:false,
            //autoplaySpeed:500,
          // autoplayTimeout:1200,		/*rs*/
            nav: true,
            dots: false,
            rewind: false,
              responsive:{
                1280:{
                  autoplay:true,
                   loop:true
              }
            }
        });

        /* search bar popup banner carousel */
        $(".owl-carousel.banner-carousel").owlCarousel({
            items:1,
            loop:true,
            nav: false,
            dots: true,
            dotsEach: 1,
            autoplay:true,
            autoplaySpeed: 400,
            smartSpeed: 400,
            autoplayHoverPause:true,
            rewind: false,
        });
  });

  /* searchbar popup code */
  searchbar= document.getElementById('searchbar');  //main search bar
  searchbar_modal= document.getElementById('searchbar-popup');  //popup searchbar
  overlay =document.getElementById('overlay-searchbar'); //overlay
  searchbarfix=document.getElementById('searchbarfix');


  searchbar.addEventListener('click', function(){
    if(searchbar.classList.contains('searchbar-close')){
      searchbar.classList.remove('searchbar-close');
      searchbar.classList.add('searchbar-open');
      searchbar_modal.style.display= 'block';
      overlay.style.display= 'block';

      searchbarfix.classList.add('searchfix');
    }
    else{
      searchbar.classList.remove('searchbar-open');
      searchbar.classList.add('searchbar-close');
      searchbar_modal.style.display= 'none';
      overlay.style.display= 'none';
      searchbarfix.classList.remove('searchfix');
    }
  });

  document.getElementById('searchbar').addEventListener('click', function(){
	var n=document.getElementById('result').value;
	if(n.length<1){	
		$(".search_val_item").hide();  
	}	
  });
  
   /* Close button of searchbar popup */
  document.getElementById('searchclose-btn').addEventListener('click', function(){
  	searchbar_modal.style.display= 'none';	//new addition
	$('.result').val('');
	$(".search_val_item").hide();
    
  });
  
  /* Close button of searchbar popup old code
  document.getElementById('searchclose-btn').addEventListener('click', function(){
  	if(searchbar.classList.contains('searchbar-open')){
      searchbar.classList.remove('searchbar-open');
      searchbar.classList.add('searchbar-close');
      searchbar_modal.style.display= 'none';
      overlay.style.display= 'none';
      searchbarfix.classList.remove('searchfix');
    }    
  });*/

  
/* download-content cards open all functionality view all*/
download_cardWrapper= document.getElementById('download-content-All');

document.getElementById('Download-viewAll_BtnMobile').addEventListener('click', function(){
 
  //this.style.display = 'none';
  if(document.getElementById('Download-viewAll_BtnMobile').classList.contains('download-close')){
    document.getElementById('Download-viewAll_BtnMobile').classList.remove('download-close');
    document.getElementById('Download-viewAll_BtnMobile').classList.add('download-open');
    // download_cardWrapper.style.overflowY= 'auto';
    download_cardWrapper.style.height= 'auto';
    document.getElementById('Download-viewAll_BtnMobile').innerText = 'Hide All';

  }
  else{
    document.getElementById('Download-viewAll_BtnMobile').classList.remove('download-open');
    document.getElementById('Download-viewAll_BtnMobile').classList.add('download-close');
    download_cardWrapper.style.height= '240px';
    document.getElementById('Download-viewAll_BtnMobile').innerText = 'View All';
  }
});

</script>

<script>
    function mobilecheck() {
      var check = false;
      (function (a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    }

    var clickeventtype = mobilecheck() ? 'touchstart' : 'click';

    (function () {

      var support = { animations: Modernizr.cssanimations },
        animEndEventNames = { 'WebkitAnimation': 'webkitAnimationEnd', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend' },
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        onEndAnimation = function (el, callback) {
          var onEndCallbackFn = function (ev) {
            if (support.animations) {
              if (ev.target != this) return;
              this.removeEventListener(animEndEventName, onEndCallbackFn);
            }
            if (callback && typeof callback === 'function') { callback.call(); }
          };
          if (support.animations) {
            el.addEventListener(animEndEventName, onEndCallbackFn);
          }
          else {
            onEndCallbackFn();
          }
        };

      function nextSibling(el) {
        var nextSibling = el.nextSibling;
        while (nextSibling && nextSibling.nodeType != 1) {
          nextSibling = nextSibling.nextSibling
        }
        return nextSibling;
      }

      var yuda = new Stack(document.getElementById('stack_yuda'));

      // controls the click ring effect on the button
      var buttonClickCallback = function (bttn) {
        var bttn = bttn || this;
        bttn.setAttribute('data-state', 'unlocked');
      };

      document.querySelector('.button--accept[data-stack = stack_yuda]').addEventListener(clickeventtype, function () { yuda.accept(buttonClickCallback.bind(this)); });

      [].slice.call(document.querySelectorAll('.button--sonar')).forEach(function (bttn) {
        bttn.addEventListener(clickeventtype, function () {
          bttn.setAttribute('data-state', 'locked');
        });
      });

      [].slice.call(document.querySelectorAll('.button--material')).forEach(function (bttn) {
        var radialAction = nextSibling(bttn.parentNode);

        bttn.addEventListener(clickeventtype, function (ev) {
          var boxOffset = radialAction.parentNode.getBoundingClientRect(),
            offset = bttn.getBoundingClientRect();

          radialAction.style.left = Number(offset.left - boxOffset.left) + 'px';
          radialAction.style.top = Number(offset.top - boxOffset.top) + 'px';

          classie.add(radialAction, classie.has(bttn, 'button--reject') ? 'material-circle--reject' : 'material-circle--accept');
          classie.add(radialAction, 'material-circle--active');
          onEndAnimation(radialAction, function () {
            classie.remove(radialAction, classie.has(bttn, 'button--reject') ? 'material-circle--reject' : 'material-circle--accept');
            classie.remove(radialAction, 'material-circle--active');
          });
        });
      });
    })();
</script>

<!-- modal End RS -->

  
  <!--<button title="Go to top">Scroll To Top</button>-->
	<a onclick="topFunction()" id="myBtn">
	  <img src="./images/scroll-arrow.png" class="scrollTopClass" >
	</a>

<script>
//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//function topFunction2() {
  //#(window).scrollTop($(".reachncomplaint-content").offset().top)
//}
</script>
<style>
#myBtn {
  display: none;
  position: fixed;
  bottom: 89px;
  right: 130px;
  z-index: 99;
  font-size: 14px;
  
  //border: 2px solid #97144D;
  outline: none;
  //background-color:  white;
  color: #97144D;
  cursor: pointer;
  padding: 9px;
  border-radius: 25px;
  padding-right:40px;
}
.scrollTopClass {
    width: 40px;
    position: fixed;
    bottom: 89px;
    right: 9px;
    margin: 0;
    z-index: 8888;
    cursor: pointer;
}
#myBtn {
  display: none;
}
</style>

<script type="text/javascript">
     $(document).ready(function(){
	 
		 $(".card-link").click(function(){
		  var ddlproduct = $("[id*=ddlProduct]");
         var ddlsubproduct = $("[id*=ddlsubproduct]");
         var ddlissue = $("[id*=ddlissuecomplain]");
		 ddlsubproduct.removeClass("select-active");
		 ddlissue.removeClass("select-active");
		//  ddlproduct.append('<option selected="selected" value="0">Start selection here</option>');
		  ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
             ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
		 });
	 });
     function GetsubProductChatEmail() {
         $("#lblchat").text('');

         //ddlsub_product.removeAttr("disabled");
         var ddlproduct = $("[id*=ddlProduct]");
         var ddlsubproduct = $("[id*=ddlsubproduct]");
         var ddlissue = $("[id*=ddlissuecomplain]");
         var pkProductId = $('#ddlProduct').val();
		 
		 //alert(pkProductId); 
         if (pkProductId == "0") {
             ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
             ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
         }
         else {
             ddlsubproduct.empty()
             ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
             $.ajax({
                 type: "POST",
                 url: "/webforms/axis-support/index.aspx/GetsubProductChatEmail",
                 data: '{pkProductId:"' + pkProductId + '",SubProductId:"0",IssueId:"0",SubIssueId:"0"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (r) {
                     var response = r.d;
                     if (response.length > 0) {
                         $("#ddlsubproduct").addClass("select-active");
                         ddlsubproduct.removeAttr("disabled");
                         ddlissue.removeClass("select-active");
                         ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');;
                         $.each(r.d, function () {
                             ddlsubproduct.append($("<option></option>").val(this['Value']).html(this['Text']));
                         });
                     }
                     else {
                         ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
                         $("#ddlsubproduct").attr("disabled", "");
                         ddlsubproduct.removeClass("select-active");//.addClass("yourClass");
                         ddlissue.removeClass("select-active");
                          GetIssueifnotsubproductChatEmail();
                     }
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
        }
     }
     function GetIssueifnotsubproductChatEmail() {
         $("#lblchat").text('');

         var pkProductId = $('#ddlProduct').val();
         var pksub_product = $('#ddlsubproduct').val();

         var ddlproduct = $("[id*=ddlProduct]");
         var ddlsubproduct = $("[id*=ddlsubproduct]");
         var ddlissue = $("[id*=ddlissuecomplain]");
		 
			//alert('GetIssueifnotsubproductChatEmail :'+ pksub_product);
			
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlissue.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetissuenotsubproductChatEmail",
                  data: '{pkProductId:"' + pkProductId + '"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlissuecomplain").addClass("select-active");
                      ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                      $.each(r.d, function () {
                          ddlissue.append($("<option></option>").val(this['Value']).html(this['Text']));
                      });
                  },
                  failure: function (response) {
                      alert(response.d);
                  }
              });
              }
          }

function GetSearchByVoice(strSearch){

var count = 2; 

	$.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/SearchCustomers",
                  data: '{prefixText:"'+strSearch+'",count:"'+count+'"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                    
					$("#listPlacement").css('visibility','visible');
					$("#listPlacement").html('');
					var arrSearch = r.d;
					var i;
					for(i = 0; i < arrSearch.length; i++){
					$("#listPlacement").append("<div class='searchOption'  style='padding:0px; text-align:left; text-overflow:ellipsis;background-color:white;color:black'>"+ arrSearch[i] +"</div>");
					}
					AjaxSearch();
					
					
					 //$("#listPlacement").html(r.d);
					  //$("#listPlacement").append(r.d);
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
	 }
	 
	 function AjaxSearch(){
	 $(".searchOption").click(function(){
		
		var selected = $(this).text();
		
		$.ajax({
                         type: "POST",
                         url: "/webforms/axis-support/index.aspx/RedirectToSubIssue",
                         data: '{subIssue:"' + selected +'"}',						 
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         async: false,
                         success: function (res) {
                             
							 window.location = res.d;
                         },
                         failure: function (response) {
                             alert(response.d);
                         }
                     });
		
	 });
	 }

     function GetIssueChatEmail() {
         $("#lblchat").text('');

         var pkProductId = $('#ddlProduct').val();
         var pksub_product = $('#ddlsubproduct').val();

         var ddlproduct = $("[id*=ddlProduct]");
         var ddlsubproduct = $("[id*=ddlsubproduct]");
         var ddlissue = $("[id*=ddlissuecomplain]");
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
              ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlissue.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetsubProductChatEmail",
                  data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"0",SubIssueId:"0"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlissuecomplain").addClass("select-active");
                      ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                     $.each(r.d, function () {
                         ddlissue.append($("<option></option>").val(this['Value']).html(this['Text']));
                     });
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
             }
     }
     
     function GetButtonEnableChatEmail() {
         $("#lblchat").text('');

         try {
             if ($('#ddlissuecomplain').val() != null) {
                 if ($('#ddlissuecomplain').val() != 0) {
                
                     var ddlissuecomplain = $('#ddlissuecomplain').val();
                     var pkProductId = $('#ddlProduct').val();
                     var pksub_product = $('#ddlsubproduct').val();
                     if (pksub_product == null) {
                         pksub_product = 0;
                     }

    $.ajax({
        type: "POST",
        url: "/webforms/axis-support/index.aspx/ButtonEnableChatEmail",
        data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + ddlissuecomplain + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (res) {

            var str = res.d;
            var strarray = str.split(',');
            document.getElementById("divchat").style.display = "none";
            document.getElementById("divemail").style.display = "none";
            for (var i = 0; i < strarray.length; i++) {
              
                if (strarray[i].toLowerCase() == "chat") {
                   // alert("chat");
                   //alert("Testing " + strarray[i].toLowerCase())
                   document.getElementById("divchat").style.display = "inline-block";
				  
                  
                  // document.getElementById("link_chat").style.visibility = "hidden";
                   
                }
                if (strarray[i].toLowerCase().trim() == "email") {
                  //  alert("Email");				 
                    document.getElementById("divemail").style.display = "inline-block";
                  
                }
				 //alert("Testing " + strarray[i].toLowerCase())
				
            }
			
            return false;
        },
        failure: function (response) {
            alert(response.d);
        }
    });
}
else {
                     $("#lblchat").text('Please select your query');
    return false;
}
}
else {
                 $("#lblchat").text('Please select your query');
    return false;
}
}

    catch (err) {
        alert(err);
    }
     }
	 
     function ChatClick(event) {
         $("#lblchat").text('');

         try {
             if ($('#ddlissuecomplain').val() != null) {
                 if ($('#ddlissuecomplain').val() != 0) {

                     var ddlissuecomplain = $('#ddlissuecomplain').val();
                     var pkProductId = $('#ddlProduct').val();
                     var pksub_product = $('#ddlsubproduct').val();
                     if (pksub_product == null) {
                         pksub_product = 0;
                     }


                     $.ajax({
                         type: "POST",
                         url: "/webforms/axis-support/index.aspx/ChatClick",
                         data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + ddlissuecomplain + '"}',
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         async: false,
                         success: function (res) {
                             if (res.d != "") {
                                 //window.location = res.d;
								 
								 dataLayer.push({
								'category' :'support_section',	
								'action' :'complaint for the first time | cta click',
								'label' : 'chat',
								'event':'event_support_section',
								'page':'',
								'title':'',
								'start_selection_here' :"" + $("#ddlProduct option:selected").text() + "",
								'continuing_selection' :"" + $("#ddlsubproduct option:selected").text() + "",
								'choose_your_query' :"" + $("#ddlissuecomplain option:selected").text() + "",
								'select_specifics' :''
								});
								 
								 
								  window.open(res.d,'_blank');
                             }
                             else {
                                 $("#lblchat").text('Disabeled');
                             }
                             return false;
							//event.preventDefault();
                         },
                         failure: function (response) {
                             alert(response.d);
                         }
                     });
                 }
                 else {
                     $("#lblchat").text('Please select your query');
                     return false;
                 }
             }
             else {
                 $("#lblchat").text('Please select your query');
                 return false;
             }
         }

         catch (err) {
             alert(err);
         }
		 return false;
     }
     function EmailClick() {
         $("#lblchat").text('');
		
         try {
             if ($('#ddlissuecomplain').val() != null) {
                 if ($('#ddlissuecomplain').val() != 0) {

                     var ddlissuecomplain = $('#ddlissuecomplain').val();
                     var pkProductId = $('#ddlProduct').val();
                     var pksub_product = $('#ddlsubproduct').val();
                     if (pksub_product == null) {
                         pksub_product = 0;
                     }


                     $.ajax({
                         type: "POST",
                         url: "/webforms/axis-support/index.aspx/EmailClick",
                         data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + ddlissuecomplain + '"}',
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         async: false,
                         success: function (res) {
                             if (res.d != "") {
							 
							 
								 dataLayer.push({
								'category' :'support_section',	
								'action' :'complaint for the first time | cta click',
								'label' : 'email',
								'event':'event_support_section',
								'page':'',
								'title':'',
								'start_selection_here' :"" + $("#ddlProduct option:selected").text() + "",
								'continuing_selection' :"" + $("#ddlsubproduct option:selected").text() + "",
								'choose_your_query' :"" + $("#ddlissuecomplain option:selected").text() + "",
								'select_specifics' :''
								});
                                 //window.location = res.d;								 
								 window.open(res.d,'_blank');								 
                             }
                             else {
                                 $("#lblchat").text('Disabeled');
                             }
                             return false;
                         },
                         failure: function (response) {
                             alert(response.d);
                         }
                     });
                 }
                 else {
                     $("#lblchat").text('Please select your query');
                     return false;
                 }
             }
             else {
                 $("#lblchat").text('Please select your query');
                 return false;
             }
         }

         catch (err) {
             alert(err);
         }
		 return false;
     }

     //$("[id*=btn_query]").click(function () {
     //    alert("button clicked");
     //});
	
	//For Chat Modal
	
	function GetIssueifnotsubproductChat() {
         $("#lblchatError").text('');

         var pkProductId = $('#ddlProductChat').val();
         var pksub_product = $('#ddlsubproductchat').val();

         var ddlProductChat = $("[id*=ddlProductChat]");
         var ddlsubproductchat = $("[id*=ddlsubproductchat]");
         var ddlissuechat = $("[id*=ddlissuechat]");

          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlissuechat.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlissuechat.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetIssueifnotsubproductChat",
                  data: '{pkProductId:"' + pkProductId + '"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlissuechat").addClass("select-active");
                      ddlissuechat.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                      $.each(r.d, function () {
                          ddlissuechat.append($("<option></option>").val(this['Value']).html(this['Text']));
                      });
                  },
                  failure: function (response) {
                      alert(response.d);
                  }
              });
              }
          }
	
	
	function GetsubProductForChat() {
         $("#lblchatError").text('');

         //ddlsub_product.removeAttr("disabled");
         var ddlProductChat = $("[id*=ddlProductChat]");
         var ddlsubproductchat = $("[id*=ddlsubproductchat]");
         var ddlissuechat = $("[id*=ddlissuechat]");
         var pkProductId = $('#ddlProductChat').val();
         if (pkProductId == "0") {
             ddlsubproductchat.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
             ddlissuechat.empty().append('<option selected="selected" value="0">Choose your Query</option>');
         }
         else {
             ddlsubproductchat.empty()
             ddlissuechat.empty().append('<option selected="selected" value="0">Choose your Query</option>');
             $.ajax({
                 type: "POST",
                 url: "/webforms/axis-support/index.aspx/GetsubProductForChat",
                 data: '{pkProductId:"' + pkProductId + '",SubProductId:"0",IssueId:"0",SubIssueId:"0"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (r) {
                     var response = r.d;
                     if (response.length > 0) {
                         $("#ddlsubproductchat").addClass("select-active");
                         ddlsubproductchat.removeAttr("disabled");
                         ddlissuechat.removeClass("select-active");
                         ddlsubproductchat.empty().append('<option selected="selected" value="0">Continue Selecting</option>');;
                         $.each(r.d, function () {
                             ddlsubproductchat.append($("<option></option>").val(this['Value']).html(this['Text']));
                         });
                     }
                     else {
                         ddlsubproductchat.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
                         $("#ddlsubproductchat").attr("disabled", "");
                         ddlsubproductchat.removeClass("select-active");//.addClass("yourClass");
                         ddlissuechat.removeClass("select-active");
                          GetIssueifnotsubproductChat();
                     }
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
        }
     }	 
	 
	 function GetIssueChat() {
         $("#lblchatError").text('');

         var pkProductId = $('#ddlProductChat').val();
         var pksub_product = $('#ddlsubproductchat').val();

         var ddlproduct = $("[id*=ddlProductChat]");
         var ddlsubproduct = $("[id*=ddlsubproductchat]");
         var ddlissue = $("[id*=ddlissuechat]");
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
              ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlissue.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetsubProductForChat",
                  data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"0",SubIssueId:"0"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlissuechat").addClass("select-active");
                      ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                     $.each(r.d, function () {
                         ddlissue.append($("<option></option>").val(this['Value']).html(this['Text']));
                     });
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
             }
     }
	 
	  function GetSubIssueChat() {
         $("#lblchatError").text('');

         var pkProductId = $('#ddlProductChat').val();
         var pksub_product = $('#ddlsubproductchat').val();
		var pkissue_product = $('#ddlissuechat').val();
		
         var ddlproduct = $("[id*=ddlProductChat]");
         var ddlsubproduct = $("[id*=ddlsubproductchat]");
         var ddlissue = $("[id*=ddlissuechat]");
		 var ddlsubissuechat = $("[id*=ddlsubissuechat]");
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
              ddlsubissuechat.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlsubissuechat.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetsubProductForChat",
                  data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + pkissue_product + '",SubIssueId:"0"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlsubissuechat").addClass("select-active");
                      ddlsubissuechat.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                     $.each(r.d, function () {
                         ddlsubissuechat.append($("<option></option>").val(this['Value']).html(this['Text']));
                     });
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
             }
     }
	 
	 
	  function AgentChatClick(event) {
         $("#lblchatError").text('');

         try {
             if ($('#ddlsubissuechat').val() != null) {
                 if ($('#ddlsubissuechat').val() != 0) {

                     var ddlsubissuechat = $('#ddlsubissuechat').val();
					 var pkissue_product = $('#ddlissuechat').val();
                     var pkProductId = $('#ddlProductChat').val();
                     var pksub_product = $('#ddlsubproductchat').val();
                     if (pksub_product == null) {
                         pksub_product = 0;
                     }

                     $.ajax({
                         type: "POST",
                         url: "/webforms/axis-support/index.aspx/AgentChatClick",
                         data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + pkissue_product + '",SubIssueId:"' + ddlsubissuechat +'"}',						 
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         async: false,
                         success: function (res) {
                             if (res.d != "") {
                                 //window.location = res.d;
								 
								 dataLayer.push({
									'category' :'support_section',	
									'action' :'reach us here | cta click',
									'label' : 'chat with agent',
									'event':'event_support_section',
									'page':'',
									'title':'',
									'start_selection_here' :"" + $("#ddlProductChat option:selected").text() + "",
									'continuing_selection' :"" + $("#ddlsubproductchat option:selected").text() + "",
									'choose_your_query' :"" + $("#ddlissuechat option:selected").text() + "",
									'select_specifics' :"" + $("#ddlsubissuechat option:selected").text() + ""
									});
								 
								  window.open(res.d,'_blank');
                             }
                             else {
                                 $("#lblchatError").text('Disabeled');
                             }
                             return false;
							//event.preventDefault();
                         },
                         failure: function (response) {
                             alert(response.d);
                         }
                     });
                 }
                 else {
                     $("#lblchatError").text('Please select your query');
                     return false;
                 }
             }
             else {
                 $("#lblchatError").text('Please select your query');
                 return false;
             }
         }

         catch (err) {
             alert(err);
         }
		 return false;
     }
	 
	 //For chat with mail by yogesh on 20/05/2022
	 
	 function AgentChatClick_ForEmailOption(event) {
         $("#lblemailError").text('');

         try {
             if ($('#ddlsubissueemail').val() != null) {
                 if ($('#ddlsubissueemail').val() != 0) {

                     var ddlsubissueemail = $('#ddlsubissueemail').val();
					 var pkissue_product = $('#ddlissueemail').val();
                     var pkProductId = $('#ddlProductemail').val();
                     var pksub_product = $('#ddlsubproductemail').val();
                     if (pksub_product == null) {
                         pksub_product = 0;
                     }

//alert("values:-"+ddlsubissueemail+pkissue_product+pkProductId+pksub_product);
                     $.ajax({
                         type: "POST",
                         url: "/webforms/axis-support/index.aspx/AgentChatClick",
                         data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + pkissue_product + '",SubIssueId:"' + ddlsubissueemail +'"}',						 
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         async: false,
                         success: function (res) {
                             if (res.d != "") {
                                 //window.location = res.d;
								 
								 dataLayer.push({
									'category' :'support section',	
									'action' :'Connect Via Email | cta click',
									'label' : 'Chat',
									'event':'event_support_section',
									'page':'',
									'title':'',
									'start_selection_here' :"" + $("#ddlProductemail option:selected").text() + "",
									'continuing_selection' :"" + $("#ddlsubproductemail option:selected").text() + "",
									'choose_your_query' :"" + $("#ddlissueemail option:selected").text() + "",
									'select_specifics' :"" + $("#ddlsubissueemail option:selected").text() + ""
									});
								 
								  window.open(res.d,'_blank');
                             }
                             else {
                                 $("#lblemailError").text('Disabeled');
                             }
                             return false;
							//event.preventDefault();
                         },
                         failure: function (response) {
                             alert(response.d);
                         }
                     });
                 }
                 else {
                     $("#lblemailError").text('Please select your query');
                     return false;
                 }
             }
             else {
                 $("#lblemailError").text('Please select your query');
                 return false;
             }
         }

         catch (err) {
             alert(err);
         }
		 return false;
     }
	 
	 //For Email Modal
	
	
	function GetIssueifnotsubproductEmail() {
         $("#lblemailError").text('');

         var pkProductId = $('#ddlProductemail').val();
         var pksub_product = $('#ddlsubproductemail').val();

         var ddlProductemail = $("[id*=ddlProductemail]");
         var ddlsubproductchat = $("[id*=ddlsubproductemail]");
         var ddlissueemail = $("[id*=ddlissueemail]");

          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlissueemail.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlissueemail.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetIssueifnotsubproductEmail",
                  data: '{pkProductId:"' + pkProductId + '"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlissueemail").addClass("select-active");
                      ddlissueemail.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                      $.each(r.d, function () {
                          ddlissueemail.append($("<option></option>").val(this['Value']).html(this['Text']));
                      });
                  },
                  failure: function (response) {
                      alert(response.d);
                  }
              });
              }
          }
	
	
	function GetsubProductForEmail() {
         $("#lblemailError").text('');

         //ddlsub_product.removeAttr("disabled");
         var ddlProductemail = $("[id*=ddlProductemail]");
         var ddlsubproductemail = $("[id*=ddlsubproductemail]");
         var ddlissueemail = $("[id*=ddlissueemail]");
         var pkProductId = $('#ddlProductemail').val();
         if (pkProductId == "0") {
             ddlsubproductemail.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
             ddlissueemail.empty().append('<option selected="selected" value="0">Choose your Query</option>');
         }
         else {
             ddlsubproductemail.empty()
             ddlissueemail.empty().append('<option selected="selected" value="0">Choose your Query</option>');
             $.ajax({
                 type: "POST",
                 url: "/webforms/axis-support/index.aspx/GetsubProductForEmail",
                 data: '{pkProductId:"' + pkProductId + '",SubProductId:"0",IssueId:"0",SubIssueId:"0"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (r) {
                     var response = r.d;
                     if (response.length > 0) {
                         $("#ddlsubproductemail").addClass("select-active");
                         ddlsubproductemail.removeAttr("disabled");
                         ddlissueemail.removeClass("select-active");
                         ddlsubproductemail.empty().append('<option selected="selected" value="0">Continue Selecting</option>');;
                         $.each(r.d, function () {
                             ddlsubproductemail.append($("<option></option>").val(this['Value']).html(this['Text']));
                         });
                     }
                     else {
                         ddlsubproductemail.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
                         $("#ddlsubproductemail").attr("disabled", "");
                         ddlsubproductemail.removeClass("select-active");//.addClass("yourClass");
                         ddlissueemail.removeClass("select-active");
                          GetIssueifnotsubproductEmail();
                     }
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
        }
     }
	 	 
	 function GetIssueEmail() {
         $("#lblemailError").text('');

         var pkProductId = $('#ddlProductemail').val();
         var pksub_product = $('#ddlsubproductemail').val();

         var ddlproduct = $("[id*=ddlProductemail]");
         var ddlsubproduct = $("[id*=ddlsubproductemail]");
         var ddlissue = $("[id*=ddlissueemail]");
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
              ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlissue.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetsubProductForEmail",
                  data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"0",SubIssueId:"0"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlissueemail").addClass("select-active");
                      ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                     $.each(r.d, function () {
                         ddlissue.append($("<option></option>").val(this['Value']).html(this['Text']));
                     });
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
             }
     }
	 
	  function GetSubIssueEmail() {
         $("#lblemailError").text('');

         var pkProductId = $('#ddlProductemail').val();
         var pksub_product = $('#ddlsubproductemail').val();
		var pkissue_product = $('#ddlissueemail').val();
		
         var ddlproduct = $("[id*=ddlProductemail]");
         var ddlsubproduct = $("[id*=ddlsubproductemail]");
         var ddlissue = $("[id*=ddlissueemail]");
		 var ddlsubissueemail = $("[id*=ddlsubissueemail]");
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
              ddlsubissueemail.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlsubissueemail.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetsubProductForEmail",
                  data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + pkissue_product + '",SubIssueId:"0"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlsubissueemail").addClass("select-active");
                      ddlsubissueemail.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                     $.each(r.d, function () {
                         ddlsubissueemail.append($("<option></option>").val(this['Value']).html(this['Text']));
                     });
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
             }
     }
	 	 
	  function AgentEmailClick(event) {
         $("#lblemailError").text('');
		 //alert('Welcome email');//Prashant R

         try {
             if ($('#ddlsubissueemail').val() != null) {
                 if ($('#ddlsubissueemail').val() != 0) {

                     var ddlsubissueemail = $('#ddlsubissueemail').val();
					 var pkissue_product = $('#ddlissueemail').val();
                     var pkProductId = $('#ddlProductemail').val();
                     var pksub_product = $('#ddlsubproductemail').val();
                     if (pksub_product == null) {
                         pksub_product = 0;
                     }

                     $.ajax({
                         type: "POST",
                         url: "/webforms/axis-support/index.aspx/AgentEmailClick",
                         data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + pkissue_product + '",SubIssueId:"' + ddlsubissueemail +'"}',						 
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         async: false,
                         success: function (res) {
                             if (res.d != "") {
                                 //window.location = res.d;
								 
								 dataLayer.push({
									'category' :'support_section',	
									'action' :'Connect Via Email | cta click',
									'label' : 'Email',
									'event':'event_support_section',
									'page':'',
									'title':'',
									'start_selection_here' :"" + $("#ddlProductemail option:selected").text() + "",
									'continuing_selection' :"" + $("#ddlsubproductemail option:selected").text() + "",
									'choose_your_query' :"" + $("#ddlissueemail option:selected").text() + "",
									'select_specifics' :"" + $("#ddlsubissueemail option:selected").text() + ""
									});
								 
								  window.open(res.d,'_blank');
                             }
                             else {
                                 $("#lblemailError").text('Disabeled');
                             }
                             return false;
							//event.preventDefault();
                         },
                         failure: function (response) {
                             alert(response.d);
                         }
                     });
                 }
                 else {
                     $("#lblemailError").text('Please select your query');
                     return false;
                 }
             }
             else {
                 $("#lblemailError").text('Please select your query');
                 return false;
             }
         }

         catch (err) {
             alert(err);
         }
		 return false;
     }
	 
	 //For speak
	 
	function GetIssueifnotsubproductSpeak() {
         $("#lblemailError").text('');

         var pkProductId = $('#ddlProductspeak').val();
         var pksub_product = $('#ddlsubproductspeak').val();

         var ddlProductspeak = $("[id*=ddlProductspeak]");
         var ddlsubproductspeak = $("[id*=ddlsubproductspeak]");
         var ddlissuespeak = $("[id*=ddlissuespeak]");

          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlissuespeak.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlissuespeak.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetIssueifnotsubproductSpeak",
                  data: '{pkProductId:"' + pkProductId + '"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlissuespeak").addClass("select-active");
                      ddlissuespeak.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                      $.each(r.d, function () {
                          ddlissuespeak.append($("<option></option>").val(this['Value']).html(this['Text']));
                      });
                  },
                  failure: function (response) {
                      alert(response.d);
                  }
              });
              }
          }
	 
	function GetsubProductForSpeaks() {
         $("#lblspeakError").text('');

         //ddlsub_product.removeAttr("disabled");
         var ddlProductspeak = $("[id*=ddlProductspeak]");
         var ddlsubproductspeak = $("[id*=ddlsubproductspeak]");
         var ddlissuespeak = $("[id*=ddlissuespeak]");
         var pkProductId = $('#ddlProductspeak').val();
         if (pkProductId == "0") {
             ddlsubproductspeak.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
             ddlissuespeak.empty().append('<option selected="selected" value="0">Choose your Query</option>');
         }
         else {
             ddlsubproductspeak.empty()
             ddlissuespeak.empty().append('<option selected="selected" value="0">Choose your Query</option>');
             $.ajax({
                 type: "POST",
                 url: "/webforms/axis-support/index.aspx/GetsubProductForSpeak",
                 data: '{pkProductId:"' + pkProductId + '",SubProductId:"0",IssueId:"0",SubIssueId:"0"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (r) {
                     var response = r.d;
                     if (response.length > 0) {
                         $("#ddlsubproductspeak").addClass("select-active");
                         ddlsubproductspeak.removeAttr("disabled");
                         ddlissuespeak.removeClass("select-active");
                         ddlsubproductspeak.empty().append('<option selected="selected" value="0">Continue Selecting</option>');;
                         $.each(r.d, function () {
                             ddlsubproductspeak.append($("<option></option>").val(this['Value']).html(this['Text']));
                         });
                     }
                     else {
                         ddlsubproductspeak.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
                         $("#ddlsubproductspeak").attr("disabled", "");
                         ddlsubproductspeak.removeClass("select-active");//.addClass("yourClass");
                         ddlissuespeak.removeClass("select-active");
                          GetIssueifnotsubproductSpeak();
                     }
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
        }
     }
	 	 
	 function GetIssuespeak() {
         $("#lblspeakError").text('');

         var pkProductId = $('#ddlProductspeak').val();
         var pksub_product = $('#ddlsubproductspeak').val();

         var ddlproduct = $("[id*=ddlProductspeak]");
         var ddlsubproduct = $("[id*=ddlsubproductspeak]");
         var ddlissue = $("[id*=ddlissuespeak]");
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
              ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlissue.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetsubProductForSpeak",
                  data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"0",SubIssueId:"0"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlissuespeak").addClass("select-active");
                      ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                     $.each(r.d, function () {
                         ddlissue.append($("<option></option>").val(this['Value']).html(this['Text']));
                     });
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
             }
     }
	 	 
	 function GetSubIssueSpeak() {
         $("#lblspeakError").text('');

         var pkProductId = $('#ddlProductspeak').val();
         var pksub_product = $('#ddlsubproductspeak').val();
		var pkissue_product = $('#ddlissuespeak').val();
		
         var ddlproduct = $("[id*=ddlProductspeak]");
         var ddlsubproduct = $("[id*=ddlsubproductspeak]");
         var ddlissue = $("[id*=ddlissuespeak]");
		 var ddlsubissuespeak = $("[id*=ddlsubissuespeak]");
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlsubproduct.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
              ddlsubissuespeak.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlsubissuespeak.empty();
              $.ajax({
                  type: "POST",
                  url: "/webforms/axis-support/index.aspx/GetsubProductForSpeak",
                  data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + pkissue_product + '",SubIssueId:"0"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlsubissuespeak").addClass("select-active");
                      ddlsubissuespeak.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                     $.each(r.d, function () {
                         ddlsubissuespeak.append($("<option></option>").val(this['Value']).html(this['Text']));
                     });
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
             }
     }
	 
	 function AgentSpeakClick(event) {
         $("#lblspeakError").text('');
		 $("#lblspeak").text('');	//only added this line issue resolved

         try {
             if ($('#ddlsubissuespeak').val() != null) {
                 if ($('#ddlsubissuespeak').val() != 0) {

                     var ddlsubissuespeak = $('#ddlsubissuespeak').val();
					 var pkissue_product = $('#ddlissuespeak').val();
                     var pkProductId = $('#ddlProductspeak').val();
                     var pksub_product = $('#ddlsubproductspeak').val();
                     if (pksub_product == null) {
                         pksub_product = 0;
                     }

                     $.ajax({
                         type: "POST",
                         url: "/webforms/axis-support/index.aspx/AgentSpeakClick",
                         data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + pkissue_product + '",SubIssueId:"' + ddlsubissuespeak +'"}',						 
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         async: false,
                         success: function (res) {
                             if (res.d != "") {
                                 //window.location = res.d;
								  //window.open(res.d,'_blank');
								  
								  dataLayer.push({
									'category' :'support_section',	
									'action' :'reach us here | cta click',
									'label' : 'speak with us',
									'event':'event_support_section',
									'page':'',
									'title':'',
									'start_selection_here' :"" + $("#ddlProductspeak option:selected").text() + "",
									'continuing_selection' :"" + $("#ddlsubproductspeak option:selected").text() + "",
									'choose_your_query' :"" + $("#ddlissuespeak option:selected").text() + "",
									'select_specifics' :"" + $("#ddlsubissuespeak option:selected").text() + ""
									});
								  
								  var data=res.d;
								  var value=data.split("/");
								  var imgurl='<img src="/WebForms/axis-support/assetsNew/images/phone-call.svg" class="contact_icon" alt="contact">';
								 var startanchorval='<a class="contact_link" href="tel:';
								 var startanchorval1='">'
								 var endanchorval='</a>';
								   
								   for(var i=0;i<value.length;i++)
								   {
										//alert("value[i]: "+value[i]);
										//if(value[i]=="1800-103-5577 (Toll Free Number)") Code need to be move to prod 21012023
										if(value[i].includes('Toll'))
										{			  
											//alert("value[i]- TFN : "+value[i]);
											$("#lblspeak").append(imgurl+''+startanchorval+value[i].replace("(Toll Free Number)","")+startanchorval1+value[i]+endanchorval+'<br><br>');
										}
										else
										{	
											//alert("value[i]-CA : "+value[i]);
											$("#lblspeak").append(imgurl+''+startanchorval+value[i].replace("(Charges Applicable)","")+startanchorval1+value[i]+endanchorval+'<br><br>');
										}
								   }
								   value.length=0;
								   var MobileNo=$("#lblspeak").text();
								    
								   //$(".speak_us_modal").hide();
								   //$(".speak_us_responsemodal").show();								
								   $(".contact_modal").show();
								   
                             }
                             else {
                                 $("#lblspeakError").text('Disabeled');
                             }
							  //$(".speak_us_responsemodal").show();
							  $(".contact_modal").show();
                             return false;
							//event.preventDefault();
                         },
                         failure: function (response) {
                             alert(response.d);
                         }
                     });
                 }
                 else {
                     $("#lblspeakError").text('Please select your query');
                     return false;
                 }
             }
             else {
                 $("#lblspeakError").text('Please select your query');
                 return false;
             }
         }

         catch (err) {
             alert(err);
         }
		 return false;
     }
	  
	function getsearchSelection(source, eventArgs){
	
	var selected = eventArgs._value;
			
		$.ajax({
                         type: "POST",
                         url: "/webforms/axis-support/index.aspx/RedirectToSubIssue",
                         data: '{subIssue:"' + selected +'"}',						 
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         async: false,
                         success: function (res) {
                             
							 window.location = res.d;
                         },
                         failure: function (response) {
                             alert(response.d);
                         }
                     });
	
	}
     
</script>
<script type="text/javascript">
function getGTMSearch1()
	{
	     
				dataLayer.push({
				'category' :'support section',	
				'action' :'Search | cta click',
				'label' :"" + $("#result").val() + "",
				'event':'event_support_section',
				'page':'',
				'title':''
				});
	}
	function getGTMSearch()
	{
				dataLayer.push({
				'category' :'support section',	
				'action' :'Search | cta click',
				'label' :'search text',
				'event':'event_support_section',
				'page':'',
				'title':''
				});
	}
function getGTMChatwithus()
	{
	    
				dataLayer.push({
				'category' :'support_section',	
				'action' :'reach us here | cta click',
				'label' :'chat with us',
				'event':'event_support_section',
				'page':'',
				'title':''
				});
	}

</script>


</div>


 
  <!--container end-->
  <script src="/WebForms/axis-support/assetsNew/css/jquery.js"></script>
  <script src="/WebForms/axis-support/assetsNew/js/select2/dist/js/select2.min.js"></script>
  <script src="/WebForms/axis-support/assetsNew/css/bootstrap/bootstrap-popper.js"></script>
  <script src="/WebForms/axis-support/assetsNew/css/bootstrap/bootstrap.bundle.min.js"></script>
  <script src="/WebForms/axis-support/assetsNew/css/bootstrap/bootstrap.min.js"></script>
  <script src="/WebForms/axis-support/assetsNew/css/OwlCarousel/OwlCarousel2/dist/owl.carousel.min.js"></script>
  <script src="/WebForms/axis-support/assetsNew/js/classie.js"></script>
  <script src="/WebForms/axis-support/assetsNew/js/dynamics.min.js"></script>
  <script src="/WebForms/axis-support/assetsNew/js/chatboat.js" type="text/javascript"></script>
  
  <!--<script src="/WebForms/axis-support/assetsNew/js/yudaAnimation.js"></script>-->
  <script src="/WebForms/axis-support/assetsNew/js1/script.js"></script>
  <!-- 16-feb-2023 changes regarding blogs start --> 
  <!-- <script src="/WebForms/axis-support/Blogs/asset-css/js/script.js"></script>   -->
  <script src="/WebForms/axis-support/Blogs/asset-css/js/inner_template.js"></script>
  <!-- 16-feb-2023 changes regarding blogs start --> 
  
<script src="/WebForms/axis-support/assetsNew/js/yudaAnimation.js"></script>
<script>
    function mobilecheck() {
      var check = false;
      (function (a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    }

    var clickeventtype = mobilecheck() ? 'touchstart' : 'click';

    (function () {

      var support = { animations: Modernizr.cssanimations },
        animEndEventNames = { 'WebkitAnimation': 'webkitAnimationEnd', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend' },
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        onEndAnimation = function (el, callback) {
          var onEndCallbackFn = function (ev) {
            if (support.animations) {
              if (ev.target != this) return;
              this.removeEventListener(animEndEventName, onEndCallbackFn);
            }
            if (callback && typeof callback === 'function') { callback.call(); }
          };
          if (support.animations) {
            el.addEventListener(animEndEventName, onEndCallbackFn);
          }
          else {
            onEndCallbackFn();
          }
        };

      function nextSibling(el) {
        var nextSibling = el.nextSibling;
        while (nextSibling && nextSibling.nodeType != 1) {
          nextSibling = nextSibling.nextSibling
        }
        return nextSibling;
      }

      var yuda = new Stack(document.getElementById('stack_yuda'));

      // controls the click ring effect on the button
      var buttonClickCallback = function (bttn) {
        var bttn = bttn || this;
        bttn.setAttribute('data-state', 'unlocked');
		bttn.preventDefault;
      };

      document.querySelector('.button--accept[data-stack = stack_yuda]').addEventListener(clickeventtype, function () { yuda.accept(buttonClickCallback.bind(this)); });

      [].slice.call(document.querySelectorAll('.button--sonar')).forEach(function (bttn) {
        bttn.addEventListener(clickeventtype, function () {
          bttn.setAttribute('data-state', 'locked');
        });
      });

      [].slice.call(document.querySelectorAll('.button--material')).forEach(function (bttn) {
        var radialAction = nextSibling(bttn.parentNode);

        bttn.addEventListener(clickeventtype, function (ev) {
          var boxOffset = radialAction.parentNode.getBoundingClientRect(),
            offset = bttn.getBoundingClientRect();

          radialAction.style.left = Number(offset.left - boxOffset.left) + 'px';
          radialAction.style.top = Number(offset.top - boxOffset.top) + 'px';

          classie.add(radialAction, classie.has(bttn, 'button--reject') ? 'material-circle--reject' : 'material-circle--accept');
          classie.add(radialAction, 'material-circle--active');
          onEndAnimation(radialAction, function () {
            classie.remove(radialAction, classie.has(bttn, 'button--reject') ? 'material-circle--reject' : 'material-circle--accept');
            classie.remove(radialAction, 'material-circle--active');
          });
        });
      });
    })();
	
	</script>

  
   
 
  <script>
    
	
	
	
	function redirection() {
         $("#lblmsg").text('');

         try {
				if ($('#ddlsubissue').val() != null) {
                 if ($('#ddlsubissue').val() != 0) {
                 //var pkissue = $('#ddlissue').val();
				var ddlsubissueId = $('#ddlsubissue').val();



				$.ajax({
					type: "POST",
					url: "index.aspx/RedirectToIssue",
					data: '{SubIssueId:"' + ddlsubissueId + '"}',
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					async: false,
					success: function (res) {
					
						
						dataLayer.push({
						'category' :'support_section',	
						'action' :'FAQs | cta click',
						'label' : 'submit',
						'event':'event_support_section',
						'page':'',
						'title':'',
						'start_selection_here' :"" + $("#product option:selected").text() + "",
						'continuing_selection' :"" + $("#sub_product option:selected").text() + "",
						'choose_your_query' :"" + $("#ddlissue option:selected").text() + "",
						'select_specifics' :"" + $("#ddlsubissue option:selected").text() + ""
						});
						
					

						window.location = res.d;
						//window.open(res.d,"_blank");
						//alert('Mangesh1');						
						
						return false;
					},
					failure: function (response) {
						alert(response.d);

					}
				});
			}
			else {
				$("#lblmsg").text('Please select your query');
				return false;
			}
			}
			else {
				$("#lblmsg").text('Please select your query');
				return false;
			}
		}
		catch (err) {
			alert(err);
		}
			 return false;
		}
	
	
		function GetsubIssue() {
         $("#lblmsg").text('');
         
         //ddlsub_product.removeAttr("disabled");
         var pkProductId = $('#product').val();
         var pksub_product = $('#sub_product').val();
         var pkissue = $('#ddlissue').val();

          var ddlproduct = $("[id*=product]");
          var ddlsub_product = $("[id*=sub_product]");
          var ddlissue = $("[id*=ddlissue]");
          var ddlsubissue = $("[id*=ddlsubissue]");
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlsubissue.empty().append('<option selected="selected" value="0">Select Specifics</option>');

          }
          else {
              ddlsubissue.empty();
             $.ajax({
                 type: "POST",
                 url: "index.aspx/GetsubProduct",
                 data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"' + pkissue + '",SubIssueId:"0"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (r) {
                     $("#ddlsubissue").addClass("select-active");
                     ddlsubissue.empty().append('<option selected="selected" value="0">Select Specifics</option>');
                     $.each(r.d, function () {
                         ddlsubissue.append($("<option></option>").val(this['Value']).html(this['Text']));
                     });
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
         }
     }
	 
	 
	 
	 
	 function GetIssue() {
         $("#lblmsg").text('');
         
         var pkProductId = $('#product').val();
         var pksub_product = $('#sub_product').val();

         var ddlproduct = $("[id*=product]");
         var ddlsub_product = $("[id*=sub_product]");
         var ddlissue = $("[id*=ddlissue]");
         var ddlsubissue = $("[id*=ddlsubissue]");
         if (pksub_product == null) {
             pksub_product = 0;
         }
         if (pkProductId == "0") {
             ddlsub_product.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
             ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
             ddlsubissue.empty().append('<option selected="selected" value="0">Select Specifics</option>');
         }
         else {
             ddlissue.empty();
             ddlsubissue.empty().append('<option selected="selected" value="0">Select Specifics</option>');
             $.ajax({
                 type: "POST",
                 url: "index.aspx/GetsubProduct",
                 data: '{pkProductId:"' + pkProductId + '",SubProductId:"' + pksub_product + '",IssueId:"0",SubIssueId:"0"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (r) {
                     $("#ddlissue").addClass("select-active");
                     ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                     $.each(r.d, function () {
                         ddlissue.append($("<option></option>").val(this['Value']).html(this['Text']));
                     });
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
         }
     }
	 
	 
	  function GetsubProduct() {
         $("#lblmsg").text('');
         
         //ddlsub_product.removeAttr("disabled");
         var ddlproduct = $("[id*=product]");
         var ddlsub_product = $("[id*=sub_product]");
         var ddlissue = $("[id*=ddlissue]");
         var ddlsubissue = $("[id*=ddlsubissue]");
         var pkProductId = $('#product').val();
         if (pkProductId == "0") {
             
             ddlsub_product.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
             ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
             ddlsubissue.empty().append('<option selected="selected" value="0">Select Specifics</option>');
            }
         else {
             ddlsub_product.empty();
             ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
             ddlsubissue.empty().append('<option selected="selected" value="0">Select Specifics</option>');
             $.ajax({
                 type: "POST",
                 url: "index.aspx/GetsubProduct",
                 data: '{pkProductId:"' + pkProductId + '",SubProductId:"0",IssueId:"0",SubIssueId:"0"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (r) {
                     var response = r.d;
                     if (response.length > 0) {
                         $("#sub_product").addClass("select-active");
                         ddlsub_product.removeAttr("disabled");
                         ddlissue.removeClass("select-active");
                         ddlsubissue.removeClass("select-active");
                         ddlsub_product.empty().append('<option selected="selected" value="0">Continue Selecting</option>');;
                         $.each(r.d, function () {
                             ddlsub_product.append($("<option></option>").val(this['Value']).html(this['Text']));
                         });
                     }
                     else {
                         ddlsub_product.empty().append('<option selected="selected" value="0">Continue Selecting</option>');
                         $("#sub_product").attr("disabled", "");  
                         ddlsub_product.removeClass("select-active");//.addClass("yourClass");
                         ddlissue.removeClass("select-active");
                         ddlsubissue.removeClass("select-active");
                         //  ddlsub_product.empty().append('<option selected="selected" value="0">Not available<option>');
                         GetIssueifnotsubproduct();
                     }
                 },
                 failure: function (response) {
                     alert(response.d);
                 }
             });
         }
     }
     
     function GetIssueifnotsubproduct() {
         $("#lblmsg").text('');
         
         var pkProductId = $('#product').val();
         var pksub_product = $('#sub_product').val();

          var ddlproduct = $("[id*=product]");
          var ddlsub_product = $("[id*=sub_product]");
          var ddlissue = $("[id*=ddlissue]");
          var ddlsubissue = $("[id*=ddlsubissue]");
          if (pksub_product == null) {
              pksub_product = 0;
          }
          if (pkProductId == "0") {
              ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
          }
          else {
              ddlissue.empty();
              ddlsubissue.empty().append('<option selected="selected" value="0">Select Specifics</option>');
              $.ajax({
                  type: "POST",
                  url: "index.aspx/Getissuenotsubproduct",
                  data: '{pkProductId:"' + pkProductId + '"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (r) {
                      $("#ddlissue").addClass("select-active");
                      ddlissue.empty().append('<option selected="selected" value="0">Choose your Query</option>');
                      $.each(r.d, function () {
                          ddlissue.append($("<option></option>").val(this['Value']).html(this['Text']));
                      });
                  },
                  failure: function (response) {
                      alert(response.d);
                  }
              });
          }
     }
	
	
	
	
  </script>

         

<script type="text/javascript">
//<![CDATA[
langname1();abc();Sys.Application.add_init(function() {
    $create(Sys.Extended.UI.AutoCompleteBehavior, {"completionInterval":50,"completionListElementID":"listPlacement","completionSetCount":40,"delimiterCharacters":"","enableCaching":false,"id":"ContentPlaceHolder1_product1_AutoComExpSearch","minimumPrefixLength":2,"serviceMethod":"SearchCustomers","servicePath":"index.aspx"}, {"itemSelected":getsearchSelection}, null, $get("result"));
});
//]]>
</script>
</form>
		 

<!--<div id="chatbotUI"></div>-->	 
</body>

</html>

