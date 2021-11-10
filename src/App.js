import {Route,Routes} from 'react-router-dom';
import CreateToken from './components/CreateToken/CreateToken.component';
import Navbar from './components/NavBar/NavBar.component';
import React ,{Component}from 'react';
import './App.css';

class App extends Component
{
  render()
  {
    return (
            <div className="App">
            <Navbar></Navbar>
            <Routes>
                <Route exact path='/' element={<CreateToken/>}></Route>
                <Route exact path='/all_tokens' element={<CreateToken/>}></Route>
                <Route exact path='/your_tokens' element={<CreateToken/>}></Route>
            </Routes>
           </div>
           )
  }
}

export default App;