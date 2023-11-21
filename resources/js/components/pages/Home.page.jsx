import { Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { searchSchema } from "../utils/schemas";
import AlertTemplate from "../templates/Alert.template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SearchContext } from "../context/search.context";
import { displayToast, splitSpecialChars } from "../utils/utils";
import messages from "../utils/messages";
import { useNavigate } from "react-router-dom";
import SpinnerTemplate from "../templates/Spinner.template";
import NavbarTemplate from "../templates/Navbar.template";
import FooterTemplate from "../templates/Footer.template";
import TopRedirectButtonTemplate from "../templates/Topredirectbutton.template";

export default function HomePage() {
    const [, setSearch] = useContext(SearchContext);
    const [loading, setLoading] = useState(false);
    const nvaigate = useNavigate();

    useEffect(() => setSearch(), []);

    const handleSubmit = (values) => {
        const { legal_names, commercial_names, address_txt, phone_number, website } = values;
        setLoading(true);
        axios.post("/api/veridion_challenge/find_company/", {
            legal_names: splitSpecialChars(legal_names),
            commercial_names: splitSpecialChars(commercial_names),
            address_txt,
            phone_number,
            website,
        }).then((response) => {
            setSearch(response.data);
            nvaigate("/web/reviews");
            displayToast(messages.SUCCESSFULLY_TITLE, messages.SEARCH_SUCCESSFULLY);
            setLoading(false);
        }).catch((err) => {
            if (err) {
                displayToast(messages.FAILED_TITLE, messages.SEARCH_FAILED, false);
            }
            setLoading(false);
        });
    };

    return (
        <div className="fade-in">
            <NavbarTemplate />
            <div className="max-w-4xl mx-auto my-28 px-3">
                <div className="max-w-lg text-center mx-auto mb-5 font-bold text-5xl">
                    Where you go for services
                </div>
                <div className="text-center mx-auto mb-5 text-2xl">
                    Find the right services based on real reviews using this form.
                </div>
                <Formik
                    initialValues={{
                        legal_names: "",
                        commercial_names: "",
                        address_txt: "",
                        phone_number: "",
                        website: "",
                    }}
                    validationSchema={searchSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ errors, touched }) => (
                            <Form className="shadow-lg border-2 rounded-md p-5">
                                <Field type="text" name="legal_names" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Legal Names" />
                                {
                                    errors?.legal_names && touched?.legal_names && <AlertTemplate className="my-2" message={errors?.legal_names} />
                                }
                                <Field type="text" name="commercial_names" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Comercial Names" />
                                {
                                    errors?.commercial_names && touched?.commercial_names && <AlertTemplate className="my-2" message={errors?.commercial_names} />
                                }
                                <Field type="text" name="address_txt" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Company Address" />
                                {
                                    errors?.address_txt && touched?.address_txt && <AlertTemplate className="my-2" message={errors?.address_txt} />
                                }
                                <Field type="text" name="phone_number" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Phone Number" />
                                {
                                    errors?.phone_number && touched?.phone_number && <AlertTemplate className="my-2" message={errors?.phone_number} />
                                }
                                <Field type="text" name="website" className="bg-black text-white p-5 my-3 rounded-lg w-full" placeholder="Website" />
                                {
                                    errors?.website && touched?.website && <AlertTemplate className="my-2" message={errors?.website} />
                                }
                                <div className="flex justify-center">
                                    <button type="submit" disabled={!loading} className="p-5 hover:shadow-lg hover:bg-gray-800 duration-300 rounded-full bg-black text-white font-bold max-w-[200px] w-full">
                                        {loading ? <SpinnerTemplate /> : <FontAwesomeIcon className="mr-2" icon={faSearch} />} Search
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            <FooterTemplate />
            <TopRedirectButtonTemplate />
        </div>
    );
}
