import { MoviesActionTypes } from "../actions/moviesActions"

const moviesState = {
    moviesData: [],
}
const movieState = {
    selectedMovie: [],
}

export const moviesReducer = (state = moviesState, {type, payload}) => {
    switch(type){
        case MoviesActionTypes.FETCH_MOVIES:
            return {...state, moviesData: payload}
        default: 
            return state
    }
};

export const selectedMovieReducer = (state = movieState, {type, payload}) => {
    switch(type){
        case MoviesActionTypes.SELECTED_MOVIES: 
            return{...state, selectedMovie:payload}
        case MoviesActionTypes.REMOVE_MOVIE:
            return{...state, selectedMovie: {}}
        default: 
            return state
    }
}