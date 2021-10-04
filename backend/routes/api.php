<?php

use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('session/{session:uuid}', function (Session $session) {
    $ret = new stdClass();
    $ret->success = true;
    $ret->data = $session->todos;
    
    return json_encode($ret);
});

Route::post('session/{id}', function ($id) {
    $session = new Session();
    $session->uuid = $id;
    $session->save();

    $ret = new stdClass();
    $ret->success = true;
    $ret->msg = "Session created";
    return json_encode($ret);
});
