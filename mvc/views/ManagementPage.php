<?php

class ManagementPage extends ViewBase{
    public $title = 'Management'; // <title></title>
    public $page = 'management'; // template
    public $class = 'mng'; // useClass -> template
    public $js = ['js/hamburger','js/management']; // array()

    public function __construct($data){
        parent::__construct($data); // 継承クラスのconstructor実行

    }

}