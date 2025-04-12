import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Head from "./JSX/Head.jsx";
import Home from "./JSX/Home.jsx";
import Bot from "./JSX/Bot.jsx";
import About from "./JSX/About.jsx";
import Shopdetail from "./JSX/Shopdetail.jsx";
import Contact from "./JSX/Contact.jsx";
import Myacc from "./JSX/Myacc.jsx";
import Gallery from './JSX/Gallerry.jsx'
import Cart from "./JSX/Cart.jsx";
import Wishlist from "./JSX/Wishlist.jsx";
import Content from './Content.jsx'
import SidebarShop from './JSX/Sidebarshop.jsx';
import ShopManagement from './JSX/ShopManagement.jsx';
import Quanlidonhang from './JSX/Quanlidonhang.jsx';
import AccountManagement from './JSX/AccountManagement.jsx';
import Contactmana from './JSX/Contactmana.jsx';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Content/>,
      children:[
        {
          index: true,
          element: <Home/>
        },
        {
          path: "aboutus",
          element: <About/>,
        },
        {
          path: "sidebarshop",
          element: <SidebarShop/>,
        },
        {
            path: "shopdetail/:id?", 
            element: <Shopdetail/>
        },
        {
          path: "contact",
          element: <Contact/>,
        },
        {
          path: "home",
          element: <Home/>,
        },
        {
          path: "myacc",
          element: <Myacc/>,
        },
        {
          path: "gallery",
          element: <Gallery/>,
        },{
          path: "cart",
          element: <Cart/>,
        },
        {
          path: "wishlist",
          element: <Wishlist/>,
         },
         {
          path: "shopmanagement",
          element: <ShopManagement/>,
         },
         {
          path: "quanlidonhang",
          element: <Quanlidonhang/>,
         },
         {
          path: "accountmanagement",
          element: <AccountManagement/>,
         },
         {
          path: "contactmana",
          element: <Contactmana/>,
         }

        // ,
        // {
        //   path: "pre",
        //   element: <Pre/>,
        // },
        // {
        //   path: "binh",
        //   element: <Binh/>,
        // },
        // {
        //   path: "cart",
        //   element: <Cart/>,
        // }
      ]
    },
  
  ]);
  
  export default router;