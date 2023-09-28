//截取规定字符数的字符串
function cutstring(classname,length,quesheng) {
    $(classname).each(function(i){ 
       str = $(this).html();
       if(str.length > length){
          str1 = str.substr(0, length);       
          $(this).html(str1+quesheng);
       }else{
           $(this).html(str);
       }
    })
}

function enterIn(evt) {
    var evt = evt ? evt : (window.event ? window.event : null);//兼容IE和FF
    if (evt.keyCode == 13) {
        $(".btn_search1").click();
    }
}


$(function () {
    
//cutstring('.pro_name1',10,'...');

    $(".btn_search1").click(function () { 
        svalue = $("input[name=search_keyword]").val();
        if (svalue) {
            svalue =  svalue.replace(/\s/g,"-");
            window.location.href = "/" + svalue + "_ss";
        } else {
            return '';
        }
    });
    
    $(".btn_search2").click(function () { 
        bvalue = $("input[name=search_brand]").val();
        if (bvalue) {
            bvalue =  bvalue.replace(/\s/g,"-");
            window.location.href = "/" + bvalue + "_sbr";
        } else {
            return '';
        }
    });

    $.blockUI.defaults.css = {
        border: "none",
        padding: 0,
        margin: 0,
        width: "auto",
        top: "20%",
        left: "30%",
        textAlign: "left",
        color: "#000",
        backgroundColor: "#fff",
        cursor: "default"
    };
    /*
     *增加中文验证
     **/
    $.validator.addMethod("ch", function (value, element) {
        return this.optional(element) || !(/[\u4e00-\u9fa5]+/.test(value));
    }, '<br /><img src="/images/front/error.gif" width="12" height="12" />please fill in English');
    /*
     *首页滑动下拉
     */
    $(".Triangle").hover(function () {
        $(this).children("div").toggle();
    }, function () {
        $(this).children("div").toggle();
    });

    /*
     *站内短信弹出层：需要在页面使用视图助手<?php $this->msg(); ?>
     **/
    $(".msg").click(function () {
        var left = ($(window).width() - 562) / 2;
        var top = ($(window).height() - 300) / 2;
        window.open('/inquiry/msg/user_id/' + $(this).attr("key"), '', 'height=300,width=562,top=' + top + ',left=' + left + ',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
    });

    /*
     *添加到购物车
     **/
    $(".add_to_cart,.add_to_cart_detail").click(function () {
        var a_obj = $(this);
        $(this).after('<span class="loading"><img src="/images/front/ajax-loader.gif" />&nbsp;adding&nbsp;...</span>');
        $(this).hide();
        var formBuy = document.forms['ECS_FORMBUY'];
        var spec_arr = new Array();
        var spec_str = '';
        // 检查是否有商品规格 
        if (formBuy)
        {
            spec_str = getSelectedAttributes(formBuy);
            if (spec_str !== '') {
                spec_str = "{" + spec_str + "}";
            }
        }
        if (spec_str) {
            urlstr = "/common/ajax/addtocart/key/" + $(this).attr("key") + "/spec/" + spec_str;
        } else {
            urlstr = "/common/ajax/addtocart/key/" + $(this).attr("key");
        }

        $.ajax({
            url: urlstr,
            type: "get",
            dataType: "json",
            success: function (response) {
                if (response.result == "error") {
                    msg("failed", response.reason);
                    $(a_obj).next().replaceWith('');
                    $(a_obj).show();
                }
                else {
                    $(".cart_num").html(response.number);
                    $(a_obj).next().replaceWith('<a class="' + $(a_obj)[0].className + '_done" href="/cart" title="Go To My Cart"></a>');
                    $(a_obj).remove();
                }
            }
        });
    });

    /*
     *购物车预览ajax
     **/
    $(".cart").hover(function () {
        var html = "";
        $(".cart_link").addClass("cart_link_hover");
        $(".cart_hidden").show();
        $.ajax({
            url: "/common/ajax/getcartitem",
            type: "get",
            dataType: "json",
            success: function (response) {
                if (response.length) {
                    $.each(response, function (i, item) {
                        html += '<li>';
                        html += '  <dl>';
                        html += '      <dt class="fl"><a target="_blank" href="/' + item.product_name + '_p' + item.product_id + '">' + item.product_pic + '</a></dt>';
                        html += '      <dd><a target="_blank" href="/' + item.product_name + '_p' + item.product_id + '" class="cart_pro_name keep">' + item.product_name + '</a></dd>';
                        html += '      <dd><span class="cart_proprice fl">US$' + item.product_price + '</span><span class="fl"></span><span class="cart_checkout fr"><a href="/cart">view</a></span></dd>';
                        html += '  </dl>';
                        html += '  <div style="clear:both;"></div>';
                        html += '</li>';
                    });
                    $(".cart_prolist").html(html);
                }
            }
        });
    }, function () {
        $(".cart_link").removeClass("cart_link_hover");
        $(".cart_hidden").hide();
    });

    $('#passport_sign_refresh').click(function () {
        $('#passport_sign_code').attr('src', '/common/index/authcode?t=' + new Date().getTime());
        $('#head_code').attr('src', $('#passport_sign_code').attr('src'));
    });
    $('#passport_sign_code').click(function () {
        $('#passport_sign_code').attr('src', '/common/index/authcode?t=' + new Date().getTime());
        $('#head_code').attr('src', $('#passport_sign_code').attr('src'));
    });
    $("#email_form").validate({
        onkeyup: false,
        rules: {
            "msg_name": {
                required: true
            },
            "msg_email": {
                required: true,
                email: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/findemail",
                    data: {
                        msg_email: function () {
                            return $("#msg_email").val();
                        }
                    }
                }
            },
            "msg_title": {
                required: true
            },
            "msg_content": {
                required: true
            },
            "auth_code": {
                required: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/judgeauthcode",
                    data: {
                        auth_code: function () {
                            return $("#auth_code1").val();
                        }
                    }
                }
            }
        },
        messages: {
            "msg_name": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your name'
            },
            "msg_email": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your email',
                ch: '<img src="/images/front/error.gif" width="12" height="12" />please fill in English',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s alerdy exist!please change!')
            },
            "msg_title": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the title'
            },
            "msg_content": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the content'
            },
            "auth_code": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />The auth code is required',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s wrong,please reset')
            }
        }
    });
       $("#email_form1").validate({
        onkeyup: false,
        rules: {
            "msg_name": {
                required: true
            },
            "msg_email": {
                required: true,
                email: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/findemail",
                    data: {
                        msg_email: function () {
                            return $("#msg_email").val();
                        }
                    }
                }
            },
            "msg_title": {
                required: true
            },
            "msg_content": {
                required: true
            },
            "auth_code": {
                required: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/judgeauthcode",
                    data: {
                        auth_code: function () {
                            return $("#auth_code1").val();
                        }
                    }
                }
            }
        },
        messages: {
            "msg_name": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your name'
            },
            "msg_email": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your email',
                ch: '<img src="/images/front/error.gif" width="12" height="12" />please fill in English',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s alerdy exist!please change!')
            },
            "msg_title": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the title'
            },
            "msg_content": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the content'
            },
            "auth_code": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />The auth code is required',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s wrong,please reset')
            }
        }
    });
     $("#email_form2").validate({
        onkeyup: false,
        rules: {
            "msg_name": {
                required: true
            },
            "msg_email": {
                required: true,
                email: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/findemail",
                    data: {
                        msg_email: function () {
                            return $("#msg_email").val();
                        }
                    }
                }
            },
            "msg_title": {
                required: true
            },
            "msg_content": {
                required: true
            },
            "auth_code": {
                required: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/judgeauthcode",
                    data: {
                        auth_code: function () {
                            return $("#auth_code1").val();
                        }
                    }
                }
            }
        },
        messages: {
            "msg_name": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your name'
            },
            "msg_email": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your email',
                ch: '<img src="/images/front/error.gif" width="12" height="12" />please fill in English',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s alerdy exist!please change!')
            },
            "msg_title": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the title'
            },
            "msg_content": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the content'
            },
            "auth_code": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />The auth code is required',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s wrong,please reset')
            }
        }
    });


    /**
     * 产品评论检测
     */
    $("#pro_comment").validate({
        onkeyup: false,
        rules: {
            "user_name": {
                required: true
            },
            "comment_email": {
                required: true,
                email: true
            },
            "comment_content": {
                required: true
            },
            "auth_code": {
                required: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/judgeauthcode",
                    data: {
                        auth_code: function () {
                            return $("#pro_auth").val();
                        }
                    }
                }
            }
        },
        messages: {
            "user_name": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your name'
            },
            "comment_email": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your email',
                ch: '<img src="/images/front/error.gif" width="12" height="12" />please fill in English'
            },
            "comment_content": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the content'
            },
            "auth_code": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />The auth code is required',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s wrong,please reset')
            }
        }
    });
    
    
    /*
     *添加到收藏夹
     **/
    
    $('#addfavorites').click(
            function () {
                pro_id = $(this).attr('alt');
                $.ajax({
                    type: 'POST',
                    url: '/customer/addfavorite',
                    data: 'proid=' + pro_id,
                    success: function (v) {
                        if (v == '2') {
                            alert('Have owned the product.');
                        } else if (v == '1') {
                            alert('Have to join your collection.');
                        }else if (v == '3') {
                            window.location.href="/sign";
                        }else {
                            alert('To join the collection failure, please try again later.');
                        }
                    }
                })
            }
    );
});


    
function checkmessage(id) {
    var user_name = $("#" + id).find('input[name="user_name"]').val();
    var comment_email = $("#" + id).find('input[name="comment_email"]').val();
    var comment_content = $("#" + id).find('textarea[name="comment_content"]').val();
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (!user_name) {
        alert('please fill in name');
        $("#" + id).find('input[name="user_name"]').focus();
        return false;
    }
    if (!comment_email || !reg.test(comment_email)) {
        alert('please fill in email');
        $("#" + id).find('input[name="comment_email"]').focus();
        return false;
    }
    if (!comment_content) {
        alert('please fill in content');
        $("#" + id).find('input[name="comment_content"]').focus();
        return false;
    }
    return true;
}


/**
 * 获得选定的商品属性
 */
function getSelectedAttributes(formBuy)
{
    var spec_arr = new Array();
    var j = 0;
    var spec_str = '';
    for (i = 0; i < formBuy.elements.length; i++)
    {
        var prefix = formBuy.elements[i].name.substr(0, 5);

        if (prefix == 'spec_' && (
                ((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) ||
                formBuy.elements[i].tagName == 'SELECT'))
        {
            var suffix = formBuy.elements[i].name.substr(5);
            if (j == 0) {
                spec_str = '"' + suffix + '": "' + formBuy.elements[i].value + '"';
            } else {
                spec_str += "," + '"' + suffix + '": "' + formBuy.elements[i].value + '"';
            }
            //spec_arr[j] = formBuy.elements[i].value+"|"+suffix;
            j++;
        }
    }

    return spec_str;
}




//循环点击标签
function setTab(m, n) {
    var menu = document.getElementById("tab" + m).getElementsByTagName("li");
    var div = document.getElementById("tablist" + m).getElementsByTagName("div");
    var showdiv = [];
    for (i = 0; j = div[i]; i++) {
        if ((" " + div[i].className + " ").indexOf(" tablist ") != -1) {
            showdiv.push(div[i]);
        }
    }
    for (i = 0; i < menu.length; i++)
    {
        menu[i].className = i == n ? "now" : "";
        showdiv[i].style.display = i == n ? "block" : "none";
    }
}


$(".menu_button").click(function () {
    if ($.trim($(".menu_input").val()) == "Search info...")
    {
        alert("Please input a search term");
        return false;
    }
    else
    {
        $(".menu_button").submit();
    }
});


function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}



/**
 * 处理图片大小，以防失帧
 */
function setImgSizeWH(theURL, sImage, imgW, imgH)
{
    var imgObj;
    imgObj = null;
    imgObj = new Image();
    imgObj.src = theURL;
    if ((imgObj.width != 0) && (imgObj.height != 0))
    {
        if (imgObj.width > imgW || imgObj.height > imgH)
        {
            var iHeight = imgObj.height * imgW / imgObj.width;
            if (iHeight <= imgH)
            {
                sImage.width = imgW;
                sImage.height = iHeight;
            }
            else
            {
                var iWidth = imgObj.width * imgH / imgObj.height;
                sImage.width = iWidth;
                sImage.height = imgH;
            }
        }
        else
        {
            sImage.width = imgObj.width;
            sImage.height = imgObj.height;
        }
    }
    else
    {
        sImage.width = imgW;
        sImage.height = imgH;
    }
}

function setElementMiddle(obj, width, height, state) {
    if (state == true) {
        var iHeight = obj.clientHeight;
        var iWidth = obj.clientWidth;
        if (height > 0 && width > 0) {
            if (iHeight < height) {
                $(obj).css("margin-top", (height - iHeight) / 2 + "px");
            }
            if (iWidth < width) {
                $(obj).css("margin-left", (width - iWidth) / 2 + "px");
            }
        }
    }

}

/**
 * 设置图片宽度
 */
function setImgWidth(theURL, sImage, imgWidth) {
    var imgObj;
    imgObj = null;
    imgObj = new Image();
    imgObj.src = theURL;
    if ((imgObj.width != 0))
    {
        if (imgObj.width > imgWidth)
        {
            sImage.width = imgWidth;
        }
        else
        {
            sImage.width = imgObj.width;
        }
    }
    else
    {
        sImage.width = imgWidth;
    }
}
function initStatics(user_id)
{
    $.ajax({
        type: "GET",
        url: "/common/ajax/statics",
        data: {user_id: user_id},
        success: function (response)
        {

        }
    });
}

function attrtoprice() {
    var num = 0;
    produceprice = Number($('input[name="productprice"]').val());
    $('.addcartattrprice').remove();
    $('#attr_price input:checked').each(function (i) {
        attrid = $(this).attr('class');
        $('#attr_price').append('<input class="addcartattrprice" type="hidden" name="attrprice[]" value="'+attrid+'"/>');
        num = Number(num)+Number($(this).val());
    });
    
     $('#attr_price select').each(function (i) {
        attrid = $(this).val();
        $('#attr_price').append('<input class="addcartattrprice" type="hidden" name="attrprice[]" value="'+attrid+'"/>');
        num = Number(num)+Number($(this).val());
    });   
    $('#productprice').text(Number(produceprice + num));
}


//属性总价格
function attrTotalPrice(){
    var num = 0;
     $('#attr_price input:checked').each(function (i) {
        attrid = $(this).attr('class');
        num = Number(num)+Number($(this).val());
    });
    
     $('#attr_price select').each(function (i) {
         //alert($(this).find("option:selected").attr('rel'));
        num = Number(num)+Number($(this).find("option:selected").attr('rel'));
    });    
    
    return num;
    
}


//显示产品价格
                    function productTotalPrice(number,producid){
                        if(isNaN(number)){
                            $('input[name="number"]').val('1');
                            alert("Please enter a number!");
                            return false;
                        }
                        attrtotalprice = attrTotalPrice(); //alert(attrtotalprice);
                        $.ajax({
                            type:'post',
                            url:'/product/productnumber/',
                            data:'num='+number+'&product_id='+producid+'&attrtotalprice='+attrtotalprice,
                            success:function(e){
                                if(e == '1'){
                                  
                                } else {
                                    alert(e);
                                }
                            }
                        })
                        productnum = $('#product_num').val();
                        productprice = $('#product_price').val(); 
                        producttotalprice =productnum * (Number(productprice) + Number(attrtotalprice));
                        $('#product_price_total').text('$'+producttotalprice);
                        
                    }

