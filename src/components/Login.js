import { React, useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { MAIN_BACKGROUND, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [issignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data here
    const isValid = checkValidData(email.current.value, password.current.value);
    setErrorMessage(isValid);

    if (isValid) {
      return;
    }

    if (!issignInForm) {
      // we create a user...
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCrential) => {
          const user = userCrential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + " -- " + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " -- " + errorMessage);
        });
    } else {
      // we sign in...
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCrential) => {
          const user = userCrential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " -- " + errorMessage);
        });
    }

    // Sign In / Sing up here if form is valid
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!issignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={MAIN_BACKGROUND}
          alt="Netlfix Background Img"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        action=""
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {issignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!issignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-600"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email & Phone Number"
          className="p-4 my-4 w-full bg-gray-600"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-600"
        />
        <p className="text-red-500 font-bold text-lg py-2 ">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {issignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {issignInForm
            ? "New to Netflix? Sign Up Now "
            : "Already registered? Sing In Now..."}
        </p>
      </form>
    </div>
  );
};

export default Login;
