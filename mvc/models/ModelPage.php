<?php

class ModelPage extends ModelBase{

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行
        // directoryの頭文字を大文字にしPage化
        $this->nextClass = ucfirst($this->directory).'Page';
    }

}