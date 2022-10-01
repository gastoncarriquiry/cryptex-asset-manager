import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Error404 from "./components/Error404/Error404";
import GraphBuy from "./components/GraphBuy/GraphBuy";
import GraphCoin from "./components/GraphCoin/GraphCoin";
import GraphSell from "./components/GraphSell/GraphSell";
import GraphsHub from "./components/GraphsHub/GraphsHub";
import History from "./components/History/History";
import IAAdvice from "./components/IAAdvice/IAAdvice";
import Login from "./components/Login/Login";
import Portfolio from "./components/Portfolio/Portfolio";
import Register from "./components/Register/Register";
import Transactions from "./components/Transactions/Transactions";
import Welcome from "./components/Welcome/Welcome";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<Navigate to="/login" />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Welcome />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="history" element={<History />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="bot" element={<IAAdvice />} />
            <Route path="graphs" element={<GraphsHub />} />
            <Route path="graphs/b" element={<GraphBuy />} />
            <Route path="graphs/s" element={<GraphSell />} />
            <Route path="graphs/coin" element={<GraphCoin />} />
          </Route>

          <Route path="/error404" element={<Error404 />} />
          <Route path="/*" element={<Navigate to="/error404" />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
