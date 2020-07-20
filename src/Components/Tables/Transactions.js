import React from 'react'
import TransactionRow from './TransactionRow'
import Navbar from '../Navbar/Navbar'


const Transactions = (props) => {

    const {logOut, user} = props
    
    return (
    <>
       <Navbar logOut={logOut} user={user}/>
       <div className="container mb-3 mt-3">
       <h1 className="text-center display-1">Transactions</h1>
        <table className="table thead-dark table-bordered style={{width: '100%'}}">
            <thead>
                <tr>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Original Price</th>
                    <th>Current Price</th>
                    <th>Gain/Loss</th>
                </tr>
            </thead>
            <tbody>
            {props.transactions.map((transaction, index) => (
                <TransactionRow key={index} {...transaction} />
            ))}
            </tbody>
        </table>
       </div>
     </>
    )
}

export default Transactions
