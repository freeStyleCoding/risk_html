layui.use(['layer', 'form', 'common'], function() {
	var form = layui.form,
		$ = layui.jquery,
		layer = layui.layer,
		common = layui.common;

	var riskRootPath = layui.data('risk-server').rootPath;
	var submitUrl = riskRootPath + "/v3/risk/submit/fraud";
	$("input[name='requestId']").val(Math.random().toString(36).substr(2));

	form.on('submit(risk-submit-fraud)', function(data) {
		console.log(data);
		function callback(data) {
			layui.data('risk', {
				key: 'riskNumber',
				value: data.riskNumber
			});
			layer.confirm('点击确认将新打开风控报告页面，风控编号' + data.riskNumber, {
				btn: ['取消', '查看风控报告']
			}, function() {
				layer.msg('已取消', {
					icon: 1
				});
			}, function() {
				window.open("risk-report-v1.html?risknumber=" + data.riskNumber);
			});
		}
		$.ajax({
			url: submitUrl,
			data: data.field, //请求的附加参数，用json对象
			method: 'POST',
			//dataType :"json",
			success: function(res) {
				console.log(res)
				if(res.success) {
					callback(res.data);
				} else {
					common.alertError('操作失败：' + res.message);
				}

			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error(jqXHR)
				common.alertError('请稍后重试：' + jqXHR.responseText);
			}
		});
		return false;
	})
})