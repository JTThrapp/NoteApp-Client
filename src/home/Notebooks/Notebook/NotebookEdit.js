import React, {Component} from 'react';
import EditIcon from '@material-ui/icons/Edit';

export default class Notebook extends Component {

    // editNotebook (e) {
    //     e.preventDefault(); 
    //     console.log(this.props)
    //     fetch(`https://jtt-note-app.herokuapp.com/notebook/${this.props.notebookId}`, {
    //         method: "PUT",
    //         headers: new Headers({
    //           "Content-Type": "application/json",
    //           "Authorization": localStorage.getItem('token'),
    //         })
    //       })
    //       .then(res => res.json())
    //       .then(resJson => console.log(resJson))
    //       .then(this.props.updateState('0','Select a Notebook'))
    //       .then(this.props.getNotebooks())
    //       .then(this.props.getNotebooks())
    //       .catch(err => console.log(err))
    //   }
    
    render() {
    return(
        <div>
            <EditIcon />
        </div>
    )}
}

