<?php
	require_once('./createSet.class.php');
	
	//检查密码和ID是否匹配类
	class Check {
		
		function checkUser($id, $pswd, $flag){
			switch($flag){
				case 'S':
					if($this->checkS($id, $pswd)) return true;
					else return false;
					break;
				case 'T':
					if($this->checkT($id, $pswd)) return true;
					else return false;
					break;
				case 'A':
					if($this->checkA($id, $pswd)) return true;
					else return false;
					break;
			}
		}
		
		function checkS($id, $pswd){
			$cdb = new CDB();	//创建建立数据库对象
			$manager = $cdb->createManager();
			
			$filter = ['SID'=>$id];
			$option = ['projection'=>['_id'=>0]];
			
			$query = new MongoDB\Driver\Query($filter, $option);
			$result = $manager->executeQuery('test.student',$query);
			foreach($result as $document){
				$rpswd = $document->Spswd;
				if($rpswd == $pswd)	return true;
				else return false;
			}
		}
		
		function checkT($id, $pswd){
			$cdb = new CDB();	//创建建立数据库对象
			$manager = $cdb->createManager();
			
			$filter = ['TID'=>$id];
			$option = ['projection'=>['_id'=>0]];
			
			$query = new MongoDB\Driver\Query($filter, $option);
			$result = $manager->executeQuery('test.teacher',$query);
			foreach($result as $document){
				$rpswd = $document->Tpswd;
				if($rpswd == $pswd)	return true;
				else return false;
			}
		}
		
		function checkA($id, $pswd){
			$cdb = new CDB();	//创建建立数据库对象
			$manager = $cdb->createManager();
			
			$filter = ['AID'=>$id];
			$option = ['projection'=>['_id'=>0]];
			
			$query = new MongoDB\Driver\Query($filter, $option);
			$result = $manager->executeQuery('test.admin',$query);
			foreach($result as $document){
				$rpswd = $document->Tpswd;
				if($rpswd == $pswd)	return true;
				else return false;
			}
		}
	}
?>