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
	$(".login_btn").click(function(){
		if(!$("#user").val().match(/^\S{2,10}$/)){
			$("#user").focus();
			return;
		}else{
			$.ajax({
				type:"GET",
				url:"testAPI.php?inputName="+$("#user").val()+'inputPassword='+$("#password").val(),
				dataType:"json",
				success:function(data){
					if (data.success){
						$("#con").html('<p>登录成功，跳转中...</p>');
						location = data.location;
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
