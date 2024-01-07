import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  console.log("Redux Store Status : " + user);

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44 "
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="IMG NETFLIX"
      />

      {user && (
        <div className="flex p-2">
          <img
            className="w-10 h-10 rounded-lg "
            src={user?.photoURL}
            alt="user-logo"
          />
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
