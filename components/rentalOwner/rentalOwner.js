import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import React from 'react'
import Gallery from "../home/gallery"
import { collection, getDocs, addDoc, orderBy, query, limit, startAfter, startAt, where } from "firebase/firestore"
import { db } from "../../lib/init-firebase"
import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import Link from "next/link"
import ScrollToTop from "../scrollToTop"
const RentalOwner = ({ id }) => {
    const [ownerContent, setOwnerContent] = useState([]);
    const [showData, setShowData] = useState([]);
    const [lastPage, setLastPage] = useState(false);
    const [lastDocument, setLastDocument] = useState(3324);
    const [sticky, setSticky] = useState(false);
    const [searchText, setSearchText] = useState('');
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
    const loadData = async (lastDocument, id) => {
        const temp = [];
        const listCollectionRef = collection(db, 'rental_items')
        let q = query(listCollectionRef, orderBy("fields.Item ID"), where("fields.Rental Owner Name", "==", id), limit(30))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp.push(doc.data())
        });
        if (querySnapshot.docs.length < 30) {
            setLastPage(true)
        }
        let length = temp.length;
        setLastDocument(temp[length - 1]["fields"]["Item ID"])
        setShowData([...showData, ...temp]);


    }
    useEffect(() => {
        getRentalOwnerDetail(id);
    }, []);
    useEffect(() => {
        ownerContent && ownerContent.length > 0 && loadData(lastDocument, ownerContent[0]["fields"]["Name"]);

    }, [ownerContent]);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })
    const handleScroll = () => {
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
            setTimeout(() => {
                if (!lastPage) {
                    ownerContent && ownerContent.length > 0 && loadData(lastDocument, ownerContent[0]["fields"]["Name"]);
                }
            }, 1000);
        }
    };
    const showPhonenumber = () => {
        document.getElementById('callButton').innerHTML = ownerContent[0]["fields"]["Store Phone Number"];


    }
    useEffect(() => {
        window.addEventListener("scroll", detectScroll);
        return () => {
            window.removeEventListener("scroll", detectScroll);
        }
    });
    const detectScroll = () => {
        if (window.pageYOffset >= 850) {
            setSticky(false);
        }
        if (window.pageYOffset < 850) {
            setSticky(false);
        }
    };
    const showPhoneNumber = () => {
        document.getElementById('PhoneNumber').innerText = ownerContent[0]["fields"]["Store Phone Number"];
        document.getElementById('PhoneNumber').style.fontSize = "10px";
    }
    useEffect((() => {
        if (searchText != "") {
            let url = '/search?query=' + searchText;
            location.href = url;
        }

    }), [searchText])
    const search = (e) => {
        if (e.keyCode === 13) {
            setSearchText(e.target.value);
        }
    }
    return (
        <>
            <section className="py-4 bg-black sticky-top">
                <div style={{ maxWidth: "1350px", margin: "auto" }} className="flex flex-row justify-between ownerTop topNavbarPadding">
                    <Link href='/' >
                        <div className='flex flex-row items-center justify-start cursor-pointer logo'>
                            <img src='https://uploads-ssl.webflow.com/5efdc8a4340de947404995b4/633641f1a9242e39af156ff9_Swiftdrop.svg' className="h-auto logoImage" />
                        </div>
                    </Link>
                    <div className="flex flex-row items-center justify-around p-2 ownerNavbar rounded-3xl mx-2.5 mr-0" style={{ border:"1px solid #333"}} >
                        <FontAwesomeIcon icon={faSearch} className="mx-3 text-xl" />
                        <input type="text" className="w-full p-1 mr-0 text-base text-white bg-transparent outline-none" id="home" placeholder="e.g.SnowBoards" onClick={ (e) => search(e)}/>
                    </div>

                </div>
            </section>
            <section>
                <div className="h-full py-0 pb-0 bg-black">
                    <div className="relative flex flex-col mb-5 bg-black rounded-lg">
                        <div className="ownerDetailPane">
                            <div className="gradient"></div>
                            {ownerContent && ownerContent.length > 0 && <img src={ownerContent[0]["fields"]["Rental Store photos"]} className="bg-white bg-cover ownerImage" />
                            }
                            
                        </div>
                        <div>
                            <p className="ownerName">{ownerContent && ownerContent.length > 0 && ownerContent[0]["fields"]["Name"]}</p>
                        </div>
                        <div className="flex flex-row items-center justify-center pb-6 my-5" style={{  }}>
                            <a className="flex flex-row items-center" id="callButton" href={ownerContent && ownerContent.length > 0 && "tel:" + ownerContent[0]["fields"]["Store Phone Number"]} style={{ padding:"0px 25px", height:"50px"}}><FontAwesomeIcon icon={faPhone} className="text-lg mr-2.5" /> Call Us</a>
                            <a href={ownerContent && ownerContent.length > 0 && ownerContent[0]["fields"]["Website"]} className="flex flex-row items-center websiteLink" style={{ padding:"0px 25px", height:"50px"}}><FontAwesomeIcon icon={faGlobe} className="text-lg " /><p className="websiteText">Website</p> </a>
                            <button style={{ border: "1px solid #333", borderRadius: "10px", padding:"0px 25px", height:"50px" }} className="flex flex-row items-center  bg-transparent mx-2.5">Google Rating {ownerContent && ownerContent.length > 0 && ownerContent[0]["fields"]["Google Rating"].toFixed(1) + " (" + ownerContent[0]["fields"]["Reviews"] + ")"}  </button>
                        </div>
                    </div>
                    <div className="ownerItemGrid">
                        
                    </div>
                    <Gallery showData={showData} lastPage={lastPage} sticky={sticky} />
                    <div className="flex flex-row justify-between w-full detailSticky" style={{ paddingLeft:"40px", paddingRight:"40px"}}>
                        <div className="flex flex-col">
                            <p className="text-sm">{ownerContent && ownerContent.length > 0 && (" Google Rating " + ownerContent[0]["fields"]["Google Rating"].toFixed(1)) + " (" + ownerContent[0]["fields"]["Reviews"] + ")"}</p>
                            <p className="text-lg font-extrabold ">{ownerContent && ownerContent.length > 0 && ownerContent[0]["fields"]["Name"]}</p>
                        </div>
                        <div>
                            <a style={{ background: "#005ec2" }} id="PhoneNumber" className="flex flex-row items-center justify-center w-16 h-12 rounded-xl" href={ownerContent && ownerContent.length > 0 && "tel:" + ownerContent[0]["fields"]["Store Phone Number"]} ><FontAwesomeIcon icon={faPhone} className="text-xl" /></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default RentalOwner
