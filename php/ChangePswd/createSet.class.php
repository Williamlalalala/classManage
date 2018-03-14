<?php
	//创建集合类CDB
	class CDB {
	
		//创建Manager
		//无输入？
		//输出：数据库操作数组
		function createManager(){
			$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");	//建立Mongo数据库连接
			
			return $manager;
		}
		
		//创建BulkWrite
		//无输入？
		//输出：$bulk 
		//这个函数是填补上面$bulk无法循环的问题
		function createBulkWrite(){
			$bulk = new MongoDB\Driver\BulkWrite;	//建立bulk相关操作连接
			
			return $bulk;
		}
	}
?>