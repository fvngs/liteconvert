import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDropdown from './CustomDropdown';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchRates = async () => {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      setRates(response.data.rates);
    };
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates) {
      const rate = rates[toCurrency];
      setResult(amount * rate);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div className="currency-converter">
      <div className="converter-box">
        <div className="converter-row">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <CustomDropdown
            options={Object.keys(rates)}
            selected={fromCurrency}
            onSelect={setFromCurrency}
          />
        </div>
        <div className="arrow">&#8595;</div>
        <div className="converter-row">
          <input
            type="number"
            value={result.toFixed(2)}
            readOnly
          />
          <CustomDropdown
            options={Object.keys(rates)}
            selected={toCurrency}
            onSelect={setToCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;