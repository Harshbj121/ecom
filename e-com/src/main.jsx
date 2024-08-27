import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from './components/Login.jsx';
import Men from './components/Men.jsx';
import Women from './components/Women.jsx';
import Kid from './components/Kid.jsx';
import Cart from './components/Cart.jsx';
import Contact from './components/Contact.jsx';
import Body from './components/Body.jsx';
import Error from './components/Error.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Register from './components/Register.jsx';
import Checkout from './components/Checkout.jsx';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<Error/>,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/login',
        element: <Login />
      },{
        path: '/register',
        element: <Register />
      },
      {
        path: '/menproducts',
        element: <Men />
      },
      {
        path: '/womenproducts',
        element: <Women />
      },
      {
        path: '/kidproducts',
        element: <Kid />
      },
      {
        path: '/mycart',
        element: <Cart />
      }, {
        path: '/contact',
        element: <Contact />
      }, {
        path: '/product/:id',
        element: <ProductDetails />
      },{
        path: '/checkout',
        element: <Checkout />
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter} />
)
