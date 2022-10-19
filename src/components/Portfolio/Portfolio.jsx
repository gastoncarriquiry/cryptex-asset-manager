import { Orbit } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
    let totalPurchased = 0;
    let totalSold = 0;
    let total = 0;
    if (transactionList.length !== 0) {
      transactionList.forEach((transaction) => {
        let totalAmmount = transaction.valorActual * transaction.cantidad;
        if (transaction.tipoOperacion === 1) {
          totalPurchased += totalAmmount;
          total += totalAmmount;
        } else {
          totalSold += totalAmmount;
          total -= totalAmmount;
        }
      });
      setTotalInvested(total);
      setTotalPurchase(totalPurchased);
      setTotalSales(totalSold);
    } else {
      setIsLoading(true);
      fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${userId}`, {
        headers: {
          apikey: apiKey,
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.codigo === 200) {
            r.transacciones.forEach((transaction) => {
              let totalAmmount = transaction.valorActual * transaction.cantidad;
              if (transaction.tipoOperacion === 1) {
                totalPurchased += totalAmmount;
                total += totalAmmount;
              } else {
                totalSold += totalAmmount;
                total -= totalAmmount;
              }
              setTotalInvested(total);
              setTotalPurchase(totalPurchased);
              setTotalSales(totalSold);
            });
          } else {
            toast.error(
              "¡Oh no! No pudimos recuperar el monto de sus transacciones. Inténtelo de nuevo más tarde.",
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
        })
        .finally(setIsLoading(false));
    }
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
