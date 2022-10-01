import { Link, NavLink } from "react-router-dom";
import { CgBot, CgChart, CgList, CgSwap, CgTemplate, CgTrending } from "react-icons/cg";
import "./Sidebar.css";
import { logo } from "../../utils/utils";
import SidebarActions from "../SidebarActions/SidebarActions";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard/home" className="app-logo">
        <img src={logo} alt="Cryptex" />
      </Link>
      <nav className="main-nav">
        <NavLink to="home">
          <CgTemplate /> Inicio
        </NavLink>
        <NavLink to="transactions">
          <CgSwap />
          Operar
        </NavLink>
        <NavLink to="history">
          <CgList />
          Historial
        </NavLink>
        <NavLink to="portfolio">
          <CgTrending />
          Inversiones
        </NavLink>
        <NavLink to="bot">
          <CgBot />
          Cryptex Bot
        </NavLink>
        <NavLink to="graphs">
          <CgChart />
          Gráficas
        </NavLink>
      </nav>
      <SidebarActions />
    </div>
  );
};

export default Sidebar;
