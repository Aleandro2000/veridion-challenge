<?php

namespace App\Services;

use GuzzleHttp\Client;

/**
 * Class GlassdoorScraperService
 * @package App\Services
 */
abstract class ReviewScraperService
{
    private static $googleApiKey;

    protected static function initializeApiKey() {
        static::$googleApiKey = config("google.api_key");
    }

    public static function scrapeCompanyData($legalName, $latitude, $longitude)
    {
        if (is_null(static::$googleApiKey)) {
            static::initializeApiKey();
        }

        $googleApiKey = static::$googleApiKey;

        $googlePlacesUrl = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=$legalName&inputtype=textquery&key=$googleApiKey";
        $client = new Client();

        try {
            $googlePlacesResponse = $client->get($googlePlacesUrl);
            $googlePlacesData = json_decode($googlePlacesResponse->getBody(), true);
            if (isset($googlePlacesData['candidates'][0]['place_id'])) {
                $placeId = $googlePlacesData['candidates'][0]['place_id'];
                $googleReviewsUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=$placeId&fields=reviews&key=$googleApiKey";
                $googleReviewsResponse = $client->get($googleReviewsUrl);
                $googleReviewsData = json_decode($googleReviewsResponse->getBody(), true);
                $reviews = $googleReviewsData['result']['reviews'] ?? [];
                return $reviews;
            } else {
                return [];
            }
        } catch (\Exception $e) {
            return [];
        }
    }
}
