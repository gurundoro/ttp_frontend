import React, { Component } from 'react'


class TransactionRow extends Component {

    state = {
        currentPrice: 0
    }

    componentDidMount() {
        fetch(`https://api.iextrading.com/1.0/tops/last?symbols=${this.props.ticker_symbol}`)
          .then(res => res.json())
          .then(data => {
            if (data[0]) {
              this.setState({ currentPrice: data[0].price.toFixed(2)})
            }
          })
      }

    
    render() {

        
        let {ticker_symbol, share_quantity, price_per} = this.props
        let {currentPrice} = this.state
        let performance = (parseFloat(currentPrice) - parseFloat(price_per)).toFixed(2)

        return (
                <tr>
                  <td>{ticker_symbol}</td>
                  <td>{share_quantity}</td>
                  <td>{`$${parseFloat(price_per).toFixed(2)}`}</td>
                  <td>{currentPrice}</td>
                  <td style={{color: performance > 0 ? 'green': performance < 0 ? 'red' : 'black' }}>
                  {performance > 0 ? `+${performance}` : performance}
                  </td>
                </tr>
        )
    }
}


export default TransactionRow
