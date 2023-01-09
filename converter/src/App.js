import {useEffect, useState} from "react";
import {currencyFetch} from "./helpers/currencyFetch";
import Header from "./components/Header/Header";
import "./main.scss"
import ConverterLine from "./components/ConverterBlock/ConverterLine";


function App() {

  const [currencies, setCurrencies] = useState([])
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [exchangeRate, setExchangeRate] = useState(1)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(2)
  }


  useEffect(() => {
    currencyFetch()
      .then(data => {
        const filteredCurr = data.filter(cur => cur.cc === 'EUR' || cur.cc === 'USD')
        setCurrencies(filteredCurr)
        const optArr = filteredCurr.map(({cc}) => cc)
        setCurrencyOptions(["UAH", ...optArr])

      })
  }, [])

  useEffect(() => {
    const convertRate = calculateConversionRate(fromCurrency, toCurrency)
    setExchangeRate(convertRate)

  }, [fromCurrency, toCurrency])


  function calculateConversionRate(fromCur, toCur) {
    const choosenFromCurrency = currencies.find(cur => cur.cc === fromCur) || {rate: 1};
    const choosenToCurrency = currencies.find(cur => cur.cc === toCur) || {rate: 1};
    const convertRate = choosenFromCurrency.rate / choosenToCurrency.rate
    return convertRate;
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div className="app">
      <Header currencies={currencies}/>
      <div className="converter-block">
        <h2>Конвертація валют</h2>
        <ConverterLine
          amount={fromAmount}
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}

        />
        <div className="equals">=</div>
        <ConverterLine
          amount={toAmount}
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
        />
      </div>

    </div>
  );
}

export default App;
