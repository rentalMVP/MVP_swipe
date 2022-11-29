import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, orderBy, query, limit, startAfter, where, startAt } from "firebase/firestore"
import { db } from "../../lib/init-firebase"
import Loading from "../home/loading"
// import timediff from "timediff"
import RandomCarousel from "./randomCarousel"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import DetailCarousel from "./detailCarousel";
import { Suspense } from "react";

const Detail = ({ id }) => {
    const [pageContent, setPageContent] = useState([]);
    const [drawCarouselButton, setDrawCarouselButton] = useState([]);
    const [drawImagePane, setDrawImagePane] = useState([]);
    const [itemDesc, setItemDesc] = useState('');
    const [ownerDetail, setOwnerDetail] = useState([]);
    const getDetails = async (id) => {
        let temp = [];
        let searchID = Number(id);
        const listCollectionRef = collection(db, 'rental_items');
        let q = query(listCollectionRef, where("fields.Item ID", "==", searchID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp.push(doc.data())
        });
        setPageContent(temp);
    }
    useEffect(() => {
        id && getDetails(id);
    }, [id]);
    useEffect(() => {
        pageContent && pageContent.length > 0 && setItemDesc(pageContent[0]["fields"]["Item Description"]);
        pageContent && pageContent.length > 0 && getOwnerData(pageContent[0]["fields"]["Rental Owner"]);

    }, [pageContent]);
    const getOwnerData = async (ownerId) => {
        let temp = [];
        let searchID = ownerId;
        const listCollectionRef = collection(db, 'rental_owners');
        let q = query(listCollectionRef, where("id", "==", searchID[0]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp.push(doc.data())
        });
        setOwnerDetail(temp);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    const back = () => {
        if (window.history.length > 2) {
            window.history.go(-1);
        }
        else {
            location.href = '/';
        }

    }
    return (
        <section className="h-full bg-black">
            {
                pageContent && pageContent.length > 0 && ownerDetail && ownerDetail.length > 0 ? <div style={{ maxWidth: "830px", margin: "auto", background: "#0c0c0c", borderRadius: "10px" }} className="relative flex flex-col flex-nowrap " >
                    <div className="flex items-center w-full backSticky detailPadding font"><FontAwesomeIcon icon={faArrowLeftLong} className="text-2xl text-white" onClick={() => back()} /></div>
                    <div className="flex flex-row items-center justify-center mb-10 detailPadding">
                        <div className="flex flex-col w-full">
                            {pageContent && pageContent.length > 0 && <DetailCarousel imageGroup={pageContent[0]["fields"]["Item Image"]} />}
                            <div className="relative flex flex-row w-full">
                                <div>
                                    <p className="detailTitle">{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Item Name"]}</p>
                                    <div className="detailPan">
                                        <p className="detailContent">{pageContent && pageContent.length > 0 && itemDesc}</p>
                                        {/* <button className="font-sans text-xl font-semibold show_more" data-bs-toggle="modal" data-bs-target="#exampleModal">{showText}</button> */}
                                    </div>
                                </div>
                                <div className="w-64 mx-12 callStoreButton">
                                    <div className="w-64 h-8 "></div>
                                    <div className="detailRight">
                                        <p className="detailRentalOwnerName ">{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Item Name"]}</p>
                                        <Link href={`/rental_owner?query=${ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["id"]}`}>
                                            <p className="mb-2.5 text-base text-white hover:underline" style={{ fontFamily:"poppins-regular"}}>{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Rental Owner Name"]}</p></Link>
                                        <p className="py-5 text-xl text-white " style={{ borderTop: "1px solid #333" ,fontFamily:"poppins-extrabold"}}>{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Item Price"]}</p>
                                        <a href={ownerDetail && ownerDetail.length > 0 && "tel:" + ownerDetail[0]["fields"]["Store Phone Number"]} className="flex flex-row justify-center storePhoneNumber"><FontAwesomeIcon icon={faPhone} className="text-base text-white" /><p id="PhoneNumber" className="mx-2 text-white" style={{ fontSize: "15px" }}>Call the store</p></a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detailPadding">
                        <div className="flex flex-row items-center justify-start py-10 " style={{ borderTop: "1px solid #333" }}>
                            <img src={ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["fields"]["Rental Store photos"]} style={{ borderRadius: "50%" }} className="w-12 h-12 mr-3.5" />
                            <div className="flex flex-col">
                                <Link href={`/rental_owner?query=${ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["id"]}`}>
                                    <p className="text-lg text-white cursor-pointer hover:underline" style={{ lineHeight: "24px", fontFamily:"poppins-bold" }}>{ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["fields"]["Name"]}</p>
                                </Link>
                                <p className="text-white " style={{ fontSize: "15px", fontFamily:"poppins-regular" }}>{ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["fields"]["Google Rating"].toFixed(1) + "  Google Rating (" + ownerDetail[0]["fields"]["Reviews"] + ")"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="detailPadding">
                        {pageContent && pageContent.length > 0 && <RandomCarousel itemID={pageContent[0]["fields"]["Item ID"]} rentalCategory={pageContent[0]["fields"]["Rental Category"]} />}
                    </div>
                    <div className="flex flex-row items-center justify-between w-full detailSticky">
                        <div className="flex flex-col ">
                            <a href={`/rental_owner?query=${ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["id"]}`} className="text-sm text-white hover:underline" style={{ fontFamily:"poppins-regular"}}>{ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["fields"]["Name"]}</a>
                            <p className="text-lg font-extrabold text-white " style={{ fontFamily:"poppins-bold"}}>{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Item Price"]}</p>
                        </div>
                        <div>
                            <a style={{ background: "#005ec2" }} className="flex flex-row items-center justify-center w-16 h-12 rounded-xl" href={ownerDetail && ownerDetail.length > 0 && "tel:" + ownerDetail[0]["fields"]["Store Phone Number"]}><FontAwesomeIcon icon={faPhone} className="text-xl text-white" /></a>
                        </div>
                    </div>
                </div>
                : <div className="flex items-center justify-center h-full my-60"><Loading/></div>
            }

        </section>
    )
}
export default Detail

