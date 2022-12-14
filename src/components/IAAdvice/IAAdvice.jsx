import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cryptexBot } from "../../utils/utils";
import Button from "../Button/Button";
import "./IAAdvice.css";

const IAAdvice = () => {
  document.title = "Cryptex Bot | Cryptex";
  const navigate = useNavigate();
  const hasVisitedBot = localStorage.getItem("hasVisitedBot");

  useEffect(() => {
    if (hasVisitedBot) navigate("operations", { relative: true });
  }, [hasVisitedBot]);

  const handleClick = () => {
    localStorage.setItem("hasVisitedBot", true);
  };

  return (
    <section className="ia-advice">
      <div className="speech">
        <h1>¡Hola!</h1>
        <p>
          Mi nombre es
          <strong>
            <em> Cryptex Bot</em>
          </strong>
          . Soy la <strong>inteligencia artificial</strong> diseñada por Cryptex para ayudar a los
          usuarios como tú a <em>alcanzar sus objetivos</em>.
        </p>
        <p>
          Mi función es <em>aconsejarte con los mejores movimientos</em> según tus últimas
          operaciones. Por ejemplo: si compras una moneda y sube considerablemente de precio, te
          aconsejaré vender tus activos.
        </p>
        <h2>¡A las órdenes!</h2>
        <Link to="operations" className="button">
          <Button children="Probar Cryptex Bot" type="primary" onClick={handleClick} />
        </Link>
      </div>
      <img className="cryptex-bot" src={cryptexBot} alt="" />
    </section>
  );
};

export default IAAdvice;
