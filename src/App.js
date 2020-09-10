import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import Notebooks from './home/Notebooks/Notebooks';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sessionToken: ''
    }
  }

  componentDidMount () {
    if (localStorage.getItem('token')){
      this.setState({sessionToken: localStorage.getItem('token')})
    }};
  
  updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken});
    console.log(this.state.sessionToken)
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: ''})
  }

  displaySelector = () => {
    return localStorage.getItem('token') !== null ?
        <div>
          <br/>
      <Container>
        <Row>
          <Col md="8">
          <h4 style={{color: '#174793'}}>Welcome to JT's NoteApp. </h4> <p>To get started, click the dropdown below, then "Add New". <br/> Once a notebook is created, you will be able to start adding notes! </p>
          </Col>
        </Row>
      </Container>
           <Notebooks token ={this.state.sessionToken}/>
        </div>
      : <Auth updateToken={this.updateToken}/> ;
  }


  render() {
  return (
    <div className="main">
      <Sitebar clickLogout={this.clearToken}/>
      <br/>
      
      {this.displaySelector()}
      <br/>
    </div>
  );
}}

