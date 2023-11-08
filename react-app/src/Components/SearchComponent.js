 import React, { useState, useEffect } from 'react';
 import {Form,useNavigation} from 'react-router-dom';
 

 
 function SearchComponent() {
  const navigation = useNavigation()
    return (  
        <>
        <Form className='searchForm' method='post' replace>
        <input name='query' placeholder='Search For Games...'/>
        <button disabled={navigation.state === 'submitting'}>
        {navigation.state === 'submitting' ? 'Searching' : 'Search'}
        </button>
        </Form>
        </>
    );
 }
 
 export default SearchComponent;