import React, { useState, useEffect,Suspense} from 'react';
import {useLoaderData, defer,Await,Link } from 'react-router-dom';
import {getGame
  ,getDLC
  ,getScreenshots
  ,getSeries,
  getPlatform,
  getReleaseDate,
getSummary} from '../useFetch';

export async function loader ({params}) {
  const {id} = params
  return  defer({
    game: getGame(id),
    series: getSeries(id),
    dlc:getDLC(id),
    screenShots: getScreenshots(id),
    platforms: getPlatform(id),
    releaseDate: getReleaseDate(id),
    summary: getSummary(id),
  })
}
function Details() {
    const data = useLoaderData()
     const [show,setshow] = useState(false)
     const [shotIndex,setShotIndex] = useState(0)
    

     //Display Game
  const singleGame = (game) => {
     const {id,metacritic,background_image} = game
 return ( 
  <div className='divOne'>
 <div className="gameName">
    {game.name}
   </div>
  <div className="imgCon">
{ metacritic ? <div className="rating">{metacritic}</div> :
<div className="rating">N/A</div>}
 <img alt='img' className="detailImg" src={background_image}/>
      </div>
     </div>
     )
    }

    //Display Platforms
   const platforms = (platform) => {
   return(<>
    <div className="platforms"> 
   {platform?.map((item) => {
     return <span key={item.platform.id}>
            {item.platform.name}
        </span>
               }) }
               </div>
            </>)
              }   
        
    //Display Release Date
   const release = (release) => {
      return  <span className="release">
      Release Date:{release}
          </span> 
      }


      //Display Downloadable Contents
    const dlc = (dlc) => {
   return( <>
   <div>
   {dlc.length > 0 && <h3> DLCS</h3>}
   </div>
   {<section>{dlc?.map((item) => {
    return <div key={item.id} className="dlcItem">
       <span>
    <img loading='lazy' style={{width:'90%',aspectRatio:'1/1'}}
      alt='img' src={item.background_image} />
       </span>
       <Link to={`/game_details/${item.slug}`} className='dlcName'>
       {item.name}
        </Link>
    </div> 
    })} </section>}</>)
  }


  //Display other games in the same series
  const series = (series) => {
    return( <>
    <div>
   {series.length > 0 && <h3> Games In Same Series</h3>}
    </div>
    {<section>{series?.map((item) => {
     return <div key={item.id} className="seriesItem">
        <span>
     <img loading='lazy' style={{width:'90%',aspectRatio:'1/1'}}
       alt='img' src={item.background_image} />
        </span>
        <Link to={`/game_details/${item.slug}`} className='seriesName'>
        {item.name}
         </Link>
     </div> 
     })} </section>}</>)
   }
 


   //Display Screenshots
      const screenShots = (screenshot) => {
       return (<>
       {screenshot.length > 0 && <div className="screenshots">
{screenshot?.map((item) => {
        return <img
        key={item.id}
        src={item.image}
         alt="img"
          className="screenshotImg" />
      })}
  </div> }
       </>)
    }

    //Display Summary
    const showSummary = (summary) => {
     return(
      <>
      {summary.length > 0 && <div className="summary">
      {summary}
        </div>}
      </>)
    }



      return (
        <>
        <div className='detailsCon'>
          <Suspense fallback={<h2> Loading...</h2>}>
          <Await resolve={data.game}>
          {singleGame}
          </Await>
          </Suspense>

          <div className="about">
    <Suspense fallback={<h2>Loading...</h2>}>
  <Await resolve={data.platforms}>
   {platforms}
  </Await>
    </Suspense>

    <Suspense fallback={<h2>Loading...</h2>}>
  <Await resolve={data.releaseDate}>
   {release}
  </Await>
    </Suspense>
  </div>
    </div>

    <Suspense fallback={<h2 style={{color:'white'}}>Loading...</h2>}>
  <Await resolve={data.summary}>
   {showSummary}
  </Await>
    </Suspense>

    <Suspense fallback={<h2  style={{color:'white'}}>Loading...</h2>}>
  <Await resolve={data.screenShots}>
   {screenShots}
  </Await>
    </Suspense>

        <div className='dlcAndSeriesCon'>
        <div className="dlc">
        <Suspense fallback={<h2> Loading...</h2>}>
        <Await resolve={data.dlc}>
         {dlc}
        </Await>
        </Suspense>
     </div>

     <div className="sameSeries">
        <Suspense fallback={<h2> Loading...</h2>}>
        <Await resolve={data.series}>
       {series.length > 0 ? series : 'No Game Found'}
        </Await>
        </Suspense>
     </div>
        </div>
        </>
      )

 };

export default Details;