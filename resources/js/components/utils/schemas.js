import * as yup from "yup";
import messages from "./messages";
import { phoneNumberRegex, urlRegex } from "./regex";

export const searchSchema = yup.object().shape({
    commercial_names: yup.array().of(yup.string()),
    legal_names: yup.array().when("commercial_names", {
        is: (commercial_names) => !commercial_names || commercial_names.length === 0,
        then: yup.array().required(messages.LEGALNAME_OR_COMMERCIALNAME_REQUIRED).of(yup.string()),
        otherwise: yup.array().of(yup.string()),
    }),
    website: yup.string().when(["phone_number", "address_txt"], {
        is: (phone_number, address_txt) => !phone_number && !address_txt,
        then: yup.string().required(messages.WEBSITE_VALIDATION).matches(urlRegex),
        otherwise: yup.string().matches(urlRegex),
    }),
    phone_number: yup.string().when(["website", "address_txt"], {
        is: (website, address_txt) => !website && !address_txt,
        then: yup.string().required(messages.PHONENUMBER_WEBSITE_OR_ADDRESS_REQUIRED).matches(phoneNumberRegex, messages.PHONE_VALIDATION),
        otherwise: yup.string().matches(phoneNumberRegex, messages.PHONE_VALIDATION),
    }),
    address_txt: yup.string().when(["phone_number", "website"], {
        is: (phone_number, website) => !phone_number && !website,
        then: yup.string().required(messages.PHONENUMBER_WEBSITE_OR_ADDRESS_REQUIRED),
        otherwise: yup.string(),
    }),
});
