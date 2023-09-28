
                        function checkDNS()
                        {
                            __cmp('getCMPData', true, function (x)
                            {
                                var possibleKeys = ['CCPA','USVCDPA','USCPA','USUCPA','USCAPDP']; //add possible regulations where to show the DNS-link
                                if('regulationKey' in x && possibleKeys .indexOf(x.regulationKey) != -1)
                                {
                                document.getElementById('dnslink').style.display='block'; /* show the link*/
                                }
                                else{
                                document.getElementById('dnslink').style.display='none'; /* donâ€™t show the link*/
                                }
                            }
                           );
                        }
                        setInterval(checkDNS,1000);
                    