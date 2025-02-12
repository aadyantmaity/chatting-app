import "./RightSidebar.css";
import assets from "../../assets/assets.js";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { logout } from "../../config/firebase.js";

const RightSidebar = () => {
  const { chatUser, messages } = useContext(AppContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    let tempVar = [];
    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image);
      }
    });
    setMsgImages(tempVar);
  }, [messages]);

  return chatUser ? (
    <div className="rs">
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="" />
        <h3>
          {chatUser.userData.name}{" "}
          {Date.now() - chatUser.userData.lastSeen <= 700000 ? (
            <img className="dot" src={assets.green_dot} alt="" />
          ) : null}
        </h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          {msgImages.map((url, index) => (
            <img
              src={url}
              key={index}
              onClick={() => window.open(url)}
              alt=""
            />
          ))}
        </div>
      </div>
      <button className="logout" onClick={() => logout()}>
        Logout
      </button>
    </div>
  ) : (
    <div className="rs">
      <button className="logout" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};

export default RightSidebar;
