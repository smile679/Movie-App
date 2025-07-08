import hero from '../images/hero.png'
import Search from './Search'
import Reveal from "./Reveal";

const Header = ({searchTerm, setSearchTerm})=>{

  return (
    <header className='wrapper'>
      <Reveal>
      <img src={hero} alt="image" />
      <h1>Discover <span className='text-blue-600'>Movies</span> you'll love no stress,
      <span className='text-yellow-500'> just fun</span>.</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Reveal>
    </header>
  )
}

export default Header;