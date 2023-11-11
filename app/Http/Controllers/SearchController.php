<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Services\SearchService;

class SearchController extends Controller
{
    public function findCompany(SearchRequest $request)
    {
        return SearchService::findCompany($request);
    }
}
