import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import FlightList from "../pages/FlightList";
import NewFlight from "../pages/NewFlight";

function App() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("http://127.0.0.1:3000/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }else{
        r.json().then((error) => setErrors(error));
      }
    });
  }, []);
  console.log(errors)

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewFlight user={user} />
          </Route>
          <Route path="/">
            <FlightList user={user} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
