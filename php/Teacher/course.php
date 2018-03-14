<?php
	@session_start();
	
	require_once('./findTeacherCourse.class.php');
	
	//$id = $_SESSION['ID'];
	//$courseName = $_REQUEST['cname'];
	$id = "2016220202";
	$courseName = "有什么课比较好呢";
	
	$find = new Find();
	
	$data = $find->findCourseMessage($id, $courseName);
	
	echo json_encode($data);
?>