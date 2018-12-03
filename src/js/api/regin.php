<?php
  //链接
    include('context.php');
  
    //注册
  $username=isset($_GET['username'])? $_GET['username'] : null ;
  $password=isset($_GET['password'])? $_GET['password'] : null ;

 $sql="insert into user(name,password) values('$username','$password')" ;
//执行
 $result= $conn->query($sql);

 if($result){
    echo 'success';
 }else{
    echo 'fail';
 }


?>