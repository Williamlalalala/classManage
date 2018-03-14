<?php
	@session_start();

	require_once('./changePswd');
	
	function changeSpswd(){
		$pswd = $_REQUEST['pswd'];
		$newpswd = $_REQUEST['newpswd'];
		$id = $_SESSION['SID'];
		$flag = $_SESSION['type'];	//获取登录种类
		
		$changePswd = new Change();
		if($changePswd->change($id, $pswd, $newpswd, $flag)) return true;
		else return false;
	}
	
	changSpswd();
?>