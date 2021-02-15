<?php

class SQLdelete extends ModelBase{

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行
        $this->db->isAdmin();
        $this->run();
    }

    private function run(){
        $sql = 'DELETE from mvc_user where id = :id';
        $option = [
            'execute' => [
                ':id' => '',
            ],
            'array' => json_decode($_POST['data']),
            'key' => ':id',
        ];
        $result = $this->db->callPDO($sql,$option);
        if($result){
            $this->db->updateSession(); // セッション更新
            $deleteFlag = $this->db->getAll(true); // データ更新して表示
            if($deleteFlag){
                echo json_encode(['exception'=>'
                    Delete All Data! Unable to operation list...<br>
                    Log out after 5 seconds
                ','notfound'=>true]);
                exit;
            }
        }else{
            echo json_encode(['exception'=>'Delete Failer!']);
            exit;
        }
    }

}