import React from 'react'
import './Form.css'

const SignUp = (props) => {
    
    const {email, password, name, submitHandler, changeHandler} = props

    console.log(props)

    return (
        <div className="d-flex justify-content-center login-container">
            <form className="login-form text-center" onSubmit={submitHandler}>
                <h1 className="mb-5 font-weight-light text-uppercase">Register</h1>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control rounded-pill form-control-lg" 
                    name="name" 
                    value={name}
                    placeholder="name"
                    onChange={changeHandler}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control rounded-pill form-control-lg" 
                    name="email" 
                    value={email}
                    placeholder="email"
                    onChange={changeHandler}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="password"
                    className="form-control rounded-pill form-control-lg" 
                    name="password" 
                    placeholder="password"
                    value={password}
                    onChange={changeHandler}
                    />
                <button className="btn mt-5 rounded-pill btn-lg btn-custom btn-block text-uppercase">Sign Up</button>
                <p className="mt-3 font-weight-normal">
                    Have an account?
                    <a onClick={props.clickHandler} style={{color:'red', cursor:'pointer'}}> Log In</a>
                </p>
                </div>
            </form>
        </div>

    )
}


export default SignUp