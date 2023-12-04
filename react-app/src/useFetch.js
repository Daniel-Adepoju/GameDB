import React, { useState, useEffect,useCallback } from 'react';

const key = '4e52d5704d8d4c5eab34ba05fe121eb7'
const url = `https://api.rawg.io/api/games?key=${key}`

const controller = new AbortController()
export function useFetch(url) {
  const [data, setData] = useState([])
  const [loaded,setLoaded] = useState(false)
  const [error,setError] = useState()
  const getData =  useCallback(async() => {
    try {
      setLoaded(false)
const res = await fetch(url, {signal: controller.signal})
const result = await res.json()
const newArr = await result.results
setData((prev) => {
  return [...new Set([...prev,...newArr])]
})
setError(false)
setLoaded(true)
    } catch(err) {
      // if(controller.abort()) return
      setError(true)
      setLoaded(true)
    }
    },[url]) 
    
    useEffect(() => {
       getData()
      //  return () => controller.abort()
    },[url])

  return {data,loaded, setData,error}
}


export const getGame =  async (id) => {
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${key}`)
  const result = await res.json()
  return result
}


export const getPlatform =  async (id) => {
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${key}`)
  const result = await res.json()
  return result.platforms
}

export const getDLC = async (id) => {
  const dlcURL = `https://api.rawg.io/api/games/${id}/additions?key=${key}`
  const res = await fetch(dlcURL)
  const result = await res.json()
  return result.results
}

export const getSeries = async (id) => {
  const gameSeriesUrl = `https://api.rawg.io/api/games/${id}/game-series?key=${key}`
  const res = await fetch(gameSeriesUrl)
  const result = await res.json()
  return result.results
}


export const getScreenshots = async (id) => {
  const gameScreenShotUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${key}`
  const res = await fetch(gameScreenShotUrl)
  const result = await res.json()
  return result.results
}

export const getSummary =  async (id) => {
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${key}`)
  const result = await res.json()
  return result.description_raw
}


export const getReleaseDate =  async (id) => {
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${key}`)
  const result = await res.json()
  return result.released
}

export const getSearchedGame =  async (search) => {
  const res = await fetch(`https://api.rawg.io/api/games?key=${key}&search=${search}&exclude_additions=true&ordering=-released,-updated`)
  const result = await res.json()
  return result.results
}

