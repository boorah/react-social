import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams, useHistory } from "react-router-dom";
import userService from "../../services/userService";
import UserIcon from "../../assets/man.png";
import classes from "./Update.module.css";

export default function Update() {

  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [image, setImage] = useState("");
  const [updated, setUpdated] = useState(false);
  const { username } = useParams();
  const imageRef = useRef(null);

  const handleCancel = () => {
    history.goBack();
  };

  const updateImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(imageRef.current.files[0]);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = imageRef.current.files[0];
    let avatarUrl = "";

    if (file) {
      const formData = new FormData();
      const timestamp = new Date().toUTCString();

      formData.append("file", file);
      formData.append("upload_preset", "react-social");
      formData.append("public_id", `${username}-${timestamp}`);

      const response = await userService.uploadImage(formData);
      avatarUrl = response.secure_url;

      const storedDetails = JSON.parse(window.localStorage.getItem("loggedInUser"));

      const updatedDetails = {
        ...storedDetails,
        details: {
          ...storedDetails.details,
          avatarUrl
        }
      };

      window.localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedDetails)
      );

      setUser(state => (
        {
          ...state,
          avatarUrl
        }
      ));

    }

    const password = e.target.password.value;
    const about = e.target.about.value;

    await userService.updateUser({
      avatarUrl,
      password,
      about
    });

    setUpdated(true);

    window.setTimeout(() => {
      setUpdated(false);
    }, 3000);
  };

  return (
    <div className={classes.container}>
      <div className={classes.upload}>
        <div className={classes.avatar}>
          <img src={!image ? UserIcon : image} alt="user-avatar" />
        </div>
        <div>
          <label className={classes.uploadButton}>
            Upload
            <input type="file" ref={imageRef} onChange={updateImage} />
          </label>
        </div>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label>
          Password
          <input name="password" type="password" className={classes.input} />
        </label>
        <label>
          About
          <textarea name="about" className={classes.input} />
        </label>
        <span className={classes.options}>
          <button type="button" className={classes.cancelButton} onClick={handleCancel}>Cancel</button>
          <button className={classes.updateButton}>Update</button>
        </span>
      </form>
      { updated && <p className={classes.updateMessage}>Details updated!</p>}
    </div>
  );
}
