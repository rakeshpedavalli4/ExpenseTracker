import React, {useState} from "react";
import './AddExpense.css';
import logo from './logo.svg'
import logo1 from './Editlogo.svg'
import './DeleteExpense.css';
import './EditExpense.css';
function AddExpense(){
    const[Expense, setExpense]= useState("");
    const[Amount, setAmount] = useState("");
    const[Date, setDate] = useState("");
    const[ExpenseList, setExpenseList] = useState([]);
    const[EditExpense, setEditExpense] = useState(null);
    const handleExpense= ( event )=>{
        setExpense(event.target.value);
    }
    const handleAmount = (event) =>{
        setAmount(event.target.value);
    };
    const handleDate =(event) =>{
        setDate(event.target.value);
    }
    const handleAdd=()=>{
        if(Expense !== '' && Amount !== '' && Date !== ''){
            const newExpense={
                id: Math.floor((Math.random()*90)+1),
                name: Expense,
                amount : Amount,
                date   : Date,
            };
            setExpenseList([...ExpenseList, newExpense])
            setExpense('');
            setDate('');
            setAmount('');
        }
    };
    const handleEdit =(Expense)=>{
        setEditExpense(Expense);
        setExpense(Expense.name);
        setAmount(Expense.amount);
        setDate(Expense.date);
    };

    const handleDelete = (id) =>{
        const updatedExpense = ExpenseList.filter(Expense=> Expense.id!==id);
        setExpenseList(updatedExpense);
    };

    const handleActionButton=() => {
            if(EditExpense){
                const UpdatedList = ExpenseList.map((expense) => 
                expense.id === EditExpense.id ?  {...expense, name:Expense, amount: Amount, date: Date} : expense
                );
                setExpenseList(UpdatedList);
                setEditExpense(null);
            }else{
                handleAdd();
            }
            setExpense("");
            setAmount("");
            setDate("");
    };
    return(
        <section>
        <div className="Expense_name">
            <h1>Welcome to Expense Tracker</h1>
        </div>
        <div className="Input">
            <input type="text" value={Expense} onChange={handleExpense}  placeholder="Expense-Name"/>
            <input type ="number" value={Amount} onChange={handleAmount}  placeholder="Amount"/>
            <input type="date" value={Date} onChange={handleDate}  placeholder="Enter Date"/>
            <div className="Button">
                <button onClick={handleActionButton}>Enter</button>
            </div>
        </div>
        <div className="ExpenseList">
        {ExpenseList.map((Expense,index)=>(
                <div key={`${index}-${Expense.id}`} className="ExpenseRow">
                    <div className="ExpenseitemRow">
                    <div className="Edit">
                        <button onClick={()=> handleEdit(Expense)}>
                            <img src={logo1}className="Edit-logo" alt="logo"/>
                        </button>        
                    </div>
                    <div className="inline">
                    <span className="Expenseitem"><strong>{Expense.name}</strong></span>
                    <span className="Expenseitem"><strong>{Expense.amount}</strong></span>
                    <span className="Expenseitem"><strong>{Expense.date}</strong></span>
                    </div>
                    <div className="Delete">
                    <button onClick={()=> handleDelete(Expense.id)}>
                        <img src={logo} className="Delete-logo" alt="logo" />
                    </button>
                    </div>
                    </div>
                </div>
        ))}
            </div>
        </section>
    );
};


export default AddExpense;