<?php
	require_once('./Create/createSet.class.php');
	require_once('./Add/addStudent.class.php');
	require_once('./Add/addCourse.class.php');
	
	//建立学生集合
	//无输入
	//输出：true，false，利用ajax接收
	function creatStudentSet(){
		$cdb = new CDB();	//创建建立数据库对象
		$asd = new ASD();	//创建添加学生文件数据对象
		$acd = new ACD();	//创建添加学生课程数据对象
		
		//test
		$fileAddress = './studentList.xlsx';
		
		if($asd->addStudentDocument($cdb, $fileAddress) == 0) echo false;	//添加学生文件数据
		
		if($acd->addStudentCourseDocument($cdb, $acd->findCourse($cdb, $acd->findSID($cdb))) == 0) echo false;	//添加学生课程数据
		
		echo true;
	}
	
	creatStudentSet();
?>