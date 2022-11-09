import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import Customers from './components/Customers';
import History from './components/History'
import CustomerDetails from './components/CustomerDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewCustomer from './components/NewCustomer';
import Edit from './components/EditCustomer';
import Data from './components/Data'
import Inactive from './components/Inactive';
import Renew from './components/Renew';



function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/renew/:manager_id/:id' element={<Renew/>}></Route>
          <Route path='/inactive/:manager_id' element={<Inactive/>}></Route>
          <Route path='/data/:manager_id' element={<Data/>} ></Route>
          <Route path='/register' element={<Register/>}/>
          <Route path='/edit/:manager_id/:id' element={<Edit/>} ></Route>
          <Route path='/dashboard/:manager_id' element={<Dashboard/>} ></Route>
          <Route path='/customerDetails/:manager_id/:id' element={<CustomerDetails/>}></Route>
          <Route path='/customers/:manager_id' element={<Customers/>}></Route>
          <Route path='/history/:manager_id/:id' element={<History/>} ></Route>
          <Route path='/newCustomer/:manager_id' element={<NewCustomer/>}></Route>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
