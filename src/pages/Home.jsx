import React from "react";
import axios from 'axios';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });

	React.useEffect(() => {
		setIsLoading(true);
		axios.get(`https://6405c88aeed195a99f8c8869.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=asc`).then((res) => {
			setItems(res.data);
			setIsLoading(false);
		});
		window.scrollTo(0, 0);
	}, [categoryId, sortType]);

	console.log(items)

	return (
		<>
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
				<Sort value={sortType} onClickSort={(id) => setSortType(id)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</>
	)
};

export default Home;