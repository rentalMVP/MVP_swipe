import Loading from "./loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import GalleryItem from "./galleryItem"
import Link from "next/link"
import { useEffect } from "react"
const Gallery = ({ showData, lastPage, sticky }) => {
    const load = () => {
        if (true)
            return <Loading />
        else return (<div></div>);
    }
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                let searchElement = document.getElementById("home");
                if (searchElement != null) {
                    let text = document.getElementById('home').value;
                    if (text != "") {
                        let url = '/search?query=' + text
                        location.href = url
                    }
                }
            }
        });
    }, [])


    return (
        <section className="relative bg-black">
            {
                !sticky ? '' : <div className=" fixed-top" style={{ width: "100%", background: "black" }}><div className="flex flex-row items-center justify-between stickyBar topNavbarPadding">
                    <Link href='/' >
                        <div className='flex flex-row items-center justify-start cursor-pointer'>
                            <img src='https://uploads-ssl.webflow.com/5efdc8a4340de947404995b4/633641f1a9242e39af156ff9_Swiftdrop.svg' className="w-5" />
                        </div>
                    </Link>
                    <div className="flex flex-row items-center justify-around mr-0 stickyBarSearch">
                        <FontAwesomeIcon icon={faSearch} className="mx-3 text-xl font-thin text-white" />
                        <input type="text" className="w-full p-0.5 mx-2 text-base text-white bg-transparent outline-none mr-0" id="home" placeholder="e.g.SnowBoards" />
                    </div>
                </div>
                </div>
            }
            <div className="flex flex-row flex-wrap justify-center cardList" >
                {
                    showData && showData.length > 0 && showData.map(({ fields, id }, index) => (
                        <GalleryItem fields={fields} index={index} id={id} key={index} />
                    ))
                }
            </div>
            {
                lastPage ? '' : load()
            }

        </section>
    )
}
export default Gallery
