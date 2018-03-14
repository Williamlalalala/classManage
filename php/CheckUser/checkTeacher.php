<?php
	@session_start();

	require_once('./checkUser.class.php');
	require_once('./safeFunction.php');

	function checkTeacher(){
		$id = $_REQUEST['id'];
		$pswd = $_REQUEST['pswd'];
		
		$id = safeFilter($id);		//过滤输入信息
		$pswd = safeFilter($pswd);

		$flag = 'T';
		$checkClass = new Check();
		if($checkClass->checkUser($id, $pswd, $flag)){
			$_SESSION['ID'] = $id;		//设定名称为TID的会话变量
			$_SESSION['type'] = $flag;	//设定登录种类
			$data = array("result"=>true, "type"=>$flag);
			echo json_encode($data);
		}
		else echo false;
	}
	
	checkTeacher();
?>