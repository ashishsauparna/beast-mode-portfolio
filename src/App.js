import './App.css';
import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CaseStudies from './CaseStudies';
import About from './About';
import UxTips from './UxTips.js';
import logo from './logo.svg';
import back from './arrow_left.svg';
import ButtonAs from './Components/ButtonAs'
import Home from './Home';
import Project from './Project';
import UxTipsOpen from './UxTipsOpen';
import GetReviewed from './GetReviewed';
import { Squash as Hamburger } from 'hamburger-react';
import { CSSTransition } from 'react-transition-group';
import db from './Config/firebaseConfig'
import { addDoc, collection } from '@firebase/firestore';
import NotFount from './NotFount';

function App() {

  const [home, setHome] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isApproved, setIsApproved] = useState(false);


  const handleSubmit = async(event) => {
    event.preventDefault();
    const regex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    if(!email || regex.test(email) === false){
      console.log('invalid Email')
    }else{
      console.log('valid Email')
      setIsApproved(true);
      await addDoc(collection(db, "news_letter"), {
        email: email,
      });
    }
  }

  return (
    <Router>
      <div>
        <div className="navigationContainer">
          <Link to="/">
          <img src={logo} alt="logo" style={{width:"75px", height:"auto"}}/>
          </Link><br/><br/><br/>
          {
          home ? "" : <Link to="/" onClick={() => setHome(true)} className="link">
          <img src={back} alt="logo" style={{width:"25px", height:"auto"}}/>
          <span>&nbsp; &nbsp; Go Back</span> 
          </Link>
          }
          { 
            home ? 
          <div className="navigation">
            <div style={{lineHeight:"45px"}}>
            <ButtonAs name="Case Studies" path="./case-studies"/><br/>
            <ButtonAs name="UX Tips" path="./ux-tips" /><br/>
            <ButtonAs name="About Me" path="./about" /><br/>
            <ButtonAs name="Video Session" path="./video-sessions" /><br/>
            </div>
          </div> : ""
          }
        </div>
        <div className="mobile_menu">
        <Hamburger color="#fff" toggle={()=> {
          if(isOpen === true){
            setOpen(false)
          }else{
            setOpen(true)
          }}} toggled={isOpen}/>
        </div> 

        <CSSTransition in={isOpen} unmountOnExit classNames="transition" timeout={{enter: 500, exit: 500,}}
          onEnter={()=> setOpen(true)} onExit={()=> setOpen(false)}>
          <div className="menu">
          <Link to="/" style={{position:"absolute", top:"0", left:"0", marginTop:"24px"}}>
            <img src={logo} alt="logo" style={{width:"175px", height:"auto", opacity:"0.3"}}/>
          </Link>
          <div className="menu-alignment">
          <ButtonAs name="Home" onPress={()=> setOpen(false)} path="/"/><br/>
          <ButtonAs name="Case Studies" onPress={()=> setOpen(false)} path="/case-studies"/><br/>
          <ButtonAs name="About Me" onPress={()=> setOpen(false)} path="/about" /><br/>
          <ButtonAs name="UX Tips" onPress={()=> setOpen(false)} path="/ux-tips" /><br/>
          <ButtonAs name="Video Session" onPress={()=> setOpen(false)}path="/video-sessions" /><br/>  
        </div></div></CSSTransition>
        <div className = "parent">
          <main className="context" style={{marginBottom:"160px"}}>
            <Routes>
              <Route strict exact path="/" element={<Home changeHome={home=>setHome(home)}/>}/>
              <Route exact path="/case-studies" element={<CaseStudies changeHome={home=>setHome(home)} />} />
              <Route strict exact path="/about" element={<About/>}/>
              <Route exact path="/ux-tips" element={<UxTips/>}/>
              <Route path="*" element={<NotFount/>}/>
              <Route exact strict path="/video-sessions" element={<GetReviewed/>}/>
              <Route exact strict path="/case-studies/:id" element={<Project changeHome={home=> setHome(home)}/>}/>
              <Route exact strict path="/ux-tips/:id" element={<UxTipsOpen/>}/>
            </Routes>
          </main>
          
          <footer style={{background:"none", overflow:"hidden"}}>
            <div className="context">
              <div style={{float:"left", marginRight:"120px"}}>Sign up for the Newsletter
              {
                isApproved ? <p style={{marginTop:"16px"}}>Thank you! Your email is been registered.</p> : <form className="newsletterForm" onSubmit={handleSubmit}>
                <input
                  className="textFieldFormat"
                  placeholder= "Email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  aria-label="Email"
                  type="email"
                /> 
                <button className="button" type="submit" onClick={handleSubmit}>Submit</button>
                </form>
              }

              <p style={{marginTop:"88px"}}>© Owned and developed by Ashish Sharma. Last updated Nov 2021</p>
              </div>
              <div className="footerLink">
                <a className="hyperLink" style={{marginRight:"16px"}} href={"https://ashishsauparna.medium.com/"} rel="noreferrer" target="_blank">Medium</a><br/>
                <a className="hyperLink" style={{marginRight:"16px"}} href={"https://instagram.com/ashish.ux"} rel="noreferrer" target="_blank">Instagram</a><br/>
                <a className="hyperLink" href={"https://twitter.com/ashishsauparna"} rel="noreferrer" target="_blank">Twitter</a><br/>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
