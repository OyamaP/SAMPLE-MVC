<?php

class FunctionBase{
    // from Autoloader
    public function exceptionClass(){
        if(self::isLoggedIn()) self::redirect('management');
        if(!self::isLoggedIn()) self::redirect('login');
    }

    // redirect
    public function redirect($page){
        header('Location: ' . PROTOCOL . ROOT . $page);
        exit;
    }

    // login check
    public function isLoggedIn(){
        return isset($_SESSION['login']) && !empty($_SESSION['login']);
    }

    // session delete
    public function deleteSession(){
        $_SESSION = [];
        setcookie(session_name(), '', time()-1, '/');
        @session_destroy();        
    }

    // cookie all delete
    public function deleteAllCookie(){
        foreach($_COOKIE as $key => $value){
            setcookie($key,'',time()-1);
        }
    }

}