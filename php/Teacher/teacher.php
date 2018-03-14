<?php
	@session_start();
	
	require_once('./findTeacherCourse.class.php');
	
	$id = $_SESSION['ID'];
	
	$find = new Find();
	
	$data = $find->findTeacherCourse($id);
	
	echo json_encode($data);
?>