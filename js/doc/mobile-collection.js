/**
 * 运营商授权doc
 */
layui.use(['table', 'code'], function() {
	var table = layui.table,
		code = layui.code;
	layui.code({
		elem: 'pre',
		title: '示例代码',
		about: false
	})
	//执行渲染
	table.render({
		elem: '#api-message',
		height: 'full-200',
		cols: [{}] //设置表头
	});
	table.render({
		elem: '#t-api-message',
		url: '../../lib/data/doc/mobile-collection/api-message.json',
		cellMinWidth: 80,
		cols: [
			[{
				field: 'apiName',
				title: 'API相关',
				width: '30%',
				minWidth: 100
			}, {
				field: 'apiMessage',
				title: 'API信息',
				width: '70%',
				minWidth: 100
			}]
		]
	});
	table.render({
		elem: '#t-request-param',
		url: '../../lib/data/doc/mobile-collection/request-param.json',
		cellMinWidth: 80,
		cols: [
			[{
				field: 'field',
				title: '参数名称',
				width: '15%',
				minWidth: 100
			}, {
				field: 'fieldName',
				title: '参数中文名称',
				width: '20%',
				minWidth: 120
			}, {
				field: 'fieldType',
				title: '参数类型',
				width: '10%',
				minWidth: 40
			}, {
				field: 'required',
				title: '必填',
				width: '10%',
				minWidth: 40
			}, {
				field: 'explain',
				title: '说明',
			}]
		]
	});
	table.render({
		elem: '#t-response-param',
		url: '../../lib/data/doc/mobile-collection/response-param.json',
		cellMinWidth: 80,
		cols: [
			[{
				field: 'field',
				title: '参数名称',
				width: '15%',
				minWidth: 100
			}, {
				field: 'fieldName',
				title: '参数中文名称',
				width: '20%',
				minWidth: 120
			}, {
				field: 'fieldType',
				title: '参数类型',
				width: '10%',
				minWidth: 40
			}, {
				field: 'required',
				title: '必填',
				width: '10%',
				minWidth: 40
			}, {
				field: 'explain',
				title: '说明',
			}]
		]
	});

	table.render({
		elem: '#t-error-code',
		url: '../../lib/data/doc/error-code.json',
		cellMinWidth: 80,
		cols: [
			[{
				field: 'code',
				title: '状态码',
				width: '40%',
				minWidth: 100
			}, {
				field: 'explain',
				title: '说明',
				width: '60%',
				minWidth: 100
			}]
		]
	});

})