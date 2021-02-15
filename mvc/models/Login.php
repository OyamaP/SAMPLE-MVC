<?php

class Login extends ModelBase{

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行
        $this->nextData = $this->validate($this->nextData);
        $this->nextClass = 'LoginPage';
    }

    private function validate($data){
        $_SESSION['postEmail'] = $_POST['email'];
        if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            array_push($data['errorInfo'],'emailFormat');
        }
        if(empty($_POST['password'])) {
            array_push($data['errorInfo'],'passwordEmpty');
        }
        if(!empty($data['errorInfo'])) return $data;
        return $this->login($data);
    }

    private function login($data){
        // email 検索
        $sql = 'select * from mvc_user where email = :email';
            $option = [
                'execute' => [
                    ':email' => $_POST['email'],
                ],
                'fetch' => 'fetch',
            ];
            $result = $this->db->callPDO($sql,$option);
            // email検索結果判定
            if(!isset($result['email'])) {
                array_push($data['errorInfo'],'loginError');
                return $data;
            }
            // password判定
            if(password_verify($_POST['password'], $result['password'])) {
                //session_idを新規作成
                session_regenerate_id(true);    
                $_SESSION['login'] = true;
                $_SESSION['id'] = $result['id'];
                $_SESSION['authority'] = $result['authority'];
                $_SESSION['name'] = $result['name'];
                setcookie('login',true,time() + 86400);
                $this->redirect('management');
            } else {
                array_push($data['errorInfo'],'loginError');
                return $data;
            }
        }
 
}