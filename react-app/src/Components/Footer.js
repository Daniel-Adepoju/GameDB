import React, { useState } from 'react';

function Footer() {
   const date = new Date().getFullYear()
    return ( 
        <footer>
     {date}
        </footer>
     );
}

export default Footer;