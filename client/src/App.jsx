
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import AllPetsView from './components/AllPetsView'
import NewPetForm from './components/NewPetForm'
import EditPetForm from './components/EditPetForm'
import OnePetView from './components/OnePetView'


function App() {



  return (
    <BrowserRouter>
      <div className="App">
        <div className="header">
          <h1 className='title'>Pet Shelter</h1>
          <Link to='/'>Home</Link>
          <span> | </span>
          <Link to='/pets/new'>New</Link>
        </div>

        <Switch>
          <Route exact path='/'>
            <AllPetsView />
          </Route>
          <Route exact path='/pets/new'>
            <NewPetForm />
          </Route>
          <Route exact path='/pets/edit/:id'>
            <EditPetForm />
          </Route>
          <Route exact path='/pets/view/:id'>
            <OnePetView />
          </Route>
        </Switch>
      </div>
    </BrowserRouter >
  );
}

export default App;
