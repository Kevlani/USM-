
import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBXar5Vd--MvGi2XOMEOPaZzSe5HEvXY3c",
    authDomain: "fir-tutorial-650d1.firebaseapp.com",
    projectId: "fir-tutorial-650d1",
    storageBucket: "fir-tutorial-650d1.appspot.com",
    messagingSenderId: "293352007581",
    appId: "1:293352007581:web:b2fd0aa988b1c5b07db174",
    measurementId: "G-9W1CJPNE9L"
  };
  const app = initializeApp(firebaseConfig);
   export const db= getFirestore(app)
