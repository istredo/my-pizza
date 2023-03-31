import React from "react";
import axios from 'axios';



import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

function Home({ searchValue }) {

	const [items, setItems] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1)
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });



	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';


		axios.get(`https://6405c88aeed195a99f8c8869.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=asc${search}`).then((res) => {
			setItems(res.data);
			setIsLoading(false);
		});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	// console.log(searchValue)

	return (
		<>
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
				<Sort value={sortType} onClickSort={(id) => setSortType(id)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? skeleton
					: pizzas}
			</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</>
	)
};

export default Home;


// items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

// .filter((obj) => {
// 	// фильтрация пицц
// 	if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
// 		return true;
// 	}

// 	return false;
// })