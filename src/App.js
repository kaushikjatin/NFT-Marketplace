import {Route,Routes} from 'react-router-dom';
import CreateToken from './components/CreateToken/CreateToken.component';
import React from 'react';
import './App.css';

function App() {
  return (
      <div className="App">
      {/* <Navbar></Navbar> */}
      <Routes>
          <Route exact path='/' element={<CreateToken/>}></Route>
          {/* <Route exact path='/alltokens' component={SignIn}></Route>
          <Route exact path='/mytokens' component={SignUp}></Route> */}
      </Routes>
     </div>
  );
}

export default App;