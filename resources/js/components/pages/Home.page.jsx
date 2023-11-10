import { Field, Form, Formik } from "formik";
import React from "react";
import { searchSchema } from "../utils/schemas";
import AlertTemplate from "../templates/Alert.template";

export default function HomePage() {
    const handleSubmit = (values) => {

    };

    return (
        <div className="fade-in">
            <img className="m-5 w-48" src="/assets/img/logo.png" />
            <div className="max-w-4xl mx-auto my-28 px-5">
                <div className="max-w-lg text-center mx-auto mb-5 font-bold text-5xl">
                    Where you go for services
                </div>
                <div className="text-center mx-auto mb-5 text-2xl">
                    Find the right services based on real reviews using this form.
                </div>
                <Formik
                    initialValues={{
                        legal_names: [],
                        comercial_names: [],
                        address_txt: "",
                        phone_number: "",
                        website: "",
                    }}
                    validationSchema={searchSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ errors, touched }) => (
                            <Form className="shadow rounded-md p-5">
                                <Field type="text" name="legal_names" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Legal Names" />
                                {
                                    errors?.legal_names && touched?.legal_names && <AlertTemplate className="mt-5" message={errors?.legal_names} />
                                }
                                <Field type="text" name="comercial_names" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Comercial Names" />
                                {
                                    errors?.comercial_names && touched?.comercial_names && <AlertTemplate className="mt-5" message={errors?.comercial_names} />
                                }
                                <Field type="text" name="address_txt" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Company Address" />
                                {
                                    errors?.address_txt && touched?.address_txt && <AlertTemplate className="mt-5" message={errors?.address_txt} />
                                }
                                <Field type="text" name="phone_number" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Phone Number" />
                                {
                                    errors?.phone_number && touched?.phone_number && <AlertTemplate className="mt-5" message={errors?.phone_number} />
                                }
                                <Field type="text" name="website" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Website" />
                                {
                                    errors?.website && touched?.website && <AlertTemplate className="mt-5" message={errors?.website} />
                                }
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}
