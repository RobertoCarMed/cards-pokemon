import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router';


const InfoPokemon = props => {

  const {id} = useParams()
  const [nombre, setNombre] = useState('Cargando...')
  const [description, setDescription] = useState('') 
  const [abilities, setAbilities] = useState('')
  const [stats, setStats] = useState('')
  const [urlImg, setUrlImg] = useState('')
  const [hp, setHp] = useState('Cargando..')
  const [attack, setAttack] = useState('Cargando...')
  const [defense, setDefense] = useState('Cargando...')
 
  const getInfoPokemon = async(id) =>{
    id = Number(id) +1
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setAbilities(response.abilities)
        setStats(response.stats)
        setNombre(response.name)
        setUrlImg(response.sprites.other.dream_world.front_default)
        setHp(response.stats[0].base_stat)
        setAttack(response.stats[1].base_stat)
        setDefense(response.stats[2].base_stat)
      })
  }
  
  const getDescriptionPokemon = async(id) =>{
    id = Number(id) +1
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
      .then(response => response.json())
      .then(response => response.flavor_text_entries[10])
      .then(response => {
        setDescription(response.flavor_text)
      })
    
  }

  useEffect(() =>{
    getInfoPokemon(id)
    getDescriptionPokemon(id)
  },[])

  return(
    <div style={{width: '20%'}}>
      <div>
        <img src={urlImg} className="card-img-top" alt="..."/>
        <h2 style={{textTransform: 'capitalize'}}>{nombre}</h2>
      </div>
      
      <div>
        <p>{description}</p>
      </div>
      
      <div>
        <div>
          <h4>hp</h4>
          <span className="label label-primary">{hp}</span>
        </div>
        <div>
          <h4>Attack</h4>
          <span className="label label-primary">{attack}</span>
        </div>
        <div>
          <h4>Defense</h4>
          <span className="label label-primary">{defense}</span>
        </div>
      </div>

      <div>
        <h4>Abilities</h4>
        {
          abilities == '' ? 
            <p>Cargando...</p>
            :
            abilities.map(ability => (<p> {ability.ability.name}</p>))
        }
      </div>
    </div>
  )
}

export default InfoPokemon;
