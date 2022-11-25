import Search from "../components/home/search"
import Gallery from "../components/home/gallery"
import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, orderBy, query, limit, startAfter, where, startAt } from "firebase/firestore"
import { db } from "../lib/init-firebase";
import Airtable from "airtable"
import Header from "../components/navbar"
export default function IndexPage() {
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState("All");
  const [showData, setShowData] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const listCollectionRef = collection(db, 'rental_items');
  const [lastDocument, setLastDocument] = useState();
  const [sticky, setSticky] = useState(false);
  const loadData = async (category, lastDocument) => {

    const temp = [];
    if (category == "All") {
      let q;
      if (!lastDocument) {
        q = query(listCollectionRef, limit(30), orderBy("fields.Item ID"), startAt(3324));
      } else {
        q = query(listCollectionRef, limit(30), orderBy("fields.Item ID"), startAfter(lastDocument));
      }
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push(doc.data())
      });
      if (querySnapshot.docs.length < 30) {
        setLastPage(true)
      }
      let length = temp.length;
      console.log({length});
      if(length == 0){
        return;
      }
      setLastDocument(temp[length - 1]["fields"]["Item ID"])
      lastDocument ? setShowData([...showData, ...temp]) : setShowData([...temp]);
      // setNewStart(false)
    }
    if (category != "All") {
      let q;
      if (!lastDocument) {
        q = query(listCollectionRef, limit(30), orderBy("fields.Item ID"), where("fields.Rental Category", "==", category));
      } else {
        q = query(listCollectionRef, limit(30), orderBy("fields.Item ID"), where("fields.Rental Category", "==", category), startAfter(lastDocument));
      }
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        temp.push(doc.data())
      });
      if (querySnapshot.docs.length < 30) {
        setLastPage(true)
      }
      let length = temp.length;
      setLastDocument(temp[length - 1]["fields"]["Item ID"])
      lastDocument ? setShowData([...showData, ...temp]) : setShowData([...temp]);
    }
  }
  useEffect(() => {
    setLastPage(false);
    setShowData([])
    loadData(category, null)
  }, [category])

  let resultList = [];
  const getData = () => {
    let base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_API_KEY }).base(process.env.NEXT_PUBLIC_BASE);
    base('Rental Items').select({
      filterByFormula: "{Added to Firebase} = ''",
      pageSize: 100,
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        resultList = resultList.concat(record._rawJson);
        setTimeout(() => { }, 500);
        base('Rental Items').update(record._rawJson.id, {
          "Item ID": record._rawJson.fields["Item ID"],
          "Item Name": record._rawJson.fields["Item Name"],
          "Item Description": record._rawJson.fields["Item Description"],
          "Item Image": record._rawJson.fields["Item Image"],
          "Item Minimum Price": record._rawJson.fields["Item Minimum Price"],
          "Charge Rate Type": record._rawJson.fields["Charge Rate Type"],
          "Rental Owner": record._rawJson.fields["Rental Owner"],
          "Rental Category": record._rawJson.fields["Rental Category"],
          "Added to Firebase": true,
        }, { typecast: true }, function (err, record) {
          if (err) {
            console.error(err);
            return;
          }
        });

        addDoc(listCollectionRef, { id: record._rawJson["id"], createdTime: record._rawJson["createdTime"], fields: record._rawJson["fields"] }).then(response => (console.log(response))).catch(error => {
          console.log(error.message)
        });

      });
      setTimeout(() => { }, 1000);
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });
  }

  useEffect(() => {
    loadData(category, lastDocument);
    getData();
   
  }, [])
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  })
  useEffect(() => {
    window.addEventListener("scroll", detectScroll);
    return () => {
      window.removeEventListener("scroll", detectScroll);
    }
  })
  const handleScroll = () => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
      setTimeout(() => {
        if (!lastPage) {
          loadData(category, lastDocument);
        }
      }, 2000);
    }
  };

  const detectScroll = () => {
    if(window.pageYOffset >= 360){
     setSticky(true);
    }
    if(window.pageYOffset < 360){
      setSticky(false);
    }
    
    
  }
  const getOwnerData = () => {
    const collectionRef = collection(db, 'rental_owners');
    let base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_API_KEY }).base(process.env.NEXT_PUBLIC_BASE);
    base('Rental Owners').select({
      pageSize: 100,
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function (record) {
        resultList = resultList.concat(record._rawJson);
        setTimeout(() => { }, 500);
        
        addDoc(collectionRef, { id: record._rawJson["id"], createdTime: record._rawJson["createdTime"], fields: record._rawJson["fields"] }).then(response => (console.log(response))).catch(error => {
          console.log(error.message)
        });

      });
      setTimeout(() => { }, 1000);
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
    });
  }
  return (
    <div>
      <Header/>
      <Search category={category} setCategory={setCategory} />
      <Gallery showData={showData} lastPage={lastPage} sticky={sticky}/>
    </div>
  )
}
