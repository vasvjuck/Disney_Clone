import React, { useState } from 'react';
import { ForkRight, ShoppingCartRounded } from '@mui/icons-material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { MoviesActionTypes } from '../actions/moviesActions';


const Header = () => {
    const [input, setInput] = useState();
    const dispatch = useDispatch()

    const handlerOnSubmit = async (e) => {
        e.preventDefault()
        if (input) {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bd46237aff2b1ecf6383b42e29457ae8&query=${input}`);

            dispatch({ type: MoviesActionTypes.FETCH_MOVIES, payload: response.data.results })
        }
        setInput('');
    }

    const handlerOnChange = (e) => {
        setInput(e.target.value);

        console.log(input)
    }

    return (
        <Nav>
            <Link to="/"><Logo src="/images/logo.svg" /></Link>
            <NavMenu>
                <Link to="/">
                    <img src="/images/home-icon.svg" />
                    <span>HOME</span>
                </Link>
                <a>
                    <img src="/images/search-icon.svg" />
                    <span>Search</span>
                </a>
                <a>
                    <img src="/images/watchlist-icon.svg" />
                    <span>Watchlist</span>
                </a>
                <a>
                    <img src="/images/original-icon.svg" />
                    <span>Originals</span>
                </a>
                <a>
                    <img src="/images/movie-icon.svg" />
                    <span>Movies</span>
                </a>
                <a>
                    <img src="/images/series-icon.svg" />
                    <span>Series</span>
                </a>
            </NavMenu>
            <SearchBar>
                <form onSubmit={handlerOnSubmit}>
                    <input
                        type="text"
                        placeholder='Search...'
                        value={input}
                        onChange={handlerOnChange}
                    />
                </form>
            </SearchBar>

            <Link to="/login"><UserImg src="/images/user.png" /></Link>
        </Nav>
    )
}

export default Header;

const Nav = styled.nav`
    position: relative;
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`


const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex:1;
    margin-left: 25px;
    align-items: center;
    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        text-transform: uppercase;
        cursor: pointer;
        color: white;
        text-decoration: none;
        img { 
            height: 20px;
        }
        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            &:after{
                content: '';
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover{
            span:after{
                transform: scale(1);
                opacity: 1;
            }
        }
    }
`
const UserImg = styled.img`
    cursor: pointer;
    width:48px;
    height:48px;
    border-radius: 50%;
`
const SearchBar = styled.div`
    form{
        border: 2px solid #22254b;
        font-family: inherit;
        font-size: 1.2rem;
        border-radius: 50px;
        background-color: #fff;
        color: #fff;
        padding: 0.5rem 2rem;
        margin-right: 85px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input{
        border: none;
        &:focus{
            outline: none;
        }
    }
`