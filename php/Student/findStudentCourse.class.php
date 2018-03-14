<?php
	require_once('./createSet.class.php');
	
	//根据TID查找教师课程信息类
	class Find {
		
		function findStudentCourse($id){
			$cdb = new CDB();	//创建建立数据库对象
			$manager = $cdb->createManager();
			
			$filter = ['SID'=>$id];
			$option = ['projection'=>['_id'=>0]];
			
			$query = new MongoDB\Driver\Query($filter, $option);
			$result = $manager->executeQuery('test.student',$query);
			
			$i = 1;
			foreach($result as $document){
				$courses = $document->Course;
				$data[0] = $document->Sname;
				foreach($courses as $course){
					$data[$i] = array("No"=>$i,
									"CourseName"=>$course->Cname,
									"CourseTeacher"=>$course->Tname);
					$i++;
				}
			}
			
			return $data;
		}
	}
?>