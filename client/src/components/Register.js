import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import keys from './keys'; 
import axios from 'axios';
import { UserContext } from './UserProvider'
import { reactLocalStorage }  from 'reactjs-localstorage'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const  { WEB_BASE_URL, API_ADD_USER } = keys; 

toast.configure(); 


const Register = () => {

        const {
            register,
            handleSubmit,
            reset,
            formState: {
                errors,
            },
        } = useForm();

        const { updateInfo }  = useContext( UserContext )

        const onSubmit = ( data ) => {

        const ADD_URL = WEB_BASE_URL + API_ADD_USER; 

        axios.post( ADD_URL, {     
            name: data.firstname,
            email: data.email, 
            password: data.password
        } )
        .then( response => {

            const { success, token } = response.data;

            console.log( response.data )

            if ( success === false ) {
                console.log( ' Add user failed' );
                toast.warning(`Error: ${data.email} duplicate email`, {
                    position: 'bottom-right',
                    duration: 1000
                    });

                return null; 

            }
            
            const { _id, name, email } = response.data.data; 
                
            const newmem = {
                userid: _id,
                name, email
            }
            
            updateInfo( newmem ); 

            reactLocalStorage.setObject('UserInfo', newmem  )

            reactLocalStorage.set('UserInfoKey', token )

            reset();

            toast.success(   `Success: ${name} ${email} added`, {
            position: 'bottom-right',
            duration: 1000
            });

            setTimeout( () => window.location.assign('/bookings'), 4000 )

        })
        .catch( err => {
            console.log(' Error ', err)
        } )

    }

    return (
        <div>

            <div className="page-container register">
                <div className="content-center">

                    <div className="section-text-title">
                        <h1>Create an account</h1>
                    </div>
        
                    <div className="para fade-in-fast">

                        <form className="form" onSubmit= { handleSubmit( onSubmit ) } > 
                            <div className='form-control register-form' >

                            <label>First name</label>
                            <input className="form-input" type='text' {...register('firstname', { required: true })} />
                            { errors.firstname ? <span className='err'>Name is required</span> : null }
                            <label>Email</label>
                            <input className="form-input" type='email' {...register('email', { required: true })} />
                            { errors.email ? <span className='err'>Email is required</span> : null }
                            <label>Password</label>
                            <input className="form-input" type='password' {...register('password', { required: true, minLength:6 })} />
                            { errors.password ? <span className='err'>Password minimum six characters</span> : null }

                            <button type='submit' className='btn form-button'>Register</button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register

