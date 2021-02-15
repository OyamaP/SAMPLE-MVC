<?php
session_start();

/******************************
* Controller
*******************************/
$controller = new Controller();

/******************************
* Model
*******************************/
$model = $controller->getClass();

/******************************
* View
*******************************/
$view = $model->getClass();

