import React, {Component} from 'react';
import {Form, Label, Input, Button} from 'reactstrap';


export default class NoteCreate extends Component {

    constructor(props) {
        super(props)
        this.state={
            title: "note title",
            body: "note body"

        }
    };

    createnote (e) {
        e.preventDefault();
        fetch(`https://jtt-note-app.herokuapp.com/note/`, {
            method: 'POST',
            body: JSON.stringify({
                note: {
                    title: this.state.title,
                    body: this.state.body,
                    important: false,
                    notebookId: this.props.notebookId}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        }).then((noteData) =>{
            console.log(noteData);
            this.props.getNotes();
            this.setState({
                title: "note title",
                body: "note body"})
        }).catch(err => console.log(err))
    }

    updateTitle (newTitle){
        this.setState({title: newTitle})
    }

    updateBody (newBody){
        this.setState({body: newBody})
    }

    clearFillerTitle (){
        this.setState({title: ''})
    }

    clearFillerBody () {
        this.setState({body: ''})
    }

   render() {
       return(
           <>
                <h3>Add New Note to <i style={{color: '#174793' }} >"{this.props.notebookTitle}"</i></h3>
                <Form>
                    <Input style={{backgroundColor: '#F1A300', color: '#174793' }} name="title" value= {this.state.title} onClick={()=> this.clearFillerTitle()} onChange={(e) => this.updateTitle(e.target.value)}/>
                    <Input style={{backgroundColor: '#F1A300', color: '#174793'}}name="body" value = {this.state.body} onClick={()=> this.clearFillerBody()} onChange={(e)=> this.updateBody(e.target.value)}/>
                    <Button style={{backgroundColor: '#174793' }}onClick={(e)=>this.createnote(e)}>Click to Submit</Button>
                </Form>
           </>
       )
   }

    

}