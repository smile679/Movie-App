import './App.css';
import hero from './images/hero.png';
import Search from './components/Search';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { getTrendingMovies, updateSearchCount } from './appWrite';
import Reveal from './components/Reveal';

const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";
    const API_OPTIONS = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
      }
    }

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState();

  useDebounce(()=>(setDebouncedSearchTerm(searchTerm)), 500, [searchTerm])

  const fetchData =async (query='')=>{
    setIsLoading(true);
    setErrorMessage("");
    try{
        const endPoint = query ? `${BASE_URL}/search/movie?query=${query}`:
       `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const response = await fetch(endPoint,API_OPTIONS);
        if(!response.ok){
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
          
        if(data.response === "false"){
          setErrorMessage(data.Error || "Failed to fetch movies");
          setMovieList([])
          return;
        }
        setMovieList(data.results || []);

        if(query && data.results.length > 0){
          await updateSearchCount(query, data.results[0]);
        };
    } 
    catch(error){
       console.error(`error fetching movies ${error}`);
       setErrorMessage("error fetching data");
    }
    finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async (query = '') => {
        try {
           const movies = await getTrendingMovies();
           setTrendingMovies(movies);
        }catch(error){
          console.error(`error fetching trending movies: ${error}`)
        }
  }
  useEffect(()=>{
     fetchData(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(()=>{
    loadTrendingMovies();
  }, []);

  return (
       <main>
        <div className='pattern'/>
        <Reveal>
          <header className='wrapper'>
          <img src={hero} alt="image" />
          <h1>Find <span>Movies</span> you will enjoy with out hasel</h1>
           <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        </Reveal>

        <section className='trending'>
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

         <section className='all-movies'>
           <h2>All Movies</h2>
          {isLoading ? (<Spinner/>) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : 
          (<ul>
            {movieList.map((movie)=>(
               <MovieCard key={movie.key} movie={movie}/>
            ))}
            </ul>
          )}
         </section>
       </main>
  )
}

export default App