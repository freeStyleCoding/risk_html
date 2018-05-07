/**
 *@(#) globle.js
 *
 * @author Storys.Zhang
 *
 * Created at 2017/12/16 by Storys.Zhang in credan_risk_html
 * 
 * Copyright (c) 2017, Credan(上海)-版权所有
 */
layui.config({
	base: "js/",
	version: new Date().getTime(),
	debug: true
}).extend({ //设定模块别名
	"common":"common",
});

layui.data('risk-server', {
	key: 'rootPath',
	value: 'https://risk.credan.com'
// 	value: 'http://127.0.0.1:7200'
	//value: 'http://118.190.67.197:7200'
});

/**
 * 获取请求路径参数信息 
 * 
 * @param {Object} name
 */
function requestUrl(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
}