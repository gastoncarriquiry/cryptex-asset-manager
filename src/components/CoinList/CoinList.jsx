import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { selectedCoin } from "../../features/transactionSlice";
import "./CoinList.css";

const CoinList = () => {
  const apiKey = localStorage.getItem("key");
  const query = useRef(null);
  const [coins, setCoins] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
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
        setCoins(r.monedas);
      });
  }, [apiKey]);

  const searchResults = () => {
    setSearchQuery(query.current.value);
    let keyword = query.current.value.toLowerCase();
    setFilteredCoins(
      coins.filter((coin) => {
        if (coin.nombre.toLowerCase().includes(keyword)) return coin;
      })
    );
  };

  const selectCoin = ({ id, nombre, cotizacion }) => {
    query.current.value = nombre;
    dispatch(
      selectedCoin({
        name: nombre,
        id,
        value: cotizacion,
      })
    );
  };

  const toggleListbox = () => {
    setTimeout(() => setOpen(!open), 100);
  };

  return (
    <div className="combobox">
      <label>
        <input
          type="text"
          placeholder="Seleccionar moneda..."
          ref={query}
          onKeyUp={searchResults}
          onFocus={toggleListbox}
          onBlur={toggleListbox}
        />
      </label>
      <div className={`listbox ${open ? "open" : "closed"}`}>
        {searchQuery === ""
          ? coins
              .sort((a, b) => a.nombre.localeCompare(b.nombre))
              .map((coin) => (
                <li key={coin.id} onClick={() => selectCoin(coin)} className="coin">
                  <img src={`https://crypto.develotion.com/imgs/${coin.imagen}`} alt="" />
                  <p>{coin.nombre}</p>
                </li>
              ))
          : filteredCoins.map((coin) => (
              <li key={coin.id} onClick={() => selectCoin(coin)} className="coin">
                <img src={`https://crypto.develotion.com/imgs/${coin.imagen}`} alt="" />
                <p>{coin.nombre}</p>
              </li>
            ))}
      </div>
    </div>
  );
};

export default CoinList;
