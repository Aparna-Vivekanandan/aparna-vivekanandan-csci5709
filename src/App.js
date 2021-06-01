import './App.css';
import Register from "./Register/Register";
import UserProfile from "./Register/UserProfile"
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/user">
                        <UserProfile />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
export default App;