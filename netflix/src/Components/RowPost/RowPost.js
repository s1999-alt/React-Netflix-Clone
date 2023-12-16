import React, { useEffect, useState} from 'react'
import './RowPost.css'
import axios from '../../axios'
import {ImageUrl,API_KEY } from '../../Constants/Constants'
import Youtube from 'react-youtube'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [url, setUrl] = useState()
  useEffect(()=>{
      axios.get(props.url).then(responce=>{
        setMovies(responce.data.results)
      })
  },[props.url])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }
  const movieTrailer=(id)=>{
    axios.get(`movie/${id}/videos?api_key=${API_KEY}`).then(responce=>{
      console.log(responce.data)
      if (responce.data.results.lenght !== 0) {
        setUrl(responce.data.results[0])
      }else{
        alert("Nothing Found for This!")
      }
    })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {
        movies.map((movie)=>
          <img onClick={()=>movieTrailer(movie.id)} className={props.isSmall ? 'smallPosters': 'poster' } src={`${ImageUrl + movie.backdrop_path} `} alt="movies" />
        )
        }
      </div>
      {
        url && <Youtube opts={opts} videoId={url.key}/> 
      }
    </div>
  )
}

export default RowPost
