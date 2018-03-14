<?php
	//------------------------------------------------------------------------------
	//此文件为打开相关Excel表格的相关函数
	//引用了https://github.com/PHPOffice/PHPExcel中的Classes文件夹并改名为phpexecl
	//------------------------------------------------------------------------------
	
	require_once('./Lib/phpexcel/PHPExcel/IOFactory.php');	//引入PHPExcel中的类文件
	
	//读取教师Excel中文件的函数
	//输入：文件路径
	//输出：文件信息二维数组
	function readTeacherExcel($fileName){
		$objReader = PHPExcel_IOFactory::createReader('Excel2007');	//创建读取对象
		$objPHPExcel = $objReader->load($fileName);	//读取文件
		
		$worksheet = $objPHPExcel->getSheet(0);	//工作表
		$rowNum = $worksheet->getHighestRow();	//总行数
		$colNum = $worksheet->getHighestColumn();	//总列数
		
		$data = array();	//定义数组
		
		for($i = 2;$i <= $rowNum;$i++){	//遍历行
			for($j = 'A';$j <= $colNum;$j++){	//遍历列
				$address = $j.$i;
				$data[$i-2][$j] = $worksheet->getCell($address)->getValue();	//赋值
			}
		}
		
		return $data;
	}
	
	//读取学生Excel中文件的函数
	//输入：文件路径与是否读取密码标志，0为不读，1为读
	//输出：文件信息二维数组
	function readStudentExcel($fileName, $flag){
		$objReader = PHPExcel_IOFactory::createReader('Excel2007');	//创建读取对象
		$objPHPExcel = $objReader->load($fileName);	//读取文件
		
		$worksheet = $objPHPExcel->getSheet(0);	//工作表
		$rowNum = $worksheet->getHighestRow();	//总行数
		$colNum = $worksheet->getHighestColumn();	//总列数
		
		$data = array();	//定义数组
		
		for($i = 2;$i <= $rowNum;$i++){	//遍历行
			for($j = 'A';$j <= $colNum;$j++){	//遍历列
				if($flag == 0 && $j == 'C') continue;
				$address = $j.$i;
				$data[$i-2][$j] = $worksheet->getCell($address)->getValue();	//赋值
			}
		}
		
		return $data;
	}
?>