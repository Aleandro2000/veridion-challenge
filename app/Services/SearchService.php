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
        $companyData = VeridionServices::getCompanyData($request);
        $userFeedback = OpenAIServices::sumariseData($companyData);
        return [
            "company_data" => $companyData,
            "users_feedback" => $userFeedback,
        ];
    }
}
