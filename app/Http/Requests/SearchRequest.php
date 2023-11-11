<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    private function phoneNumberRule()
    {
        return $this->input("website") || $this->input("address_txt") ? "nullable|string|regex:^\+(?:[0-9] ?){6,14}[0-9]$" : "required|string|regex:^\+(?:[0-9] ?){6,14}[0-9]$";
    }

    private function addressTxtRule()
    {
        return ($this->input("phone_number") || $this->input("website")) ? "nullable|string" : "required|string";
    }

    private function websiteRule()
    {
        return ($this->input("phone_number") || $this->input("address_txt")) ? "nullable|string|regex:^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$" : "required|string|regex:^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$";
    }

    private function legalNamesRules() {
        return $this->input("commercial_names") ? "nullable|array" : "required|array";
    }

    public function rules(): array
    {
        return [
            "commercial_names" => "array",
            "commercial_names.*" => "string",
            "legal_names" => $this->legalNamesRules(),
            "legal_names.*" => "string",
            "website" => $this->websiteRule(),
            "phone_number" => $this->phoneNumberRule(),
            "address_txt" => $this->addressTxtRule(),
        ];
    }
}
