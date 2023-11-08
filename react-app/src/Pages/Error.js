 import React, { useState } from 'react';
 import { useRouteError } from 'react-router-dom';
 import Footer from '../Components/Footer';
 import Header from '../Components/Header';
 import SearchComponent from '../Components/SearchComponent';
 function Error() {
    const error = useRouteError()
    return ( 
        <>
        <Header />
        <h2 className='title errorHead'>{error.message},Failed</h2>
        <Footer />
        </>
     );
 }
 
 export default Error;