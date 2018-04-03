layui.use(['layer', 'form', 'common'], function() {
	var form = layui.form,
		$ = layui.jquery,
		layer = layui.layer,
		common = layui.common;

	form.on('submit(risk-choose)', function(data) {
		console.log(data.field);
		switch(data.field.riskVersion) {
			case "0":
				window.location.href = "mobile-collection.html";
				break;
			case "1":
				window.location.href = "risk-submit-fraud.html";
				break;
			default:
				common.alertError("暂未开放");
				break;
		}
		return false;
	})

});