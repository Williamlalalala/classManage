<?php
	//过滤输入信息函数
	//输入：信息字符串
	//输出：过滤后的安全字符串
	function safeFilter($input){
		$input = trim($input);	//去除空格，tab，换行
		$input = stripcslashes($input);	//去除输入数据中的反斜杠
		$input = htmlspecialchars($input);	//转义html代码,防止调用脚本
		return $input;
	}
?>