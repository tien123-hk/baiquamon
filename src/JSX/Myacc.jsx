import '../CSS/Myacc.css'
import Myaccp from './Myaccp.jsx'
import MyaccData from '../Myaccjs.js';
import Myaccd from './Myaccd.jsx'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Myacc = (prop) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser) {
            navigate('/');
            return;
        }
        setUser(loggedInUser);
    }, [navigate]);

    if (!user) {
        return null;
    }

    return (
        <div  className='Myacc'>
        <div className="all-title-box">
            <div className="container10">
                <div className="row10">
                    <div className="c10">
                        <h2>MY ACCOUNT</h2>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a >SHOP</a>
                            </li>
                            <li className="breadcrumb-itemactive">/ MY ACCOUNT</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
       

        <div  className='acc'>
        {MyaccData.Myac.map((itm, key)=>{
                return( <Myaccp key={itm.key} propssanh={itm.propssanh} propsname={itm.propsname} propsmota={itm.propsmota}></Myaccp>)
              
            })}
        </div>
        <hr/>
        <div  className='acc'>
            {MyaccData.Myac.map((itm,key)=>{
                return( <Myaccd key={itm.key}  propstc={itm.propstc} propst={itm.propst} propstt={itm.propstt} propsttt={itm.propsttt} ></Myaccd>)
              
            })}
        </div>
        </div>)
}
export default Myacc;