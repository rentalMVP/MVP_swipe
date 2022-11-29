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
            !sticky ? '' : <div className=" fixed-top" style={{ width:"100%", background:"black"}}><div className="flex flex-row items-center justify-between stickyBar topNavbarPadding">
                <Link href='/' >
                    <div className='flex flex-row items-center justify-start cursor-pointer'>
                        <img src='https://uploads-ssl.webflow.com/5efdc8a4340de947404995b4/633641f1a9242e39af156ff9_Swiftdrop.svg' className="w-5" />
                    </div>
                </Link>
                <div className="flex flex-row items-center justify-around mr-0 stickyBarSearch">
                    <FontAwesomeIcon icon={faSearch} className="mx-3 text-xl text-thin"/>
                    <input type="text" className="w-full p-0.5 text-base text-white outline-none mx-2 bg-transparent mr-0" id="homeSearch" placeholder="e.g.SnowBoards" onKeyDown ={ (e) =>search(e) }/>
                </div>
            </div>
            </div>
            }
           
            <div className="flex flex-row flex-wrap justify-center h-auto bg-black cardList" style={{ margin: "auto", maxWidth: "1440px" }} >
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
