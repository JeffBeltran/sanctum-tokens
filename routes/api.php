<?php

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

// Get tokes for provided user id
Route::get('tokens/{resourceName}/{id}', '\Jeffbeltran\SanctumTokens\Http\SanctumController@tokens');
Route::post('tokens/{resourceName}/{id}', '\Jeffbeltran\SanctumTokens\Http\SanctumController@createToken');
Route::post('tokens/{resourceName}/{id}/revoke', '\Jeffbeltran\SanctumTokens\Http\SanctumController@revoke');
