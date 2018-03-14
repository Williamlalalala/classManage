<?php
	require_once('./Create/createSet.class.php');
	require_once('./Add/addCourse.class.php');
	
	//建立学生集合
	//无输入???实际应应用中应有前端发送教师ID，具体后面再说
	//输出：true，false，利用ajax接收
	function createTeacherCourse(){
		$cdb = new CDB();	//创建建立数据库对象
		$acd = new ACD();	//创建添加课程数据对象
		
		//test
		$TID = '2016220202';
		$cMassage = array('Cname'=>"有什么课比较好呢", 'Instruction'=>"一个学科");
		$fileAddress = './studentList.xlsx';
		
		if($acd->addTeacherCourseDocument($cdb, $cMassage, $TID, $fileAddress) == 0) echo false;
		
		echo true;
	}
	
	createTeacherCourse();
?>