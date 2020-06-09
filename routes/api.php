<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. You're free to add
| as many additional routes to this file as your tool may require.
|
*/

// Route::get('/endpoint', function (Request $request) {
//     //
// });

Route::get('tokens/{id}', function ($id) {
  return \App\User::with('tokens')
    ->where('id', $id)
    ->first();
});

Route::post('tokens/{id}', function ($id, Request $request) {
  $user = \App\User::find($id);
  $token = $user->createToken($request->name);

  return $token->plainTextToken;
});

Route::post('tokens/{id}/revoke', function ($id, Request $request) {
  $user = \App\User::with('tokens')
    ->where('id', $id)
    ->first();

  return $user
    ->tokens()
    ->where('id', $request->token_id)
    ->delete();
});
