<?php
  //链接
    include('context.php');
   /*
        接口功能：验证用户名是否存在
        所需参数：
            * username
     */
  $username=isset($_GET['username'])? $_GET['username'] : null ;
  // $password=isset($_POST['password'])? $_POST['password'] : null ;

// echo $username;
 $sql="select * from user where name='$username' " ;
//执行
 $result= $conn->query($sql);

 if($result->num_rows>0){
    echo 'success';
 }else{
    echo 'fail';
 }


?>