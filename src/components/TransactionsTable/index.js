import { Radio, Select, Table } from 'antd';
import { parse, unparse } from 'papaparse';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import searchImg from "../../assets/searchImg (2).png";
import "./styles.css";


function TransactionsTable({transactions, addTransaction, fetchTransactions}){
    const {Option} = Select;
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");
    const columns = [
        { 
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        }
      ];
      
      let filteredTransactions = transactions.filter((transaction)=>{

        const searchMatch = searchTerm
        ? transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
       //const tagMatch = selectedTag ? transaction.tag === selectedTag : true;
        const typeMatch = typeFilter ? transaction.type === typeFilter : true;

        return searchMatch && typeMatch;
});

      let sortedTransactions = filteredTransactions.sort((a, b) =>{
        if(sortKey === "date") {
            return new Date(a.date) - new Date(b.date);
        }else if(sortKey === "amount"){
           return a.amount - b.amount;
        }else{
            return 0;
        }
      });

    /*  const dataSource = sortedTransactions.map((transaction, index) => ({
        key: index,
        ...transaction
      }));*/

     function exportCSV(){
        const csv = unparse({
            fields: ["name", "type", "tag", "date", "amount"],
            data: transactions
            
        });
        const blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "transactions.csv"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
     }

       function importFromCsv(event){
        event.preventDefault();

        try{
          parse(event.target.files[0],{
            header: true,
            complete: async function (results){
              console.log("RESULTS>>>",results);
              //Now result.data is an array of objects representing your CSV rows
              for(const transaction of results.data){
                // Write each transaction to firebse, you can use the addTransaction function here
                console.log("Transactions", transaction);
                const newTransaction ={
                  ...transaction,
                  amount: parseFloat(transaction.amount),
                };
                await addTransaction(newTransaction, true);
              }
            },
          });
         toast.success("All Transactions Added");
         fetchTransactions();
         event.target.files = null;
        } catch (e) {
          toast.error(e.message);
        }
       }


    return (
    <div 
       style={{
       padding: "0rem 2rem"
       }}
    >
      <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "1rem"
      }}
      >
      
         <div className='input-flex'>
         <img 
         src={searchImg} width="16"/>
         <input
          value={searchTerm} 
          onChange= {(e)=> setSearchTerm(e.target.value)} 
          placeholder='Search By Name'
          />
         </div>
       
          <Select
          className="select-input"
          onChange={(value)=> setTypeFilter(value)}
          value={typeFilter}
          placeholder='Filter'
          allowClear
          >
           <Option value="">All</Option>
           <Option value="income">Income</Option>
           <Option value="expense">Expense</Option> 
          </Select>
       </div>
       
       <div className="my-Table">
        <div className="table-box"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "2rem",
               
            }}
        >
           <h2>My Transactions</h2>

               <Radio.Group
               className='input-radio'
               onChange={(e)=> setSortKey(e.target.value)}
               value={sortKey}
               >
                <Radio.Button value="">No Sort</Radio.Button>
                <Radio.Button value="date">Sort By Date</Radio.Button>
                <Radio.Button value="amount">Sort By Amount</Radio.Button>
               </Radio.Group>
                <div
                    style={{
                     display: "flex",
                     justifyContent: "center",
                     gap: "2.4rem",
                     width: "400px",
                  
                    }}
                >
                      <button className='btn' onClick={exportCSV}>
                         Export to CSV
                      </button>
                      <label for="file-csv" className='btn btn-blue'>
                         Import from CSV
                      </label>
                      <input
                      id="file-csv"
                      type="file"
                      accept=".csv"
                      onChange={importFromCsv}
                      required
                      style={{display: "none"}}
                      />
                </div>
        </div>
                    
                         <Table 
                         dataSource={sortedTransactions} 
                         columns={columns} 
                         style={{marginLeft: "2rem", marginRight: "2rem" }}/>
                  
       </div>

    </div>
    );
}

export default TransactionsTable;