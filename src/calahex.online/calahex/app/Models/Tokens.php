<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tokens extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'token_id',
        'token_name',
        'token_symbol',
        'token_decimal',
        'token_logo',
        'token_pair_type',
        'token_whitepaper',
        'status',
    ];
}
