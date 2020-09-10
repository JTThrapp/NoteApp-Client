import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

export default class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    };

    handleSubmit (e) {
        e.preventDefault();
        fetch('https://jtt-note-app.herokuapp.com/user/', {
            method: 'POST',
            body: JSON.stringify({user:{username: this.state.username, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)
        }).then(this.setState({username: '', password: ''}))
        console.log((localStorage.getItem('token')))
    }

    render() {
    return(
        <div>
            <h1> Sign Up </h1>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => this.setState({username: e.target.value})} name="username" value={this.state.username}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.state.password}/>
                </FormGroup>
                <Button type="submit" block>Sign Up</Button>
            </Form>
        </div>
    )
}}
