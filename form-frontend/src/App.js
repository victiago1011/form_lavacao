import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import FormUsuario from './components/form-usuario.component';

function App() {
  return (
    <Router>
      <Route path="/" component={FormUsuario}/>
    </Router>
    
  );
}

export default App;
