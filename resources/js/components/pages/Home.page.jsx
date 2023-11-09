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
            <div className="max-w-2xl mx-auto my-28 px-5">
                <div className="max-w-lg text-center mx-auto mb-5 font-bold text-5xl">
                    Where you go for services
                </div>
                <div className="text-center mx-auto mb-5 text-2xl">
                    Find the right services based on real reviews.
                </div>
                <Formik
                    initialValues={{
                        search: "",
                    }}
                    validationSchema={searchSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ errors, touched }) => (
                            <Form>
                                <Field type="text" name="search" className="bg-black text-white p-5 rounded-full w-full" placeholder="Enter company name, address, website..." />
                                {
                                    errors?.search && touched?.search && <AlertTemplate className="mt-5" message={errors?.search} />
                                }
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}
