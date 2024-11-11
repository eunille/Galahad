// App.tsx
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welcome to the Gym Management System</h1>
      <Link to="/login">Go to Login</Link> <br />
      <Link to="/dashboard">Go to Dashboard</Link>  <br />
     
    </div>
  );
}

export default App;
