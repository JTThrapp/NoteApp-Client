import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import './NoteTable.css'


export default class NoteTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            newTitle: '',
            newBody: '',
            noteId: 123
        };
        this.toggle = this.toggle.bind(this);
    };

    deleteNote = (note) => {
        fetch(`https://jtt-note-app.herokuapp.com/note/${note.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        })
            .then(() => this.props.getNotes())
    }

    updateNote = () => {
        fetch(`https://jtt-note-app.herokuapp.com/note/${this.state.noteId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }),
            body: JSON.stringify({
                note: {
                    title: this.state.newTitle,
                    body: this.state.newBody,
                    important: false,
                    notebookId: this.props.notebookId}}),
        })
            .then((res) => {
                console.log(res.json());
                this.props.getNotes();
                this.setState({modalOpen: false});
                console.log(this.props.notebookId)
    })}

    toggle(note) {
        this.setState({
            newTitle: note.title,
            newBody: note.body,
            modalOpen: !this.state.modalOpen,
            noteId: note.id,
        });
        console.log(this.props.notebookId)
    }

    noteMapper = () => {
        return this.props.notes.filter(note => note.notebookId ===  this.props.notebookId).map((note, index) => {
            return (
                <tr key={index}>
                    <td>{note.title}</td>
                    <td>{note.body}</td>
                    <td>{note.createdAt}</td>
                    <td>{note.updatedAt}</td>
                    <td>
                        <Button className="select" style={{backgroundColor: '#F1A300'}} onClick={() => this.toggle(note)}>Update</Button>
                        <Button color="danger" onClick={() => this.deleteNote(note)}>Delete</Button>
                    </td>
                </tr>

            )
        })
    }

    updateTitle(newTitle) {
        this.setState({
            newTitle: newTitle
        })
    }

    updateBody(newBody) {
        this.setState({
            newBody: newBody
        })
    }

    render() {
        return (
            <>
                <Table striped className="noteTable">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.noteMapper()}
                    </tbody>
                </Table>

                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader >Update Note</ModalHeader>
                    <ModalBody>
                        <Input placeholder={this.state.newTitle} onClick={() => this.updateTitle('')} onChange={(e) => this.updateTitle(e.target.value)} />
                        <Input placeholder={this.state.newBody} onClick={() => this.updateBody('')} onChange={(e) => this.updateBody(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={(e) => this.updateNote(e)} color="primary" >Update Note </Button>
                        <Button color="secondary" onClick={this.toggle} >Cancel</Button>
                    </ModalFooter>
                </Modal>

            </>
        )
    }
}
