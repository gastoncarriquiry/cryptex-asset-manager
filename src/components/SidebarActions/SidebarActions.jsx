import { IoOptionsSharp } from "react-icons/io5";
import OnOffSwitch from "../OnOffSwitch/OnOffSwitch";
import "./SidebarActions.css";

const SidebarActions = () => {
  return (
    <div className="actions">
      <button>
        Theme
        <OnOffSwitch />
      </button>
      <button>
        Settings
        <IoOptionsSharp />
      </button>
    </div>
  );
};

export default SidebarActions;
