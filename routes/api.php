<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Nova\Nova;

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

/**
 * Get tokes for provided user id
 */
Route::get("tokens/{resourceName}/{id}", function (
    $resourceName,
    $id,
    Request $request
) {
    return Nova::modelInstanceForKey($resourceName)
        ->with("tokens")
        ->where("id", $id)
        ->first();
});

Route::post("tokens/{resourceName}/{id}", function (
    $resourceName,
    $id,
    Request $request
) {
    $user = Nova::modelInstanceForKey($resourceName)->find($id);

    $abilities =
        $request->abilities == ""
            ? ["*"]
            : collect(explode(",", $request->abilities))
                ->map(function ($item) {
                    return trim($item);
                })
                ->toArray();

    $token = $user->createToken($request->name, $abilities);

    return $token->plainTextToken;
});

Route::post("tokens/{resourceName}/{id}/revoke", function (
    $resourceName,
    $id,
    Request $request
) {
    $user = Nova::modelInstanceForKey($resourceName)
        ->with("tokens")
        ->where("id", $id)
        ->first();

    return $user
        ->tokens()
        ->where("id", $request->token_id)
        ->delete();
});
