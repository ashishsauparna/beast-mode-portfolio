import React, {useEffect, useState} from 'react'
import './App.css'
import { useParams, useNavigate } from 'react-router-dom';
import db from './Config/firebaseConfig'
import { collection, query, where, getDocs } from '@firebase/firestore';

export default function UxTipsOpen() {
    const navigate = useNavigate();
    const params = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => {

        async function exploreDoc(){
            const q = query(collection(db, "UXTips"), where("routerLink", "==", params.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const docData = doc.data();
                setProject({
                    name: docData.name,
                    text: docData.brief,
                    url: docData.image,
                })
            });
        }

        exploreDoc();
    }, [params.id, navigate]);

    return (
        <div>
            <header>
                <span className="heading ">{project.name}</span>
                <p className="headerText" dangerouslySetInnerHTML={{__html: project.text}}>
                </p>
            </header>
            <img src={project.url} style={{width:"100%"}} alt={project.name}/>
        </div>
    )
}

