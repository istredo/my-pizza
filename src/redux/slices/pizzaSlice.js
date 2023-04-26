import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { category, search, sort, currentPage } = params;
		const { data } = await axios.get(
			`https://6405c88aeed195a99f8c8869.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=asc${search}`,
		);
		return data;
	});

const initialState = {
	items: [],
	status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			console.log('идет отправка');
			state.status = 'loading';
			state.items = [];

		},
		[fetchPizzas.fulfilled]: (state, action) => {
			console.log(action, 'fulfilled');
			state.status = 'success';
			state.items = action.payload;

		},
		[fetchPizzas.rejected]: (state, action) => {
			console.log(action, 'error');
			state.status = 'error';
			state.items = [];

		}
	},
})

// Action creators are generated for each case reducer function
export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer