<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;

/**
 * Class OpenAIServices
 * @package App\Services
 */
abstract class OpenAIServices
{
    public static function sumariseData(array $data)
    {
        $reviews = ReviewScraperService::scrapeCompanyData($data["company_name"], $data["main_latitude"], $data["main_longitude"]);
        $chunkedReviews = array_chunk($reviews, 10);
        $messages = [
            [
                "role" => "system",
                "content" => "Imagine you've recently experienced a service from a company. Share a JSON with details about the company, and I'll help you craft a human-like review for them.",
            ],
            [
                "role" => "user",
                "content" => json_encode($data),
            ],
        ];
        foreach ($chunkedReviews as $chunk) {
            if ($chunk) {
                array_push($messages, [
                    [
                        "role" => "user",
                        "content" => "There is some other user feedback in JSON format:" . json_encode($chunk),
                    ],
                ]);
            }
        }
        return OpenAI::chat()->create([
            "model" => 'gpt-3.5-turbo',
            "messages" => $messages,
        ])->choices[0]->message->content;
    }
}
