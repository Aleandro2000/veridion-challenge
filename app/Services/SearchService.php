<?php

namespace App\Services;

use App\Http\Requests\SearchRequest;

/**
 * Class SearchService
 * @package App\Services
 */
abstract class SearchService
{
    public static function findCompany(SearchRequest $request)
    {
        return [
            "company_data" => VeridionServices::getCompanyData($request),
            "users_feddback" => OpenAIServices::sumariseData($request),
        ];
    }
}
