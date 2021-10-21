import './App.css';
import CardPokemon from './components/CardPokemon.jsx'
import InfoPokemon from './components/InfoPokemon.jsx'
import ListPokemons from './components/ListPokemons.jsx'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>

        <Route exact path='/'>
          <CardPokemon/>
        </Route>  
        
        <Route path='/info-pokemon/:id'>
          <InfoPokemon/>
        </Route>

        <Route path='/list-pokemons'>
          <ListPokemons/>
        </Route>
      </Router>

    </div>
  );
}

export default App;
