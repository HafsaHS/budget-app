import Login from "./pages/Login";
import Home from "./pages/Home";
import { UserProvider, useUser } from "./lib/context/user";
import Navbar from "./components/NavBar";

function App() {
  const isLoginPage = window.location.pathname === "/login";
  const user = useUser();

  return (
    <div>
      <Navbar />
      {user.current ? <Home /> : <Login />}
    </div>
  );
}

export default App;
