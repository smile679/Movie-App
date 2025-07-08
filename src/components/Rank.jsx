import { useState, useEffect } from "react";
import { getTrendingMovies } from '../appWrite'
import Reveal from './Reveal'

const Rank =()=>{
  const [trendingMovies, setTrendingMovies] = useState([]);

  const loadTrendingMovies = async (query = '') => {
          try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
          } catch(error){
            console.error(`error fetching trending movies: ${error}`)
          }
    }

    useEffect(()=>{
    loadTrendingMovies();
  }, []);

  return <section className='trending'>
          <ul>
          {trendingMovies.map((movie, index)=>
            <Reveal>
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
              </li>
            </Reveal>
          )} 
          </ul>
        </section>
}


export default Rank;