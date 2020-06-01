import React, { useState, useRef } from "react";
import { Card, ListGroupItem, ListGroup, Button, OverlayTrigger, Popover } from "react-bootstrap";

export default function MovieCard(props) {
    let movie = props.movie;
    let genres = props.genresFromMovieList
    const [show, setShow] = useState(false);
    const target = useRef(null);
    return (
        <Card>
            <Card.Img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} variant="top" />
            <Card.Title className ="textCenter">{movie.original_title}</Card.Title>
            {['top'].map((placement) => (
                <>
                    <OverlayTrigger
                        trigger="click"
                        key={placement}
                        placement={placement}
                        overlay={
                            <Popover className = "cardLength" id={`popover-positioned-${placement}`}>

                                <Card.Body className="gackground-card">

                                    <Card.Text>
                                        {movie.overview}
                                    </Card.Text>
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
                                </Card.Body>
                            </Popover>
                        }
                    >
                        <Button variant="secondary">Details</Button>
                    </OverlayTrigger>
                </>
            ))}


            <Card.Body className ="textCenter">
                <Card.Link href="#" onClick = {() => props.getYoutube(movie.id)}>Trailer</Card.Link>

            </Card.Body>

        </Card>

    );
}
