import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserProvider'
import { reactLocalStorage } from 'reactjs-localstorage'

const Logout = () => {

    const { updateInfo } = useContext( UserContext ); 

    const logoutnow = () => {

        const newmem = { 
            userid: null,
            name: null,
            email: null
        }

        updateInfo( newmem ); 

        reactLocalStorage.remove( 'UserInfo' );
        reactLocalStorage.remove( 'UserInfoKey' );

        setTimeout( () => {
            window.location.assign('/');
        }, 5000);
    }

    useEffect( () => {
        logoutnow()
    }, [])

    return (
            <div className="page-container logout">
            <div className="section-container-content-inner">
                <div className="section-text-title">
                    <h1>You have been successfully logged out</h1>
                </div>
                <div className="para">
                    <p className="redirect">Redirecting you to homepage..</p>
                </div>
            </div>
        </div>
    )
}

export default Logout
