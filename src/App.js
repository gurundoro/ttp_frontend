import React, {Component} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import Transactions from './Components/Tables/Transactions'
import PortfolioContainer from './Containers/PortfolioContainer'
import LoginSignUpContainer from './Containers/LoginSignUpContainer';
import './App.css';

export class App extends Component {

  state = {
    user: '',
    transactions: [],
    tickerSymbol:'',
    quantity: 0,
    stockData: {},
    valid: true,
  }
  
  //update app with logged in users data
  setUser = (user) => {
    this.setState({user: user, transactions: user.transactions})
  }
  
  //retrieve logged in users profile upon login
  componentDidMount() {
    let token = localStorage.token;
    fetch('http://localhost:3000/api/v1/get_user', {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
     .then(res => res.json())
     .then(data => {
       if(data.error){
         console.log(data.error)
       }else {
         this.setUser(data.user)
       }
     })
     .catch(console.error)
  }
  
  //logout current user
  logOut = () => {
    localStorage.removeItem('token')
    this.setState({user: '', transactions: []})
    this.props.history.push('/signup')
  }
  
  //purchase stock functionality
  handleOnSubmitBuyButton = async (e, ticker, amount) => {
    e.preventDefault()
    await this.setState({tickerSymbol:ticker, quantity:amount}) 
    await this.fetchStock(ticker)
    const {valid ,tickerSymbol, quantity, stockData: {price}} = this.state

    const balance = this.state.user.balance - (price * this.state.quantity) 
    
    if(valid === true && balance > 0){
    this.buyStock(this.state.user, tickerSymbol, price, quantity)
    }
    
 }
 
 //function to fetch stock from IEX API separated
  fetchStock = async (tickerSymbol) => {
    try{
    let response = await fetch(`https://cloud.iexapis.com/stable/stock/${tickerSymbol}/quote?token=pk_a1bdb3b5a0ef403ba560643968b4e8e4`)
    let data = await response.json() 
    if(this.state.user.balance - (data.latestPrice * this.state.quantity) > 0){
    await this.setState({stockData: {
       symbol: data.symbol,
       price: data.latestPrice
    }})
  }else{
    alert('You do not have enough funds to complete that transaction')
  }
   } catch {
     await this.setState({valid:!this.state.valid})
     alert('Invalid Ticker')
   }
 
  }

 //post purchase to backend transactions endpoint 
  buyStock = (user, symbol, price,quantity) => {
    fetch("http://localhost:3000/api/v1/transactions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify(

        {
          transaction: {
            share_quantity: quantity,
            price_per:price,
            user_id: user.id,
            ticker_symbol: symbol
          }
        })
    })
    .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setUser(data.user)
        }
      })
      .catch(console.error)

  }

  render(){
    console.log(this.state)
    const {user, transactions} = this.state
    const {setUser} = this
   
    return (
     <>
        <Switch>
          <Route path='/login' render= {(props) => <LoginSignUpContainer {...props} user={user} setUser={setUser} />}/>
          <Route path='/signup' component={(props) => <LoginSignUpContainer {...props} user={user} setUser={setUser} />}/>
          <Route path='/portfolio' component={(props) => <PortfolioContainer user={user} transactions={transactions} logOut={this.logOut} handleOnSubmitBuyButton={this.handleOnSubmitBuyButton} />}/>
          <Route path='/transactions' component={(props) => <Transactions user={user} transactions={transactions} logOut={this.logOut} />}/>
        </Switch>
      </>
    );
  }


}

export default withRouter(App);



