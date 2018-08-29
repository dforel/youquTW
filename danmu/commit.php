<?php
include 'conn.php';

if(count($_POST)!= 0) {
  
  $num = 0;
  $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);//创建一个pdo对象
  
  
  $comment = $_POST["comment"];
  
  if( $comment != '' ){ 
    $stmt = $pdo->prepare("insert into danmu (comment,dt) values ( ? , now() )");
    $stmt->bindParam(1,$comment); 
    $stmt->execute(); 
  }

 
  $pdo = null;
  //关闭连接
}
?>