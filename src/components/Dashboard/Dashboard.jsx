import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import Header from "../Header/Header";
import Content from "../Content/Content";

const Dashboard = () => {
  const navigate = useNavigate();
  let firstRender = 0;

  useEffect(() => {
    if (firstRender === 0) navigate("/dashboard/home", { replace: true });
    firstRender++;

    let currentUser = localStorage.getItem("id");
    if (currentUser === null) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <Content />
    </>
  );
};

export default Dashboard;
