import Loading from "../home/loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useEffect } from "react"
import SearchItem from "./searchItem"
import GalleryItem from "../home/galleryItem"
const SearchResult = ({ showData, lastPage, sticky, setSearchText }) => {
    const load = () => {
        if (true)
            return <Loading />
        else return (<div></div>);
    }
    const search = (e) => {
        if (e.keyCode === 13) {

            setSearchText(e.target.value);
        }
    }
    

    return (
        <section style={{ background: "black", position: "relative" }}>
            {
            !sticky ? '' : <div className="flex flex-row justify-between stickyBar">
                <Link href='/' >
                    <div className='flex flex-row items-center justify-start cursor-pointer'>
                        <img src='https://uploads-ssl.webflow.com/5efdc8a4340de947404995b4/633641f1a9242e39af156ff9_Swiftdrop.svg' className="w-7" />
                        <p id="logoTitle">SwiftDrop</p>
                    </div>
                </Link>
                <div className="flex flex-row items-center justify-around stickyBarSearch">
                    <FontAwesomeIcon icon={faSearch} className=" text-xl mx-2.5"/>
                    <input type="text" className="w-full p-1 text-base text-white outline-none home_search mx-2.5 bg-transparent" id="homeSearch" placeholder="e.g.SnowBoards" onKeyDown ={ (e) =>search(e) }/>
                </div>
            </div>

            }
           
            <div className="flex flex-row flex-wrap justify-center h-auto gap-8 py-24 pb-12 bg-black card_list" style={{ margin: "auto", maxWidth: "1440px" }} >
                {
                    showData && showData.length > 0 && showData.map(({ fields, id }, index) => (
                        <GalleryItem fields={fields} index={index} id={id} key={id} />
                    ))
                }
            </div>
            {
                lastPage ? '' : load()
            }

        </section>
    )
}
export default SearchResult
