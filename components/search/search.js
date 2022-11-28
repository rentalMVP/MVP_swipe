import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { collection, getDocs, addDoc, orderBy, query, limit, startAfter, startAt, where, getDoc } from "firebase/firestore"
import { db } from "../../lib/init-firebase"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import SearchResult from "./searchResult"
import Header from "../navbar"
import ScrollToTop from "../scrollToTop"
const Search = ({ queryText }) => {

    const [showData, setShowData] = useState([]);
    const [lastPage, setLastPage] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [searchText, setSearchText] = useState('');

    const getAllData = async (queryText) => {
        const temp = [];
        const tempShowData = [];
        const listCollectionRef = collection(db, 'rental_items')
        let q = query(listCollectionRef, orderBy("fields.Item ID"), limit(3000))
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
            temp.push(doc.data())
        });
        const querytemp = queryText.split(",");
        for (let i in querytemp) {
            for (let j in temp) {
                if ((temp[j]["fields"]["Item Description"].toLowerCase()).indexOf(querytemp[i].toLowerCase()) > 0) {
                    tempShowData.push(temp[j])
                }

            }
        }
        setShowData(tempShowData)
        setLastPage(true);
    }
    useEffect(() => {
        document.getElementById("homeSearch").value = queryText;
        getAllData(queryText);


    }, [queryText])
    useEffect(() => {
        window.addEventListener("scroll", detectScroll);
        return () => {
            window.removeEventListener("scroll", detectScroll);
        }
    })
    const detectScroll = () => {
        if (window.pageYOffset >= 400) {
            setSticky(true);
        }
        if (window.pageYOffset < 400) {
            setSticky(false);
        }
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
            <Header/>
            <section className="w-full bg-black search">
            <p className="homeTitle">RENT & ENJOY. </p>
            <div className="m-auto homeTitleBackground"></div>
            <p className="m-auto mb-6 text-lg font-light text-center text-white homeDetail" style={{ marginTop:"15px"}}>Explore Sydney's Largest Rental Directory.</p>
                <div className="flex flex-row items-center justify-around searchBox">
                    <FontAwesomeIcon icon={faSearch} className="text-xl text-white " />
                    <input type="text" className="w-full p-1 text-base text-white bg-transparent outline-none home_search mx-2.5" id="homeSearch" placeholder="e.g.SnowBoards"  onKeyDown ={ (e) =>search(e) }/>
                </div>
            </section>
            <SearchResult showData={showData} lastPage={lastPage} sticky={sticky} setSearchText={setSearchText} />
        </>

    )

}
export default Search


