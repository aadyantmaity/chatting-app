import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db } from "../config/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid) => {
    try {
      const userRef = await doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      await updateDoc(userRef, {
        lastSeen: Date.now(),
      });

      setInterval(async () => {
        if (userData) {
          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.uid);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatData = res.data();
        if (chatData && chatData.chatsData) {
          const chatItems = chatData.chatsData;
          const tempData = [];
          for (const item of chatItems) {
            const userRef = doc(db, "users", item.rId);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            tempData.push({ ...item, userData });
          }
          setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      });
      return () => {
        unSub();
      };
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
