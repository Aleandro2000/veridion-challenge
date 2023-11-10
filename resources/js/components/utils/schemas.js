import * as yup from "yup";
import messages from "./messages";
import { phoneNumberRegex, urlRegex } from "./regex";

export const searchSchema = yup.object().shape({
    legal_names: yup.array().of(yup.string()).when("comercial_names", {
        is: (comercial_names) => !comercial_names || !comercial_names?.length,
        then: yup.array().of(yup.string()).required("Legal or comercial names is required"),
        otherwise: yup.array().of(yup.string()),
    }),
    comercial_names: yup.array().of(yup.string()),
    address_txt: yup.string(),
    phone_number: yup.string().matches(phoneNumberRegex),
    website: yup.string().matches(urlRegex),
});
