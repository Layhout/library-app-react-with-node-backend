import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import BooksList from './pages/BooksList';
import Navbar from './components/Navbar';
import VisitorsList from './pages/VisitorsList';
import CardsList from './pages/CardsList';
import Statistics from './pages/Statistics';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <BooksList />
          </Route>
          <Route exact path="/visitors">
            <VisitorsList />
          </Route>
          <Route exact path="/cards">
            <CardsList />
          </Route>
          <Route exact path="/statistics">
            <Statistics />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
