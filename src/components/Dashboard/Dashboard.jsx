import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { coinList, transactionsReducer } from "../../features/transactionSlice";
import Content from "../Content/Content";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";

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
      })
      .catch(console.error);

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
      })
      .catch(console.error);

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
