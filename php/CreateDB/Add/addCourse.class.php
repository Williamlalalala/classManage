<?php
	require_once('./Lib/openExcel.php');
	require_once('./Lib/structOfdb.php');
	
	//添加课程数据类ACD
	class ACD {

		//添加课程文件数据
		//输入：教师TID，课程信息数组，数据库操作数组，学生文件地址字符串
		//添加成功返回1，添加失败返回0
		function addTeacherCourseDocument($cdb, $cMassage, $TID, $fileAddress){
			$manager = $cdb->createManager();
			$bulk = $cdb->createBulkWrite();
			
			$excelFile = readStudentExcel($fileAddress, 0);	//获得Excel中的数据，以二维数组形式输出
			
			$docNum = 0;	//对学生文档提供下标
			foreach($excelFile as $line){
				if(($studentDocuments[$docNum] = cStudentDocument($line)) == null) return 0;	//判断输入文件格式
				$docNum++;
			}
			//对该课程文档填入信息
			if(($courseDocument = tCourseDocument($cMassage, $studentDocuments)) == null) return 0;	//判断输入文档格式
				
			$bulk->update(['TID'=>$TID],['$push'=>['Course'=>$courseDocument]]);	//推入课程文档进入数组
				
			$manager->executeBulkWrite('test.teacher',$bulk);
			
			return 1;
		}
		
		//通过遍历学生集合中每个学生的SID，在教师集合中搜索收集其对应课程，并填入学生集合中
		
		//添加学生课程数据到数据库中
		//输入：课程信息的二维数组和创建集合对象
		//添加成功返回1，添加失败返回0
		function addStudentCourseDocument($cdb, $massages){
			$manager = $cdb->createManager();
			
			foreach($massages as $massage){
				foreach($massage as $course){
					$bulk = $cdb->createBulkWrite();	//创建BulkWrite对象
					if(($courseDocument = sCourseDocument($course)) == null) return 0;	//不符合文档结构返回0
					$bulk->update(['SID'=>$course['D']],['$push'=>['Course'=>$courseDocument]]);	//推入课程文档进入数组
					$manager->executeBulkWrite('test.student',$bulk);
				}
			}
				
			return 1;
		}
		
		//查找SID数据方法
		//输入：数据库操作数组
		//输出：返回学生SID数组
		function findSID($cdb){
			$manager = $cdb->createManager();
			
			$filter = [];
			$option = ['pojection'=>['_id'=>0]];	//搜索条件
			
			$query = new MongoDB\Driver\Query($filter, $option);
			$result = $manager->executeQuery('test.student',$query);
			
			$sNum = 0;
			foreach($result as $document){
				$sidSet[$sNum] = $document->SID;
				$sNum++;
			}
			
			return $sidSet;
		}
		
		//通过SID数组，在教师集合中查找学生对应课程方法
		//输入：数据库操作数组、SID数组
		//输出：包含学生SID与对应课程信息的二维数组
		function findCourse($cdb, $sidSet){
			$manager = $cdb->createManager();
			
			$sNum = 0;
			foreach($sidSet as $sid){
				$filter = ['Course.Student.SID'=>$sid];
				$option = ['pojection'=>['_id'=>0]];	//搜索条件
				
				$query = new MongoDB\Driver\Query($filter, $option);
				$result = $manager->executeQuery('test.teacher',$query);
				
				$cNum = 0;
				foreach($result as $document){
					$courses = $document->Course;
					foreach($courses as $course){
						$massages[$sNum][$cNum]['A'] = $course->Cname;
						$massages[$sNum][$cNum]['B'] = $document->TID;
						$massages[$sNum][$cNum]['C'] = $document->Tname;
						$massages[$sNum][$cNum]['D'] = $sid;
						$cNum++;
					}
				}
				$sNum++;
			}
			
			return $massages;
		}
	}
?>