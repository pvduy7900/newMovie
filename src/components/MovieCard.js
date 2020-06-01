import React from "react";
import { Card, ListGroupItem, ListGroup, CardDeck } from "react-bootstrap";

export default function MovieCard(props) {
    let movie = props.movie;
    let genres = props.genresFromMovieList
    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} />

            <Card.Body>
                <Card.Title>{movie.original_title}</Card.Title>
                <Card.Text>
                    {movie.overview}
                </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
                <ListGroupItem>Genre: {movie.genre_ids.map(id => {
                    return (
                        <div>
                            {
                                genres == null ? <h2>Loading</h2> : genres.find(genre => id === genre.id).name
                            }
                        </div>
                    )
                })}</ListGroupItem>
                <ListGroupItem>Rating: {movie.vote_average}</ListGroupItem>
                <ListGroupItem>Year: {movie.release_date}</ListGroupItem>
            </ListGroup>

            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>

            function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        click
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>
    </>
  );
}

render(<Example />);

        </Card>

    );
}

