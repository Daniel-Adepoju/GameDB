import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
function Card (props) {
const [isImgLoaded, setIsImgLoaded] = useState(false)
    function imgLoading(e) {
        if (e.target.loading) {
           setIsImgLoaded(false) 
        }
if (e.target.complete) {
setIsImgLoaded(true)
} 
    }

    return ( <>
      {props.background_image && <div ref={props.newRef} className="cards">
         <div className="cardName">{props.name}</div>
          <NavLink to={`/game_details/${props.slug}`}> 
<img  onLoad={(e) => imgLoading(e)} loading='lazy' className='cardImg' src={props.background_image} />
          </NavLink>
        </div>}
    </>
    );
}

export default Card;