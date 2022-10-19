import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./GraphCoin.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphCoin = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(undefined);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const coinList = useSelector((state) => state.transaction.coinList);
  const transactions = useSelector((state) => state.transaction.transactions);

  useEffect(() => {
    setCoins(coinList);
  }, []);

  const handleChange = (e) => {
    setSelectedCoin({ name: e.target.selectedOptions[0].innerText, id: e.target.value });
    let filteredTransactions = transactions.filter(
      (transaction) => transaction.moneda == e.target.value
    );
    setData(filteredTransactions.map((transaction) => transaction.valorActual));
    setLabels(filteredTransactions.map((transaction) => transaction.id));
  };

  return (
    <section className="graph-coins">
      <div>
        <h1>Gráfica por moneda</h1>
        <p>
          En esta gráfica podrá ver la cotización de la moneda seleccionada al momento de cada una
          de las transacciones realizadas.
        </p>
        <br />
        <p>
          El eje vertical representa las cotizaciones de la moneda para cada transacción. El eje
          horizontal contiene la referencia de cada transacción.
        </p>
      </div>
      <div>
        <label htmlFor="coin-select"></label>
        <select id="coin-select" onChange={handleChange}>
          <option defaultValue="" value="" disabled selected>
            --Seleccione una moneda--
          </option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.nombre}
            </option>
          ))}
        </select>
      </div>
      {selectedCoin ? (
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `Cotización por transacción para ${selectedCoin.name}`,
              },
            },
          }}
          data={{
            labels: labels,
            datasets: [
              {
                label: selectedCoin.name,
                data: data,
                borderColor: "#5d81c8",
                backgroundColor: "#5d81c8",
              },
            ],
          }}
        />
      ) : (
        <></>
      )}
    </section>
  );
};

export default GraphCoin;
