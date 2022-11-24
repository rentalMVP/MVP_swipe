import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link";
import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, orderBy, query, limit, startAfter, where, startAt } from "firebase/firestore"
import { db } from "../../lib/init-firebase"
import timediff from "timediff"
import RandomCarousel from "./randomCarousel"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

const Detail = ({ id }) => {
    const [pageContent, setPageContent] = useState([]);
    const [drawCarouselButton, setDrawCarouselButton] = useState([]);
    const [drawImagePane, setDrawImagePane] = useState([]);
    const [itemDesc, setItemDesc] = useState('');
    const [ownerDetail, setOwnerDetail] = useState([]);
    const getRentalOwnerDetail = async (id) => {
        let temp = [];
        const listCollectionRef = collection(db, 'rental_owners');
        let q = query(listCollectionRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp.push(doc.data())
        });
        setOwnerContent(temp)
    }
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
    const drawCarousel = () => {
        let temp = [];
        let imageGroup = pageContent[0]["fields"]["Item Image"].split(",");
        let imageLength = pageContent[0]["fields"]["Item Image"].split(",").length;
        temp.push(<button
            type="button"
            data-bs-target="#carouselExampleCrossfade"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
        ></button>)
        for (let i = 1; i < imageLength; i++) {
            temp.push(<button
                type="button"
                data-bs-target="#carouselExampleCrossfade"
                data-bs-slide-to={i}
                aria-label={"Slide " + (i + 1)} key = {i}
            ></button>)
        }
        setDrawCarouselButton(temp);
        let tempImage = [];
        tempImage.push(
            <div className="float-left w-full carousel-item active">
                <center><img src={"https://" + imageGroup[0]}
                    className="block w-full h-auto rounded-lg"
                    alt="Wild Landscape"
                /></center>
            </div>
        )
        for (let j = 1; j < imageGroup.length; j++) {
            tempImage.push(<div className="float-left w-full carousel-item ">
                <center><img src={"https://" + imageGroup[j].replace(" ", "")}
                    className="block w-full h-auto rounded-lg"
                    alt="Wild Landscape" />
                </center></div>)

        }
        setDrawImagePane(tempImage);
    }
    useEffect(async () => {
        id && getDetails(id);
        scrollToTop();
    }, [id]);
    useEffect(() => {
        pageContent && pageContent.length > 0 && drawCarousel();
        pageContent && pageContent.length > 0 && setItemDesc(pageContent[0]["fields"]["Item Description"]);
        pageContent && pageContent.length > 0 && getOwnerData(pageContent[0]["fields"]["Rental Owner"]);

    }, [pageContent]);
    const datetime = (fullTime) => {
        let timeDifference = timediff(new Date(fullTime), new Date());
        return (timeDifference["days"] + " days " + timeDifference["hours"] + " hours ago");
    }
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

    const [showMore, setShowMore] = useState(true);
    let showText;
    if (showMore) showText = 'Show more...'
    if (!showMore) showText = 'Show less...'

    const showPhoneNumber = () => {
        document.getElementById('PhoneNumber').innerText = ownerDetail[0]["fields"]["Store Phone Number"];
    }
    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
   }
    return (
        <section className="h-full bg-black">
            <div style={{ maxWidth: "800px",margin:"auto",background: "#0c0c0c", borderRadius: "10px", padding:"10px" }} className="relative flex flex-col flex-nowrap" >
                <div className="w-full backSticky"><FontAwesomeIcon icon={faArrowLeftLong} className="text-2xl" onClick={() => window.history.go(-1)} /></div>
                <div className="flex flex-row items-center justify-center mb-10">
                    <div className="flex flex-col w-full">
                        <div id="carouselExampleCrossfade" className="relative w-full p-5 carousel slide carousel-fade" data-bs-ride="carousel">
                            <div className="absolute bottom-0 left-0 right-0 flex justify-center p-0 mb-4 carousel-indicators">
                                {drawCarouselButton}
                            </div>
                            <div className="relative flex items-center w-full overflow-hidden carousel-inner">
                                {drawImagePane}
                            </div>
                            <button
                                className="absolute top-0 bottom-0 left-0 flex items-center justify-center p-0 text-center border-0 carousel-control-prev hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
                                type="button"
                                data-bs-target="#carouselExampleCrossfade"
                                data-bs-slide="prev"
                                id="prev"
                            >
                                <span className="inline-block bg-no-repeat carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="absolute top-0 bottom-0 right-0 flex items-center justify-center p-0 text-center border-0 carousel-control-next hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
                                type="button"
                                data-bs-target="#carouselExampleCrossfade"
                                data-bs-slide="next"
                                id="next"
                            >
                                <span className="inline-block bg-no-repeat carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="relative flex flex-row w-full px-5 pr-5">
                            <div>
                                <p className="detailTitle">{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Item Name"]}</p>
                                <div className="detailPan">
                                    <p className="detailContent">{pageContent && pageContent.length > 0 && itemDesc}</p>
                                    {/* <button className="font-sans text-xl font-semibold show_more" data-bs-toggle="modal" data-bs-target="#exampleModal">{showText}</button> */}
                                </div>
                            </div>
                            <div className="w-64 callStoreButton">
                                <div className="w-64 h-8 "></div>
                                <div className="detailRight">
                                    <a href={`/rental_owner?query=${ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["id"]}`}className="detailRentalOwnerName hover:underline">{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Rental Owner Name"]}</a>
                                    <a href={ownerDetail && ownerDetail.length > 0 && "/rental_owner?query="+ownerDetail[0]["id"]}className="detailRentalOwnerName hover:underline">{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Rental Owner Name"]}</a>
                                    <p className="mb-5 text-base text-white">{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Rental Category"]}</p>
                                    <p className="py-5 text-xl font-extrabold text-white " style={{ borderTop: "1px solid #333" }}>{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Item Price"]}</p>
                                    <a href = { ownerDetail && ownerDetail.length > 0 && "tel:"+ ownerDetail[0]["fields"]["Store Phone Number"]}className="flex flex-row justify-center storePhoneNumber"><FontAwesomeIcon icon={faPhone} className="text-xl" /><p id="PhoneNumber" className="mx-2 text-white">Call the store</p></a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-start py-5 mx-5 mr-5" style={{ borderTop: "1px solid #333"}}>
                    <img src={ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["fields"]["Rental Store photos"]} style={{ borderRadius: "50%" }} className="w-16 h-16 "/>
                    <div className="flex flex-col">
                        <Link href={`/rental_owner?query=${ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["id"]}`}>
                            <p className="mx-3 mb-1 text-lg font-extrabold text-white cursor-pointer hover:underline">{ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["fields"]["Name"]}</p>
                        </Link>
                        <p className="mx-3 text-base text-white ">{ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["fields"]["Google Rating"].toFixed(1) + "  Google Rating (" + ownerDetail[0]["fields"]["Reviews"] + ")"}</p>
                    </div>
                </div>
                {pageContent && pageContent.length > 0 && <RandomCarousel itemID={pageContent[0]["fields"]["Item ID"]} rentalCategory={pageContent[0]["fields"]["Rental Category"]} />}
                <div className="flex flex-row items-center justify-between w-full detailSticky">
                    <div className="flex flex-col ">
                        <a href={`/rental_owner?query=${ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["id"]}`} className="text-sm hover:underline">{ownerDetail && ownerDetail.length > 0 && ownerDetail[0]["fields"]["Name"]}</a>
                        <p className="text-lg font-extrabold ">{ pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Item Price"]}</p>
                    </div>
                    <div>
                        <a style={{ background: "#005ec2" }} className="flex flex-row items-center justify-center w-16 h-12 rounded-xl" href={ ownerDetail && ownerDetail.length > 0 && "tel:" + ownerDetail[0]["fields"]["Store Phone Number"]}><FontAwesomeIcon icon={faPhone} className="text-xl "/></a>
                    </div>
                </div>

                <div className="fixed top-0 left-0 hidden w-full h-full py-10 overflow-x-hidden overflow-y-auto outline-none modal fade"
                    id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="relative w-auto pointer-events-none modal-dialog">
                        <div
                            className="relative flex flex-col w-full text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto modal-content bg-clip-padding">
                            <div
                                className="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200 modal-header rounded-t-md">
                                <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel" >{pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Item Name"]}</h5>
                                <button type="button"
                                    className="box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="relative p-4 text-black modal-body">
                                {pageContent && pageContent.length > 0 && pageContent[0]["fields"]["Item Description"]}
                            </div>
                            <div
                                className="flex flex-wrap items-center justify-end flex-shrink-0 p-4 border-t border-gray-200 modal-footer rounded-b-md">
                                <button type="button" data-bs-dismiss="modal" style={{ background: "black", padding: "5px 20px", borderRadius: "5px", color: "white" }}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Detail

