// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [money, setMoney] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${money}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setConverted(data.rates[to]);
        setIsLoading(false);
      }

      if (from === to) return setConverted(money);

      convert();
    },
    [money, from, to]
  );

  return (
    <div className="parent">
      <h1>Currency Converter</h1>
      <input
        type="text"
        value={money}
        onChange={(e) => setMoney(Number(e.target.value))}
        disabled={isLoading}
      />
      <div className="select">
        <label>From : </label>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div className="select">
        <label>To : </label>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <p>
          {converted} {to}
        </p>
      )}
    </div>
  );
}

function Loader() {
  return <p>Loading...</p>;
}
