import { useState } from "react"
import search from '../images/search.svg'

export default function Search({searchTerm, setSearchTerm}){
   
  return(
      <div className="search">
        <div>
          <img src={search} alt="search"/>
          <input type="text" placeholder="Search through thousands of movies" 
          value={searchTerm} onChange={(e)=>(setSearchTerm(e.target.value))}/>
        </div>
      </div>
  )
}
