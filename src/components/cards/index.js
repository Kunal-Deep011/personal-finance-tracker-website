import React from 'react';
import "./styles.css";
import { Row, Card } from 'antd';
import Button from '../Button';

function Cards({income, expense, totalBalance, showExpenseModal, showIncomeModal, reset, darkMode}){
    return(
        <div>
         <Row className="my-row">
            <Card bordered={true} className= {darkMode ? "dark-mode my-card" : "light-mode my-card"}>
                <h2>Current Balance</h2>
                <p>₹{totalBalance}</p>
                <Button text="Reset Balance" blue={true} onClick={reset}/>
            </Card>

            <Card bordered={true}  className= {darkMode ? "dark-mode my-card" : "light-mode my-card"}>
                <h2>Total Income</h2>
                <p>₹{income}</p>
               <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
            </Card>

            <Card bordered={true}  className= {darkMode ? "dark-mode my-card" : "light-mode my-card"}>
                <h2>Total Expenses</h2>
                <p>₹{expense}</p>
                <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
            </Card>
            
         </Row>
        </div>
    )
}

export default Cards;