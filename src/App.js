import './App.css';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,  
    },
    {
      path: "/login",
      element: <Login/>,    
    },
  ]);

  return (
    <div className="App"> 
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
