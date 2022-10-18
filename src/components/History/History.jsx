import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./History.css";

const History = () => {
  document.title = "Historial | Cryptex";
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("id");
  const apiKey = localStorage.getItem("key");
  const coinList = useSelector((state) => state.transaction.coinList);

  useEffect(() => {
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
      });
  }, [userId, apiKey]);

  return (
    <section className="history-section">
      <h1>Historial de transacciones</h1>
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
          {transactions.length === 0 ? (
            <></>
          ) : (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td className={transaction.tipoOperacion === 1 ? "purchase" : "sale"}>
                  {transaction.tipoOperacion === 1 ? "Compra" : "Venta"}
                </td>
                <td>{transaction.moneda}</td>
                <td>${transaction.valorActual}</td>
                <td>{transaction.cantidad}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default History;
