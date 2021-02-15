<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $this->title ?></title>
<?php foreach($this->css as $item){echo "<link rel='stylesheet' href='" . $item . ".css'>\n";} ?>
</head>
<body class="<?php echo $this->class ?>-body common-body">
<header class="<?php echo $this->class ?>-header common-header">
<div class="<?php echo $this->class ?>-header__inner common-header__inner">
    <h1 class="<?php echo $this->class ?>-h1 common-h1"><a href="./">MVC</a></h1>
<?php
if($this->page === 'management'){
    echo'
    <span class="hamburger__icon hamburger__hide">
        <i></i>
        <i></i>
        <i></i>
    </span>
    <div class="hamburger__bg hamburger__hide hamburger__fixed"></div>
    <nav class="mng-nav hamburger__nav hamburger__fixed">
        <span class="mng-nav__info">Welcome '. $_SESSION['authority'] .'： <em class="username">'. $_SESSION['name'] .'</em></span>
        <ul class="mng-nav__menu">
            <li class="mng-nav__list"><a href="logout" class="signoutBtn mng-nav__btn">Sign out</a></li>
            <li class="mng-nav__list"><span class="newBtn mng-nav__btn mng-nav__hideBtn">New</span></li>
            <li class="mng-nav__list"><span class="editBtn mng-nav__btn mng-nav__hideBtn">Edit</span></li>
            <li class="mng-nav__list"><span class="deleteBtn mng-nav__btn mng-nav__hideBtn">Delete</span></li>
        </ul>
    </nav>';
}
?>

</div>
</header>
<main class="<?php echo $this->class ?>-main common-main">
