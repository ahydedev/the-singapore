import React, { useContext } from 'react';
import axios from 'axios'
import { UserContext } from './UserProvider'
import { Link } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm} from 'react-hook-form'; 
import keys from './keys'

const { WEB_BASE_URL, API_LOGIN } = keys; 

toast.configure(); 

const Login = () => {

    const {
      register,
      handleSubmit,
      reset,
      formState: {
        errors,
      },
    } = useForm();

    const {  updateInfo  } = useContext( UserContext ); 

    const onSubmitForm = (data) => {
  
      const LOGIN_URL = `${ WEB_BASE_URL }${API_LOGIN}`
      axios.post( LOGIN_URL, 
      {
        email: data.email,
        password: data.password
      })
      .then (response => {
  
        const { _id, name, email } = response.data.data;
        const { token } = response.data;

        const newmem = { 
            userid: _id,
            name: name,
            email: email
          }

          updateInfo( newmem ); 

          reactLocalStorage.setObject('UserInfo', newmem   )
          reactLocalStorage.set('UserInfoKey', token )
        
          toast.success(   `Success: Login `, {
            position: 'bottom-right',
            duration: 500
  
          });
    
          reset();

          setTimeout( () => window.location.assign('/bookings'), 2000 )
           
      } )
      .catch (err => {
        console.error( 'error in Login >', err);
  
        toast.warning('Login failed. Retry email / pwd.', {
          position: 'bottom-right',
          duration: 1000
        })
      })
  
    }
  
    return (

      <div>
        
        <div className="page-container login">
          <div className="content-center">

            <div className="section-text-title">
              <h1 id="login-title">Log into your account</h1>
            </div>
        
            <div className="para fade-in-fast">
          
              <form className="form" onSubmit= {handleSubmit( onSubmitForm )} >
                <div className='form-control login-form'>
                
                  <label htmlFor='email'>Email</label>
                  <input className="form-input" type='email' {...register('email', {required:true})} id='email' />
                  { errors.email ? <span className='err'>Email is required </span> : null } 
                
                  <label htmlFor='password'>Password</label>
                  <input
                    className="form-input" type='password'
                    {...register('password', {required:true, minLength:6 })}
                    id='password' />
                  { errors.password ? <span className='err'>Password minimum six characters</span> : null}
              
                  <button type='submit' className='btn form-button'>Login</button>

                  <p className="reg-link">New user? &nbsp; 
                    <Link to='/register' >
                      <span><u>Register</u></span>
                    </Link>
                  </p>
                
                </div>

              </form>
          
            </div>

          </div>
        </div>
      </div>

    );
  }
  

export default Login
