<?php

class POST{

    public function check($data){

        switch($data){
            case 'login':
                return 'Login';

            case 'sqldelete':
                return 'SQLdelete';

            case 'sqlinsert':
                return 'SQLinsert';

            case 'sqlupdate':
                return 'SQLupdate';

        }

    }
}