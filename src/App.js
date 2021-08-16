import { BrowserRouter, Route, Switch } from "react-router-dom"
import BooksList from './pages/BooksList';
import Navbar from './components/Navbar';
import VisitorsList from './pages/VisitorsList';
import CardsList from './pages/CardsList';
import Statistics from './pages/Statistics';
import BookDetails from './pages/BookDetails';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <BooksList />
          </Route>
          <Route path="/visitors">
            <VisitorsList />
          </Route>
          <Route path="/cards">
            <CardsList />
          </Route>
          <Route path="/books/:id">
            <BookDetails />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
