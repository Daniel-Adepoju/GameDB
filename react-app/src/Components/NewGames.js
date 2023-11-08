import React, {
  useState,
  useEffect
  ,useRef,
  useCallback
} from 'react'
import { useFetch } from '../useFetch'
import Card from './Card'
import Loader from './Loader'
import SearchComponent from './SearchComponent'

const date = new Date()
const currentYear = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const currentMonth =
  month < 10 ? `0${month}` : month
const currentDay =
  day < 10 ? `0${day}` : day
  const key =
  '4e52d5704d8d4c5eab34ba05fe121eb7'

function Trending() {
  const [page,setPage] = useState(1)
  const [genre,setGenre] = useState('')
  const url = `https://api.rawg.io/api/games?key=${key}&page=${page.toString()}&page_size=20&exclude_additions=true&dates=${currentYear}-01-01,${currentYear}-${currentMonth}-${currentDay}&ordering=-released,-rating`
  const {data, setData,error,loaded} = useFetch(url)

   const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 >=
       document.documentElement.scrollHeight) {
        setPage(prev => prev + 1)
       }
   }

   useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll) 
   },[])

  const displayGames =
       <div>
        <SearchComponent />
          <h3 className='title firstHead'>
            {currentYear} Games
          </h3>
          <div className="featured">
   {  data?.map(
    (game) => {
      return(
        <Card
          key={game.id}
          {...game}
        />)
    }
  )}
          </div>
  </div>

  return (
    <>
     {displayGames}
     {!loaded && <Loader />}
    </>
  )
}

export default Trending
