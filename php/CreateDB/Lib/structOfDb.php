<?php
	//--------------------------------
	//此文件为数据库结构定义相关函数
	//--------------------------------
	
	//定义相关文档结构中元素数目
	define("TEACHER_NUM", 3);
	define("TCOURSE_NUM", 2);
	define("CSTUDENT_NUM", 2);
	define("HOMEWORK_NUM", 2);
	define("STUDENT_NUM", 3);
	define("SCOURSE_NUM", 4);
	
	//教师文档结构
	//输入：二维数据数组
	//数据符合结构输出为教师文档，否则输出为null
	function teacherDocument($element){
		if(count($element) != TEACHER_NUM) return null;
		$document= ['TID'=>(string)$element['A'],
					'Tname'=>(string)$element['B'],
					'Tpswd'=>(string)$element['C'],
					'Course'=>[]];
		return $document;
	}
	
	//教师文档中的课程文档结构
	//输入：二维数据数组 与 课程文档中的学生文档
	//数据符合结构输出为课程文档，否则输出为null
	function tCourseDocument($element, $studentDocument){
		if(count($element) != TCOURSE_NUM) return null;
		$document = ['Cname'=>(string)$element['Cname'],
					'Instruction'=>(string)$element['Instruction'],
					'Student'=>$studentDocument];
		return $document;
	}
	
	//课程文档中的学生文档结构
	//输入：二维数据数组
	//数据符合结构输出为课程文档，否则输出为null
	function cStudentDocument($element){
		if(count($element) != CSTUDENT_NUM) return null;
		$document= ['SID'=>(string)$element['A'],
					'Sname'=>(string)$element['B'],
					'Homework'=>[]];
		return $document;
	}
	
	//作业文档结构
	//输入：二维数据数组
	//数据符合结构输出为课程文档，否则输出为null
	function homeworkDocument($element){
		if(count($element) != CSTUDENT_NUM) return null;
		$document= ['Hname'=>(string)$element['A'],
					'Content'=>(string)$element['B']];
		return $document;
	}
	
	//学生文档结构
	//输入：二维数据数组
	//数据符合结构输出为课程文档，否则输出为null
	function studentDocument($element){
		if(count($element) != STUDENT_NUM) return null;
		$document= ['SID'=>(string)$element['A'],
					'Sname'=>(string)$element['B'],
					'Spswd'=>(string)$element['C'],
					'Course'=>[]];
		return $document;	
	}
	
	//学生文档中的课程文档结构
	//输入：二维数据数组
	//数据符合结构输出为课程文档，否则输出为null
	function sCourseDocument($element){
		if(count($element) != SCOURSE_NUM) return null;
		$document= ['Cname'=>(string)$element['A'],
					'TID'=>(string)$element['B'],
					'Tname'=>(string)$element['C'],
					'Homework'=>[]];
		return $document;	
	}
?>