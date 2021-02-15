<?php

class SQLselect extends ModelBase{

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行
        $this->run();
    }

    private function run(){
        // 全データ取得
        if(isset($_REQUEST["get"]) && $_REQUEST["get"] === "all"){
            $this->db->getAll();
        }
    }

}