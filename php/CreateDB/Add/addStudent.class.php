<?php
	require_once('./Lib/openExcel.php');
	require_once('./Lib/structOfDb.php');
	
	//添加学生文件数据类ASD
	class ASD {
		
		//添加学生数据文件
		//输入：数据库操作数组，学生文件地址字符串
		//输出：添加成功返回1，添加失败返回0
		function addStudentDocument($cdb, $fileAddress){
			$manager = $cdb->createManager();
			$bulk = $cdb->createBulkWrite();
			
			$excelFile = readStudentExcel($fileAddress, 1);	//获得Excel中的数据，以二维数组形式输出
			
			foreach($excelFile as $line){
				if(($insert = studentDocument($line)) == null) return 0;	//判断输入文件格式
				$bulk->insert($insert);	//插入学生文档
			}
			$manager->executeBulkWrite('test.student',$bulk);	//执行
			return 1;
		}
	}
?>