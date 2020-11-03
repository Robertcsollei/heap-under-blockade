import * as React from 'react'
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Home  from './components/Pages/Home'
import User from './components/Pages/User/User'
import Category from './components/Pages/Category'
import Question from './components/Pages/Question'
import NewPost from './components/Pages/NewPost/NewPost'

import Nav from './components/Shared/Nav/Nav'

function App() {
  
  window.document.title = "Heap Under Blockade"
  return (
    <Router>
      <Nav/>

      <Switch>
        {/* Routes */}
        <div className="container content">
          <Route path="/" exact component={Home} />
          <Route path="/Profile/:user_id" component={User} />
          <Route path="/questions/:question_id" component={Question}/>
          <Route path="/category/:category_id" component={Category}/>
          <Route path="/newpost" component={NewPost}/>
          
       </div>
      </Switch>
      
    </Router>
  );
}

export default App;