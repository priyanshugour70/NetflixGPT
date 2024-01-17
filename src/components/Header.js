import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleGptSearchClick = () => {
    // Toggle GPT Search button when clicked
    dispatch(toggleGptSearchView());
  };

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44 " src={LOGO} alt="IMG NETFLIX" />

      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="py-2  px-4 mx-4 my-2 bg-gray-600 hover:bg-gray-900 text-white rounded"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2  px-4 mx-4 my-2 bg-purple-400 hover:bg-purple-700  rounded"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="w-8 h-8 my-3 rounded-lg "
            src={user?.photoURL}
            alt="user-logo"
          />
          <p className="text-white my-2 mt-4 mx-4">{user?.displayName}</p>
          <button
            className="bg-dark-300 hover:bg-dark-600 text-white py-2 px-4 rounded  "
            onClick={handleSingOut}
          >
            {" "}
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
