import React, { useEffect, useState } from "react";//define useEffect and useState on bottom
import "./App.css";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadMore from "./components/LoadMore"
import { Nav, Navbar, Button, Form, FormControl, NavDropdown, Carousel, ButtonToolbar, ButtonGroup } from 'react-bootstrap'

const apiKey = process.env.REACT_APP_APIKEY;
function App() {
  const [genres, setGenres] = useState(null) //list thi phai co "s" vo nua
  const [movieList, setMovieList] = useState(null);
  const [page, setPage] = useState(1)


  const getNowPlayingMovie = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
    let data = await fetch(url);
    let result = await data.json(); //combo take API
    setMovieList(result.results); //don't understand
    console.log("movies", result);
  };

  const getGenreList = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    let data = await fetch(url);
    let result = await data.json();
    getNowPlayingMovie()
    setGenres(result.genres)

    console.log("genre", result);
  };

  useEffect(() => { // Similar to componentDidMount and componentDidUpdate:
    getGenreList();
    getNowPlayingMovie();
  }, []);
  let searchContents = ''
  let loadmore = () => {

    setPage(page + 1)
    getNowPlayingMovie()
  }

  if (movieList === null) {
    return <div>loading</div>;
  }
  return (
    <div>

      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="#home">DuyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Genres" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Comedy</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Horror</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Romance</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form inline>
            <FormControl onChange={e => { searchContents = e.target.value; }} type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>



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
          <MovieList list={movieList} genresFromMovieList={genres} />
        </div>
        <div>
         
          <ButtonToolbar aria-label="Toolbar with button groups"  container>
            <ButtonGroup className="mr-2" aria-label="First group">
            <LoadMore loadmore={loadmore} />
              <Button>1</Button> <Button>2</Button> <Button>3</Button> <Button>4</Button>
              <LoadMore loadmore={loadmore} />
            </ButtonGroup>
          </ButtonToolbar>
         
        </div>


      </div>
    </div>
  );
}
// ???
export default App;
