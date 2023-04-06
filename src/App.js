import React from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';


import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';

export const SearchContext = React.createContext();


function App() {

	const [searchValue, setSearchValue] = React.useState('');
	// console.log(searchValue, 'input change')

	return (
		<div className="wrapper">
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className="content">
					<div className="container">
						<Routes>
							<Route path="" element={<Home />} />
							<Route path="cart" element={<Cart />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;