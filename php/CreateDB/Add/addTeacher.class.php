<?php
	require_once('./Lib/openExcel.php');
	require_once('./Lib/structOfDb.php');
	
	//添加教师文件数据类ATD
	class ATD {
		
		//添加老师文件数据
		//输入：数据库操作数组，教师文件地址字符串
		//输出：添加成功返回1，添加失败返回0
		function addTeacherDocument($cdb, $fileAddress){
			$manager = $cdb->createManager();	//获得Mongo数据库连接
			$bulk = $cdb->createBulkWrite();	//获得bulk相关操作连接
			
			$excelFile = readTeacherExcel($fileAddress);	//获得Excel中的数据，以二维数组形式输出
			
			foreach($excelFile as $line){
				if(($insert = teacherDocument($line)) == null) return 0;	//判断输入文件格式
				$bulk->insert($insert);	//插入教师文档
			}
			$manager->executeBulkWrite('test.teacher',$bulk);	//执行
			return 1;
		}
	}
?>