import React from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Cards from '../Cards/Cards';
import ChartComponent from '../Chart/Chart';
//import Chart from '../Chart/Chart';
import HeaderDetails from '../HeaderDetails/HeaderDetails';
import HeaderHome from '../HeaderHome/HeaderHome';
import Navbar from './Navbar';

export default function Routing(props) {
  //console.log(props.from);
  let From = props.from ;
  return (
    <div>
      {/* <Navbar  />  */}
            <Routes >
                <Route path="/" exact element={ <HeaderHome />} />
                
                <Route path="/home" element={<HeaderHome />} />
                <Route path="/Details" element={<HeaderDetails from={From} />} />
                {/* <Route path="/Detailss" exact element={ <ChartComponent from={From} to={props.to} /> } /> */}
                
            </Routes>
            

    </div>
  )
}

