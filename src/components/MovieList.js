import React from "react";
import MovieCard from "./MovieCard";
import {Row,Col} from "react-bootstrap"


export default function MovieList(props) {
  if (!props.list) {
    return <div>loading</div>;
  }
  return (
    <div className ="gackground-card">
    <Row>
      {props.list.map((item) => {
        return <Col sm="6" md="4" lg="3"><MovieCard className = "gackground-card" movie={item} genresFromMovieList = {props.genresFromMovieList}/></Col>;
      })}
      </Row>
    </div>
  );
}
