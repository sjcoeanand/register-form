import React from 'react';
import axios from 'axios';

const url = "http://localhost:5000";

class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            field :{
                name : "",
                email : "",
                password : ""
            },
            errors :{ },
            globalError : ""
        }
    }

    onChangeHandler = (key, value) => {
        const {field} = this.state;
        field[key]= value;
        this.setState({field: field});
    }


    handleValidation(){
        let {field} = this.state;
        let errors = {};
        let formIsValid = true;

   
        if(!field["name"] || !field["name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors["name"]= "Please enter valid name";
        }

        if(!field["email"]){
            formIsValid = false;
            errors["email"] = "email cannot be empty"
        }
        if(!field["password"]){
            formIsValid = false;
            errors["password"] = "Password cannot be empty"
        }
        if(field["password"].length > 0 && field["password"].length < 8){
            formIsValid = false;
            errors["password"] = "Password should be of minimum 8 digits"
        }
        this.setState({ errors : errors });
        return formIsValid;

        
    }

    onSubmitHandler = (event) => {
        event.preventDefault(event);

        if(!this.handleValidation())
            return alert("Form has errors.");

        let {field} = this.state;
        
        const res = axios.post(`${url}/registerUser`, { ...field })
        .then(function(response) {
            return response.data;              
        })
        .catch(function(error) {            
            console.log(error);
        });

        const { error } = res;
            if(error)
                return alert(error);            

        field = {
            name : "",
            email : "",
            password : ""
        }
        this.setState({ field });
        alert("Form submitted");
    }

  

    render(){
        return(
            <div className="register-form">
                <form onSubmit={this.onSubmitHandler}>
                    <input value={this.state.field["name"]} type="text" onChange={(e)=> this.onChangeHandler('name', e.target.value)} placeholder="name"/>
                    <span>{this.state.errors["name"]}</span>
                    <br/>
                    <input value={this.state.field["email"]} type="email" onChange={(e)=> this.onChangeHandler('email', e.target.value)} placeholder="email"/>
                    <span>{this.state.errors["email"]}</span>
                    <br/>
                    <input value={this.state.field["password"]}  type="password" onChange={(e)=> this.onChangeHandler('password', e.target.value)} placeholder="password"/>
                    <span>{this.state.errors["password"]}</span>
                    <br/>
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;