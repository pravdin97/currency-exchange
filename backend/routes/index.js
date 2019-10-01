var express = require('express');
var router = express.Router();
const axios = require('axios')

const url = 'http://www.cbr-xml-daily.ru/daily_json.js'

async function getCurrencyRate(err) {
  try {
    const response = await axios.get(url)
    const rate = response.data.Valute
    return rate
  } catch (error) {
    err(new Error('Данные о текущем курсе валют не получены'))    
  }
}

function getCurrencyTypes(rate) {
  if (rate === undefined)
    return
  else {
    let types = Object.keys(rate)
    types.push('RUB')
    return types
  }
}

async function convert(fromCurrency, toCurrency, amount, err) {

  if (fromCurrency === toCurrency)
    return amount

  const rate = await getCurrencyRate()

  const types = getCurrencyTypes(rate)
  if (!types.includes(fromCurrency) || !types.includes(toCurrency)) {
    err(new Error('Некорректная валюта'))
    return
  }

  let rub
  if (fromCurrency === 'RUB')
    rub = 1
  else rub = rate[fromCurrency]['Value'] / rate[fromCurrency]['Nominal']

  let exchangeRate
  if (toCurrency === 'RUB')
    exchangeRate = rub
  else exchangeRate = rate[toCurrency]['Nominal'] / rate[toCurrency]['Value'] * rub
  

  return amount * exchangeRate

}

router.get('/currencies', async (req, res) => {
  const rate = await getCurrencyRate((error) => res.status(500).send(error.message))
  if (rate !== undefined)
    res.json({ currencyTypes: getCurrencyTypes(rate)})
})

/* GET home page. */
router.get('/', async (req, res) => {
  const fromCurrency = req.query.from,
    toCurrency = req.query.to,
    amount = req.query.amount
  const result = await convert(fromCurrency, toCurrency, amount, error => res.status(500).send(error.message))
  if (result !== undefined)
    res.json({result})
});

module.exports = router;
