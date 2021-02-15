<?php

class AutoLoader extends FunctionBase{
    // class file list
    private static $dirs;

    // load function
    public static function loadClass($class){
        foreach (self::directories() as $directory) {
            $file_name = "{$directory}/{$class}.php";
            if (is_file($file_name)) {
                require $file_name;
                return true;
            }
        }
        // not found
        parent::exceptionClass();
    }

    // directory list
    private static function directories(){
        if (empty(self::$dirs)) {
            $base = 'mvc';
            self::$dirs = array(
                // fill in directories
                $base,
                $base . '/controllers',
                $base . '/models',
                $base . '/views'
            );
        }
        return self::$dirs;
    }

}

// autoload run
spl_autoload_register(array('AutoLoader', 'loadClass'));
