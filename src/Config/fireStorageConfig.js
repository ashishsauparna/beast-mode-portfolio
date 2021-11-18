import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCisgvnfYZoQ5-zL8OxWR08eazS9UosukE",
    authDomain: "finos-creative.firebaseapp.com",
    databaseURL: "https://finos-creative.firebaseio.com",
    projectId: "finos-creative",
    storageBucket: "finos-creative.appspot.com",
    messagingSenderId: "1027552418640",
    appId: "1:1027552418640:web:2f0cc6fec99ee0e66bea55",
    measurementId: "G-64PH42KRBP"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
