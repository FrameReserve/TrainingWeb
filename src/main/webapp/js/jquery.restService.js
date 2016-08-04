
// 弹出消息
function showMessage(message) {
	if(null == message) return;
	alert(message);
	//$.messager.alert('标题',message,'error');
}

// 清除消息框
function clearTipMessage() {
	$(".messagetip").html('');
}

// 成功消息框
function showTipMessageSuccess(message) {
	var htmlstr= '';
	htmlstr += '<div class="alert alert-block alert-success">';
	htmlstr += '<p>';
	htmlstr += '<strong><i class="ace-icon fa fa-check"></i></strong>&nbsp;';
	htmlstr += message;
	htmlstr += '</p>';
	htmlstr += '</div>';
	$(".messagetip").html(htmlstr);								
}

// 错误消息框
function showTipMessageError(message) {
	var htmlstr= '';
	htmlstr += '<div class="alert alert-danger">';
	htmlstr += '<strong>';
	htmlstr += '<i class="ace-icon fa fa-times"></i>';
	htmlstr += '错误：';
	htmlstr += '</strong>';
	htmlstr += message;
	htmlstr += '<br />';
	htmlstr += '</div>';			
	$(".messagetip").html(htmlstr);
}

// 打开遮罩层
function showDialog() {
	$.messager.progress({
	    title: '',
	    msg: '',
	    text: '加载中 ... '
	});
}

(function($){
	
    /**
     * GET请求
     * @param curl 请求地址
     * @param fun	数据回调函数
     * @param tips 是否显示载入提示
     */
    $.getJSON = function(curl,callbackFun,tips){
        var result;
        
        if(true == tips) {
        	showDialog();
        }
        $.ajax({
            type: "get",
            url: localhostPaht+resteasyName+curl,
            dataType: "json",
            async: false,
            contentType: "application/json;charset=UTF-8",
            complete:function (XMLHttpRequest, textStatus) {
                if (textStatus == "success"){
                    result = $.parseJSON(XMLHttpRequest.responseText);
                    if ("200" == result.code) {
                    	if (callbackFun)callbackFun(result);
					} else if ("500" == result.code) {
						showMessage(result.message);
					} else {
						showMessage(result.code+':'+result.message);
					}
                }else{
                    showMessage('网络连接出错');
                }
            }
        });
        if(true == tips) $.messager.progress('close');
        return result;
    };
    
    /**
     * POST请求，简单数据类型
     * @param curl	请求地址
     * @param jsonObj	Json对象
     * @param callbackFun 回调方法
     * @param tips	是否显示载入提示
     */
    $.postParam = function(curl,paramObj,callbackFun,tips) {
            var result;
            if(true == tips) {
            	showDialog();
            }
            $.ajax({
                type: "post",
                url: localhostPaht+resteasyName+curl,
                timeout:30000,
                data: paramObj,
                async: false,
                complete:function (XMLHttpRequest, textStatus) {
	            	if (textStatus == "success"){
	                    result = $.parseJSON(XMLHttpRequest.responseText);
	                    if ("200" == result.code) {
	                    	if (callbackFun)callbackFun(result);
						} else if ("500" == result.code) {
							showMessage(result.message);
						} else {
							showMessage(result.code+':'+result.message);
						}
	                }else{
	                    showMessage('网络连接出错');
	                }
                }
            });
            if(true == tips) $.messager.progress('close');
            return result;
    };
    
    /**
     * POST请求，简单数据类型
     * @param curl	请求地址
     * @param jsonObj	Json对象
     * @param callbackFun 回调方法
     * @param tips	是否显示载入提示
     */
    $.postJSON = function(curl,jsonObj,callbackFun,tips) {
            var result;
            if(true == tips) {
            	showDialog();
            }
            
            jsonObj = null==jsonObj ? jsonObj : JSON2.stringify(jsonObj);
            
            $.ajax({
                type: "post",
                url: localhostPaht+resteasyName+curl,
                timeout:30000,
                contentType: "application/json;charset=UTF-8",
                data: jsonObj,
                dataType: "json",
                async: false,
                complete:function (XMLHttpRequest, textStatus) {
	            	if (textStatus == "success"){
	                    result = $.parseJSON(XMLHttpRequest.responseText);
	                    if ("200" == result.code) {
	                    	if (callbackFun)callbackFun(result);
						} else if ("500" == result.code) {
							showMessage(result.message);
						} else {
							showMessage(result.code+':'+result.message);
						}
	                }else{
	                    showMessage('网络连接出错');
	                }
                }
            });
            if(true == tips) $.messager.progress('close');
            return result;
    };
    
    /**
     * put请求，简单数据类型
     * @param curl	请求地址
     * @param jsonObj	Json对象
     * @param callbackFun 回调方法
     * @param tips	是否显示载入提示
     */
    $.putJSON = function(curl,jsonObj,callbackFun,tips) {
    	
            var result;
            if(true == tips) {
            	showDialog();
            }
            
            jsonObj = null==jsonObj ? jsonObj : JSON2.stringify(jsonObj);
            
            $.ajax({
                type: "put",
                url: localhostPaht+resteasyName+curl,
                timeout:30000,
                contentType: "application/json;charset=UTF-8",
                data: jsonObj,
                dataType: "json",
                async: false,
                complete:function (XMLHttpRequest, textStatus) {
	            	if (textStatus == "success"){
	                    result = $.parseJSON(XMLHttpRequest.responseText);
	                    if ("200" == result.code) {
	                    	if (callbackFun)callbackFun(result);
						} else if ("500" == result.code) {
							showMessage(result.message);
						} else {
							showMessage(result.code+':'+result.message);
						}
	                }else{
	                    showMessage('网络连接出错');
	                }
                }
            });
            if(true == tips) $.messager.progress('close');
            return result;
    };
    
    /**
     * 发起删除请求
     * @param curl	请求地址
     * @param tips	是否显示载入提示
     */
    $.delJSON = function(curl,callbackFun,tips) {
        var result;
        if(true == tips) {
        	showDialog();
        }
        $.ajax({
            type: "delete",
            url: localhostPaht+resteasyName+curl,
            dataType: "json",
            async: false,
            contentType: "application/json;charset=UTF-8",
            complete:function (XMLHttpRequest, textStatus) {
	        	if (textStatus == "success"){
	                result = $.parseJSON(XMLHttpRequest.responseText);
	                if ("200" == result.code) {
	                	if (callbackFun)callbackFun(result);
					} else if ("500" == result.code) {
						showMessage(result.message);
					} else {
						showMessage(result.code+':'+result.message);
					}
	            }else{
	                showMessage('网络连接出错');
	            }
            }
        });
        if(true == tips) $.messager.progress('close');
        return result;
    };
    
})(jQuery);