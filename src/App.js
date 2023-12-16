import './App.css';
import Home from './pages/Home/Home.component';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Layout from './pages/Layout/Layout.component';
import  Search  from './pages/Search/Search.component';
import JobDetials from './pages/JobDetials/JobDetials.component';
import SkillDetials from './pages/SkillDetials/SkillDetials.component';


const router = createBrowserRouter([
  {path: "/", element: <Layout/>, children:[
    {index:true, path:'/jobs', element:<Home/>},
    {path:'/jobs/search', element:<Search/>},
    {path:'/job/:id', element:<JobDetials/>},
    {path:'/skill/:id', element:<SkillDetials/>}] 
  }
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
