<?php

class SQLupdate extends ModelBase{

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行
        $this->db->isAdmin();
        $this->run();
    }

    private function run(){
        $sql = 'UPDATE mvc_user
            SET
                authority = :authority,
                name = :name,
                email = :email,
                password = :password,
                tel = :tel,
                address = :address
            WHERE id = :id
        ';
        $option = [
            'execute' => [
                ':id' => $_POST['id'],
                ':authority' => $_POST['authority'],
                ':name' => $_POST['name'],
                ':email' => $_POST['email'],
                ':password' => '',
                ':tel' => $_POST['tel'],
                ':address' => $_POST['address'],
            ],
        ];
        $pass = $_POST['password'];
        // NotChange の場合、既存のパスワード値を設定
        if($pass==='NotChange'){
            $user = $this->db->getUser($_POST['id']);
            $option['execute'][':password'] = $user['password'];
        }else{
            // 変更する場合はhash化して設定
            $option['execute'][':password'] = password_hash($pass,PASSWORD_DEFAULT);
        }     
        $result = $this->db->callPDO($sql,$option);
        if($result){
            $this->db->updateSession(); // セッション更新
            $this->db->getAll(); // データ更新して表示
        }else{
            echo json_encode(['exception'=>'Update Failer!']);
            exit;
        }
    }

}