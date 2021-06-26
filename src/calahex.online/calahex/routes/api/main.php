<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::post('createToken', 'App\Http\Controllers\TokenController@create');
});

Route::post('tokenList', 'App\Http\Controllers\TokenController@list');
Route::post('exchangeOrder', 'App\Http\Controllers\ExchangeController@exchangeOrder');
Route::post('exchangeTrade', 'App\Http\Controllers\ExchangeController@exchangeTrade');
Route::post('exchangeCryptoPair', 'App\Http\Controllers\ExchangeController@exchangeCryptoPair');
Route::post('exchangeTokenPair', 'App\Http\Controllers\ExchangeController@exchangeTokenPair');
