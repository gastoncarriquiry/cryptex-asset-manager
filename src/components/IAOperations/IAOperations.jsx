import { Orbit } from "@uiball/loaders";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTransaction, transactionsReducer } from "../../features/transactionSlice";
import { cryptexBot } from "../../utils/utils";
import Button from "../Button/Button";
import "./IAOperations.css";

const IAOperations = () => {
  const apiKey = localStorage.getItem("key");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const transactionsList = useSelector((state) => state.transaction.transactions);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedCoins, setUpdatedCoins] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://crypto.develotion.com/monedas.php`, {
      method: "GET",
      headers: {
        apikey: apiKey,
        "Content-Type": "application/json",
      },
      redirect: "follow",
    })
      .then((r) => r.json())
      .then((r) => {
        let coins = r.monedas.slice();
        setUpdatedCoins(coins);
        if (transactionsList.length === 0 || fetchTrigger === 0) {
          fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${userId}`, {
            headers: {
              apikey: apiKey,
              "Content-Type": "application/json",
            },
          })
            .then((r) => r.json())
            .then((r) => {
              if (r.codigo === 200) {
                let transactions = r.transacciones.slice();
                setTransactions(transactions);
                dispatch(transactionsReducer(r.transacciones));
              }
            })
            .then(() => compareData(transactions))
            .catch(console.error);
        } else {
          compareData(transactionsList);
        }
      })
      .catch(console.error);
  }, [fetchTrigger]);

  setInterval(() => {
    setFetchTrigger(!fetchTrigger);
  }, 300000);

  const compareData = (transactions) => {
    setIsLoading(false);
    let count = 0;
    let checkedCoins = [];
    let lastTransactions = [];
    for (let i = transactions.length - 1; i >= 0; i--) {
      if (count < 3) {
        if (transactions[i].tipoOperacion === 1) {
          if (!checkedCoins.includes(transactions[i].moneda)) {
            lastTransactions.push(transactions[i]);
            count++;
          }
        }
      } else break;
    }
    setLastTransactions(lastTransactions);
  };

  const processTransaction = (transaction, updatedValue) => {
    setIsLoading(true);
    fetch(`https://crypto.develotion.com/transacciones.php`, {
      method: "POST",
      headers: {
        apikey: apiKey,
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        idUsuario: transaction.id,
        tipoOperacion: 2,
        moneda: transaction.moneda,
        cantidad: transaction.cantidad,
        valorActual: updatedValue,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.codigo === 200) {
          toast.success("??Transacci??n realizada con ??xito!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            toastId: 1,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (transactions.length !== 0) {
            dispatch(
              addTransaction({
                idUsuario: transaction.id,
                tipoOperacion: 2,
                moneda: transaction.moneda,
                cantidad: transaction.cantidad,
                valorActual: updatedValue,
              })
            );
          }
          let removeExecutedTransaction = lastTransactions.filter((t) => t.id !== transaction.id);
          setLastTransactions(removeExecutedTransaction);
          setFetchTrigger(0);
          setIsLoading(false);
        } else {
          toast.error("??Oh no! Algo sali?? mal. Int??ntelo de nuevo m??s tarde.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(console.error);
  };

  return (
    <section className="ia-suggestions-section">
      {isLoading ? (
        <div className="overlay">
          <div className="container">
            <Orbit size={40} speed={1.5} color="#5d81c8" />
          </div>
        </div>
      ) : (
        <></>
      )}
      <h1>Cryptex Bot</h1>
      <div className="suggestions-container">
        {lastTransactions.map((transaction) => {
          let coin = updatedCoins.filter((coin) => coin.id === transaction.moneda);
          let suggestion = coin[0].cotizacion > transaction.valorActual ? "tp" : "sl";
          return (
            <article className="suggestion" key={transaction.id}>
              <h2 className={suggestion}>{suggestion == "tp" ? "Take Profit" : "Stop Loss"}</h2>
              <p>
                Compraste{" "}
                <b>
                  {transaction.cantidad} {coin[0].nombre}{" "}
                </b>
                a <b>${transaction.valorActual}</b> uruguayos. Ahora{" "}
                <b>
                  {transaction.cantidad} {coin[0].nombre}
                </b>{" "}
                equivale a <b>${coin[0].cotizacion}</b> uruguayos.
              </p>
              {suggestion == "tp" ? (
                <h3>
                  Te recomiendo <b>vender</b> para tomar ganancias.
                </h3>
              ) : (
                <h3>
                  Te recomiendo <b>vender</b> para evitar mayores p??rdidas...
                  <span>o</span>
                  ...puedes <b>comprar</b> si inviertes a largo plazo.
                </h3>
              )}

              <div className="buttons">
                {suggestion == "tp" ? (
                  <Button
                    children="Vender Activos"
                    type="primary"
                    onClick={() => processTransaction(transaction, coin[0].cotizacion)}
                  />
                ) : (
                  <>
                    <Button
                      children="Vender Activos"
                      type="primary"
                      onClick={() => processTransaction(transaction, coin[0].cotizacion)}
                    />
                    <Button
                      children="Comprar m??s"
                      type="primary"
                      onClick={() => navigate("/dashboard/transactions")}
                    />
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <img className="cryptex-bot" src={cryptexBot} alt="" />
    </section>
  );
};

export default IAOperations;
