import yup from "yup";

export const searchSchema = yup.object({
    search: yup.string().required(),
});
