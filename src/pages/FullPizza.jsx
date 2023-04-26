import React from 'react';
import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';


const FullPizza = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [pizza, setPizza] = React.useState();


	React.useEffect(() => {
		async function getPizza() {
			try {
				const { data } = await axios.get('https://6405c88aeed195a99f8c8869.mockapi.io/items/' + id);
				setPizza(data);
			} catch (error) {
				alert('ошибка получения пиццы');
				navigate('/');
			}
		}
		getPizza();
	}, []);

	if (!pizza) {
		return 'Загрузка'
	}
	return (
		<div className="full-pizza">
			<h2 className="full-pizza__title">{pizza.title}</h2>
			<img className="full-pizza__image" src={pizza.imageUrl} alt='pizza img' />
			<h3 className="full-pizza__description">Описание пиццы: <p>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Текстами родного домах, текст текстов всеми коварных семь великий языком то злых парадигматическая lorem которой заглавных повстречался за, лучше пустился?</p></h3>
			<h4 className="full-pizza__price">Стоимость: <p>от <span>{pizza.price} </span> ₽ </p></h4>

		</div>
	)
}

export default FullPizza
