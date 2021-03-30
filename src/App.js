import './App.css';
import {Party} from './Party'
import {People} from './People'
import {Drinks} from './Drinks'
import {Navigation} from './Navigation'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Party Planner
     </h3>    
    
    <Navigation className="justify-content-left"/>
    
    <Switch>
      <Route path="/" component={Party} exact />      
      <Route path="/people" component={People} />
      <Route path="/drinks" component={Drinks}/>      
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
