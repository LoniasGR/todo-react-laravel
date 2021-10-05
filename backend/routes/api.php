<?php

use App\Models\Session;
use App\Models\Todo;
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
    $ret = ["success"=> true, "todos"=> $session->todos];
    logger($session->todos);
    return json_encode($ret);
});

Route::post('session/{id}', function ($id) {
    $session = new Session();
    $session->uuid = $id;
    $session->save();

    $ret = ["success"=> true, "msg"=>"Session created"];
    return json_encode($ret);
});

Route::post('todo/', function (Request $request) {
    $title = $request->title;
    $text = $request->text;
    $session = Session::where('uuid', $request->session_uuid)->firstOr(function () {
        return false;
    });

    if ($session == false) {
        $ret = ["success"=> false, "msg"=>"Session not found"];
        return json_encode($ret);
    }

    $session_id = $session->id;

    $todo = Todo::create(['title' => $title, 'text' => $text, 'session_id' => $session_id]);
    logger($todo);

    $ret = ["success"=> true, "todo"=>$todo];
    return json_encode($ret);
});

Route::put('todo/{todo:id}', function (Request $request, Todo $todo) {
    $title = $request->title;
    $text = $request->text;
    $completed = $request->completed;
    logger($request);
    $session = Session::where('uuid', $request->session_uuid)->firstOr(function () {
        return false;
    });

    if (!$session) {
        $ret = ["success"=> false, "msg"=>"Session not found"];
        return json_encode($ret);
    }
    if (!$todo) {
        $ret = ["success"=> false, "msg"=>"Todo not found"];
        return json_encode($ret);
    }

    if ($session->id == $todo->session_id) {
        $todo->title = $title;
        $todo->text = $text;
        $todo->completed = $completed;
        $todo->save();
        $ret = ["success"=> true, "msg"=>"Todo changed"];
        return json_encode($ret);
    } else {
        $ret = ["success"=> false, "msg"=>"Wrong session reference"];
        return json_encode($ret);
    }
});

Route::delete('todo/{todo:id}', function (Request $request, Todo $todo) {
    $session = Session::where('uuid', $request->session_uuid)->firstOr(function () {
        return false;
    });
    if (!$session) {
        $ret = ["success"=> false, "msg"=>"Session not found"];
        return json_encode($ret);
    }
    if (!$todo) {
        $ret = ["success"=> false, "msg"=>"Todo not found"];
        return json_encode($ret);
    }

    if ($session->id == $todo->session_id) {
        $todo->delete();
        $ret = ["success"=> true, "msg"=>"Todo deleted"];
        return json_encode($ret);
    } else {
        $ret = ["success"=> false, "msg"=>"Wrong session reference"];
        return json_encode($ret);
    }
});
