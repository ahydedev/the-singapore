import React, { useState, useContext } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BookingContext } from './BookingProvider';
import { useForm } from "react-hook-form";
import keys from './keys';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './UserProvider'
import  { reactLocalStorage } from 'reactjs-localstorage';
import moment from 'moment';


const { WEB_BASE_URL, API_ADD_BOOKING } = keys; 

toast.configure(); 

const InputBooking = () => {

    const { info } = useContext( UserContext ); 
    const { userid } = info; 
  
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {
          errors
        },
    } = useForm({
      defaultValues: {
        dateFrom: '',
        dateTo: '',
        roomType: '',
        noRooms: '',
        noPersons: ''
      }
    });

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const onChange = (dates) => {

      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      setValue('dateFrom', start);
      setValue('dateTo', end);
    }

    const [roomType, setRoomType] = useState(null);
    const [roomSelected, setRoomSelected] = useState(false);
    const [noRoomsSelected, setNoRoomsSelected] = useState(false);
    const [maxGuests, setMaxGuests] = useState([]);
    const [noPersonsSelected, setNoPersonsSelected] = useState(false);

    const logRoomType = (e) => {
      setRoomType(e.target.value);
      setRoomSelected(true);
    }

    const printMaxGuests = (e) => {

      let norooms = e.target.value;
      setNoRoomsSelected(true);

      let singleCapacity = Array.from({length: norooms}, (x, i) => i + 1);                            
      let doubleCapacity = Array.from({length: norooms}, (x, i) => i + (norooms * 1) + 1);                         
      let familyCapacity = Array.from({length: norooms}, (x, i) => i + (norooms * 2) + 1);             
      let jrsuiteCapacity = Array.from({length: norooms}, (x, i) => i + (norooms * 3) + 1);             
      let suiteCapacity = Array.from({length: norooms}, (x, i) => i + (norooms * 4) + 1);

      let totalCapacity = singleCapacity.concat(doubleCapacity); 
      if (roomType === 'Deluxe Family Room') { totalCapacity = totalCapacity.concat(familyCapacity) }
      if (roomType === 'Junior Suite') { totalCapacity = totalCapacity.concat(familyCapacity).concat(jrsuiteCapacity) }
      if (roomType === 'Singapore Suite') { totalCapacity = totalCapacity.concat(familyCapacity).concat(jrsuiteCapacity).concat(suiteCapacity) }
      
      setMaxGuests(totalCapacity);
    }

    const { makeBooking } = useContext( BookingContext );
    
    const newBooking = ( data ) => {

        let arrDate = moment(startDate).toISOString(true);
        let depDate = moment(endDate).toISOString(true);
        arrDate = arrDate.split('T')[0]
        depDate = depDate.split('T')[0]
        let time = 'T12:00:00.000Z'
        arrDate = arrDate += time;
        depDate = depDate += time;

        console.log( data );

        const pskey = reactLocalStorage.get('UserInfoKey')
        const psjwt = pskey;

        const NEW_BOOKING_URL = `${ WEB_BASE_URL }${API_ADD_BOOKING}`

        let config = {
          headers: {
            authorization: 'Bearer ' + psjwt 
          }
        }
        
        axios.post( NEW_BOOKING_URL, 
        {
          dateFrom: arrDate,
          dateTo: depDate,
          roomType: data.roomType,
          noRooms: data.noRooms,
          noPersons: data.noPersons,
          userid: userid,
          psjwt: psjwt 
        }, config )

        .then (response => {
  
            console.log(response.data);

            const { _id, datefrom, dateto, norooms, nopersons, roomtype, user } = response.data.data;

            const newBook = {
              _id: _id,
              datefrom: datefrom,
              dateto: dateto,
              roomtype: roomtype,
              norooms: norooms,
              nopersons: nopersons,
              user: user
            }

            makeBooking( newBook )

            reset();    
                      
            toast.success(   `Success: Add Booking `, {
              position: 'bottom-right',
              duration: 1000
            });       
      
        } )
        .catch (err => {

          console.error( 'Add booking error >', err );
    
          toast.warning('Add booking failed. Please retry or contact customer support.', {
            position: 'bottom-right',
            duration: 1000
          })
        })
          
    }

    return (

        <div>

            <form className="form form-inline" onSubmit={ handleSubmit( newBooking ) } > 
                
                <div id="booking-form" className='form-control' >

                  <div className="inline-sm">

                    <label>Dates</label>
                    <div className="date-picker booking-input">
                      <DatePicker
                            utcOffset={0} 
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            minDate={new Date()}
                            placeholderText="MM/DD/YYYY - MM/DD/YYYY"
                      />
                    </div>

                    <input className="form-input inline booking-input" type='hidden' {...register('dateFrom', { required: true })} />
                    { errors.dateFrom ? <span className='err'>Please enter arrival date &nbsp; </span> : null }
                    
                    <input className="form-input inline booking-input" type='hidden' {...register('dateTo', { required: true })} />
                    { errors.dateTo ? <span className='err'>Please enter departure date &nbsp; </span> : null }

                    <label>Room type</label>
                    <select className={`form-input inline booking-input ${ roomSelected ? 'selected' : null } `} {...register('roomType', { required: true } )} onChange={ logRoomType } id='roomType'>
                        <option className="option-disabled" value="" disabled>Select room type</option>
                        <option value='Superior Double'>Superior Double</option>
                        <option value='Superior Twin'>Superior Twin</option>
                        <option value='Deluxe Double'>Deluxe Double</option>
                        <option value='Deluxe Twin'>Deluxe Twin</option>
                        <option value='Deluxe Family Room'>Deluxe Family Room</option>
                        <option value='Junior Suite'>Junior Suite</option>
                        <option value='Singapore Suite'>Singapore Suite</option>
                    </select>
                    { errors.roomType ? <span className='err'>Please select a room type &nbsp; </span> : null }

                    <br className="booking-form-line-br" />

                    <label id="no-rooms-label">Rooms</label>
                    <select className={`form-input inline booking-input ${ noRoomsSelected ? 'selected' : null } `} {...register('noRooms', { required: true } )} onChange={ printMaxGuests } id='noRooms'>
                        <option className="option-disabled"  value="" disabled>*</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                    </select>
                    { errors.noRooms ? <span className='err'>Please select number of rooms &nbsp; </span> : null }

                    <br className="booking-form-line-br-vsmall" />

                    <label id="no-guests-label">Guests</label>
                    <select className={`form-input inline booking-input ${ noPersonsSelected ? 'selected' : null } `} {...register('noPersons', { required: true } )} onChange={ () => setNoPersonsSelected(true) } id='noPersons'>
                      <option className="option-disabled" value="" disabled>*</option>
                      
                      {maxGuests.map(( number ) => (
                          <option key={number} value={number}>{ number }</option>
                      ))}
                    
                    </select>
                    { errors.noPersons ? <span className='err'>Please select number of guests &nbsp; </span> : null }

                  </div> 

                  <button type='submit' id="book-btn" className='btn form-button inline'>Book Now</button>

                </div>

            </form>

        </div>
    )
}

export default InputBooking;
