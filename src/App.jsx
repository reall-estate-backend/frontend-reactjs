import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import Layout from "./routes/layout/layout";
import SingleOffrePage from "./routes/singleOffrePage/singleOffrePage";
import SingleMyOffrePage from "./routes/singleMyOffrePage/singleMyOffrePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import MyOffresPage from "./routes/MyOffres/MyOffresPage";
import OtherPage from "./routes/Other/OtherPage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import Prediction from "./routes/prediction/Prediction";
import UpdatePostPage from "./routes/updatePostPage/updatePostPage";
import Home from "./routes/Home/home.jsx";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/HomePage",
          element:<HomePage/>
        },
        {
          path:"/Offres",
          element:<ListPage/>
        },
        {
          path:"/Myspace",
          element:<MyOffresPage/>
        },
        {
          path:"/Other",
          element:<OtherPage/>
        },
        {
          path:"/:id",
          element:<SingleOffrePage/>
        },
        {
          path:"/MyOffre/:id",
          element:<SingleMyOffrePage/>
        },
        {
          path:"/AddOffre",
          element:<NewPostPage/>
        },
        {
          path:"/UpdateOffre/:id",
          element:<UpdatePostPage/>
        },
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/Updateprofile/:userId",
          element:<ProfileUpdatePage/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/prediction",
          element:<Prediction/>
        }
      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
