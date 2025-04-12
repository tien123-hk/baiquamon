import React from "react";
import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx'
const App=()=>{


  const [count, setCount] = useState(0);
    return(
      
      <div className="app">

        <RouterProvider router={router} /> 
       
    </div>
    )
}


    export default App;
