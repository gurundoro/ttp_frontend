import React from 'react'
import Portfolio from '../Components/Tables/Portfolio'
import BuyStockForm from '../Components/Forms/BuyStock'
import Navbar from '../Components/Navbar/Navbar'



const PortfolioContainer = (props) => {
  
      const {transactions, user, logOut} = props

        return (
            <>
            <Navbar logOut={logOut} user={user}/>
            <div className="p-container">
               <Portfolio user={user} transactions={transactions}/>
               <BuyStockForm handleOnSubmitBuyButton={props.handleOnSubmitBuyButton} user={props.user}/>
            </div>
            </>
        )
    }


export default PortfolioContainer