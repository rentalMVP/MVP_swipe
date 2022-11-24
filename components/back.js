import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons"

const Back = () =>{
    return(
        <div>
            <FontAwesomeIcon icon = {faArrowAltCircleRight} className="backButton" onClick={ () => window.history.go(-1)}/>
        </div>
    )
}
export default Back