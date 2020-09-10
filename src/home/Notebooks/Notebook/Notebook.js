import React, { Component } from 'react';
import { Container, Row, Col, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import NotebookDelete from './NotebookDelete';
import Notes from '../../Notes/Notes';
import '../Notebook/Notebook.css';

export default class Notebook extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      editModalOpen: false,
      selectedNotebookId: '0',
      selectedNotebookTitle: 'Select a Notebook',
      showNotes: false,
      notebookToAdd: ''
    };
    this.toggle = this.toggle.bind(this);
    this.updateState = this.updateState.bind(this);
    this.toggleEditModal= this.toggleEditModal.bind(this);
  };


  toggle() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  toggleEditModal(id) {
    this.setState({ 
      editModalOpen: !this.state.editModalOpen,
      selectedNotebookId: id
    });
  }

  updateState(id, title) {
    this.setState(
      {
        selectedNotebookId: id,
        selectedNotebookTitle: title,
        showNotes : true
      });
    console.log(this.state.selectedNotebookTitle)
    console.log(this.state.selectedNotebookId)
  }

  updateTitleState(newTitle) {
    this.setState(
      {
        notebookToAdd: newTitle
      }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://jtt-note-app.herokuapp.com/notebook/', {
      method: 'POST',
      body: JSON.stringify({notebook: {title: this.state.notebookToAdd}}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    }).then((res)=> res.json())
    .then((notebookData) => {
      console.log(notebookData);
      this.setState({notebookToAdd:''});
      this.props.getNotebooks();
      this.toggle();
      this.updateState(notebookData.id, notebookData.title)
    })
  }

  handleEdit = (e) => {
    e.preventDefault();
    fetch(`https://jtt-note-app.herokuapp.com/notebook/${this.state.selectedNotebookId}`, {
      method: 'PUT',
      body: JSON.stringify({notebook: {title: this.state.notebookToAdd}}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      })
    }).then((res)=> res.json())
    .then((notebookData) => {
      console.log(notebookData);
      this.props.getNotebooks();
      this.toggleEditModal();
      this.setState({selectedNotebookTitle: this.state.notebookToAdd});
      this.setState({showNotes: true})
    })
  }

  render() {
    
    let notes;
    if (this.state.showNotes) {
      notes = <Notes notebookId={this.state.selectedNotebookId} notebookTitle={this.state.selectedNotebookTitle}/>;
    };

    return (
      <>
        <Container>
          <Row>
            <Col>
            <UncontrolledDropdown>
          <DropdownToggle caret style={{backgroundColor: '#174793'}}>
            {this.state.selectedNotebookTitle}
          </DropdownToggle>
          <DropdownMenu style={{backgroundColor: '#729ED9'}}>
            {this.props.notebook.map((notebook, index) => (
              <DropdownItem key={index}>
                <span onClick={() => this.updateState(notebook.id, notebook.title)}>{notebook.title}</span>
                <EditIcon onClick={()=>(this.toggleEditModal(notebook.id))}/>
                <NotebookDelete updateState={this.updateState} getNotebooks={this.props.getNotebooks} notebookId={notebook.id} />
              </DropdownItem>))}
            <DropdownItem divider />
            <DropdownItem onClick={this.toggle}>Add New </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
            </Col>
          </Row>  
        </Container>

        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader >New Notebook</ModalHeader>
          <ModalBody>
            What shall we call it?
          <Input onChange={(e)=> this.updateTitleState(e.target.value)}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={(e) => this.handleSubmit(e)} color="primary" >Add </Button>
            <Button color="secondary" onClick={this.toggle} >Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editModalOpen}>
          <ModalHeader >Change Notebook Name</ModalHeader>
          <ModalBody>
            What shall we change it to?
          <Input onChange={(e)=> this.updateTitleState(e.target.value)}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={(e) => this.handleEdit(e)} color="primary" >Update </Button>
            <Button color="secondary" onClick={this.toggleEditModal} >Cancel</Button>
          </ModalFooter>
        </Modal>
        
        {notes}
      </>
    )
  }
}