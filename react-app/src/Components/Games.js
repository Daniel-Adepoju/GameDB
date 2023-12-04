import React, {
  useState,
  useEffect,
  useContext
} from 'react'
import { useFetch } from '../useFetch'
import Card from './Card'
import Loader from './Loader'
import SearchComponent from './SearchComponent'
import { generateYears } from '../yearsArray'
import { RefVal } from '../Layout'
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
   
function Games() {
  const [page,setPage] = useState(1)
  const [genre,setGenre] = useState('')
  const [isActive,setIsActive] = useState(false)
  const [yearValue,setYearValue] = useState()
  const [yearConVal,setYearConVal] = useState('Select Year')
  const cardAppearance = useContext(RefVal)
  const url = `https://api.rawg.io/api/games?key=${key}&page=${page.toString()}&page_size=20&exclude_additions=true&dates=${yearValue ? yearValue : currentYear}-01-01,${yearValue ? yearValue : currentYear}-${currentMonth}-${currentDay}&ordering=-released,-updated`
  const {data, setData,error,loaded} = useFetch(url)
  
  useEffect(() => {
    setData([])
     },[yearValue,yearConVal]) 

   const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 >=
       document.documentElement.scrollHeight) {
        setPage(prev => prev + 1)
       } 
   }

   const handleSelect = () => {
    setIsActive(prev => !prev)
   }
   const selectValue = (e) => {
  setPage(1)
  if(e.target.textContent !== currentYear.toString()) {
  setYearValue(e.target.textContent)
  setYearConVal(e.target.textContent)
  }
  if (e.target.textContent === currentYear.toString()
   && Number(yearValue) < Number(currentYear)) {
  setYearValue(currentYear)
  setYearConVal(currentYear)
  }
  handleSelect()
   }

   useEffect(() => {
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll) 
   },[])


  const years = generateYears().map((item,index) => {
    return <li onClick={(e) => selectValue(e)} key={index}>{item}</li>
  })
  const displayGames =
       <div>
        <SearchComponent newRef={cardAppearance}/>
        <div className='yearCon'>
        <div onClick={handleSelect} className="selectYear">
          {yearConVal}
          </div>

          <ul className= {isActive ?'active' :'normal'}>
         {years}
          </ul>
        </div>
          <h3 className='title firstHead'>
            {yearValue || Number(currentYear)} Games
          </h3>
          <div className="featured">
   {  data?.map(
    (game) => {
      return(
        <Card
          newRef={cardAppearance}
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

export default Games
