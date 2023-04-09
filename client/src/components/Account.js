import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { UserContext } from './UserProvider';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import keys from './keys'; 
import  { reactLocalStorage } from 'reactjs-localstorage';

const { WEB_BASE_URL, API_UPDATE_USER, API_DELETE_USER } = keys;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    padding               : '50px 50px 75px 50px',             
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    color                 : 'white',
    backgroundColor       : '#03376e'
  }
};
Modal.setAppElement('#root');

const Account = () => {

    const {
      register,
      handleSubmit,
      reset,
      formState: {
        errors,
      },
    } = useForm();

    const { info, updateInfo } = useContext( UserContext ); 

    const { userid, name, email } = info; 

    const [modalIsOpen, setModalIsOpen] = useState(false);

  const onSubmitForm = ( data ) => {

    const pskey = reactLocalStorage.get('UserInfoKey')
    const psjwt = pskey; 

    const UPDATE_URL = `${WEB_BASE_URL}${API_UPDATE_USER}${userid}`;
    
    let config = {
      headers: {
        authorization: 'Bearer ' + psjwt 
      }
    }
    
    axios.put( UPDATE_URL,
    {
      name: data.name,
      email: data.email,
      psjwt: psjwt 
    }, config )

    .then (response => {

          console.log( response.data )
          
          const { success } = response.data; 
          const { _id, name, email } = response.data.data;
          
          const newmem = { 
            userid: _id,
            name: name,
            email: email
          }

          updateInfo( newmem )

          reactLocalStorage.setObject('UserInfo', newmem ); 

          if ( success === true ) {
            toast.success(`Update success: ${ name } with email ${ email} `, {
                    position: 'bottom-right',
                    duration: 1000
            });
          }
  
          reset();

        setTimeout( () => window.location.assign('/bookings'), 3000 )

    } )
    .catch (err => {
        console.log( 'User update failed >', err.message );
        toast.warning(`Updated failed: ${err.message }. Please logout / login again.`, {
          position: 'bottom-right',
          duration: 1000
        });
    })
      
  }

  const onDelete = () => {

      const localcheck = reactLocalStorage.get('UserInfoKey');
      const psjwt = localcheck; 

      let config = {
        headers: {
          authorization: 'Bearer ' + psjwt 
        }
      }

      const DELETE_URL = `${WEB_BASE_URL}${API_DELETE_USER}${userid}`;

      axios.delete( DELETE_URL, config)
      
      .then (response => {

            console.log( 'Account deleted' )

            const { success } = response.data; 
            const { name, email } = response.data.data;
      
            if ( success === true ) {
              toast.success(`Account deleted: ${ name } with email ${ email }`, {
                      position: 'bottom-right',
                      duration: 1000
              });
            }
    
          reset();

          const initmem = { 
            userid: null,
            name: null,
            email: null
          }
         
        reactLocalStorage.remove('UserInfo');
        reactLocalStorage.remove('UserInfoKey'); 

        updateInfo( initmem );
        
        setTimeout( () => window.location.assign('/'), 4000 )
         
      } )
      .catch (err => {
        console.log( 'Account deletion failed >', err.message );
        toast.warning(`Account deletion failed: ${err.message }. Please logout / login again.`, {
          position: 'bottom-right',
          duration: 1000
        });
      })

    }

    return (

      <div className="page-container">
          <div className="content-center">

            <div className="section-text-title">
              <h1>Account</h1>
            </div>

            <div className="para fade-in-fast">
                <form className="form" onSubmit={ handleSubmit( onSubmitForm ) } >
                  <div className='form-control account-form'>
                
                    <label htmlFor='name'>Name</label>
                    <input className="form-input"
                      type='text'
                      {...register('name', {required:true})}
                      id='name'
                      defaultValue={name} />
                    { errors.name ? <span className='err'> Name is required </span> : null } 
                    
                    <label htmlFor='email'>Email</label>
                    <input className="form-input"
                      type='email'
                      {...register('email', {required:true})}
                      id='email'
                      defaultValue={email} />
                    { errors.email ? <span className='err'> Email is required </span> : null } 

                    <div className='btngroup'>
                    <button type='submit' className='form-button'>Update</button>
                    <button type='button' onClick={ () => { setModalIsOpen( true ) } } className='form-button'>Delete</button>
                    </div>

                  </div>
                </form>
            </div>

            <Modal isOpen= { modalIsOpen } style={ customStyles }
             onRequestClose= { () => setModalIsOpen(false)} >
      
              <div className="fade-in-first">
                
                <h1 id="modal-title"> The Singapore</h1>
                <p>Are you sure you want to delete your account?</p>
                <p>Click 'Delete' to confirm or 'Cancel' to return to your account.</p>
                
                <div className='btngroup'>
                  <button className='form-button' onClick= { () => { 
                    onDelete();
                    setModalIsOpen(false); 
                  } } >Delete</button>
                  <button className='form-button' onClick= { () => setModalIsOpen(false) }>Cancel</button>
                </div>
              </div>
            
            </Modal>

          </div>
      </div>

    );
}

export default Account
