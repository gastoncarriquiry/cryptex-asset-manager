import { Orbit } from "@uiball/loaders";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "./GraphSell.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphSell = () => {
  const [coinNames, setCoinNames] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const coins = useSelector((state) => state.transaction.coinList);
  const transactions = useSelector((state) => state.transaction.transactions);

  useEffect(() => {
    setIsLoading(true);
    setCoinNames(coins.map((coin) => coin.nombre));

    let vintereum = 0;
    let pesocoin = 0;
    let monereum = 0;
    let financeUru = 0;
    let mvdCoin = 0;
    let hexagon = 0;
    let guitchain = 0;
    let moneyToken = 0;
    let mdg = 0;

    transactions.forEach((transaction) => {
      let totalAmmount = transaction.valorActual * transaction.cantidad;
      if (transaction.tipoOperacion === 2) {
        switch (transaction.moneda) {
          case 1:
            vintereum += totalAmmount;
            break;
          case 2:
            pesocoin += totalAmmount;
            break;
          case 3:
            monereum += totalAmmount;
            break;
          case 4:
            financeUru += totalAmmount;
            break;
          case 5:
            mvdCoin += totalAmmount;
            break;
          case 6:
            hexagon += totalAmmount;
            break;
          case 7:
            guitchain += totalAmmount;
            break;
          case 8:
            moneyToken += totalAmmount;
            break;
          case 9:
            mdg += totalAmmount;
            break;
          default:
            break;
        }
      }
    });
    setData([
      vintereum,
      pesocoin,
      monereum,
      financeUru,
      mvdCoin,
      hexagon,
      guitchain,
      moneyToken,
      mdg,
    ]);
    setIsLoading(false);
  }, [coins, transactions]);

  return (
    <section className="graph-sell">
      <div>
        <h1>Gráfica de ventas</h1>
        <p>
          En esta gráfica podrá ver el monto obtenido en pesos uruguayos por la venta de activos por
          moneda.
        </p>
      </div>
      {isLoading ? (
        <Orbit size={40} speed={1.5} color="#5d81c8" />
      ) : (
        <Pie
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                display: true,
                text: "Gráfica de Activos Vendidos",
              },
            },
          }}
          data={{
            labels: coinNames,
            datasets: [
              {
                label: "Cantidad invertida por moneda",
                data: data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.7)",
                  "rgba(54, 162, 235, 0.7)",
                  "rgba(255, 206, 86, 0.7)",
                  "rgba(75, 192, 192, 0.7)",
                  "rgba(153, 102, 255, 0.7)",
                  "rgba(255, 159, 64, 0.7)",
                  "rgba(255, 100, 175, 0.7)",
                  "rgba(180, 203, 3, 0.7)",
                  "rgba(200, 200, 255, 0.7)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 100, 175, 1)",
                  "rgba(180, 203, 3, 1)",
                  "rgba(200, 200, 255, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      )}
    </section>
  );
};

export default GraphSell;
