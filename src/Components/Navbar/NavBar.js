import React from 'react'



class Navbar extends React.Component {
    
  
  render() {
  return (
        <nav>
          <div className="logo">
            <h1>ttp Challenge</h1>
          </div>
         
             <ul>
                  <li className='name'>Hi, {this.props.user.name}</li>
                  <li><a href="/Portfolio">Portfolio</a></li>
                  <li><a href="/Transactions">Transactons</a></li>
                  <button onClick={this.props.logOut}>Signout</button>
             </ul>
        </nav>

    )
  
  }
 
};
  
  export default Navbar;