$(function(){

	function parseQueryString(url){
    var obj = {};
    var keyvalue = [];
    var key = "",
        value = "";
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    for (var i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

var id=parseQueryString(location.href)[id];

	$("#confirm-btn").click(function(){
		if(!$("#new-pswd").val().match(/^[0-9A-z]{6,18}$/)){
			$("#con").html("<p>密码需为6-16位数字或字母！</p>")
			$("#new-pswd").focus();
			return;
		}else if($("#new-pswd").val()!=$("#pswd-again").val()){
			alert($("#new-pswd").value+" s "+$("#pswd-again").value);
			$("#con").html("<p>两次密码不一样！</p>");
		}else{
			$.ajax({
				type:"POST",
				url:"/test/php/ChangePswd/changePswd.php",
				dataType:"text",
				data:{
					//userAccount:id,
					'pswd':$("#old-pswd").val(),
					'newpswd':$("#new-pswd").val()
				},
				success:function(data){
					if (data){
						$("#con").html('<p>密码修改成功，请重新登录...</p>');
						window.location.href = "../index.html";
						return false;
					}else{
						$("#con").html('<p>修改失败，请稍候重试！</p>');
					}
				},
				error:function(jqXHR){
					alert("发生错误："+jqXHR.status);
				},
			});
		}
	});
});