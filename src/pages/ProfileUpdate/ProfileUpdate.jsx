import React from "react";
import "./ProfileUpdate.css";

const ProfileUpdate = () => {
  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input type="file" id="avatar" />
          </label>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
