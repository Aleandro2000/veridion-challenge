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
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "legal_names" => "array",
            "comercial_names" => "array",
            "address_txt" => "string",
            "phone_number" => "string|regex:^\+(?:[0-9] ?){6,14}[0-9]$",
            "website" => "string|regex:^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$",
        ];
    }
}
