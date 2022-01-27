import { combineReducers } from "redux";
import {moviesReducer, selectedMovieReducer} from './moviesreducer'


export const rootReducer = combineReducers({
    movies: moviesReducer,
    selectedMovie: selectedMovieReducer,
})