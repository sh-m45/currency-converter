import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
//import './App.css';
import style from './Body.module.css';

export default function Body() {
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);

    // Calling the api whenever the dependency changes
    useEffect(() => {
        Axios.get(`https://v6.exchangerate-api.com/v6/c3c4578627e2aaf7398a9629/latest/${from}`)
            .then((res) => {
                setInfo(res.data.conversion_rates);
            })
        // console.log('1');
    }, [from]);

    // Calling the convert function whenever
    // a user switches the currency
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
        // console.log('2');
    }, [info])

    // Function to convert the currency
    function convert() {
        var rate = info[to];

        setOutput(input * rate);
        // console.log('3');
    }

    // Function to switch between two currency
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className={style.parent}>
            <div className="container">
                <h2>Currency Exchanger</h2>
                <div className={style.CurrencyExchanger}>
                    <div className={style.CurrencyInputParent}>
                        <p>Amount</p>
                        <input className={style.CurrencyInput} type="text"
                            placeholder="Enter the amount"
                            onChange={(e) => setInput(e.target.value)} />
                    </div>
                    <div className={style.FromToBtns}>
                        <div className={style.dropdown}>
                            <p>From</p>
                            <Dropdown className={style.dropbtn} options={options}
                                onChange={(e) => { setFrom(e.value) }}
                                value={from} placeholder="From" />
                        </div>


                        <div className="switch d-flex mb-3 align-items-end">
                            <HiSwitchHorizontal size="40px" 
                                onClick={() => { flip() }} />
                        </div>
                        <div className={style.dropdown}>
                            <p>To</p>
                            <Dropdown options={options}
                                onChange={(e) => { setTo(e.value) }}
                                value={to} placeholder="To" />
                        </div>
                    </div>
                </div>

                <div className=" d-flex justify-content-end w-100 px-5">
                    <div className=" w-50">

                        <button className={style.converterBtn} onClick={() => { convert() }}>Convert</button>


                    </div>
                </div>

                <div className=' d-flex justify-content-between px-3 py-4' >
                    <div className="w-50">
                        <input className={style.priceConvertInput} value={output.toFixed(2) === 'NaN' ? 'XX.XX' : input + " " + from + " = " + output.toFixed(2) + " " + to} />
                    </div>
                    <div className=" w-50 d-flex justify-content-between">
                        <input className={style.displayConvertPrice} value={output.toFixed(2) === 'NaN' ? 'XX.XX' : output.toFixed(2) + " " + to} />
                        <button className={style.moreDetailsBtn}>More Details</button>
                    </div>
                </div>
            </div>



        </div>


    )
}
