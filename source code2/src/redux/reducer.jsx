import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./types.jsx";

const initialState = {
  allList: [],
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        allList: [...state.allList, action.payload],
      };
    case UPDATE_TODO:
      const addData2 = state.allList.filter((arrayElement, index) => {
        return arrayElement.id === action.payload.id;
      });
      const gettingIndex = state.allList
        .map((prev) => prev.id)
        .indexOf(addData2[0].id);
      console.log();
      return {
        ...state,
        allList: state.allList.map((content, i) =>
          i === gettingIndex ? (content = action.payload) : content
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        allList: state.allList.filter((arrayElement, index) => {
          return arrayElement.id !== action.payload;
        }),
      };
    default:
      return state;
  }
};
