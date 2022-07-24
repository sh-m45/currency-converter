import React from 'react'
import Body from '../Body/Body';
import style from './Cards.module.css';

export default function Cards(props) {
    //console.log(props.popularData);
    return (
        <div className={style.cardsParent}>
            <div className="container">
                <div className="row">
                    {props.popularData.slice(0, 9).map((value) => (
                        <div className={style.flexItem}>
                            <h1>{value}</h1>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}




