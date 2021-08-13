import { BrowserRouter, Route, Switch } from "react-router-dom"
import BooksList from './pages/BooksList';
import Navbar from './components/Navbar';
import VisitorsList from './pages/VisitorsList';
import CardsList from './pages/CardsList';
import Statistics from './pages/Statistics';
import BookDetails from './pages/BookDetails';
import Footer from "./components/Footer";
import BookContextProvider from "./contexts/BookContext";
import VisitorContextProvider from "./contexts/VisitorContext";
import CardContextProvider from "./contexts/CardContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <BookContextProvider>
              <BooksList />
            </BookContextProvider>
          </Route>
          <Route path="/visitors">
            <VisitorContextProvider>
              <VisitorsList />
            </VisitorContextProvider>
          </Route>
          <Route path="/cards">
            <CardContextProvider>
              <CardsList />
            </CardContextProvider>
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/books/:id">
            <BookContextProvider>
              <BookDetails />
            </BookContextProvider>
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
