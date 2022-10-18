import { useRef, useState } from "react";
import { CgChevronDown, CgLogOff } from "react-icons/cg";
import { IoOptionsSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OnOffSwitch from "../OnOffSwitch/OnOffSwitch";
import "./UserOptions.css";

const UserOptions = () => {
  const [isDeployed, setIsDeployed] = useState(false);
  const navigate = useNavigate();
  const dropdown = useRef(null);
  let username = useSelector((state) => state.user.username);
  const handleClick = (e) => {
    if (!dropdown.current.contains(e.target)) setIsDeployed(!isDeployed);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
    toast.info("Sesión cerrada.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="user" onClick={handleClick}>
      <img
        src=""
        alt={username ? username.charAt(0).toUpperCase() : "JD"}
        className="profile-img"
      />
      <h3>{username ? username : "John Doe"}</h3>
      <CgChevronDown />
      <div ref={dropdown} className={`user-dropdown ${isDeployed ? "deployed" : "retracted"}`}>
        <button className="hide-d">
          Theme <OnOffSwitch />
        </button>
        <button className="hide-d">
          Settings <IoOptionsSharp />
        </button>
        <button className="log-out" onClick={logOut}>
          Cerrar sesión <CgLogOff />
        </button>
      </div>
    </div>
  );
};

export default UserOptions;
