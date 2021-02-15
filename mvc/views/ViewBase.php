<?php

class ViewBase extends MVCFunction{
    // Page Info Override
    protected $title = ''; // <title></title>
    protected $header = 'template_header'; // template
    protected $page = ''; // template
    protected $footer = 'template_footer'; // template
    protected $css = ['css/style']; // array()
    protected $js = []; // array()
    protected $class = ''; // useClass -> template
    protected $errorInfo = []; // errorPost(email,tel,etc...)

    public function __construct($data){
        $this->updateArg($data); // extends Functions
        $this->display();
    }
    
    // call template
    private function display(){
        require('mvc/views/template/template.php');
    }

}

