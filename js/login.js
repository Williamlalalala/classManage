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
	if($("#remember").checked == true){
		var userPswd = getCookieValue("password");
		$("#password").val(userPswd);
	}
	//写入点击事件
	$(".login_btn").click(function(){
		if(!$("#user").val().match(/^\d{2,13}$/)){
			alert("帐号格式不对！");
			$("#user").focus();
			return;
		}else if(!$("#password").val().match(/^[0-9A-z]{6,18}$/)){
			alert("密码需为6-16位数字或者字母！");
			$("#password").focus();
			return;
		}
		else{
			var val=$('input:radio[name="userType"]:checked').val();
            if(val=="teacherUser"){
            	$.ajax({
				type:"POST",
				url:"/test/php/CheckUser/checkTeacher.php",
				data:{
					'id':$("#user").val(),
					'pswd':$("#password").val()
				},
				dataType:"json",
				success:function(data){
					if (data.result){
						setCookie("user",$("#user").val(),120,"/");
						setCookie("password",$("#password").val(),120,"/");
						$("#con").html('<p>登录成功，跳转中...</p>');
						window.location.href="/test/html/teacher.html";
						return false;
					}else{
						$("#con").html('<p>帐号或密码错误！</p>');
					}
				},
				error:function(jqXHR){
					alert("发生错误："+jqXHR.status);
				},
			});
            }else{
            	$.ajax({
				type:"POST",
				url:"/test/php/CheckUser/checkStudent.php",
				data:{
					'id':$("#user").val(),
					'pswd':$("#password").val()
				},
				dataType:"json",
				success:function(data){
					if (data.result){
						setCookie("user",$("#user").val(),120,"/");
						setCookie("password",$("#password").val(),120,"/");
						$("#con").html('<p>登录成功，跳转中...</p>');
						window.location.href="/test/html/student.html";
						return false;
					}else{
						$("#con").html('<p>帐号或密码错误！</p>');
					}
				},
				error:function(jqXHR){
					alert("发生错误："+jqXHR.status);
				},
			});
            }
		}
	});
});
