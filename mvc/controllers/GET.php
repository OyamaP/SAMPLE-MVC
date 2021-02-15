<?php

class GET{

    public function check($data){

        switch($data){
            case 'sqlselect':
                return 'SQLselect';

            case 'getsession':
                return 'GetSession';

        }

    }
}