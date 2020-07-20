import React, { Component } from 'react'

class BuyStockForm extends Component {
    
    state = {
        tickerSymbol: '',
        quantity: 0
    }
    

    handleChange = async(e) => {
     await this.setState({[e.target.name]:e.target.value});
    }


    render() {

        const {tickerSymbol, quantity} = this.state

        
        return (
          <div className="buy-container">
          <h3 className="display-7 style={{width: '40%', color:'green'}}">Cash: ${this.props.user.balance}</h3>
          <form action="" onSubmit={((e) => this.props.handleOnSubmitBuyButton(e, tickerSymbol, quantity))} >
            <div className="form-group">
               <label>Search Stocks</label>
               <input 
               type="text" 
               className="form-control" 
               name="tickerSymbol" 
               placeholder="Ticker Symbol" 
               value={tickerSymbol} onChange={e => this.handleChange(e)} 
               style={{width: '100%'}}
               />
            </div>
            <div className="form-group">
              <label >Quantity</label>
              <input 
              type="number"
               min="0" className="form-control"  
               name="quantity" value={quantity} 
               onChange={(e) => this.handleChange(e)} 
               style={{width: '50%'}}
               />
            </div>
                <button type="submit" className="btn btn-primary">Buy</button>
          </form>  
          </div>
        
        )

       
       
    } 
}

export default BuyStockForm

