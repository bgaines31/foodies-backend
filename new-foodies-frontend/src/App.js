import React, { useState, useEffect } from 'react';
import { api_key } from './api_key';
import './App.css';
import Home from './views/Home/Home';
import { Navigation } from './components/Navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login/Login';
import Register from './views/Login/Register';
import { PersonalRecipeDetails } from './views/Recipe/PersonalRecipeDetails';
import ExternalRecipes from './views/Recipe/ExternalRecipes';
function App() {
  const [recipes, setRecipes] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': api_key,
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  async function fetchItems(){
		try {
			const response = await fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=25&tags=under_30_minutes', options)
			const recipesData = await response.json();
      console.log("results: ",recipesData.results)
			
			setRecipes(recipesData.results);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchItems()
	}, []);
  

  return (
    <>
    <BrowserRouter> 
      <div>
          <Navigation/>
          <Routes>
            <Route path='/' element={<Home recipes={recipes}/>} /> 
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/card' element={<PersonalRecipeDetails recipes={recipes}/>} />
            <Route path='/card' element={<ExternalRecipes recipes={recipes}/>} />
          </Routes>
          {/* <Footer /> */}
         </div>
      </BrowserRouter> 
    </>
  );
}

export default App;
