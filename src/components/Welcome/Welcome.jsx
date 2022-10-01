import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logo } from "../../utils/utils";
import "./Welcome.css";

const Welcome = () => {
  let username = useSelector((state) => state.user.username);
  document.title = "Inicio | Cryptex";

  return (
    <section className="welcome">
      <header>
        <img src={logo} alt="Crypex Logo" />
        Cryptex
      </header>
      <h1>👋 ¡Bienvenid@{username ? <b> {username}</b> : ""}!</h1>
      <div className="text">
        <p>
          Cryptex es una plataforma todo-en-uno para que manejes tus cripto activos de preferencia.
          En nuestra aplicación podrás operar con la criptomoneda que quieras, gestionar tu
          portfolio y hasta recibir sugerencias de nuestra Inteligencia Artificial{" "}
          <em>Cryptex Bot</em> para tus próximas transacciones.
        </p>
        <p>
          También podrás acceder a tu información de operaciones digeridas en formas de gráfias en
          la sección de <Link to="/dashboard/graphs">gráficas</Link>.
        </p>
      </div>
      <h2>¡Éxitos!</h2>
    </section>
  );
};

export default Welcome;
