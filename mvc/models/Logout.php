<?php

class Logout extends ModelBase{

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行
        $this->run();
    }

    private function run(){
        $this->deleteSession();
        $this->deleteAllCookie();
        setcookie('logout',true,time()+30); // logout flag -> login page
        $this->redirect('login'); // login page
    }

}