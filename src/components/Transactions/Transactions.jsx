import CoinList from "../CoinList/CoinList";
import Button from "../Button/Button";
import "./Transactions.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTransaction } from "../../features/transactionSlice";
import { Orbit } from "@uiball/loaders";

const Transactions = () => {
  document.title = "Operar | Cryptex";
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const ammount = useRef(null);
  const operationType = useRef(null);
  const selectedCoin = useSelector((state) => state.transaction.coin);
  const transactionList = useSelector((state) => state.transaction.transactions);
  const apiKey = localStorage.getItem("key");
  const userId = localStorage.getItem("id");

  const processTransaction = () => {
    if (selectedCoin?.id && ammount.current.value && ammount.current.value > 0) {
      setIsLoading(true);
      fetch(`https://crypto.develotion.com/transacciones.php`, {
        method: "POST",
        headers: {
          apikey: apiKey,
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({
          idUsuario: userId,
          tipoOperacion: operationType.current.value,
          moneda: selectedCoin.id,
          cantidad: Math.round(ammount.current.value),
          valorActual: selectedCoin.value,
        }),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.codigo === 200) {
            toast.success("¡Transacción realizada con éxito!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              toastId: 1,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            if (transactionList.length !== 0) {
              dispatch(
                addTransaction({
                  idUsuario: userId,
                  tipoOperacion: operationType.current.value,
                  moneda: selectedCoin.id,
                  cantidad: Math.round(ammount.current.value),
                  valorActual: selectedCoin.value,
                })
              );
            }
            ammount.current.value = "";
            setIsLoading(false);
          } else {
            toast.error("¡Oh no! Algo salió mal. Inténtelo de nuevo más tarde.", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } else {
      toast.warn("Asegúrese de rellenar todos los datos antes de ejecutar la transacción.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        toastId: 5,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <section className="transactions-section">
      <div>
        <div className="operation-type">
          {/* TODO: change this select for two buttons */}
          <label htmlFor="opType">Tipo de operación:</label>
          <select id="opType" ref={operationType}>
            <option defaultValue={1} value={1}>
              Compra
            </option>
            <option defaultValue={2} value={2}>
              Venta
            </option>
          </select>
        </div>
        <div className="coin-selection">
          <input type="number" placeholder="0" ref={ammount} />
          <CoinList />
        </div>
        {selectedCoin?.id ? (
          <div className="coin-value">
            <h3>Cotización:</h3>
            <p>
              1 {selectedCoin.name} = {selectedCoin.value}{" "}
              {selectedCoin.value > 1 ? "pesos uruguayos" : "peso uruguayo"}
            </p>
          </div>
        ) : (
          <></>
        )}
        <Button
          children="Realizar transacción"
          type="primary"
          onClick={processTransaction}
          disabled={isLoading}
        />
        {isLoading ? (
          <div className="loader">
            <Orbit size={30} speed={1.5} color="#5d81c8" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Transactions;
