import { useState, useEffect } from 'react';
import './App.css';
import GridItem from './Components/GridItem';
import db from './Config/firebaseConfig'
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function UxTips() {

  const [uxProject, setUxProject] = useState([]);
  //const location = useLocation().pathname;

  useEffect(() => { 
    document.title = ("UX Tips");
    async function foundProjects(){
      const q = query(collection(db, "UXTips"), orderBy("code", "desc"));
      const data = await getDocs(q);
      setUxProject(data.docs.map((doc) => (
        {
            ...doc.data(),
            names: doc.data().name,
            image: doc.data().image,
            brief: doc.data().brief,
            id:doc.id,
            routerLink: doc.data().routerLink,
            // grid: doc.data().grid
        }
      )));
    }
    foundProjects();
  },[]);

  uxProject.map((uxProject)=> console.log(uxProject.routerLink))
    return (
      <div>
        {/* Context Layout to be changed */}
        <header>
          <span className="heading" style={{marginRight:"160px"}}>UX Tips 💡</span>
          <a className="hyperLink" href={"https://ashishsauparna.medium.com/"} rel="noreferrer" target="_blank">Find more on Medium</a>
        </header>
        <div className="gridContainerThree">
            {uxProject.map((uxProject, index)=>{
              return <GridItem key={index} routerLink={`/ux-tips/${uxProject.routerLink}`} 
              class={uxProject.grid} image={uxProject.image} name={uxProject.names} />
            })}
        </div>
      </div>
    )
}
