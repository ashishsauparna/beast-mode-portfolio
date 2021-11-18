import React, {useState, useEffect} from 'react'
import './App.css'
import { useParams, useNavigate } from 'react-router-dom';
import storage from './Config/fireStorageConfig'
import db from './Config/firebaseConfig'
import { collection, query, where, getDocs } from '@firebase/firestore';
import { ref, listAll, getDownloadURL} from "firebase/storage";
import { Link } from 'react-scroll';

export default function Project(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [project, setProject] = useState([]);
    const [urlPo, setUrlPo] = useState([]);
    const [urlUnd, setUrlUnd] = useState([]);
    const [urlDe, setUrlDe] = useState([]);
    const [urlRe, setUrlRe] = useState([]);
    const [urlGf, setUrlGf] = useState([])

    useEffect(() => {
        props.changeHome(false);

        async function exploreDoc(){
            const q = query(collection(db, "project_post"), where("routerLink", "==", params.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const docData = doc.data();
                setProject({
                    name: docData.name,
                    text: docData.text,
                    url: docData.url,
                })
            });
        }
        

    const overviewRef = ref(storage, `behance_projects/${params.id}/po`);
    const understandingRef = ref(storage, `behance_projects/${params.id}/und`);
    const startingRef = ref(storage, `behance_projects/${params.id}/de`);
    const refineRef = ref(storage, `behance_projects/${params.id}/re`);
    const forwardRef = ref(storage, `behance_projects/${params.id}/gf`);
    

    //Overview Project
    listAll(overviewRef).then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises).then((urls) => {
            setUrlPo(urls)
        })
    }).catch((err)=> {
        console.log(err)
    })

    //Understanding User
    listAll(understandingRef).then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises).then((urls) => {
            setUrlUnd(urls)
        })
    }).catch((err)=> {
        console.log(err)
    })

    //Starting design
    listAll(startingRef).then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises).then((urls) => {
            setUrlDe(urls)
        })
    }).catch((err)=> {
        console.log(err)
    })

    //Refine design
    listAll(refineRef).then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises).then((urls) => {
            setUrlRe(urls)
        })
    }).catch((err)=> {
        console.log(err)
    })

    //Gounf Forward
    listAll(forwardRef).then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises).then((urls) => {
            setUrlGf(urls)
        })
    }).catch((err)=> {
        console.log(err)
    })

    if(window.matchMedia("(max-width:940px)").matches){
        navigate('NotFount', {state: true})
    }else{
        exploreDoc();
    }
    }, [params.id, props, navigate]);

    return (
        <div>
            <div className="scrollNav">
                <Link className="link" to="OP" spy={true} activeClass="active">Project Overview</Link><br/>
                <Link className="link" to="UND" spy={true} activeClass="active">Understanding User</Link><br/>
                <Link className="link" to="SD" spy={true} activeClass="active">Starting design</Link><br/>
                <Link className="link" to="RD" spy={true} activeClass="active">Refining design</Link><br/>
                <Link className="link" to="GF" spy={true} activeClass="active">Going forward</Link><br/>
            </div>

            <header style={{marginBottom:"160px", display:"inline-flex"}}>
                <p className="heading">{project.name}</p>
                <p style={{width:"60%", marginLeft:"auto"}} dangerouslySetInnerHTML={{__html: project.text}}>
                </p>
            </header>
            <div className="gridContainerProject">
                <div id="OP" className="gridContainerProject">
                {    
                    urlPo.map((url, index) => <img src={url}  key={index} alt="images" 
                    style={{width:"100%", height:"auto"}}/>)
                }
                </div>
                <div id="UND" className="gridContainerProject">
                {
                    urlUnd.map((url, index) => <img src={url} key={index} alt="images" 
                    style={{width:"100%", height:"auto"}}/>)
                }
                </div>
                <div id="SD" className="gridContainerProject">
                {
                    urlDe.map((url, index) => <img src={url} key={index} alt="images" 
                    style={{width:"100%", height:"auto"}}/>)
                }
                </div>
                <div id="RD" className="gridContainerProject">
                {
                    urlRe.map((url, index) => <img src={url} key={index} alt="images" 
                    style={{width:"100%", height:"auto"}}/>)
                }
                </div>
                <div id="GF" className="gridContainerProject">
                {
                    urlGf.map((url, index) => <img src={url} key={index} alt="images" 
                    style={{width:"100%", height:"auto"}}/>)
                }
                </div>

            </div>
        </div>
    )
}
