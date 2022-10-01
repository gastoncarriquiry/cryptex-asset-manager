import "./Content.css";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <main className="content-window">
      <Outlet />
    </main>
  );
};

export default Content;
