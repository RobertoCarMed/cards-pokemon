import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'


function CardPokemon(props) {
  const [namePokemon, setNamePokemon] = useState('')
  const [descriptionPokemon, setDescriptionPokemon] = useState('')
  const [urlImg, setUrlImg] = useState('')
  const [idPokemon] = useState(Math.floor(Math.random() * (20 - 0) + 0)) 

  const getUrlImg = async(id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(response => response.json())
      .then(response => response.sprites.other)
      .then(response => {
        setUrlImg(response.dream_world.front_default)
        console.log(response)
      })
  }

  const getDescription = async(id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then(response => response.json())
      .then(response => response.flavor_text_entries[10])
      .then(response => {
        setDescriptionPokemon(response.flavor_text)
      })
  }
  
  const getPokemons = async() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(response => response.results)
      .then(response => {
        setNamePokemon(response[idPokemon].name)
        getDescription(idPokemon+1)
        getUrlImg(idPokemon+1)
      })
    }
    
  useEffect(() => {
    getPokemons() 
  },[])
  
  return(
    <div>
      <div>
        <Link to={'/list-pokemons'} className='btn btn-info'>All Pokemons</Link>
      </div>
      <div className="card" style={{width: '18rem'}}>
        <img src={urlImg} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title" style={{textTransform: 'capitalize'}}>{namePokemon}</h5>
          <p className="card-text">{ descriptionPokemon }</p>
          <Link to={`/info-pokemon/${idPokemon}`} className='btn btn-primary'>More information...</Link>
        </div>
      </div>
    </div>
  )
}

export default CardPokemon
