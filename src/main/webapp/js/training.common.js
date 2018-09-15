var curWwwPath = window.document.location.href;
//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
//获取带"/"的项目名，如：/uimcardprj
var projectName = "/admin";//pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
//请求后台rest,url
var resteasyName = "/rest/resteasy";
if ("/mobileui" == projectName) {
	projectName = "";
}
// 默认每页显示数
var pageSize = 10;

//日期格式化
Date.prototype.format = function(format){ 
	var o = { 
			"M+" : this.getMonth()+1, //month 
			"d+" : this.getDate(), //day 
			"h+" : this.getHours(), //hour 
			"m+" : this.getMinutes(), //minute 
			"s+" : this.getSeconds(), //second 
			"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
			"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
}

// 去首页
function toHomePage() {
	var url=localhostPaht+projectName+"/index.html?t="+Math.random();
 	window.location.href=url;
}

// 页面跳转
function toPage(fullpath) {
	var url=localhostPaht+projectName+fullpath+"?t="+Math.random();
 	window.location.href=url;
}

//刷新当前页面
function refreshPage() {
	window.location.href=window.location.href;
}

//获取登陆账号
function getAclUser(){
	var json = $.getJSON("/basemanager/acluser/getCurrentLoginedUser");
	if (null == json || null == json.datas) {
		return null;
	}
	return json.datas;
}


