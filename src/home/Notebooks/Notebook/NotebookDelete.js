import React, {Component} from 'react';
import DeleteForever from "@material-ui/icons/DeleteForever";

export default class NotebookDelete extends Component {
  
deleteNotebook (e) {
    e.preventDefault(); 
    console.log(this.props)
    fetch(`https://jtt-note-app.herokuapp.com/notebook/${this.props.notebookId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token'),
        })
      })
      .then(res => res.json())
      .then(resJson => console.log(resJson))
      .then(this.props.updateState('0','Select a Notebook'))
      .then(() => this.props.getNotebooks())
      .catch(err => console.log(err))
  }

  render() {
      return(
        <>
        <DeleteForever onClick={(e) => {this.deleteNotebook(e)}}/>
        </>
      )
  }}