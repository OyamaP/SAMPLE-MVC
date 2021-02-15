<?php

class DB{

    // call
    public function callPDO($sql,$arg){
        $option = [
            'execute' => [], // execute array
            'fetch' => '', // fetch or fetchall
            'array' => [], // execute param
            'key' => '', // execute key
        ];
        // oprion update
        foreach($arg as $key => $value){
            $option[$key] = $value;
        }
        // run
        try {
            $pdo = new PDO(DSN, DB_USER, DB_PASS);
            $stmt = $pdo->prepare($sql);
            // execute ループ処理
            if($option['array']){
                $key = $option['key'];
                foreach($option['array'] as $value){
                    $option['execute'][$key] = $value;
                    $stmt->execute($option['execute']);
                }
            }else{
                $stmt->execute($option['execute']);
            }
            // fetch or fetchall
            if($option['fetch']){
                $fetch = $option['fetch'];
                $result = $stmt->$fetch(PDO::FETCH_ASSOC);
            }else{
                $result = true;
            }

        } catch (\Exception $e) {
            echo $e->getMessage();
            $result = false;
            die();
        }
        $pdo = null;
        return $result;
    }

    // 全ユーザーリストを取得
    // 例外処理がある場合は引数をtrue
    public function getAll($exception=false){
        $sql = 'select * from mvc_user';
        $option = [
            'fetch' => 'fetchall',
        ];
        $result = $this->callPDO($sql,$option);
        if($result){
            // 参照渡しで不要なデータを削除
            foreach($result as &$data){
                unset($data['password']);
            }
            echo json_encode($result);
            exit;
        }else{
            if($exception) return true;
            echo json_encode(['exception'=>'Unable to get data!']);
            exit;
        }
    }

    // 特定のユーザー情報を取得
    public function getUser($id){
        $sql = 'select * from mvc_user where id = :id';
        $option = [
            'execute' => [
                ':id' => $id,
            ],
            'fetch' => 'fetch',
        ];
        $result = $this->callPDO($sql,$option);
        if($result){
            return $result;
        }else{
            echo json_encode(['exception'=>'Unable to get user data!']);
            exit;
        }
    }

    public function updateSession(){
        if(!$_SESSION) return;
        $result = $this->getUser($_SESSION['id']);
        $_SESSION['authority'] = $result['authority'];
        $_SESSION['name'] = $result['name'];
    }

    // adminCheck SQL編集する場合の権限チェック
    public function isAdmin(){
        if($_SESSION['authority'] !== 'admin'){
            echo json_encode(['exception'=>'Not an administrator!']);
            exit;
        }
    }

}