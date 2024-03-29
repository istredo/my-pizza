import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	items: [],
	totalPrice: 0,
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItems(state, action) {
			const findItems = state.items.find(obj => obj.id === action.payload.id);

			if (findItems) {
				findItems.count++;
			} else {
				state.items.push({
					...action.payload, count: 1.
				})
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return (obj.price * obj.count) + sum;
			}, 0)
		},
		minusItems(state, action) {
			const findItems = state.items.find((obj) => obj.id === action.payload)
			if (findItems && findItems.count > 0) {
				findItems.count--;
			}
		},
		removeItems(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems(state, action) {
			state.items = [];
			state.totalPrice = 0;
		},

	},
})

// Action creators are generated for each case reducer function
export const { addItems, minusItems, removeItems, clearItems, } = cartSlice.actions

export default cartSlice.reducer