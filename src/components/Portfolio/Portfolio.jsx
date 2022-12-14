import { Orbit } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Portfolio.css";

const Portfolio = () => {
  document.title = "Inversiones | Cryptex";
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("id");
  const apiKey = localStorage.getItem("key");
  const transactionList = useSelector((state) => state.transaction.transactions);

  useEffect(() => {
    setIsLoading(true);
    let totalP = 0;
    let totalS = 0;
    let total = 0;
    transactionList.forEach((transaction) => {
      let totalAmmount = transaction.valorActual * transaction.cantidad;
      if (transaction.tipoOperacion === 1) {
        totalP += totalAmmount;
        total += totalAmmount;
      } else {
        totalS += totalAmmount;
        total -= totalAmmount;
      }
    });
    setTotalInvested(total);
    setTotalPurchase(totalP);
    setTotalSales(totalS);
    setIsLoading(false);
  }, [apiKey, userId, transactionList]);

  return (
    <section className="section-portfolio">
      <h1>Portfolio de inversión</h1>
      {isLoading ? (
        <Orbit size={40} speed={1.5} color="#5d81c8" />
      ) : (
        <>
          <h2 className={totalInvested > 0 ? "positive" : "negative"}>${totalInvested}</h2>
          <small>
            Este monto es el resultado en pesos uruguayos de la suma de todos los importes de compra
            de activos y resta de venta de activos.
          </small>
          <div className="details">
            <div className="purchases">
              <h3>Compras</h3>
              <p>${totalPurchase}</p>
            </div>
            <div className="sales">
              <h3>Ventas</h3>
              <p>${totalSales}</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Portfolio;
