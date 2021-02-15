<?php

class ModelBase extends MVCFunction{
    protected $db; // DB接続クラス
    protected $directory; // ROOT以降のdirectory
    protected $nextData = [ // data to next MVC
        'errorInfo' => [], // errorInfo(email,tel,etc...)
    ];

    public function __construct($data){
        $this->db = new DB();
        $this->db->updateSession(); // セッション更新
        $this->updateArg($data); // extends CommonMVC
    }

}