import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './Layout.jsx'
import Checkout from './componenets/Checkout/Checkout.jsx'
import Contact from './componenets/Contact/Contact.jsx'
import User from './componenets/User/User.jsx'
import Products from './componenets/Products/Products.jsx'
import ThankYou from './componenets/Thankyou/Thank-you.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Products />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
      <Route path='/thank-you/:id' element={<ThankYou />} />
    </Route>

))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)




// const router = createBrowserRouter([
//   {
//     path : '/',
//     element :<Layout/>,
//     children : [
//       {
//         path: "",
//         element: <Home/>
//       },
//       {
//         path: "about",
//         element: <About/>
//       },
//       {
//         path: "user/:userid",
//         element: <User />
//       },
//       {
//         path: "contact",
//         element: <Contact/>
//       }
//     ]
//   }
// ])
