import React, { useState, useEffect,} from 'react'
import {useFetch} from './useFetch'
import {createBrowserRouter,RouterProvider,createRoutesFromElements,Route} from 'react-router-dom'
import Home, {loader as homeLoader,action as homeAction} from './Pages/Home'
import SearchComponent,{action as searchAction} from './Components/SearchComponent'
import Layout from './Layout'
import About from './Pages/About'
import SearchPage, {loader as searchLoader} from './Pages/SearchPage'
import Details,{loader as detailsLoader} from './Pages/Details'
import Error from './Pages/Error'
import PageNotFound from './Pages/PageNotFound'

function App() {
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}
   errorElement={<Error />}>
  <Route index element={<Home />} loader={homeLoader} action={homeAction}/>
  <Route path='about' element={<About />}/>
  <Route
   path='game_details/:id' element={<Details />}
   loader={detailsLoader}/>
   <Route path='search' element={<SearchPage />} loader={searchLoader} />
   <Route path='*' element={<PageNotFound />}/>
 </Route>
))

  return (
    <>
    <RouterProvider router={router} /> 
    </>
  )
}

export default App
