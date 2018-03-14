<?php
	require_once('./createSet.class.php');
	
	//根据TID查找教师课程信息类
	class Find {
		
		function findTeacherCourse($id){
			$cdb = new CDB();	//创建建立数据库对象
			$manager = $cdb->createManager();
			
			$filter = ['TID'=>$id];
			$option = ['projection'=>['_id'=>0]];
			
			$query = new MongoDB\Driver\Query($filter, $option);
			$result = $manager->executeQuery('test.teacher',$query);
			
			$i = 0;
			$data = array();
			foreach($result as $document){
				$courses = $document->Course;
				foreach($courses as $course){
					$coursName = $course->Cname;
					if($this->findDuplicate($data, $coursName)){
						$data[$i] = array("No"=>$i+1,
										"CourseName"=>$course->Cname,
										"Instruction"=>$course->Instruction);
						$i++;
					}
				}
			}
			return $data;
		}
		
		function findDuplicate($data, $coursName){
			foreach($data as $course){
				if($course['CourseName'] == $coursName) return false;
				else continue;
			}
			return true;
		}
		
		function findCourseMessage($id, $courseName){
			$cdb = new CDB();	//创建建立数据库对象
			$manager = $cdb->createManager();
			
			$filter = ['TID'=>$id, 'Course.Cname'=>$courseName];
			$option = ['projection'=>['_id'=>0]];
			
			$query = new MongoDB\Driver\Query($filter, $option);
			$result = $manager->executeQuery('test.teacher',$query);
			$i = 1;
			$data[0] = $courseName;
			foreach($result as $document){
				$courses = $document->Course;
				foreach($courses as $course){
					if($course->Cname == $courseName){
						//$cid = $course.CID;
						$students = $course->Student;
						$data[$i] = array("No"=>$i,
										"StudentNum"=>count($students));
						$i++;
					}
				}
			}
			return $data;
		}
	}
?>