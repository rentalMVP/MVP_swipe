import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
const SearchCard = ({item_name, item_id, item_price, item_minimun_price, last_modified, phone_number, item_image}) =>{
   return(
    <div style={{ maxWidth:"800px", background:"#3a3a3a", height:"auto", margin:"auto", marginTop:"50px"}}>
        <div style={{ borderBottom:"1px solid #161616", padding:"10px 20px"}} className="flex flex-row items-center justify-between">
            <p style={{ fontSize:"25px", color:"white", fontFamily:"Hagen", fontStyle:"italic"}}>{ item_name }</p>
            <FontAwesomeIcon icon={ faHeart} style={{ fontSize:" 20px"}}></FontAwesomeIcon>
        </div>
        <div className="flex flex-row">
            <div  style={{ borderRadius:"10px", width:"50%", padding:"20px"}}> 
                <div id="carouselExampleCrossfade" className="relative w-full carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="relative w-full overflow-hidden carousel-inner">
                        <div className="float-left w-full carousel-item active">
                            <img src={ item_image }
                                className="block w-full"
                                alt="Wild Landscape"
                            />
                        </div>
                        <div className="float-left w-full carousel-item">
                            <img
                                src="../cards/sample.webp"
                                className="block w-full"
                                alt="Camera"
                            />
                        </div>
                        <div className="float-left w-full carousel-item">
                            <img
                                src="../cards/sample.webp"
                                className="block w-full"
                                alt="Exotic Fruits"
                            />
                        </div>
                    </div>
                    <button
                        className="absolute top-0 bottom-0 left-0 flex items-center justify-center p-0 text-center border-0 carousel-control-prev hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
                        type="button"
                        data-bs-target="#carouselExampleCrossfade"
                        data-bs-slide="prev"
                    >
                        <span className="inline-block bg-no-repeat carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="absolute top-0 bottom-0 right-0 flex items-center justify-center p-0 text-center border-0 carousel-control-next hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
                        type="button"
                        data-bs-target="#carouselExampleCrossfade"
                        data-bs-slide="next"
                    >
                        <span className="inline-block bg-no-repeat carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>  
            </div>
            <div style={{ padding:"30px 10px", width:"50%"}}>
                <p className="flex flex-row" style={{ fontSize:"20px", color:"white"}}><FontAwesomeIcon icon={ faRotateLeft } style={{ fontSize:"25px", marginRight:"10px", color:"white" }}></FontAwesomeIcon>2 days ago</p>
                <p style={{ fontSize:"20px", marginTop:"15px", color:"white"}}>{ item_price }</p>
                <p style={{ fontSize:"20px", marginTop:"15px", color:"white", fontFamily:'Shalome'}}>Clothing Rental</p>
                <p style={{ fontSize:"20px", marginTop:"15px", color:"white", fontFamily:'Shalome'}} className="flex flex-row items-center"><FontAwesomeIcon icon={ faMobileScreenButton} style={{ fontSize:"25px", marginRight:"10px"}}></FontAwesomeIcon>{ phone_number }</p>
                <div className="flex flex-row" style={{ marginTop:"30px"}}>
                    <Link href={`/cards/${item_id}`}>
                    <button style={{ width:"40%", background:"white", color:"#161616", padding:"10px 15px", marginRight:"10%", borderRadius:"5px"}}> More detail</button>
                    </Link>
                    <button style={{ width:"40%", background:"#161616", color:"white", padding:"10px 15px", borderRadius:"5px"}}> Call</button>
                </div>
            </div>
        </div>
          
    </div>
   )


}
export default SearchCard