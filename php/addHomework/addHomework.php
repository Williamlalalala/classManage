<?php
	$fileName = "./test.cpp";
	$file = fopen($fileName, 'r');
	
	$txt = "";
	while(!feof($file)){
		$txt = fread($file, 2048);
		///$txt .= fgets($file);
		//$txt .= '/n';
	}
	echo htmlspecialchars($txt);
?>