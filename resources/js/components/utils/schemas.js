import * as yup from "yup";
import messages from "./messages";

export const searchSchema = yup.object().shape({
    search: yup.string().required(messages.SEARCH_REQUIRED),
});
