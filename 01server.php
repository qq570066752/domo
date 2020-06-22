<?php
header("Content-type:text/html;charset=utf8");
$uses = $_GET["uses"];
$pwd  = $_GET["pwd"];

// echo "用户名:".$user." 密码：".$pwd;

// echo '用户名：$user 密码：$pwd';
// echo "<br>";

# 建议写法
echo "用户名：$uses 密码：$pwd";
?>