import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MoviesActionTypes } from '../actions/moviesActions';
const APIKEY = 'bd46237aff2b1ecf6383b42e29457ae8';
const img_300 = "https://image.tmdb.org/t/p/w1280";

const Movies = () => {

    const movies = useSelector((state) => state.movies.moviesData)
    const dispatch = useDispatch()

    const fetchTrending = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}`);

        dispatch({ type: MoviesActionTypes.FETCH_MOVIES, payload: response.data.results })
    }

    useEffect(() => {
        fetchTrending()
    }, [])

    console.log(movies)


    return (
        <Container>
            <h4>Recommended for You</h4>
            <Content>
                {
                    movies && movies.map((data) => (
                        <Link to={`/detail/${data.id}`}>
                            <Wrap >
                                <img src={`${img_300}/${data.poster_path}`} />
                            </Wrap>
                        </Link>
                    ))
                }

            </Content>
        </Container>
    )
}

export default Movies;

const Container = styled.div`
    
`

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`
const Wrap = styled.div`
    cursor:pointer;
    border-radius: 10px;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    
    img{
        width: 300px;
        height: 150px;
        object-fit: cover;
    }
    
    &:hover{
        transform: scale(1.05);
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        border-color: rgba(249, 249, 249, 0.8);
    }
`   