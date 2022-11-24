import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft } from "@fortawesome/free-regular-svg-icons";
import { faSquareCaretRight } from "@fortawesome/free-regular-svg-icons";
const Carousel = ({ imageGroup, id }) => {
    const [backgroundId, setBackgroundId] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [nextShow, setNextShow] = useState(true);
    const [prevShow, setPrevShow] = useState(false);
    const [touchPosition, setTouchPosition] = useState(null);
    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        console.log("okay", touchDown)
        setTouchPosition(touchDown);
    }
    const imageArray = [];
    for(let i in imageGroup.split(",")){
        imageArray.push("http://" + imageGroup.split(",")[i].replace(" ",""));
    }
    const next = () => {
        let tempId;
        if (backgroundId == imageArray.length - 1) {
            tempId = 0;
        } else {
            tempId = backgroundId + 1;
        }
        setBackgroundId(tempId);

    }
    const prev = () => {
        let tempId;
        if (backgroundId == 0) {
            tempId = imageArray.length - 1;
        } else {
            tempId = backgroundId - 1;
        }
        setBackgroundId(tempId);
    }
    useEffect(() => {
        setBackgroundImage(imageArray[backgroundId]);
        if (backgroundId == imageArray.length - 1) {
            setNextShow(false);
            setPrevShow(true);
        }
        if (backgroundId == 0) {
            setPrevShow(false);
            setNextShow(true);
        }
        if (backgroundId != imageArray.length - 1 && backgroundId != 0) {
            setNextShow(true);
            setPrevShow(true);
        }
    }, [backgroundId]);
    const handleTouchMove = (e) =>{
        const touchDown = touchPosition;
        if( touchPosition === null){
            return;
        }
        console.log("okay")
        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;
        console.log(diff);
        if (diff > 50) {
            prev();
            setTouchPosition(null);
        }
        if (diff < -50) {
            next();
            setTouchPosition(null);
        }
    }
    return (
        <div className="relative">
            <a href={"/cards?query=" + id}><img src={backgroundImage} className="flex items-center justify-center m-auto cardImage" onTouchStart={ (e) => handleTouchStart(e)} onTouchMove = {(e) => handleTouchMove(e)}/></a>
            <div className="absolute top-0 right-0 flex items-center justify-center h-full bg-transparent w-9 next"  ><FontAwesomeIcon icon={faSquareCaretRight} style={{ fontSize: '24px', color: "#d89d36", display: !nextShow ? "none" : "flex" }} onClick={() => next()} /></div>
            <div className="absolute top-0 left-0 flex items-center justify-center h-full bg-transparent w-9 prev" ><FontAwesomeIcon icon={faSquareCaretLeft} style={{ fontSize: '24px', color: "#d89d36", display: !prevShow ? "none" : "flex" }} onClick={() => prev()} /></div>
        </div>
    )

}
export default Carousel