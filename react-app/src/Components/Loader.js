import React, { useState, useEffect } from 'react';

import { useFetch } from '../useFetch';
function Loader() {
    const {loaded} = useFetch()
    return (  
 <>
 <div className="loadCon">
	<span className="loader"></span>
</div> 
</>
    )
}

export default Loader;