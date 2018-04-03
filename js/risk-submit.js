layui.use(['layer','form'], function(){
	var form = layui.form;
	
	var localTest = layui.data('test');
console.log(localTest.nickname); //获得“贤心”
	
	form.on('submit(risk-submit)', function(data){
		console.log(data);
		
		layui.data('test', {
  key: 'nickname'
  ,value: data.field.userName
});

window.location.href ="risk-submit.html";
		return false;
	})
})
