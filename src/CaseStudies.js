import React, {useState, useEffect} from 'react'
import GridItem from './Components/GridItem';
import './App.css';
import { Link } from 'react-router-dom';
import db from './Config/firebaseConfig'
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function CaseStudies(props) {
  const [project, setProject] = useState([]);

  useEffect(() => {
    props.changeHome(true);
    document.title = ('Case Studies');

    async function foundProjects(){
      const q = query(collection(db, "project_post"), orderBy("code", "desc"));
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
    }, [props]);

    return (
      <div>
        {/* Context Layout to be changed */}
        <header>
          <span className="heading">Case Studies</span>
          <div className="headerText">
          Select the catagories like&nbsp;
          <Link className="hyperLink" to="">All</Link>,&nbsp;
          <Link className="hyperLink" to="">Brand Identity</Link>&nbsp;and&nbsp;
          <Link className="hyperLink" to="">User Research</Link> to filter out the Projects
          </div>
        </header>
        <div className="gridContainerTwo">
            {project.map((project, index)=>{
              return <GridItem key={index} routerLink={project.routerLink} 
              class={project.grid} image={project.url} name={project.names}/>
            })}
        </div>
      </div>
    )
}