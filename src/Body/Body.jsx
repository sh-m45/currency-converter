import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
//import './App.css';
import style from './Body.module.css';
import Navbar from '../Navbar/Navbar';
import ChartComponent from '../Chart/Chart';
import Routing from '../Navbar/Routing';
import Cards from '../Cards/Cards';
import Joi from 'joi';
import { useLocation } from 'react-router-dom';

export default function Body() {
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);
    const location = useLocation();
    const showCards = location.pathname.indexOf("Details") === -1;
    // Calling the api whenever the dependency changes
    useEffect(() => {
        Axios.get(`https://v6.exchangerate-api.com/v6/c3c4578627e2aaf7398a9629/latest/${from}`)
            .then((res) => {
                setInfo(res.data.conversion_rates);
            })

    }, [from]);

    // Calling the convert function whenever
    // a user switches the currency
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();

    }, [info])

    // Function to convert the currency
    function convert() {
        var rate = info[to];
        setOutput(input * rate);


    }

    // Function to switch between two currency
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }
    
    function ValidationInput(){
        let scheme = Joi.Object({
            amount:Joi.number().required()
        })
    }
    return (

        <div className={style.parent}>

            <Navbar from={from} to={to} />
            <Routing from={from} />
            <div className={style.ConverterPanel}>
                <div className="container" >
                    <div className={style.CurrencyExchanger}>
                        <div className={style.CurrencyInputParent}>
                            <p>Amount</p>
                            <input className={style.CurrencyInput} type="number" name="amount"
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
                        <div className=" w-50 d-flex justify-content-center">
                            <input className={style.displayConvertPrice} value={output.toFixed(2) === 'NaN' ? 'XX.XX' : output.toFixed(2) + " " + to} />
                            {/* <button className={style.moreDetailsBtn}>More Details</button> */}
                        </div>
                    </div>
                </div>
            </div>
            {showCards? (
            <Cards popularData={options} />
            ) : (
            <ChartComponent from={from} to={to} />
            )}

        </div>


    )
}
