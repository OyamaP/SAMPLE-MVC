<?php

class LoginPage extends ViewBase{
    public $title = 'Login'; // <title></title>
    public $page = 'login'; // template
    public $class = 'login'; // useClass -> template

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行

    }

    // login notice
    public function isNotice(){
        // if session timeout but cookie[login] remain
        if(!empty($_COOKIE['login']) && $_COOKIE['login']){
            $this->deleteAllCookie();
            echo 'Session out...';
            return;
        }
        // after logged out
        if(!empty($_COOKIE['logout']) && $_COOKIE['logout']){
            $this->deleteAllCookie();
            echo 'Logged out';
            return;
        }

    }

    // error search
    public function errorText($error,$text){
        foreach($this->$error as $value){
            if($value === $text) return true;
        }        
    }
    // error -> email
    public function errorEmail(){
        if($this->errorText('errorInfo','emailFormat')) echo '※Please enter the correct your email address';
        if($this->errorText('errorInfo','loginError')) echo '※Wrong email or password';
    }
    // error -> password
    public function errorPassword(){
        if($this->errorText('errorInfo','passwordEmpty')) echo '※Please enter your password';
    }
    // error -> emailValue表示
    public function valueEmail(){
        if(isset($_SESSION['postEmail'])){
            echo 'value="'. htmlspecialchars($_SESSION['postEmail']) . '"';
            unset($_SESSION['postEmail']);
        }
    }

}