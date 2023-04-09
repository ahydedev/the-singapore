import React,  { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from './UserProvider';
import menuIcon from "../assets/bars-solid.svg";
import closeIcon from "../assets/xmark-solid.svg";

const NavBar = () => {

    const [open, setOpen] = useState(false);

    const { info } = useContext( UserContext );   
    const { email } = info; 

    useEffect( () => {
        if (!email) {
            setTimeout( () => {  
                setOpen(true)
            }, 11000)
        }
    }, [])
    
    return (
    <>

        <div className={`nav ${email ? 'opaque' : 'animate-in'} `}>

            <div tabindex="0" className="menu-trigger" 
            onClick={ () => { setOpen(!open) } } 
            onKeyUp={ (event) => { if (event.key === "Enter") { setOpen(!open) } }  
            }>
                <img className="menu-icon" src={ open ? closeIcon : menuIcon } alt="Menu icon"></img>
            </div>
            <div className="menu-text" onClick={ () => { window.location.assign('/') } }>
                <p>The Singapore<br />*****</p>
            </div>
            <div className={`dropdown ${open? 'active' : 'inactive'} `} onClick={ () => { setOpen(!open) } }>

            {  email ? ( 

                <ul className="menu-list">
                        <Link to='/hotel'>Hotel</Link>
                        <Link to='/rooms'>Rooms</Link>
                        <Link to='/bay-bar'>Bar</Link>
                        <Link to='/restaurants'>Restaurant</Link>
                        <Link to='/bookings'>Bookings</Link>
                        <Link to='/logout' >Logout</Link>
                        <div id="logged-in-as">
                            <p>Logged in as { email }</p>
                            <Link to='/account' >View Account</Link>
                        </div>
                </ul>

            ) : (
                
                <ul className="menu-list">
                        <Link to='/hotel'>Hotel</Link>
                        <Link to='/rooms'>Rooms</Link>
                        <Link to='/bay-bar'>Bay Bar</Link>
                        <Link to='/restaurants'>Restaurants</Link>
                        <Link to='/bookings'>Bookings</Link>
                        <Link to='/register'>Register</Link>
                        <Link to='/login' >Login</Link>

                </ul>

            ) }

            </div>
        </div>       
    </>
    )
}

export default NavBar;


