<?php

class URI{

    public function check($data){

        switch($data){
            case 'logout':
                return 'Logout';

            default:
                return 'ModelPage';

        }

    }
}