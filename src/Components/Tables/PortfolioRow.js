import React, { Component } from 'react'
class PortfolioRow extends Component {
    
    state = {
        currentPrice: 0,
        openPrice: 0
    }

    componentDidMount() {
        //api call for current price
        fetch(`https://api.iextrading.com/1.0/tops/last?symbols=${this.props.ticker}`)
          .then(res => res.json())
          .then(data => {
            if (data[0]) {
              this.setState({ currentPrice: data[0].price.toFixed(2)})
            }
          })

       //I could not locate an a free api with open price so calculation is based on previous days closing price 
        fetch(`https://cloud.iexapis.com/stable/stock/${this.props.ticker}/previous?token=pk_a1bdb3b5a0ef403ba560643968b4e8e4`)
          .then(res => res.json())
          .then(data => {
            if (data) {
              this.setState({ openPrice: data.close.toFixed(2)}) 
            }
          })
    }



    
    render() {

       const {ticker, share} = this.props
       let {currentPrice, openPrice} = this.state
       let value = (parseInt(share) * parseFloat(currentPrice)).toFixed(2)
       let performance = {color: currentPrice > openPrice ? 'green' : currentPrice < openPrice ? 'red' : 'grey' }

  
        return (
                <tr>
                  <td style={performance}>{ticker}</td>
                  <td>{share}</td>
                  <td style={performance}>{`$${currentPrice}`}</td>
                  <td>{`$${value}`}</td>
                </tr>
           
        )
    }
}


export default PortfolioRow