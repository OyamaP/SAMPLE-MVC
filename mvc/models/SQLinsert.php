<?php

class SQLinsert extends ModelBase{

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行
        $this->db->isAdmin();
        $this->run();
    }

    private function run(){
        $sql = 'INSERT INTO mvc_user (
            authority,name,email,password,tel,address
        ) VALUES (
            :authority,:name,:email,:password,:tel,:address
        )';
        $option = [
            'execute' => [
                ':authority' => $_POST['authority'],
                ':name' => $_POST['name'],
                ':email' => $_POST['email'],
                ':password' => password_hash($_POST['password'],PASSWORD_DEFAULT),
                ':tel' => $_POST['tel'],
                ':address' => $_POST['address'],
            ],
        ];
        $result = $this->db->callPDO($sql,$option);
        if($result){
            $this->db->getAll(); // データ更新して表示 
        }else{
            echo json_encode(['exception'=>'Create Failer!']);
            exit;
        }
    }

}