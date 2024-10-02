import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSingleUser } from "../../redux/features/auth/authSlice";

// const cloud_name = process.env.REACT_APP_CLOUD_NAME;
// const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shoretenedText = text.substring(0, n).concat("...");
    return shoretenedText;
  }
  return text;
};

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const initialState = {
    fullName: user?.fullName || "",
    emailAddress: user?.emailAddress || "",
    phone_no: user?.phone_no || "",
    address: user?.address || "",
    gender: user?.gender || "",
    picture: user?.picture || "",
    role: user?.role || "",
    verified: user?.verified || false,
  };

  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    dispatch(getSingleUser());
  }, [dispatch]);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <img src={profile.picture} alt="Profile Avatar" />
        </div>
        <div className="profile-info">
          <h1>{profile.fullName}</h1>
          <p className="profile-email">{profile.emailAddress}</p>
          <p className="profile-bio">{profile.address}</p>
        </div>
      </div>

      <div className="profile-edit">
        <button className="edit-button">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
