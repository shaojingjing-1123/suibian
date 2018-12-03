<?php
  //链接
    include('context.php');
   /*
        接口功能：验证用户名是否存在
        所需参数：
            * username
     */
  $username=isset($_GET['username'])? $_GET['username'] : null ;
  // echo $username;
  // $password=isset($_POST['password'])? $_POST['password'] : null ;

 $sql="select * from user where username='$username' " ;
//执行
 $result= $conn->query($sql);
// echo $username;

 if($result->num_rows>0){
    echo 'success';
 }else{
    echo 'fail';
 }


?>