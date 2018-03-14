<?php
	require_once('./Create/createSet.class.php');
	require_once('./Add/addTeacher.class.php');
	
	//建立教师集合
	//无输入
	//输出：true，false，利用ajax接收
	function creatStudentSet(){
		$cdb = new CDB();	//创建建立数据库对象
		$atd = new ATD();	//创建添加教师文件数据对象
		
		//test
		$fileAddress = './teacherList.xlsx';
		
		if($atd->addTeacherDocument($cdb, $fileAddress) == 0) echo false;
		
		echo true;
	}
	
	creatStudentSet();
?>