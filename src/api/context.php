<?php
     //链接数据库

  $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'shaojingjingzuoye';
//创建链接
 $conn = new mysqli($servername,$username,$password,$dbname);
  mysqli_set_charset($conn,"utf8");
 //检测链接
  if($conn->connect_error){
    //输出信息结束链接
    die("链接失败".$conn->connect_error);
  }



?>