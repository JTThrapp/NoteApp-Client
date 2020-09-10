import React, {Component} from 'react';
import Notebook from './Notebook/Notebook';

export default class Notebooks extends Component {

  constructor(props) {
      super(props)
      this.state={ notebooks:
        [
          {createdAt: "",
          id: 1,
          owner: 1,
          title: "yo",
          updatedAt: ""},
          {createdAt: "1",
          id: 2,
          owner: 1,
          title: "hi",
          updatedAt: "2"}
        ]
      }
      this.getNotebooks= this.getNotebooks.bind(this);
  };

  
   componentDidMount(){
    this.getNotebooks()
   }
   

  
      // console.log(props);
  
    getNotebooks = async () => {
      const URL = `https://jtt-note-app.herokuapp.com/`;
        try {
          const response = await fetch(`${URL}notebook/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem('token'),
            },
          });
          const jsonData = await response.json();
          this.setState({notebooks: (jsonData)});
        } catch (err) {
          console.error(err.message);
        }
      };

  render() {
  return (
     <>
        <Notebook getNotebooks = {this.getNotebooks} notebook={this.state.notebooks} />
    </>
  )}
}

