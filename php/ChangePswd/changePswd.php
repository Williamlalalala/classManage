<?php
	@session_start();

	require_once('./changePswd.class.php');
	
	function changePswd(){
		$pswd = $_REQUEST['pswd'];
		$newpswd = $_REQUEST['newpswd'];
		$id = $_SESSION['ID'];
		$flag = $_SESSION['type'];	//获取登录种类
		
		$changePswd = new Change();
		echo $changePswd->changeUser($id, $pswd, $newpswd, $flag);
	}
	
	changePswd();
	
	@session_destroy();
?>