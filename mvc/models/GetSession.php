<?php

class GetSession extends ModelBase{

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行
        $this->run();
    }

    private function run(){
        // ログイン者情報取得
        if(isset($_REQUEST["get"]) && $_REQUEST["get"] === "info"){
            $array = [
                'authority' => $_SESSION['authority'],
                'name' => $_SESSION['name'],
            ];
            echo json_encode($array);
            exit;
        }

    }

}