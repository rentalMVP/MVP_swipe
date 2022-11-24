import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useState, useEffect } from "react"

const StickySearch = ({ moveTo }) => {
    const [text, setText] = useState('')
    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSearch = () => {
        if (text != "") {
            let url = '/search?query=' + text
            location.href = url
        }
    }
    return (
        <div className="flex flex-row items-center stickySearch">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: "1vw", marginRight: "0vw", color: "white" }} className="searchIcon" />
            <input type="text" placeholder="search....." onChange={handleChange} />
            <button className="search_button" style={{ color: "white" }} onClick={handleSearch}> Search..</button>
        </div>
    )
}
export default StickySearch

