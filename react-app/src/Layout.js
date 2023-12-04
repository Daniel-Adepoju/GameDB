import React, {createContext,useCallback,useRef} from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import {Outlet} from 'react-router-dom';

 export const RefVal = createContext()
function Layout() {
const observer = useRef()


  const cardAppearance = useCallback((node) => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('appearing')
    } else {
      entry.target.classList.remove('appearing')
    }
      })
    })
    if(node) return observer.current.observe(node)
    })


    return ( 
        <>
  <Header />
        <RefVal.Provider value={cardAppearance}>
<Outlet />
        </RefVal.Provider>
  <Footer />
  </>
     );
}

export default Layout;