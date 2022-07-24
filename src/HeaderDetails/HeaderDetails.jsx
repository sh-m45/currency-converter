import React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Body from '../Body/Body';
import ChartComponent from '../Chart/Chart';
export default function HeaderDetails(props) {
    //console.log(props.from);
    return (
        <div className="container ">
            <div className='d-flex justify-content-between w-100 pt-3'>
                <h2>{props.from} - European Union Euro</h2>
                <a> <NavLink className= "btn btn-primary" to={'/'}> Back To Home </NavLink></a>
            </div>
           
        </div>
    )
}