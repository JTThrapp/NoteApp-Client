import React, {Component} from 'react';
import NoteTable from './NoteTable';
import NoteCreate from '../Notes/NoteCreate';
import {Container, Row, Col } from 'reactstrap';

export default class Notes extends Component {

  constructor(props) {
      super(props)
      this.state={ 
        notes: []
      }

      this.getNotes= this.getNotes.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  };
   
    handleSubmit(event) {
    event.preventDefault();
    }

    componentDidMount(){
      this.getNotes();
    }
    
  
    getNotes = async () => {
        try {
          const response = await fetch(`https://jtt-note-app.herokuapp.com/note/?notebook=${this.props.notebookId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('token'),
            },
          });
          const jsonData = await response.json();
          this.setState({notes: jsonData});
          console.log(this.state.notes);
        } catch (err) {
          console.error(err.message);
        }
      }
      
  render() {
  return (
     <>
        <Container>
            <Row>
                <Col md="9">
                  <NoteTable notebookId= {this.props.notebookId} notes={this.state.notes} getNotes={this.getNotes}/>
                </Col >
                <Col md="3">
                  <NoteCreate getNotes={this.getNotes} notebookId={this.props.notebookId} notebookTitle={this.props.notebookTitle}/>
                </Col>
            </Row>
        </Container>
    </>
  )}
}
