import CategoryList from "./categoryList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"



const Search = ( {category, setCategory}) =>{
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
               if(document.getElementById("homeSearch").value != null){
                let text = document.getElementById('homeSearch').value;
                if (text != "") {
                    console.log(text)
                    let url = '/search?query=' + text
                    location.href = url
                }
               }
            }
        })
    }, [])

    return(
        <section className="w-full bg-black search">
            <p className="homeTitle">RENT & ENJOY. </p>
            <div className="m-auto homeTitleBackground"></div>
            <p className="m-auto my-4 mb-6 text-xl font-light text-center text-white homeDetail">Explore Sydney's Largest Rental Directory.</p>
            {/* <CategoryList category = {category} setCategory = {setCategory}/> */}
            <div className="flex flex-row items-center justify-around searchBox">
                <FontAwesomeIcon icon = { faSearch} className="text-xl text-white "/>
                <input type="text" className="w-full text-sm outline-none bg-transparent p-1 mx-2.5 text-white" id="homeSearch" placeholder="e.g.SnowBoards"/>
            </div>
        </section>
    )
}
export default Search