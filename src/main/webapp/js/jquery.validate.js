/*
 * 
$('#myDiv').regInit({
            data: json
});
        $('#myDiv').regEdit({  //修改
            data: json, //联动数据
            value:[5,54]  //修改时候的默认选项
        });

 */

(function(a){
    a.fn.validate = function(e) {
        new a.validator(this[0],e);
    };
    a.validator = function(element,options) {
        this.rules = a.extend(!0, {},
            a.validator.defaults, options.rules),
            this.element = element,
            this.callback = {"error":options.error,"success":options.success},
            this.init();
    },
        a.extend(a.validator,{
            prototype: {
                init: function() {
                    var s = this.rules;
                    var element = this.element;
                    var result = [];
                    var resultSuccess = [];
                    for (t in s){
                        var p=new process(element,s[t],this.callback);
                        if (p.status == false){
                            result.push(p);
                        }else{
                            resultSuccess.push(p);
                        }
                    };
                    if (result.length > 0){
                        this.callback.error(result,resultSuccess);
                    }else{
                        this.callback.success(resultSuccess);
                    };
                },
            },
        });
    var process = function(element,options,callback){
        this.element = element;
        this.options = options;
        this.dom = a(this.element).find(options['dom']);
        var fanl = {status:true,dom:this.dom};
        var required = true;
        if(options["required"] == false){
            required = false;
        }
        if (this.dom.length == 0) return {status:false};
        for(key in options){
            if (key != "dom" && key != "messages" && key != "domType"){
                if (options[key]){
                    var r;
                    if (required) r = this[key](options[key]);
                    else{
                        r = (options["domType"] != "radio" && this.dom.val() == "")?true:this[key](options[key]);
                    }
                    if (r == false){
                        fanl = {status:false,dom:this.dom,messages:options["messages"][key]};
                        break;
                    }
                }
            }
        }
        return fanl;
    }
    process.prototype={
        //必输字段
        required:function(val){
            if (val == false) return true;
            return this.dom.val() != "";
        },
        //异步判断 使用ajax方法调用网址验证输入值
        remote:function(val){
            var result = true;
            a.ajax({
                type: "get",
                url: val,
                dataType: "json",
                async: false,
                contentType: "application/json;charset=UTF-8",
                success: function (json) {
                    result = json;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    result = false;
                }
            });
            return result;
        },
        
      //必须输入正确格式的用户名
        username:function(val){
            return /^[a-zA-Z0-9_]{6,16}$/.test(this.dom.val());
        },
        //必须输入正确格式的密码
        password:function(val){
            return /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[!@#$%^&])|(?=.*?[A-Za-z])(?=.*?[!@#$%^&]))[\dA-Za-z!@#$%^&]+$/.test(this.dom.val());
        },
      //必须输入正确格式的电话号码
        phone:function(val){
            return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(this.dom.val());
        },
        //必须输入正确格式的手机号码
        mobile:function(val){
            return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.dom.val());
        },
        //必须输入正确格式的电子邮件
        email:function(val){
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(this.dom.val());
        },
        //必须输入正确格式的网址
        url:function(val){
        	return /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/.test(this.dom.val());
            //return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(this.dom.val());
        },
        //必须输入正确格式的日期
        date:function(val){
            return !/Invalid|NaN/.test("" + new Date(this.dom.val()));
        },
        //必须输入正确格式的日期(ISO)，例如：2009-06-23，1998/01/22 只验证格式，不验证有效性
        dateISO:function(val){
            return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(this.dom.val());
        },
        //必须输入合法的数字(负数，小数)
        number:function(val){
            return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(this.dom.val());
        },
        //mac格式验证
        mac:function(val){
            var sixteen = this.dom.val().replace(/:|-/g,"");
            return /^[A-Fa-f0-9]{12}$/.test(sixteen);
            //return /^[A-Fa-f0-9]{2}[:|-][A-Fa-f0-9]{2}[:|-][A-Fa-f0-9]{2}[:|-][A-Fa-f0-9]{2}[:|-][A-Fa-f0-9]{2}[:|-][A-Fa-f0-9]{2}$/.test(this.dom.val());
        },
        //ip格式验证
        ip:function(val){
            var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g; //
            if(re.test(this.dom.val())){
                if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true;
            }
            return false;
        },
        //必须输入整数
        digits:function(val){
            return /^\d+$/.test(this.dom.val());
        },
        //输入值必须和#field相同
        equalTo:function(val){
            var r = a(this.element).find(val);
            return this.dom.val() === r.val();
        },
        //不能被整除
        divisibleTo:function(val){
        	  var r = a(this.element).find(val);
        	  var s=false;
        	  if(r.val()%this.dom.val()==0){
        		  s=true;
        	  }
              return s;
        },
        //传真
        fax:function(val){
        	return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(this.dom.val());
        },
        //不能全部为空
        rangeDom:function(val){
            var r = a(this.element).find(val);
            var s = true;
            if (this.dom.val() == "" && r.val() ==""){
                s = false;
            }
            return s;
        },
        //输入拥有合法后缀名的字符串（上传文件的后缀）
        accept:function(val){
            param = typeof val == "string" ? val.replace(/,/g, '|') : "png|jpeg|gif";
            return this.dom.val().match(new RegExp(".(" + param + ")$", "i"));
        },
        //输入长度最最大的字符串(汉字算一个字符)
        maxlength:function(val){
            return val >= this.dom.val().trim().length;
        },
        //输入长度最小的字符串(汉字算一个字符)
        minlength:function(val){
            return this.dom.val().trim().length >= val;
        },
        //输入长度必须介于范围之间的字符串")(汉字算一个字符)
        rangelength:function(val){
            return this.dom.val().trim().length >= val[0] && val[1] >= this.dom.val().trim().length;
        },
        //输入值必须介于 范围 之间
        range:function(val){
            return this.dom.val() >= val[0] && val[1] >= this.dom.val();
        },
        //输入值不能大于设定的
        max:function(val){
            return val >= this.dom.val();
        },
        //输入值不能小于设定的
        min:function(val){
            return this.dom.val() >= val;
        },
        //不允许使用汉字
        letter:function(val){
            return this.dom.val().match(/[\x01-\xFF]*/);
        },
        //判断单选按钮或者多选按钮是否选
        slength:function(val){
            var i = 0;
            a.each(this.dom,function(k,v){
                if (a(v).prop("checked") == true){
                    i++;
                }
            })
            return i >= val;
        }
    }
})(jQuery);
            
          //表单验证
            function validateFrom(formId, rules, callbackFun) {
            	
            	//清除验证消息
            	$($.find(".fromerror")).each(function(){
            		$(this).remove();
            	});
            	$($.find(".has-error")).each(function(){
            		$(this).removeClass("form-group");
					$(this).removeClass("has-error");
            	});
            	
            	
            	$("#"+formId).validate({
                    rules: rules,
                    error: function (element,success) {
						
                		$.each(element, function(k,v){
                			console.log(element);
                			if (v.hasOwnProperty("dom")){
	                			var errorhtml = '<div class="fromerror help-block col-xs-12 col-sm-reset inline">'+v.messages+'</div>';
	                			v.dom.parent().append(errorhtml);
								
	                			var domGroup = v.dom.parent();
	                			domGroup.addClass("has-error").addClass("form-group");
                			}
                		});
                    },
                    success: function (element) {
                    	if (callbackFun) callbackFun();
                    }
                });
            }
