import './App.css';
import { useState, useEffect } from 'react';
import db from './Config/firebaseConfig'
import { doc, getDoc } from '@firebase/firestore';

export default function About() {

  const [about, setAbout] = useState([]);

  useEffect(()=> {
    document.title = ("About me");
    async function exploreDoc(){
      const docRef = doc(db, "website_text", "work_page");
      const docSnap = await getDoc(docRef);
      if(docSnap.exists){
          const docData = docSnap.data();
          setAbout({
              bio: docData.bio,
              cv: docData.cv,
              my_photo: docData.my_photo,
              email: docData.email,
          })  
      }else{
          console.log("doesn't exist")
      }
  }

  exploreDoc();
}, [])
  
  return (
      <div>
      {/* Context Layout to be changed */}
      <header>
        <span className="heading" style={{marginRight:"160px"}}>About me 😊</span>
        <p>
        <a className="hyperLink" rel="noreferrer" href={"https://www.credly.com/badges/94cd623f-e68a-44f7-af93-1d86d1023538?source=linked_in_profile"} target="_blank" style={{marginRight:"10px"}} to="">Google UX Certificate</a>
        <a className="hyperLink" rel="noreferrer" href={`mailto:${about.email}`} style={{marginRight:"10px"}} to="">Email</a>
        <a className="hyperLink" rel="noreferrer" href={about.cv} target="_blank" to="">CV</a>
        </p>
      </header>
      <div dangerouslySetInnerHTML={{__html: about.bio}}>
        </div>
      <div className="gridContainer">
        <div className="gridItem">
          <img src={about.my_photo} alt="logo1" style={{width:"100%", height:"auto", marginBottom:"10px"}}/>
        </div>
      </div>
    </div>
  )
}
