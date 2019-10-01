import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Exchanger() {
    let [currencyTypes, setCurrencyTypes] = useState()
    let [fromCurrency, setFromCurrency] = useState()
    let [toCurrency, setToCurrency] = useState()
    let [amount, setAmount] = useState(1)
    let [result, setResult] = useState(1)
    
    const url = 'http://localhost:4000/'
    useEffect(() => {
        axios.get(url + 'currencies')
            .then(res => {
                setCurrencyTypes(res.data.currencyTypes)
                setFromCurrency(res.data.currencyTypes[0].code)
                setToCurrency(res.data.currencyTypes[0].code)
            })
            .catch(err => console.log(err))
    }, [])

    function amountChangeHandler(a) {
        setAmount(a)
    }

    function fromCurrencyChangeHandler(f) {
        setFromCurrency(f)
    }

    function toCurrencyChangeHandler(t) {
        setToCurrency(t)
    }

    function change() {
        if (isNaN(parseInt(amount))) {
            setResult('Указана некорректная сумма')
        } else {
            axios.get(url, {
                params: {
                    from: fromCurrency,
                    to: toCurrency,
                    amount: amount
                }
            })
            .then(res => setResult(res.data.result))
        }
    }

    return(
        <form>
            <div className="row">
                <div className="form-group col-md-4 pt-4">
                <label htmlFor="amount">Сумма</label>
                    <input id="amount" type="text" onChange={e => amountChangeHandler(e.target.value)} className="form-control" placeholder="1" />
                </div>
                
                <div className="form-group col-md-4 pt-4">
                <label htmlFor="fromCurrency">Валюта</label>
                <select id="fromCurrency" className="form-control" onChange={e => fromCurrencyChangeHandler(e.target.value)}>
                    { currencyTypes !== undefined ? currencyTypes.map((type, index) => {
                        return <option value={type.code} key={index}>{type.name}</option>
                    }) 
                    : null
                    }
                </select>
                </div>

                <div className="form-group col-md-4 pt-4">
                <label htmlFor="toCurrency">Валюта</label>
                <select id="toCurrency" className="form-control" onChange={e => toCurrencyChangeHandler(e.target.value)}>
                    { currencyTypes !== undefined ? currencyTypes.map((type, index) => {
                        return <option value={type.code} key={index}>{type.name}</option>
                    }) 
                    : null
                    }
                </select>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-md-2 pt-4">
                    <button type="button" className="btn btn-primary" onClick={change}>Рассчитать</button>
                </div>
            </div>

            <div className="row">
                <div className="form-group col-md-6 pt-4">
                    <label htmlFor="exchangeResult">Результат</label>
                    <input type="text" className="form-control" id="exchangeResult" value={result} readOnly />
                </div>
            </div>
        </form>
    )
}

export default Exchanger