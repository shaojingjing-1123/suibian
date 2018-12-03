<?php
//登录
 include('context.php');


$username=isset($_GET['username'])? $_GET['username'] : null ;

$password=isset($_GET['password'])? $_GET['password'] : null ;

$sql="select * from user where username='$username' and password='$password'";

$result=$conn->query($sql);

if($result->num_rows>0){
    echo 'success';
}else {
    echo 'fail';
}
?>