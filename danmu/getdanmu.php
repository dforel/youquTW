<?php
include 'conn.php';


// 指定允许其他域名访问  
header('Access-Control-Allow-Origin:*');  
// 响应类型  
header('Access-Control-Allow-Methods:POST');  
// 响应头设置  
header('Access-Control-Allow-Headers:x-requested-with,content-type'); 

$raw_error = array( 'code' => 0, 'result' => 'error' );

if(!$_GET["type"]){
	echo   json_encode($raw_error);
 	return; 
}

$num = 0;
$pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);//创建一个pdo对象
 


if( $_GET["type"]== "1" ){
  
	$stmt = $pdo->prepare("SELECT id,COMMENT,dt, TIMESTAMPDIFF(SECOND,dt, NOW() ) as sec
    FROM danmu 
    WHERE 1 = 1 AND dt>= DATE_ADD( NOW(), INTERVAL -10 second) AND dt < NOW()
    ORDER BY dt DESC"); 
    $stmt->execute();

    $result_array = array();

    //返回查询结果 
    foreach ($stmt as $row){ 
      array_push($result_array,$row);
    }

    $raw_success = array( 'code' => 1, 'result' => $result_array );

    $res_success = json_encode($raw_success);

    echo $res_success;
}else if( $_GET["type"] == "2"){
	$stmt = $pdo->prepare("SELECT id,COMMENT,dt
                            FROM danmu 
                            WHERE 1 = 1 
                            ORDER BY dt DESC
                            LIMIT 0,120"); 
    $stmt->execute();

    $result_array = array();

    //返回查询结果 
    foreach ($stmt as $row){ 
      array_push($result_array,$row);
    }

    $raw_success = array( 'code' => 1, 'result' => $result_array );

    $res_success = json_encode($raw_success);

    echo $res_success;
}else{
	echo json_encode($raw_error);
}


$pdo = null;
//关闭连接



?>