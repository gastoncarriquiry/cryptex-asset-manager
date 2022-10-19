import { Orbit } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./History.css";

const History = () => {
  document.title = "Historial | Cryptex";
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("id");
  const apiKey = localStorage.getItem("key");
  const transactionList = useSelector((state) => state.transaction.transactions);
  const coinList = useSelector((state) => state.transaction.coinList);

  useEffect(() => {
    setIsLoading(true);
    setTransactions(
      transactionList.map((transaction) => {
        let coinName;
        coinList.forEach((coin) => {
          if (coin.id === transaction.moneda) return (coinName = coin.nombre);
        });
        return { ...transaction, moneda: coinName };
      })
    );
    setIsLoading(false);
  }, [userId, apiKey, coinList, transactionList]);

  return (
    <section className="history-section">
      <h1>Historial de transacciones</h1>
      {isLoading ? (
        <Orbit size={40} speed={1.5} color="#5d81c8" />
      ) : (
        <>
          {transactions.length === 0 ? (
            <div className="empty">
              <h2>Aún no ha realizado ninguna operación.</h2>
              <Link to="/dashboard/transactions">
                <Button children="Ir a Operar" type="primary" />
              </Link>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Ref.</th>
                  <th>Operación</th>
                  <th>Moneda</th>
                  <th>Cotización</th>
                  <th>Unidades</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td className={transaction.tipoOperacion === 1 ? "purchase" : "sale"}>
                      {transaction.tipoOperacion === 1 ? "Compra" : "Venta"}
                    </td>
                    <td>{transaction.moneda}</td>
                    <td>${transaction.valorActual}</td>
                    <td>{transaction.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </section>
  );
};

export default History;
