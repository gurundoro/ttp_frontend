import React from 'react'
import PortfolioRow from './PortfolioRow'

const Portfolio = (props) => {

      const {transactions} = props
      let stocks = {}

      //create object that adds stocks to avoid showing duplicates 
      transactions.forEach(transaction => {
          stocks[transaction['ticker_symbol']] = stocks[transaction['ticker_symbol']] + transaction['share_quantity']  || transaction['share_quantity'];
      })
      
      //crreate array of unique stocks
      let stocksArr = Object.keys(stocks).map(stock => ({ticker: stock, share: stocks[stock],}))



    return (
        

        <div className="portfolio-container">
        <div className="container mb-3 mt-3">
        <h1 className="text-center display-4 style={{width: '40%'}}">Portfolio</h1>
        <table className="table thead-dark table-bordered">
            <thead>
                <tr>
                    <th scope="col">Stock</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Current Price</th>
                    <th scope="col">Total Value</th>
                </tr>
            </thead>
            <tbody>
            {stocksArr.map(stock => (
                <PortfolioRow
                key={stock.ticker}
                ticker={stock.ticker}
                share={stock.share} />
            ))}
            </tbody>
        </table>
    </div>
    </div>
    )
}

export default Portfolio
