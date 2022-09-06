import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import userAction from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { toast } from 'react-toastify';

export default function GoogleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    let res = await dispatch(
      userAction.userLogin({
        name: userObject.given_name,
        lastName: userObject.family_name,
        email: userObject.email,
        password: userObject.sub,
        from: "google",
        })
    );

    if (res.data.success) {
      navigate("/")
      // toast.success(res.data.message);
    } else {
      // toast.error(res.data.message);
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "535195986777-1ncdqdbj88v8d6ctm8o3nei7a4ip85or.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "medium",
      locale: "en",
    });
  });

  return (
    <div>
      <div id="buttonDiv"></div>
    </div>
  );
}