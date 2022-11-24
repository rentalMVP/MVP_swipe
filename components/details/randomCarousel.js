import { collection, getDocs, addDoc, orderBy, query, limit, startAfter, where, startAt, Timestamp } from "firebase/firestore"
import { db } from "../../lib/init-firebase"
import { useEffect , useState} from "react"
import Link from "next/link"
import GalleryItem from "../home/galleryItem"
const RandomCarousel = ({ itemID, rentalCategory }) =>{
  const [ similarPane, setSimilarPane] = useState([]);
  const getRentalData = async(itemID, rentalCategory) =>{
    const temp = [];
    const tempPanel = [];
    const listCollectionRef = collection(db, 'rental_items')
    let q = query(listCollectionRef, orderBy("fields.Item ID"), where("fields.Rental Category","==", rentalCategory), limit(30), startAfter(itemID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        temp.push(doc.data())
    });
    if(temp.length != 0){
      for( let i in temp){
        tempPanel.push(
          <GalleryItem fields={temp[i]["fields"]} key={i}/>
        );
      }
    }
    else{
      tempPanel.push(<div className="flex flex-col items-center justify-center h-48 w-96">
      <p className="font-sans text-xl italic text-center my-7" style={{ color:"#ff9005"}}>No Similar item</p></div>)
    }
    setSimilarPane(tempPanel)
  }
  useEffect(() =>{
     getRentalData(itemID, rentalCategory);
  },[itemID]);
  return (
    <>
        <div className="flex flex-row flex-wrap justify-around px-7">
          {
            similarPane
          }
        </div>
    </>
  )

}
export default RandomCarousel