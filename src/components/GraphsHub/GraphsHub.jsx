import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./GraphsHub.css";

const GraphsHub = () => {
  return (
    <section className="graph-section">
      <div className="text">
        <h1>Gráficas</h1>
        <p>
          Bienvenido a la sección de gráficas. Aquí podrá obtener gráficas para el total invertido
          en compras y ventas de activos, además de una gráfica con las cotizaciones de cada moneda
          para cada transacción hecha.
        </p>
      </div>
      <div className="buttons">
        <Link to="b">
          <Button children="Compras" type="primary" />
        </Link>
        <Link to="s">
          <Button children="Ventas" type="primary" />
        </Link>
        <Link to="coin">
          <Button children="Por Moneda" type="primary" />
        </Link>
      </div>
    </section>
  );
};

export default GraphsHub;
