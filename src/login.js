import React from 'react';
import axios from 'axios';

const url = "http://localhost:5000";

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            field : {
                email : "",
                password : ""
            },
            errors :{ 

            },
            globalError : ""
        }
    }

    onChangeHandlerLogin = (key, value) => {
        const {field} = this.state;
        field[key]= value;
        this.setState({field: field});
    }

    handleValidation(){
        let {field} = this.state;
        let errors = {};
        let formIsValid = true;

        if(!field["email"]){
            formIsValid = false;
            errors["email"] = "email cannot be empty"
        }
        if(!field["password"]){
            formIsValid = false;
            errors["password"] = "Password cannot be empty"
        }
        
        this.setState({ errors : errors });
        return formIsValid;        
    }

    handleSubmit = async event => {
        event.preventDefault();

        if(!this.handleValidation())
        return alert("Form has errors.");

        let {field} = this.state;
        
       const res = await axios.post(`${url}/loginUser`, { ...field })
        .then(function(response) {
            return response;              
        })
        .catch(function(error) {            
            console.log(error);
        });

        console.log(res);

        const { error } = res;
        if(error)
            return alert(error);            

        field = {
            email : "",
            password : ""
        }
        this.setState({ field });
        alert("Login Successfull");

      }
    
    render(){
        return(
            <form className="login-form" onSubmit={this.handleSubmit}>
                <input value={this.state.field["email"]} onChange={ (e)=> this.onChangeHandlerLogin('email', e.target.value) } placeholder="email" type="email"/>
                <br/>
                <input value={this.state.field["password"]} onChange={ (e)=> this.onChangeHandlerLogin('password', e.target.value)} placeholder="password" type="password"/>
                <br/>
                <button type="submit">Login</button>
            </form>
        );
    }
}

export default Login;