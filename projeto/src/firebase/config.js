import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4h1mycSRGdYF80D8aVReC5eY1SJJB424",
  authDomain: "miniblog-bfafa.firebaseapp.com",
  projectId: "miniblog-bfafa",
  storageBucket: "miniblog-bfafa.appspot.com",
  messagingSenderId: "926846973228",
  appId: "1:926846973228:web:248e4cf1626b1e9e456889"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};