import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

export default function Navigation(props) {
  let searchContents = ''
  const searchByKeyword = (e) => {
    e.preventDefault()
    console.log("here : ", searchContents)
    props.searchTheKeywordProps(searchContents)
  }

  return (
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

        <Form inline onSubmit={(e) => searchByKeyword(e)}>
          <FormControl onChange={e => { searchContents = e.target.value; }} type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>


  )
}
