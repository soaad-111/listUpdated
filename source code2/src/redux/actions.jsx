import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./types";

// ADD NEW TO-DO
export const add = (data) => {
	return {
		type: ADD_TODO,
		payload: data,
	};
};

// DELETE TO-DO
export const deleteTodo = (id) => {
	return {
		type: DELETE_TODO,
		payload: id,
	};
};

// UPDATE TO-DO
export const updateTodo = (id) => {
	return {
		type: UPDATE_TODO,
		payload: id,
	};
};
