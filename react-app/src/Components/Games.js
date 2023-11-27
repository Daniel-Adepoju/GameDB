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
import { generateYears } from '../yearsArray'

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
  const [yearValue,setYearValue] = useState(currentYear)
  const [yearConVal,setYearConVal] = useState('Select Year')
  const observer = useRef()
  const url = `https://api.rawg.io/api/games?key=${key}&page=${page.toString()}&page_size=20&exclude_additions=true&dates=${yearValue}-01-01,${yearValue}-${currentMonth}-${currentDay}&ordering=-released,-updated`
  const {data, setData,error,loaded} = useFetch(url)
   
  useEffect(() => {
    setData([]) 
     },[yearValue]) 

  const cardAppearance = useCallback((node) => {
  if (observer.current) {
    // observer.current.disconnect()
  }
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
  setYearValue(e.target.textContent)
  setYearConVal(e.target.textContent)
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
        <SearchComponent />
        <div className='yearCon'>
        <div onClick={handleSelect} className="selectYear">
          {yearConVal}
          </div>

          <ul className= {isActive ?'active' :'normal'}>
         {years}
          </ul>
        </div>
          <h3 className='title firstHead'>
            {yearValue} Games
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
