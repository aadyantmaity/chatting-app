import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBHDK_FHWAULFqeO2a6kcBjCpNfRkkeXD4",
  authDomain: "chatting-app-gs-8f029.firebaseapp.com",
  projectId: "chatting-app-gs-8f029",
  storageBucket: "chatting-app-gs-8f029.firebasestorage.app",
  messagingSenderId: "583969794328",
  appId: "1:583969794328:web:d734eae913f86ba8bf966d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, I am using Chatting App",
      lastSeen: Date.now(),
      id: user.uid,
    });
    await setDoc(doc(db, "chats", user.uid), {
      chats: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async (navigate) => {
  try {
    await signOut(auth);
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

export { signup, login, logout, auth, db };
