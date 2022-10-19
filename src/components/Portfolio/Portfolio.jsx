import { useEffect, useState } from "react";

const Portfolio = () => {
  document.title = "Inversiones | Cryptex";
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {}, []);

  return (
    <section className="section-portfolio">
      <h1></h1>
      <h2>{totalInvested}</h2>
      <div>
        <div>
          <h3>Compras</h3>
          <p>{totalPurchase}</p>
        </div>
        <div>
          <h3>Ventas</h3>
          <p>{totalSales}</p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
