import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./GraphBuy.css";
import { coinList } from "../../features/transactionSlice";
import { toast } from "react-toastify";
import { Orbit } from "@uiball/loaders";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphBuy = () => {
  const [coinNames, setCoinNames] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const coins = useSelector((state) => state.transaction.coinList);
  const transactions = useSelector((state) => state.transaction.transactions);
  const apiKey = localStorage.getItem("key");
  const userId = localStorage.getItem("id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (coins.length !== 0) {
      setCoinNames(coins.map((coin) => coin.nombre));
    } else {
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
          dispatch(coinList(coins));
          setCoinNames(r.monedas.map((coin) => coin.nombre));
        });
    }
    let vintereum = 0;
    let pesocoin = 0;
    let monereum = 0;
    let financeUru = 0;
    let mvdCoin = 0;
    let hexagon = 0;
    let guitchain = 0;
    let moneyToken = 0;
    let mdg = 0;
    if (transactions.length !== 0) {
      transactions.forEach((transaction) => {
        let totalAmmount = transaction.valorActual * transaction.cantidad;
        if (transaction.tipoOperacion === 1) {
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
            transactions.forEach((transaction) => {
              let totalAmmount = transaction.valorActual * transaction.cantidad;
              if (transaction.tipoOperacion === 1) {
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
    }
  }, [apiKey, coins, transactions, userId]);

  return (
    <section className="graph-buy">
      <div>
        <h1>Gráfica de compras</h1>
        <p>En esta gráfica podrá ver el monto invertido en pesos uruguayos para cada moneda.</p>
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
                text: "Gráfica de Activos Adquiridos",
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
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
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

export default GraphBuy;
