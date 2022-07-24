import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { getRelativePosition } from 'chart.js/helpers';
import style from './Chart.module.css';
import Axios from 'axios';

function formateDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function ChartComponent(props) {
    
    const current = new Date();
    const [data, setData] = useState({c: [], l: []});
    const durationInDays = 14;
    useEffect(() => { 
      Promise.all(Array(durationInDays).fill(0).map((value, index) => Axios.get(`https://api.fastforex.io/historical?api_key=1284ddac3a-54cdfbe3f5-rffe7h&date=${formateDate(new Date(current.getTime() - (1000 * 60 * 60 * 24 * (durationInDays - (index + 1)))))}&from=${props.from}&to=${props.to}`))).then((values) => {
        console.log({
          l: values.map(value => value.data.date),
            c : values.map(value => value.data.results[props.to.toUpperCase()])
      });
        
        setData({
          l: values.map(value => value.data.date),
            c : values.map(value => value.data.results[props.to.toUpperCase()])
      });
      });
    }, []);
    useEffect(() => { 
        const chart = new Chart(document.getElementById('myChart'), {
          type: 'line',
          data: {
            labels: data.l,
            datasets: [{
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: data.c,
            }]
          }
        });
        return () => {
            chart.destroy();
        }
    }, [data]);
    return (
        
        <div className={style.ChartDiv}>
          <canvas id="myChart" ></canvas>
        </div>
    )
}