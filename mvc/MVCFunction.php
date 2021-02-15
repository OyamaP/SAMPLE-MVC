<?php

class MVCFunction extends FunctionBase{
    protected $nextClass = ''; // 次に利用するMVCクラス指定

    // nextClassの値をnewしてnextDataを引数にして返す
    // run.php Controller -> Model -> View の流れで利用する
    public function getClass(){
        $cls = $this->nextClass;
        return new $cls($this->nextData);
    }

    // 配列keyの変数定義があればvalueで上書きor追加する
    public function updateArg($array){
        if(empty($array)) return;
        foreach($array as $key => $value){
            $isArray = is_array($array[$key]);
            $hasOwnKey = property_exists($this,$key);
            $hasValue = !empty($value);

            // 配列 && key無 -> ループ処理で多次元対応してkey有を検索
            if($isArray && !$hasOwnKey){
                $this->updateArg($array[$key]);
            }
            // 配列 && key有 -> 追加
            if($isArray && $hasOwnKey){
                $this->$key = array_merge($this->$key,$value);
            }
            // 単数 && key有 && value有 ->上書き
            if(!$isArray && $hasOwnKey && $hasValue){
                $this->$key = $value;
            }


        }

    }


}