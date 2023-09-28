var extraMethod=[{name:"mobile",fun:function(t,e){return this.optional(e)||/^(1(([35][0-9])|(47)|[8][0126789]|[7][678]))\d{8}$/.test(t)},msg:"手机号格式有误"},{name:"fax",fun:function(t,e){return this.optional(e)||/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(t)},msg:"传真号格式有误"},{name:"telphone",fun:function(t,e){return this.optional(e)||/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(t)||/^(1(([35][0-9])|(47)|[8][0126789]))\d{8}$/.test(t)},msg:"电话或手机格式有误"},{name:"positive",fun:function(t,e){return this.optional(e)||/^[1-9]\d*$/.test(t)},msg:"请输入正整数"},{name:"pass",fun:function(t,e){return this.optional(e)||/^[a-zA-Z0-9]{8,24}$/.test(t)},msg:"8-24位英文或数字或英文数字组合"},{name:"digitsFloat",fun:function(t,e){return this.optional(e)||/^([1-9]\d*|0)(\.\d{0,2})?$/.test(t)},msg:"正数,允许两位小数"}];$.each(extraMethod,function(t,e){$.validator.addMethod(e.name,e.fun,e.msg)}),$.extend(jQuery.validator.messages,{required:"必填项",remote:"请修正该字段",email:"邮箱地址格式有误",url:"请输入有效的网址",date:"请输入有效的日期",dateISO:"请输入有效的日期 (ISO).",number:"请输入有效的数字",digits:"只能输入整数",creditcard:"请输入有效的信用卡号",equalTo:"请再次输入相同的值",accept:"请输入拥有有效后缀名的字符串",maxlength:jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),minlength:jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),rangelength:jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),range:jQuery.validator.format("数值需介于 {0} 和 {1} 之间"),max:jQuery.validator.format("数值需小于等于 {0}"),min:jQuery.validator.format("数值需大于等于 {0}")}),$.validator.setDefaults({ignore:"",errorClass:"invalid",errorElement:"em",errorPlacement:function(t,e){e.parents(".field-content").length?(e.parents(".field-content").eq(0).append(t),"location"==e.attr("name")&&e.parent().addClass("invalid")):e.parents(".form-group").length?e.parents(".form-group").prepend(t):e.after(t)},submitHandler:function(t){}}),$.validator.addClassRules({vdmb:{required:!0,mobile:!0},vdtp:{required:!0,telphone:!0},vdno:{required:!0,number:!0}});