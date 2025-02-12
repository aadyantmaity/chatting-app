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
      const userRef = doc(db, "users", uid); // ✅ FIX: Corrected `doc()` usage
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserData(userData); // ✅ FIX: Set userData so components can access it

        await updateDoc(userRef, {
          lastSeen: Date.now(),
        });

        setInterval(async () => {
          await updateDoc(userRef, { lastSeen: Date.now() });
        }, 60000);
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    if (userData && userData.id) {
      // ✅ FIX: Check `userData.id`
      const chatRef = doc(db, "chats", userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatData = res.data();
        if (chatData && chatData.chatsData) {
          const chatItems = chatData.chatsData;
          const tempData = [];
          for (const item of chatItems) {
            const userRef = doc(db, "users", item.rId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              tempData.push({ ...item, userData: userSnap.data() });
            }
          }
          setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      });

      return () => unSub();
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
