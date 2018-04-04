/**
 *@(#) common.js
 *
 * @author Storys.Zhang
 *
 * Created at 2017/12/16 by Storys.Zhang in credan_risk_html
 * 
 * Copyright (c) 2017, Credan(上海)-版权所有
 */
layui.define(['layer'], function(exports) {
	"use strict";
	var common = {
		//弹出加载层
		loading: function(message, timeout) {
			timeout = typeof(timeout) == "undefined" ? 30 * 1000 : timeout;
			message = typeof(message) == "undefined" ? "正在拼命加载中..." : message;
			layer.msg(message, {
				time: timeout,
				shade: 0.8,
				icon: 16
			});
		},
		//关闭加载层
		closeLoading: function() {
			layer.closeAll("dialog");
		},
		//加载出错
		loadError: function(message, timeout) {
			timeout = typeof(timeout) == "undefined" ? 30 * 1000 : timeout;
			message = typeof(message) == "undefined" ? "正在拼命加载中..." : message;
			ayer.msg(message, {
				time: timeout,
				shade: 0.8,
				icon: 5
			});
		},
		//弹出错误框
		alertError: function(message) {
			message = typeof(message) == "undefined" ? "哎呦，操作失败了" : message;
			layer.alert(message, {
				shade: 0.8,
				icon: 5
			});
		},

	}
	exports('common', common);
});