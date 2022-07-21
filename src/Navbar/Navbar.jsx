import React from 'react'
import style from './Navbar.module.css';
import logo from '../images/logo.jpg';
export default function Navbar() {
    return (
        <div className={style.Navbar}>
            <img src={logo} className={style.Logo} />
            <div className='d-flex justify-content-around w-25'>
                <button className={style.NavbarBtn}>EUR-USD Details</button>
                <button className={style.NavbarBtn}>EUR-GBP Details</button>
            </div>

        </div>
    )
}
