import React from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App'

import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

function Home() {

	const dispatch = useDispatch();
	const { categoryId, sort, currentPage } = useSelector(state => state.filter); // сортировка редаксом


	const { searchValue } = React.useContext(SearchContext);

	const [items, setItems] = React.useState([]); // пиццы 
	// const [currentPage, setCurrentPage] = React.useState(1); // пагинация
	const [isLoading, setIsLoading] = React.useState(true); // скелетон


	const onClickCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = number => {
		dispatch(setCurrentPage(number));
	};





	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';


		axios.get(`https://6405c88aeed195a99f8c8869.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=asc${search}`).then((res) => {
			setItems(res.data);
			setIsLoading(false);
		});
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	// console.log(searchValue)

	return (
		<>
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? skeleton
					: pizzas}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	)
};

export default Home;