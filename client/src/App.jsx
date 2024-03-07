import "./app.css";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import MoviesList from "./pages/movieslist/MoviesList";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login" component={Login} />
        {user && (
          <>
            <Route path="/movies" component={MoviesList}/>
            <Route path="/series">
              <Home type="series" />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;