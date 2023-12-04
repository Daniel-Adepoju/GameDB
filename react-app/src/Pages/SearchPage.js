import React, { Suspense} from 'react';
import {getSearchedGame} from '../useFetch';
import { useLoaderData,defer,Await} from 'react-router-dom';
import Card from '../Components/Card';
import Loader from '../Components/Loader';
import { RefVal } from '../Layout';

export function loader({request}) {
 window.scrollTo(0,0)
 const search = new URL(request.url).searchParams.get('result')
 return defer({
    game:getSearchedGame(search)
})
}

function SearchPage() {
  const data = useLoaderData()
  
  const displayGames = (game) => {
      return <div>
          <h3 className='title firstHead'>
           {game.length > 0 ? 'Top Results' : 'No Game Found' }
          </h3>
          <div className="featured">
   {game?.map(
    (item) => {
      return(
        <Card
          ref={RefVal}
          key={item.id}
          {...item}
        />)
    }
  )}
          </div>
  </div>
  }

    return ( 
        <>
        <Suspense fallback={<Loader />}>
            <Await resolve={data.game}>
           {displayGames}
            </Await>
        </Suspense>
        </>
     );
}

export default SearchPage;