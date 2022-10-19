import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import Header from "../Header/Header";
import Content from "../Content/Content";
import { useDispatch } from "react-redux";
import { coinList, transactionsReducer } from "../../features/transactionSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiKey = localStorage.getItem("key");
  const userId = localStorage.getItem("id");
  let firstRender = 0;

  useEffect(() => {
    fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${userId}`, {
      headers: {
        apikey: apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.codigo === 200) {
          dispatch(transactionsReducer(r.transacciones));
        }
      });

    fetch(`https://crypto.develotion.com/monedas.php`, {
      method: "GET",
      headers: {
        apikey: apiKey,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    })
      .then((r) => r.json())
      .then((r) => {
        dispatch(coinList(r.monedas));
      });

    if (firstRender === 0) navigate("/dashboard/home", { replace: true });
    firstRender++;

    let currentUser = localStorage.getItem("id");
    if (currentUser === null) {
      navigate("/", { replace: true });
    }
  }, [apiKey, userId]);

  return (
    <>
      <Header />
      <Sidebar />
      <Content />
    </>
  );
};

export default Dashboard;
