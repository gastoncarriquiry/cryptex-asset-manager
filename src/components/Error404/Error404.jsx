import { Link } from "react-router-dom";
import { logo } from "../../utils/utils";
import Button from "../Button/Button";
import "./Error404.css";

const Error404 = () => {
  return (
    <section className="error404">
      <div>
        <img src={logo} alt="Cryptex Logo" />
        <h1>Error 404</h1>
        <h2>Página no encontrada</h2>
        <Link to="/dashboard">
          <Button children="Ir al inicio" type="primary" />
        </Link>
      </div>
    </section>
  );
};

export default Error404;
