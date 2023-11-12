import React, { useContext, useRef } from "react";
import { SearchContext } from "../context/search.context";
import NavbarTemplate from "../templates/Navbar.template";
import FooterTemplate from "../templates/Footer.template";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useReactToPrint } from "react-to-print";
import { faFile, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ReviewsPage() {
    const [search] = useContext(SearchContext);
    const componentToPrintRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentToPrintRef.current,
    });

    return (
        <div className="fade-in" ref={componentToPrintRef}>
            <NavbarTemplate />
            <div className="max-w-8xl mx-auto my-12 px-3">
                <div className="flex justify-end hidden-print">
                    <button type="button" onClick={handlePrint} className="p-3 my-5 hover:shadow-lg hover:bg-gray-800 duration-300 rounded-full bg-black text-white font-bold max-w-[150px] w-full">
                        <FontAwesomeIcon className="mr-2" icon={faFile} /> Print
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 font-bold text-black">
                        <div className="text-3xl">
                            {search?.company_data?.company_name}
                        </div>
                        <div className="text-sm font-bold my-8 flex flex-wrap">
                            {
                                search?.company_data?.company_legal_names?.map((item, key) => (
                                    <span key={key} className="bg-black text-white p-3 m-3 rounded-full">
                                        {item}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="p-5 font-bold text-black">
                        <div className="text-3xl">
                            Company Comercial Names
                        </div>
                        <div className="text-sm font-bold my-8 flex flex-wrap">
                            {
                                search?.company_data?.company_commercial_names?.map((item, key) => (
                                    <span key={key} className="bg-black text-white p-3 m-3 rounded-full">
                                        {item}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        General Users Feedback about Company
                    </div>
                    <div className="text-md my-12 text-justify">
                        <FontAwesomeIcon icon={faQuoteLeft} />
                        <Markdown remarkPlugins={remarkGfm} children={search?.users_feedback ?? ""} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 text-black my-5">
                        <div className="text-3xl font-bold">
                            Company Address
                        </div>
                        <div className="text-md my-8 text-justify">
                            {search?.company_data?.main_country}({search?.company_data?.main_country_code}), {search?.company_data?.main_region}, {search?.company_data?.main_city}, {search?.company_data?.main_street}, {search?.company_data?.main_street_number}, Postal Code {search?.company_data?.main_postcode}
                        </div>
                    </div>
                    <div className="max-h-[600px] h-full hidden-print mt-5">
                        <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false}
                            style={{
                                height: "600px",
                                width: "100%",
                                borderRadius: "0.5rem",
                            }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {
                                search?.company_data?.locations?.map((item, key) => <Marker key={key} position={[item?.latitude ?? 0, item?.longitude ?? 0]} />)
                            }
                        </MapContainer>
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Locations ({search?.company_data?.locations?.length ?? 0})
                    </div>
                    {
                        search?.company_data?.locations?.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 flex flex-wrap">
                                {
                                    search?.company_data?.locations?.map((item, key) => (
                                        <div className="p-5 my-5" key={key}>
                                            <div className="text-3xl font-bold italic">
                                                {item?.country}({item?.country_code})
                                            </div>
                                            <div className="text-md my-8 text-justify">
                                                {item?.region}, {item?.city}, {item?.street} {item?.street_number}, Postal Code {item?.postcode}
                                            </div>
                                        </div>
                                    )
                                    )
                                }
                            </div>
                        ) : null
                    }
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Short Description
                    </div>
                    <div className="text-md my-8 text-justify">
                        {search?.company_data?.short_description}
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Long Description
                    </div>
                    <div className="text-md my-8 text-justify">
                        {search?.company_data?.long_description}
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Business Tags
                    </div>
                    <div className="my-8 flex flex-wrap">
                        {
                            search?.company_data?.business_tags?.map((item, key) => (
                                <span key={key} className="bg-black font-bold text-white p-3 m-3 rounded-full">
                                    {item}
                                </span>
                            ))
                        }
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Main Business Category
                    </div>
                    <div className="my-8 flex flex-wrap">
                        <span className="bg-black font-bold text-white p-3 m-3 rounded-full">
                            {search?.company_data?.main_business_category}
                        </span>
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Main Industry
                    </div>
                    <div className="my-8 flex flex-wrap">
                        <span className="bg-black font-bold text-white p-3 m-3 rounded-full">
                            {search?.company_data?.main_industry}
                        </span>
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Main Sector
                    </div>
                    <div className="my-8 flex flex-wrap">
                        <span className="bg-black font-bold text-white p-3 m-3 rounded-full">
                            {search?.company_data?.main_sector}
                        </span>
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Primary Phone
                    </div>
                    <div className="my-8 flex flex-wrap">
                        <span className="bg-black font-bold text-white p-3 m-3 rounded-full">
                            <a href={`phone:${search?.company_data?.primary_phone}`}>
                                {search?.company_data?.primary_phone}
                            </a>
                        </span>
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Phone Numbers
                    </div>
                    <div className="my-8 flex flex-wrap">
                        {
                            search?.company_data?.phone_numbers?.map((item, key) => (
                                <span className="bg-black font-bold text-white p-3 m-3 rounded-full">
                                    <a key={key} href={`phone:${item}`}>
                                        {item}
                                    </a>
                                </span>
                            ))
                        }
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Technologies
                    </div>
                    <div className="my-8 flex flex-wrap">
                        {
                            search?.company_data?.technologies?.map((item, key) => (
                                <span key={key} className="bg-black font-bold text-white p-3 m-3 rounded-full">
                                    {item}
                                </span>
                            ))
                        }
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Primary Email
                    </div>
                    <div className="my-8 flex flex-wrap">
                        <span className="bg-black font-bold text-white p-3 m-3 rounded-full">
                            <a href={`mailto:${search?.company_data?.primary_email}`}>
                                {search?.company_data?.primary_email}
                            </a>
                        </span>
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        Emails
                    </div>
                    <div className="my-8 flex flex-wrap">
                        {
                            search?.company_data?.emails?.map((item, key) => (
                                <span className="bg-black font-bold text-white p-3 m-3 rounded-full">
                                    <a key={key} href={`mailto:${item}`}>
                                        {item}
                                    </a>
                                </span>
                            ))
                        }
                    </div>
                </div>
                <div className="p-5 text-black">
                    <div className="text-3xl font-bold">
                        NAICS 2022
                    </div>
                    <div className="p-5 my-5">
                        <div className="text-3xl font-bold italic">
                            {search?.company_data?.naics_2022?.primary?.label} (Primary)
                        </div>
                        <div className="text-xl font-bold my-8 text-justify">
                            Code: {search?.company_data?.naics_2022?.primary?.code}
                        </div>
                    </div>
                </div>
            </div>
            <FooterTemplate />
        </div>
    );
}
