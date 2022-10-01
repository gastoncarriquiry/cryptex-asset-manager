import { CgBell } from "react-icons/cg";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import UserOptions from "../UserOptions/UserOptions";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="secondary-nav">
        <Link to="/dashboard/home">Mercado</Link>
        <Link to="/dashboard/home">Wallet</Link>
        <Link to="/dashboard/home">Ayuda</Link>
      </nav>
      <div className="user-interactions">
        <Button type="secondary" disabled={false}>
          <CgBell />
        </Button>
        <UserOptions />
      </div>
    </header>
  );
};

export default Header;
