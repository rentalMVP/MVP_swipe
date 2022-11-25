import Link from 'next/link'
import { useState, useEffect } from 'react'
import { db } from '../../lib/init-firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import Carousel from './carousel';
import { async } from '@firebase/util';
const GalleryItem = ({ fields, index, id }) => {
    const [rentalOwenrName, setRentalOwnerName] = useState('');
    useEffect(() => {
        async function fetchData() {
            const q = query(collection(db, "rental_owners"), where("id", "==", fields["Rental Owner"][0]));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let temp = [];
                temp = (doc.id, " => ", doc.data());
                setRentalOwnerName(temp.fields["Name"])
            });
        }
        fetchData()

    }, [])

    return (
        <div className="card" aria-haspopup="true">
            <Carousel imageGroup={fields["Item Image"]} id={fields["Item ID"]} />
            {/* <img src={"http://" + fields["Item Image"].split(',')[0]} className="flex items-center justify-center m-auto"/> */}
            <Link href={`/cards?query=${fields["Item ID"]}`}><p className="itemName">{fields["Item Name"]}</p></Link>
            <Link href={`/rental_owner?query=${fields["Rental Owner"][0]}`}><p className="rentalOwnerName hover:underline">{
                rentalOwenrName
            }</p></Link>
            <p className="itemPrice">{fields["Item Price"]}</p>
        </div>
    )

}
export default GalleryItem