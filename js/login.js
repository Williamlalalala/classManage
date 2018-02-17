/*----------------------------------------------------------------  
// File Name:login.js  
// File Introduce  
//   check and handler user input  
//            
// Create Mark  
//   Create Date: 2/12/2018 3:19:19 PM  
//   Create by Xinyan Li  
//----------------------------------------------------------------*/

var btn = $('.login_btn');
var user = $('#user');
var password = $('#password');  
btn.click(function(){
	if(!user.val().match(/^\S{2,10}$/)){
		user.focus();
		return;
	}
	var ajax = Ajax();
	ajax.get('testAPI.php?inputName='+user.value+'inputPassword='+password.value,function(data){
		var con = $('#con');
		eval(data);
		if(login) {
			con.html('<p>登录成功，跳转中...</p>');
			location = 'xx.php'; //登录成功后跳转页面
		} else {
			con.html('<p>帐号或密码错误！</p>');
		}
	});
});
