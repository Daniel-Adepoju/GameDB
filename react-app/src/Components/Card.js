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

    // console.log(props)
    return ( <>
         <div className="cards">
         <div className="cardName">{props.name}</div>
          <NavLink to={`/game_details/${props.slug}`}> 
         {/* <div className={isImgLoaded ? "cardImgCon" : 'cardImgCon loading'}> */}
<img  onLoad={(e) => imgLoading(e)} loading='lazy' className='cardImg' src={props.background_image} />
         {/* </div> */}
          </NavLink>
        </div>
    </>
    );
}

export default Card;