<?php

namespace App\Services;

use App\Http\Requests\SearchRequest;
use OpenAI\Laravel\Facades\OpenAI;

/**
 * Class OpenAIServices
 * @package App\Services
 */
abstract class OpenAIServices
{
    public static function sumariseData(SearchRequest $request)
    {
        return OpenAI::chat()->create([
            "model" => 'gpt-3.5-turbo',
            "messages" => [
                [
                    "role" => "system",
                    "content" => "Imagine you've recently experienced a notable service from a company. Share a JSON with details about the company, and I'll help you craft a human-like review for them.",
                ],
                [
                    "role" => "user",
                    "content" => json_encode($request->all()),
                ],
            ],
        ])->choices[0]->message->content;
    }
}
