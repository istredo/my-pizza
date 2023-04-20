import React from "react";
import { useDispatch, useSelector } from 'react-redux';
// import qs from 'qs';
// import { useNavigate } from 'react-router-dom';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App'

import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

function Home() {

	const dispatch = useDispatch();
	// const navigate = useNavigate();

	const { categoryId, sort, currentPage } = useSelector(state => state.filter); // сортировка редаксом
	const { items, status } = useSelector(selectPizzaData);
	const { searchValue } = React.useContext(SearchContext);


	// const [currentPage, setCurrentPage] = React.useState(1); // пагинация
	// const [isLoading, setIsLoading] = React.useState(true); // скелетон
	// const [items, setItems] = React.useState([]); // пиццы 

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = number => {
		dispatch(setCurrentPage(number));
	};


	//-------------Бизнес логика перенесена в pizzaSlice------//
	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sort, searchValue, currentPage]);


	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				sort,
				category,
				search,
				currentPage,
			}),
		);

		window.scrollTo(0, 0);
	};
	//----------------------------------------------------------//


	// React.useEffect(() => {
	// 	const queryString = qs.stringify({
	// 		sortProperty: sort.sortProperty,
	// 		categoryId,
	// 		currentPage,
	// 	});
	// 	navigate(`?${queryString}`)
	// }, [categoryId, sort.sortProperty, searchValue, currentPage]);
	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

	return (
		<>
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={onClickCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{status === 'loading' ? skeleton : pizzas}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	)
};

export default Home;