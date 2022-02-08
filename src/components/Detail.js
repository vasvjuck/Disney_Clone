import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MoviesActionTypes } from '../actions/moviesActions'
const APIKEY = 'bd46237aff2b1ecf6383b42e29457ae8';
const imgSrc = "https://image.tmdb.org/t/p/w1280";


const Detail = () => {
    const movieDetail = useSelector((state) => state.selectedMovie.selectedMovie)
    const { movieId } = useParams()

    const dispatch = useDispatch()

    const fetchingData = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}`)

        dispatch({ type: MoviesActionTypes.SELECTED_MOVIES, payload: response.data })
    }

    useEffect(() => {
        if (movieId && movieId != "") fetchingData()
        return dispatch({ type: MoviesActionTypes.REMOVE_MOVIE, payload: {} })
    }, [])

    console.log(movieDetail)
    return (
        <Container>
            <MainContent>
                <ImageTitle>
                    <img src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/D7AEE1F05D10FC37C873176AAA26F777FC1B71E7A6563F36C6B1B497CAB1CEC2/scale?width=1440&aspectRatio=1.78' />
                </ImageTitle>
                <Controls>
                    <PlayButton>
                        <img src='/images/play-icon-black.png' />
                        <span>PLAY</span>
                    </PlayButton>
                    <TrailerButton>
                        <img src='/images/play-icon-white.png' />
                        <span>Trailer</span>
                    </TrailerButton>
                    <AddButton>
                        <span>+</span>
                    </AddButton>
                    <GroupWatchButton>
                        <img src="/images/group-icon.png" />
                    </GroupWatchButton>
                </Controls>
                <SubTitle>
                    <h2>{movieDetail.title}</h2>
                    {movieDetail.release_date} | {movieDetail.runtime}m | {
                        movieDetail.genres && movieDetail.genres.map((data) => (
                            data.name + ' | '
                        ))
                    }</SubTitle>
                <Description>
                    {movieDetail.overview}
                </Description>
            </MainContent>
            <ImgContainer>
                <Background>
                    <img src={`${imgSrc}/${movieDetail.poster_path}`} />
                </Background>
            </ImgContainer>
        </Container>
    )
}

export default Detail;

const Container = styled.div`
    position: relative;
    min-height: calc(100vh- 70px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    align-items: center;
    justify-content: space-between
`
const MainContent = styled.div``
const ImgContainer = styled.div``

const Background = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.8;
    width: 600px;
    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
`

const ImageTitle = styled.div`
    height: 30vh;
    min-height: 170px;
    width: 35vw;
    min-width: 200px;
    margin-top: 60px;

    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`

const Controls = styled.div`
    display: flex;
    align-items: center;
`

const PlayButton = styled.button`
    padding: 0px 24px;
    margin-right: 22px;
    border-radius: 4px;
    font-size: 15px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    height: 56px;
    background-color: rgb(249,249,249);
    border: 0;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover{
        background-color: rgb(198,198,198);
    }
`
const TrailerButton = styled(PlayButton)`
    background-color: rgb(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
    text-transform: uppercase;
    &:hover{

    }
`
const AddButton = styled.button`
    margin-right: 16px;
    width: 44px;
    height: 44px;
    display:flex;
    align-items:center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid white;
    background: rgba(0, 0, 0, 0.6);
    cursor: pointer;

    span{
        font-size: 30px;
        color: white;
    }

`
const GroupWatchButton = styled(AddButton)`
    background: rgb(0, 0, 0);
`
const SubTitle = styled.div`
    color: rgb(249,249,249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`
const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    max-width: 760px;
    color: rgb(249,249,249);
`