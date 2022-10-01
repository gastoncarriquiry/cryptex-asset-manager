import { useRef, useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { IoOptionsSharp } from "react-icons/io5";
import OnOffSwitch from "../OnOffSwitch/OnOffSwitch";
import "./UserOptions.css";

const UserOptions = () => {
  const [isDeployed, setIsDeployed] = useState(false);
  const handleClick = (e) => {
    if (!dropdown.current.contains(e.target)) setIsDeployed(!isDeployed);
  };
  const dropdown = useRef(null);

  return (
    <div className="user" onClick={handleClick}>
      <img src="" alt="JD" className="profile-img" />
      <h3>John Doe</h3>
      <CgChevronDown />
      <div ref={dropdown} className={`user-dropdown ${isDeployed ? "deployed" : "retracted"}`}>
        <button>
          Theme <OnOffSwitch />
        </button>
        <button>
          Settings <IoOptionsSharp />
        </button>
      </div>
    </div>
  );
};

export default UserOptions;
