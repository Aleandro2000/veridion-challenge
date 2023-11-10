import * as yup from "yup";
import messages from "./messages";
import { phoneNumberRegex, urlRegex } from "./regex";

export const searchSchema = yup.object().shape({
    comercial_names: yup.string(),
    legal_names: yup.string().when("comercial_names", {
        is: (comercial_names) => !comercial_names,
        then: () => yup.string().required(messages.LEGALNAME_OR_COMERCIALNAME_REQUIRED),
        otherwise: () => yup.string(),
    }),
    website: yup.string().matches(urlRegex, messages.WEBSITE_VALIDATION),
    phone_number: yup.string().when("website", {
        is: (website) => !website,
        then: () => yup.string().required(messages.PHONENUMBER_WEBSITE_OR_ADDRESS_REQUIRED).matches(phoneNumberRegex, messages.PHONE_VALIDATION),
        otherwise: () => yup.string().matches(phoneNumberRegex, messages.PHONE_VALIDATION),
    }),
    address_txt: yup.string().when("phone_number", {
        is: (phone_number) => !phone_number,
        then: () => yup.string().required(messages.PHONENUMBER_WEBSITE_OR_ADDRESS_REQUIRED),
        otherwise: () => yup.string(),
    }).when("website", {
        is: (website) => !website,
        then: () => yup.string().required(messages.PHONENUMBER_WEBSITE_OR_ADDRESS_REQUIRED),
        otherwise: () => yup.string(),
    }),
});
