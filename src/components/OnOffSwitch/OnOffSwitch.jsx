import { useId } from "react";
import "./OnOffSwitch.css";

const OnOffSwitch = () => {
  const onOffSwitch = useId();

  const changeTheme = () => {
    document.getElementById("root").classList.toggle("dark");
  };

  return (
    <div className="onoffswitch">
      <input
        type="checkbox"
        name="onoffswitch"
        className="onoffswitch-checkbox"
        id={onOffSwitch}
        tabIndex="0"
        defaultChecked
        onChange={changeTheme}
      />
      <label className="onoffswitch-label" htmlFor={onOffSwitch}>
        <span className="onoffswitch-inner"></span>
        <span className="onoffswitch-switch"></span>
      </label>
    </div>
  );
};

export default OnOffSwitch;
