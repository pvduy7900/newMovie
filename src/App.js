import React, { useEffect, useState } from "react";//define useEffect and useState on bottom
import "./App.css";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import { Nav, Navbar, Button, Form, FormControl, NavDropdown, Carousel, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import Pagination from "react-js-pagination";
import ReactModal from 'react-modal';
import YouTube from '@u-wave/react-youtube';

const apiKey = process.env.REACT_APP_APIKEY;



function App() {


  const [originalList, setOriginalList] = useState(null)
  const [genres, setGenres] = useState(null) //list thi phai co "s" vo nua
  const [movieList, setMovieList] = useState(null);
  const [page, setPage] = useState(1)
  const [resultsTT, setTotalResults] = useState(0)
  const [youtube, setYoutube] = useState(null);



  let [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }


  let totalResults = 0
  const getNowPlayingMovie = async (pagenum) => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${pagenum}`;
    let data = await fetch(url);
    let result = await data.json(); //combo take API
    console.log("api:", apiKey)
    totalResults = result.total_results
    setTotalResults(totalResults)
    setOriginalList(result.results)
    setMovieList(result.results); //don't understand
    console.log("movies", result);
  };

  const getGenreList = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    let data = await fetch(url);
    let result = await data.json();
    getNowPlayingMovie(page)
    setGenres(result.genres)
    console.log("genre", result);
  };

  const getYoutube = async (id) => {
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
    let data = await fetch(url);
    let result = await data.json();
    console.log("aaaa", result)
    setYoutube(result.results[1].key)
    setModalOpen(true)

  };

  const searchTheKeyword = (searchContents) => {
    console.log("this function is on app:", searchContents)

    if (searchContents === '') {
      setMovieList(originalList)
      return;
    }
    //1. grab the movie List
    let filteredList = movieList.filter(movie => movie.title.toLowerCase().includes(searchContents.toLowerCase()))
    setMovieList(filteredList)
  }

  let handlePageChange = (page) => {
    console.log(`active page is ${page}`);
    setPage(page)
    getNowPlayingMovie(page);
  }

  useEffect(() => { // Similar to componentDidMount and componentDidUpdate:
    getGenreList();
  }, []);

  if (movieList === null) {
    return <div>loading</div>;
  }
  return (
    <div>
      <Navigation searchTheKeywordProps={searchTheKeyword} />

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.4kwallpaperhd.com/wp-content/uploads/2019/04/Thanos-4K-wallpaper-background-3840x2160.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/_anDMGmck-k/maxresdefault.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://vnreview.vn/image/19/33/56/1933566.jpg?t=1556182048103"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>



      <div>
        <div>
          <MovieList list={movieList} genresFromMovieList={genres} openModal={openModal} getYoutube = {getYoutube} />
        </div>

        <div className="textCenter">
          <Pagination className="textCenter" itemClass="page-item"
            linkClass="page-link"
            activePage={page}
            itemsCountPerPage={20}
            totalItemsCount={resultsTT}
            pageRangeDisplayed={5}
            onChange={(p) => handlePageChange(p)}
          />

        </div>

      </div>
      <ReactModal isOpen={modalOpen}>
        <button onClick={() => closeModal()}> Hide Modal </button>
        <YouTube
          video={youtube}
          autoplay
        />
      </ReactModal>

    </div>
  );
}
// ???
export default App;
