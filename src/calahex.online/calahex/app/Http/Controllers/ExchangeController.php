<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Datetime;

class ExchangeController extends Controller
{
    /**
     * Get the order list for certain pair in the platform
     *
     * @return [json] order list json
     */
    public function exchangeOrder(Request $request)
    {
        $request->validate([
            'pair' => 'required|string'
        ]);

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://poloniex.com/public?command=returnOrderBook&currencyPair='.$request->pair.'&depth=50',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Cookie: __cfduid=d3d91721f808982b972b8c1803eb611991607276557'
        ),
        ));

        $response = json_decode(curl_exec($curl));

        curl_close($curl);

        return response()->json($response, 201);
    }   

    /**
     * Get the trade history list for certain pair in the platform
     *
     * @return [json] trade history list json
     */
    public function exchangeTrade(Request $request)
    {
        $request->validate([
            'pair' => 'required|string'
        ]);

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://poloniex.com/public?currencyPair='.$request->pair.'&command=returnTradeHistory',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Cookie: __cfduid=d3d91721f808982b972b8c1803eb611991607276557'
        ),
        ));

        $response = json_decode(curl_exec($curl));

        curl_close($curl);

        $result = [];

        for($i = 0 ; $i < 50 ; $i ++){
            $data = [];
            $data['type'] = $response[$i]->type;

            $format = 'Y-m-d H:i:s';
            $date = DateTime::createFromFormat($format, $response[$i]->date);

            $data['time'] = $date->format('H:i:s');
            $data['price'] = $response[$i]->rate;
            $data['amount'] = $response[$i]->amount;
            $result[] = $data;
        }

        return response()->json($result, 201);
    }   

    /**
     * Get the crypto pair list in the platform
     *
     * @return [json] crypto pair list json
     */
    public function exchangeCryptoPair(Request $request)
    {
        $request->validate([
            'pair_end' => 'required|string'
        ]);

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://poloniex.com/public?command=returnTicker',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Cookie: __cfduid=d3d91721f808982b972b8c1803eb611991607276557'
        ),
        ));

        $response_pair = json_decode(curl_exec($curl));

        curl_close($curl);

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://poloniex.com/public?command=returnCurrencies',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Cookie: __cfduid=d3d91721f808982b972b8c1803eb611991607276557'
        ),
        ));

        $response_currency_list = json_decode(curl_exec($curl), true);

        curl_close($curl);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://poloniex.com/public?command=returnTicker',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Cookie: __cfduid=d3d91721f808982b972b8c1803eb611991607276557'
            ),
        ));

        $response_pair_info = json_decode(curl_exec($curl), true);

        curl_close($curl);

        $crypto_pair_list = [];

        foreach($response_pair as $pair => $value){
            $pair_left = explode('_', $pair)[0];
            $pair_left_name = $response_currency_list[$pair_left]["name"];
            $pair_left_net = $response_currency_list[$pair_left]["blockchain"];
            $pair_right = explode('_', $pair)[1];
            $pair_right_name = $response_currency_list[$pair_right]["name"];
            $pair_right_net = $response_currency_list[$pair_left]["blockchain"];
            
            $separator = '_';
            $pair_reverse = $pair_right.$separator.$pair_left;

            if(strpos($pair_left_name, 'Token') === false && strpos($pair_right_name, 'Token') === false){
                if($request->pair_end == 'all'){
                    $data = [];
                    $data['name'] = $pair;
                    $data['price'] = $response_pair_info[$pair]['last'];
                    $data['volume'] = $response_pair_info[$pair]['baseVolume'];
                    $data['percent'] = $response_pair_info[$pair]['percentChange'];
                    $crypto_pair_list[] = $data;
                }
                else{
                    if($pair_right == $request->pair_end){
                        $data = [];
                        $data['name'] = $pair;
                        $data['price'] = $response_pair_info[$pair]['last'];
                        $data['volume'] = $response_pair_info[$pair]['baseVolume'];
                        $data['percent'] = $response_pair_info[$pair]['percentChange'];
                        $crypto_pair_list[] = $data;       
                    }
                    if($pair_left == $request->pair_end){
                        $data = [];
                        $data['name'] = $pair_reverse;
                        $data['price'] = $response_pair_info[$pair]['last'];
                        $data['volume'] = $response_pair_info[$pair]['baseVolume'];
                        $data['percent'] = $response_pair_info[$pair]['percentChange'];
                        $crypto_pair_list[] = $data;        
                    }
                }
            }
        }

        return response()->json($crypto_pair_list, 201);
    }   

    /**
     * Get the token pair list in the platform
     *
     * @return [json] token pair list json
     */
    public function exchangeTokenPair(Request $request)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://poloniex.com/public?command=returnTicker',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Cookie: __cfduid=d3d91721f808982b972b8c1803eb611991607276557'
            ),
        ));

        $response_pair = json_decode(curl_exec($curl));

        curl_close($curl);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://poloniex.com/public?command=returnCurrencies',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Cookie: __cfduid=d3d91721f808982b972b8c1803eb611991607276557'
            ),
        ));

        $response_currency_list = json_decode(curl_exec($curl), true);

        curl_close($curl);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://poloniex.com/public?command=returnTicker',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'Cookie: __cfduid=d3d91721f808982b972b8c1803eb611991607276557'
            ),
        ));

        $response_pair_info = json_decode(curl_exec($curl), true);

        curl_close($curl);

        $token_pair_list = [];

        foreach($response_pair as $pair => $value){
            $pair_left = explode('_', $pair)[0];
            $pair_left_name = $response_currency_list[$pair_left]["name"];
            $pair_left_net = $response_currency_list[$pair_left]["blockchain"];
            $pair_right = explode('_', $pair)[1];
            $pair_right_name = $response_currency_list[$pair_right]["name"];
            $pair_right_net = $response_currency_list[$pair_left]["blockchain"];

            if((strpos($pair_left_name, 'Token') !== false && $pair_left_net == 'ETH') || (strpos($pair_right_name, 'Token') !== false && $pair_right_net == 'ETH')){
                $data = [];
                $data['name'] = $pair;
                $data['price'] = $response_pair_info[$pair]['last'];
                $data['volume'] = $response_pair_info[$pair]['baseVolume'];
                $data['percent'] = $response_pair_info[$pair]['percentChange'];
                $token_pair_list[] = $data;
            }
        }

        return response()->json($token_pair_list, 201);
    } 
}
