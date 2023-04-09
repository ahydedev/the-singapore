import React, { useState, createContext, useEffect  } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';

let initialInfo = {
    userid: null, 
    name: null,
    email: null
}

const checklocal = reactLocalStorage.getObject( 'UserInfo' );

if ( Object.entries( checklocal ).length > 0  ) {
    initialInfo = { ...checklocal }

}

export const UserContext = createContext( initialInfo ); 

export const UserProvider = ( { children } ) => {

    const [info, setInfo] = useState( initialInfo );

    const updateInfo = ( newInfo ) => {
        setInfo( newInfo  )
    } 

    useEffect(() => {
        updateInfo( initialInfo ); 
        // eslint-disable-next-line
    }, [])

    return (
        <UserContext.Provider  value={ { info, updateInfo } } >
            { children }
        </UserContext.Provider>
    )
}


