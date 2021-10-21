import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

const ListPokemons = props => {

  const [pokemons, setPokemons] = useState([])
  const [urlImg, setUrlImg] = useState([])

  const getPokemons = async() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(response => response.results)
      .then(response => {
        response.forEach((pokemon, index) => getUrlImg(index+1))
        setPokemons(response);
      })
  }
  
  const getUrlImg = async(id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(response => response.json())
      .then(response => response.sprites.other)
      .then(response => {
        setUrlImg(urlImg => {return [...urlImg, response.dream_world.front_default]})
      })
  }
  
  useEffect(() => {
    getPokemons()
  },[])

  return (
    <div>
      <h1>You're looking at the 20 most important pokemons</h1>
      {pokemons.map((pokemon, index) => {   
        return (  
          <div className="card" style={{width: '18rem'}}>
            <img src={urlImg[index]} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title" style={{textTransform: 'capitalize'}}>{pokemon.name}</h5>
              <Link to={`/info-pokemon/${index}`} className='btn btn-success'>Select</Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListPokemons
