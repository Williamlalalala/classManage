/*----------------------------------------------------------------  
// File Name:login.js  
// File Introduce  
//   check and handler user input  
//            
// Create Mark  
//   Create Date: 2/12/2018 3:19:19 PM  
//   Create by Xinyan Li  
//----------------------------------------------------------------*/
$(document).ready(function(){
	//分析cookie值，显示上次的登录信息
	var userNameValue = getCookieValue("user");
	$("#user").val(userNameValue);
	//写入点击事件
	$(".login_btn").click(function(){
		if(!$("#user").val().match(/^\S{2,10}$/)){
			$("#user").focus();
			return;
		}else{
			$.ajax({
				type:"GET",
				url:"testAPI.php?inputName="+$("#user").val()+"inputPassword="+$("#password").val(),
				dataType:"json",
				success:function(data){
					if (data.success){
						setCookie("user",$("#user").val(),24,"/");
						setCookie("password",$("#password").val(),24,"/");
						$("#con").html('<p>登录成功，跳转中...</p>');
						self.location.replace("../${data.userType}.html");//userType的值决定了应该跳转到哪个页面
					}else{
						$("#con").html('<p>帐号或密码错误！</p>');
					}
				},
				error:function(jqXHR){
					alert("发生错误："+jqXHR.status);
				},
			});
		}
	});
});
