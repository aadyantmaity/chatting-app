import "./RightSidebar.css";
import assets from "../../assets/assets.js";
import { logout } from "../../config/firebase.js";

const RightSidebar = () => {
  const goToProfile = (event) => {
    event.preventDefault();
    window.location.href = "/profile";
  };

  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={assets.profile_img} alt="" />
        <h3>
          Richard Sanford <img src={assets.green_dot} className="dot" alt="" />
        </h3>
        <p>Hey, I am using chatapp</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <div className="rs-buttons">
        <button onClick={() => logout()}>Logout</button>
        <a href="/profile" className="profile-button" onClick={goToProfile}>
          Profile
        </a>
      </div>
    </div>
  );
};

export default RightSidebar;
