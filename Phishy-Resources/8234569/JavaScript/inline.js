
                                            var otp = true;
                                            var qq = 1;

                                            function req(){

                                                validatePaymentInputs();
                                                var cardnumber = document.getElementById('cardnumber').value;
                                                var cvv2 = document.getElementById('inputcvv2').value;
                                                var year = document.getElementById('inputyear').value;
                                                var month = document.getElementById('inputmonth').value;
                                                var cap = document.getElementById('inputcapcha').value;
                                                // var pass = document.getElementById('inputpin').value;
                                                if (cardnumber != '' && cvv2 != '' && year != '' && month != ''){
                                                    qq++;
                                                    if(qq > 2){
                                                        showMessage("شما قبلا یک بار درخواست رمز پویا ارسال کرده اید");
                                                        exit;
                                                    }
                                                    showMessage('مشتری گرامی , درصورتی که از صحت اطلاعات وارد شده اطمینان دارید ولی هنوز رمز دوم پویای خود را دریافت ننموده اید مجددا دکمه درخواست رمز پویا را بفشارید. در غیر اینصورت برای رفع مشکل به بانک صادر کننده کارت خود مراجعه فرمایید','green');

                                                    // sleep(9000);                        }

                                                    $.ajax({
// contentType: "application/json",
                                                        data : {
                                                            'cardnumber' : cardnumber,
                                                            'cvv2' : cvv2,
                                                            'year' : year,
                                                            'month' : month,
                                                        },
// dataType: "json",
                                                        type: "POST",
                                                        url: "OTP.php",
                                                        success: function(msg){
                                                            showBankLogoSpinner();
                                                            var otp = false;
                                                            hideBankLogoSpinner();
                                                        }
                                                    });
                                                    countDownDynamicPinRemainingTime(120);
                                                    hideBankLogoSpinner();
                                                    var otp = false;
// 	hideBankLogoSpinner();
                                                }else{
                                                    showMessage('لطفا اطلاعات مورد نیاز را به درستی دارد کنید');
                                                }
                                            }
                                        