<?php

class Controller extends MVCFunction{
    protected $nextData = [ // data to next MVC
        'directory' => '',
    ];

    public function __construct(){
        $uri = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; // localhost/createMVC/xxx...
        $this->nextData['directory'] = $this->replaceUri($uri);
        $this->nextClass = $this->statusCheck($this->nextData['directory']);
    }

    // replace uri
    private function replaceUri($uri){
        $uri = str_replace(ROOT,'',$uri); // replace ROOT
        $uri = preg_replace('/\?.+/','',$uri); // replace ?
        $uri = preg_replace('/.+\//','',$uri); // replace / -> lastFileName
        return $uri;
    }

    // statusCheck
    private function statusCheck($data){
        if(!empty($_GET)) return GET::check($data);
        if(!empty($_POST)) return POST::check($data);
        $uri = URI::check($data);
        if($uri==='ModelPage') $this->uriCheck($data);
        return $uri;

    }

    // to FunctionBase
    private function uriCheck($data){
        if($this->isLoggedIn() && $data === 'login') $this->redirect('management');
        if(!$this->isLoggedIn() && $data !== 'login') $this->redirect('login');
        return $data;
    }


}
