<?php

namespace App\Services;

use App\Http\Requests\SearchRequest;
use Illuminate\Support\Facades\Http;

/**
 * Class VeridionServices
 * @package App\Services
 */
abstract class VeridionServices
{
    private static $veridionApiKey;

    protected static function initializeApiKey() {
        static::$veridionApiKey = config("veridion.api_key");
    }

    public static function getCompanyData(SearchRequest $request)
    {
        if (is_null(static::$veridionApiKey)) {
            static::initializeApiKey();
        }

        return Http::withHeaders([
            "x-api-key" => static::$veridionApiKey,
        ])->post("https://data.soleadify.com/match/v4/companies", $request->all())->json();
    }
}
