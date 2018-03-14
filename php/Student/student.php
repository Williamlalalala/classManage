<?php
	@session_start();
	
	require_once('./findStudentCourse.class.php');
	
	$id = $_SESSION['ID'];
	
	$find = new Find();
	
	$data = $find->findStudentCourse($id);
	
	echo json_encode($data);
?>