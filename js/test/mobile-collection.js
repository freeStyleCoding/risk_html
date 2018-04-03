layui.use(['form', 'common', 'layer'], function() {
	var form = layui.form,
		$ = layui.jquery,
		layer = layui.layer,
		common = layui.common;
	var riskRootPath = layui.data('risk-server').rootPath;
	var authorizationUrl = riskRootPath + "/v3/mobile/collection/authorization";

	var localRisk = layui.data('risk');
	console.log(localRisk);

	function saveLocalData(data) {
		layui.data('risk', {
			key: 'rawDataId',
			value: data.rawDataId
		});
		layui.data('risk', {
			key: 'phone',
			value: $("input[name='phone']").val()
		});
		layui.data('risk', {
			key: 'idNumber',
			value: $("input[name='idNumber']").val()
		});
		layui.data('risk', {
			key: 'userName',
			value: $("input[name='userName']").val()
		});
		console.log(layui.data('risk'));
	}

	form.on('submit(mobile-collection)', function(data) {
		function callback(data) {
			layer.confirm('点击确认将进行跳转运营商授权页面\r\n' + JSON.stringify(data), {
				btn: ['取消', '跳转']
			}, function() {
				layer.msg('已取消', {
					icon: 1
				});
			}, function() {
				window.location.href = data.redirectUrl;
			});
		}
		$.ajax({
			url: authorizationUrl,
			data: data.field, //请求的附加参数，用json对象
			method: 'POST',
			//dataType :"json",
			success: function(res) {
				console.log(res)
				if(res.success) {
					saveLocalData(res.data);
					callback(res.data);
				} else {
					common.alertError('操作失败：' + res.message);
				}

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error(jqXHR);
				console.error(textStatus);
				console.error(errorThrown);
				common.alertError('请稍后重试：' + jqXHR.responseText);
			}
		});
		return false;
	})
})