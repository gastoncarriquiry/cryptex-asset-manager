import { useEffect, useState } from "react";
import { transactionsReducer } from "../../features/transactionSlice";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./History.css";
import { Orbit } from "@uiball/loaders";

const History = () => {
  document.title = "Historial | Cryptex";
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("id");
  const apiKey = localStorage.getItem("key");
  const transactionList = useSelector((state) => state.transaction.transactions);
  const coinList = useSelector((state) => state.transaction.coinList);

  useEffect(() => {
    if (transactionList.length === 0) {
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
            if (coinList.length > 1) {
              setTransactions(
                r.transacciones.map((transaction) => {
                  let coinName;
                  coinList.forEach((coin) => {
                    if (coin.id === transaction.moneda) return (coinName = coin.nombre);
                  });
                  return { ...transaction, moneda: coinName };
                })
              );
            } else {
              fetch(`https://crypto.develotion.com/monedas.php`, {
                method: "GET",
                headers: {
                  apikey: apiKey,
                  "Content-Type": "application/json",
                },
                redirect: "follow",
              })
                .then((res) => res.json())
                .then((res) => {
                  setTransactions(
                    r.transacciones.map((transaction) => {
                      let coinName;
                      res.monedas.forEach((coin) => {
                        if (coin.id === transaction.moneda) return (coinName = coin.nombre);
                      });
                      return { ...transaction, moneda: coinName };
                    })
                  );
                });
            }
            let transactions = r.transacciones.slice();
            dispatch(transactionsReducer(transactions));
          } else {
            toast.error(
              "¡Oh no! No pudimos recuperar sus transacciones. Inténtelo de nuevo más tarde.",
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
    } else {
      if (coinList.length > 1) {
        setTransactions(
          transactionList.map((transaction) => {
            let coinName;
            coinList.forEach((coin) => {
              if (coin.id === transaction.moneda) return (coinName = coin.nombre);
            });
            return { ...transaction, moneda: coinName };
          })
        );
      } else {
        fetch(`https://crypto.develotion.com/monedas.php`, {
          method: "GET",
          headers: {
            apikey: apiKey,
            "Content-Type": "application/json",
          },
          redirect: "follow",
        })
          .then((res) => res.json())
          .then((res) => {
            setTransactions(
              transactionList.map((transaction) => {
                let coinName;
                res.monedas.forEach((coin) => {
                  if (coin.id === transaction.moneda) return (coinName = coin.nombre);
                });
                return { ...transaction, moneda: coinName };
              })
            );
          });
      }
    }
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
