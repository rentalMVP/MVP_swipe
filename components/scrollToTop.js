import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket }  from "@fortawesome/free-solid-svg-icons";
const ScrollToTop = () => {
    const [visible, setVisible] = useState('hidden');
    const btnVisibility = () => {
        if (window.pageYOffset > 400) {
            setVisible("visible")
        } else {
            setVisible("hidden")
        }
    };
   useEffect(() => {
        document.addEventListener("scroll", () => {
            btnVisibility();
        });
   }, [])
   const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

   }
    return (
        <div className="scroll-to-top">
            <span className="btn btn-position btn-style" style={{ visibility: visible}} onClick= { scrollToTop}><FontAwesomeIcon icon={ faArrowUpFromBracket} className="text-lg "/></span>
        </div>
    )

}
export default ScrollToTop