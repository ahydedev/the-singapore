import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Hotel from './components/Hotel';
import Welcome from './components/Welcome';
import Rooms from './components/Rooms';
import Bar from './components/Bar';
import Restaurant from './components/Restaurant'; 
import Bookings from './components/UpcomingBookings';
import AllBookings from './components/AllBookings';
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Logout from './components/Logout';
import { BookingProvider } from './components/BookingProvider';
import { UserProvider } from './components/UserProvider';
import Account from './components/Account';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const App = () => {
  return (
    <>

    <HelmetProvider>
    <div>
    <Helmet>
        <meta charSet="utf-8" />
        <title>The Singapore</title>
        <meta name="description" content="Five star hotel in Marina Bay Singapore" />
        <link rel="icon" type="image/png" href="favicon.png" sizes="16x16" />
    </Helmet>
    
    <Router> 
      
      <UserProvider> 
        <BookingProvider>
      
          <div>
      
            <NavBar />

            <div className='app-container'>
      
              <Switch>
                <Route path='/' exact component={ Home }  />
                <Route path='/home' exact component={ Home }  />
                <Route path='/hotel' component={ Hotel } />
                <Route path='/welcome' exact component={ Welcome } />
                <Route path='/rooms' component={ Rooms } />
                <Route path='/bay-bar' component={ Bar } />
                <Route path='/restaurants' component={ Restaurant } />
                <Route path='/bookings' component={ Bookings } />
                <Route path='/all-bookings' component={ AllBookings } />
                <Route path='/register' component={ Register }  />
                <Route path='/login' component={ Login }  />
                <Route path='/logout' component={ Logout }  />
                <Route path='/account' component={ Account }  />
                <Route path='*' component={ NotFound } />
              </Switch>

            </div>

          </div>

        </BookingProvider>
      </UserProvider>
      
    </Router>

    </div>
    </HelmetProvider>

    </>
  )
}

export default App
