import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

export default class Login extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    };

// const Login = (props) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');



    handleSubmit (e) {
        e.preventDefault();
        fetch('https://jtt-note-app.herokuapp.com/login/', {
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
        .catch(err => console.log(err));

        console.log((localStorage.getItem('token')))

    }
    
    render() {
    return(
        <div>
            <h1 style={{color: '#174793'}}>Login</h1>
            <Form onSubmit = {(e) => this.handleSubmit(e)}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => this.setState({username: e.target.value})} name="username" value={this.state.username}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.state.password}/>
                </FormGroup>
                <Button style={{backgroundColor: '#174793'}}type="submit" block>Login</Button>
                </Form>
        </div>
    )
}}


