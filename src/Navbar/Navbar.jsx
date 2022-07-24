import React from 'react'
import style from './Navbar.module.css';
import logo from '../images/logo.jpg';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
// import Body from '../Body/Body';

export default function Navbar(props) {
    //console.log( props);
    var From = props.from;
    var To = props.to;
    return (
        <div className={style.Navbar}>
            <img src={logo} className={style.Logo} />

            <div className=' w-100 d-flex justify-content-end align-items-center pt-3'>
                <ul className='d-flex justify-content-around w-25 list-unstyled h-100 '>
                    <li className={style.NavbarBtn}> <NavLink className={style.NavbarLink} to={'/Details'}>{From}-{To} Details</NavLink></li>
                    <li className={style.NavbarBtn}><NavLink className={style.NavbarLink} to={'/Details'}>{From}-{To} Details</NavLink></li>
                </ul>
            </div>

        </div>
    )
}
