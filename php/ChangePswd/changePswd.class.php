<?php
	require_once('./createSet.class.php');
	require_once('./checkUser.class.php');
	
	//修改密码类
	class Change {
		
		function changeUser($id, $pswd, $newpswd, $flag){
			if($this->cherkPswd($id, $pswd, $flag)){
				switch($flag){
					case 'S':
						if($this->changeStudent($id, $newpswd)) return true;
						else return false;
						break;
					case 'T':
						if($this->changeTeacher($id, $newpswd)) return true;
						else return false;
						break;
					case 'A':
						if($this->changeAdmin($id, $newpswd)) return true;
						else return false;
						break;
				}
			}
			else return false;
		}
		
		function cherkPswd($id, $pswd ,$flag){
			$checkClass = new Check();
			return $checkClass->checkUser($id, $pswd ,$flag);
		}
		
		function changeStudent($id, $newpswd){
			$cdb = new CDB();	//创建建立数据库对象
			$manager = $cdb->createManager();
			$bulk = $cdb->createBulkWrite();
			
			$bulk->update(['SID'=>$id],['$set'=>['Spswd'=>$newpswd]]);	//更新语句
			$result = $manager->executeBulkWrite('test.student',$bulk);
			
			if($result) return true;
			else return false;
		}
		
		function changeTeacher($id, $newpswd){
			$cdb = new CDB();	//创建建立数据库对象
			$manager = $cdb->createManager();
			$bulk = $cdb->createBulkWrite();
			
			$bulk->update(['TID'=>$id],['$set'=>['Tpswd'=>$newpswd]]);	//更新语句
			$result = $manager->executeBulkWrite('test.teacher',$bulk);
			
			if($result) return true;
			else return false;
		}
		
		function changeAdmin($id, $newpswd){
			//暂无管理员数据库
		}
	}
?>