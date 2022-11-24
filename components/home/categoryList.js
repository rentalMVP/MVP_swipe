
import { useEffect, useState } from "react";
import { db } from "../../lib/init-firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { async } from "@firebase/util";

const CategoryList = ({ category, setCategory }) => {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(async () => {
        const temp = [];
        const categoryCollectionRef = collection(db, 'rental_owners');
        const q = query(categoryCollectionRef, orderBy("fields.Reviews"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            temp.push(doc.data())
        });
        let rental = new Set();
        for (let i in temp) {
            rental.add(temp[i]["fields"]["Rental Category"]);
        }
        const tmpArray = [];
        rental.forEach((value) => {
            tmpArray.push(value);
        })
        setCategoryList(tmpArray);

    }, [])
    const showAllCategory = () => {
        return (
            categoryList && categoryList.length > 0 && categoryList.map((value, index) => (
                <li key={index} style={{ marginRight: "20px", fontSize: "20px", fontFamily: "Oswald", padding: "5px" }} className="li_text" onClick={() => setCategory(value)}>
                    {value}
                </li>
            ))
        )
    }
    const showAllOption = () => {
        return (
            categoryList && categoryList.length > 0 && categoryList.map((value, index) => (
                <option value={value} key={index}>{value}</option>
            ))
        )
    }
    return (<>
        <ul className="flex flex-row categoryList">
            <li style={{ marginRight: "20px", fontSize: "20px", fontFamily: "Oswald", padding: "5px" }} className="li_text" onClick={() => setCategory("All")}>
                All
            </li>
            {showAllCategory()}
        </ul>
        <div className="flex items-center mb-3 selectCategory" style={{ width: "300px", margin: "auto", borderRadius: "10px", marginTop:"10px"}}>
            <select className="form-select appearance-none
            block
            w-full
            px-6
            py-1.5
            text-base
            font-normal
            text-white
            bg-transparent bg-clip-padding bg-no-repeat
            rounded
            transition
            ease-in-out
            m-0

            focus:text-black focus:bg-white focus:border-white focus:outline-none" aria-label="Default select example" style={{ border: "1px solid white" }} onClick={ ()=> 
                setCategory(event.target.value)
            }>
                <option value="All">All</option>
                {showAllOption()}
            </select>
        </div>
    </>)

}
export default CategoryList