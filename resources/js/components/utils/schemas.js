import * as yup from "yup";
import messages from "./messages";
import { phoneNumberRegex, urlRegex } from "./regex";

export const searchSchema = yup.object().shape({
    commercial_names: yup.string(),
    legal_names: yup.string().when("commercial_names", {
        is: (commercial_names) => !commercial_names,
        then: () => yup.string().required(messages.LEGALNAME_OR_COMMERCIALNAME_REQUIRED),
        otherwise: () => yup.string(),
    }),
    website: yup.string().matches(urlRegex, messages.WEBSITE_VALIDATION),
    phone_number: yup.string().when(["website", "address_txt"], {
        is: (website, address_txt) => !website && !address_txt,
        then: () => yup.string().required(messages.PHONENUMBER_WEBSITE_OR_ADDRESS_REQUIRED).matches(phoneNumberRegex, messages.PHONE_VALIDATION),
        otherwise: () => yup.string().matches(phoneNumberRegex, messages.PHONE_VALIDATION),
    }),
    address_txt: yup.lazy((value) => {
        return value?.website || value?.phone_number ? yup.string().nullable() : yup.string().required(messages.PHONENUMBER_WEBSITE_OR_ADDRESS_REQUIRED);
    }),
});
