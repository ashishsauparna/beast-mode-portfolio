import React, {useState, useEffect} from 'react'
import GridItem from './Components/GridItem';
import db from './Config/firebaseConfig'
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
//import { useLocation } from 'react-router';

export default function Home(props) {

  const [project, setProject] = useState([]);
  //const location = useLocation().pathname;

  useEffect(() => { 
    props.changeHome(true);
    document.title = ("Ashish Sharma");
    async function foundProjects(){
      const q = query(collection(db, "project_post"), orderBy("code", "desc"), limit(3));
      const data = await getDocs(q);
      setProject(data.docs.map((doc) => (
        {
            ...doc.data(),
            names: doc.data().name,
            brief: doc.data().brief,
            url: doc.data().url,
            id:doc.id,
            routerLink: doc.data().routerLink,
            grid: doc.data().grid
        }
      )));
    }
    foundProjects();
  },[props]);
  
    return (
        <div>
          {/* Contśext Layout to be changed */}
          <header>
            <span className="heading" style={{marginBottom:"16px"}}>👋 Hi! there</span>
            <p className ="headerText">
            I’m <b>Ashish Sharma</b>, currently living in Gurgaon, India. 
            I’m a User Experience Designer working in Interaction design.
            </p>
          </header>
          <b>Case Studies</b>
          <div className="gridContainer">
            {project.map((project, index)=>{
              return <GridItem key={index} id={project.id} routerLink={"/case-studies/"+ project.routerLink} 
              class={project.grid} image={project.url} name={project.names}/>
            })}
          </div>
        </div>
    )
}
