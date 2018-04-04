/**
 * 文档右侧目录展示
 */
layui.use(['element', 'layer', 'jquery', 'tree'], function() {
	var element = layui.element,
		layer = layui.layer,
		$ = layui.jquery;
	var array_children = new Array();
	layui.each($(".doc fieldset a"), function(i, n) {
		array_children.push({
			name: n.innerText,
			href: "#" + n.name
		});
	});
	layer.open({
		type: 1,
		title: '目录',
		offset: 'r' //具体配置参考：offset参数项
			,
		area: ['180px', '300px'],
		content: '<ul id="doc-catalog" style="margin-left: 30px;margin-top: 10px;"></ul>',
		maxHeight: '600px',
		shade: 0, //不显示遮罩
		success: function() {
			layui.tree({
				elem: '#doc-catalog',
				nodes: array_children
			});
		}
	});
});