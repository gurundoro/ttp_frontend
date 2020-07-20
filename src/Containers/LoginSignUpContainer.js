import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Login from '../Components/Forms/Login'
import SignUp from '../Components/Forms/Signup'


export default class LoginSignUpContainer extends Component {

    state = {
        email: '',
        name: '',
        password: '',
        clicked: !this.props.history.location === '/login'
    }
    
    changeHandler = (e) => {
        this.setState({[e.target.name] :  e.target.value})
    }
    
    //create new user client-side
    signUpSubmitHandler = (e) => {
        e.preventDefault()
        const {email, name, password} = this.state
        fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers:{
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify({user: {email, name, password}})
        })
        .then(res => res.json())
        .then(data => {
          if (data.error){
            alert(data.error)
          }else{
            localStorage.setItem("token", data.jwt)
            this.props.setUser(data.user)
          }
        })
        .catch(console.error)
    }

    //login-in user client side 
    loginSubmitHandler = (e) => {
      e.preventDefault()
      const {email, password} = this.state
      fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify({user: {email, password}})
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            alert(data.error)
          } else {
            localStorage.setItem("token", data.jwt)
            this.props.setUser(data.user)
          }
        })
        .catch(console.error)
    }
  
   //switch between login and signup form 
    clickHandler = () => {
      console.log('clicked')
      this.state.clicked ?
      this.props.history.push('/signup'):
      this.props.history.push('/login')
      this.setState(
        {
          email: '',
          username: '',
          password: '',
          clicked: !this.state.clicked 
        }
      )
    }
    

    render() {
        let {
          email,
          name,
          password,
          clicked
        } = this.state
    
 
    
        return (
          <div>
            { this.props.user ?
              <Redirect to='/portfolio' /> :
              clicked ?
              <Login
                email={email}
                password={password}
                changeHandler={this.changeHandler}
                submitHandler={this.loginSubmitHandler}
                clickHandler={this.clickHandler}/> :
              <SignUp
                email={email}
                name={name}
                password={password}
                changeHandler={this.changeHandler}
                submitHandler={this.signUpSubmitHandler}
                clickHandler={this.clickHandler}/>
            }
          </div>
        )
      }
}
