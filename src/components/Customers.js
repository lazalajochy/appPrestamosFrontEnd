import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const url = process.env.REACT_APP_API;
const Customers = () => {
    let { manager_id } = useParams();

    const [manager, setManager] = useState([]);

    useEffect(() => {
        getManagerData()
    }, [])

    const getManagerData = async () => {
        const result = await axios.get(`${url}${manager_id}`)
        setManager(result.data)
    }

    let company_name = '', user = '';

    manager.map((data) => (
        company_name = data.companyName,
        user = data.managerEmail
    ))


    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        getCustomers();
    }, [])


    const getCustomers = async () => {
        const res = await axios.get(`${url}customer/${manager_id}`);
        setCustomers(res.data);
    }
    const deleteCustomer = async (id) => {
         axios.delete(`${url}customer/${id}`)
        getCustomers();

    }

    return (
        <div style={{ display: 'flex', overflow: 'scroll initial' }}>
            <CDBSidebar textColor='#fff' backgroundColor='#333'>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <Link to={`/dashboard/${manager_id}`} className="text-decoration-none" style={{ color: 'inherit' }}>
                        {company_name}
                    </Link>

                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <a>
                            <CDBSidebarMenuItem icon="user">{user}</CDBSidebarMenuItem>

                        </a>

                        <Link to={`/newCustomer/${manager_id}`}>
                            <CDBSidebarMenuItem icon="add">Agregar cliente</CDBSidebarMenuItem>

                        </Link>

                        <Link to={`/customers/${manager_id}`}>
                            <CDBSidebarMenuItem icon="users">Clientes</CDBSidebarMenuItem>

                        </Link>
                        <Link to={`/data/${manager_id}`}>
                            <CDBSidebarMenuItem icon="table">Data</CDBSidebarMenuItem>
                        </Link>
                        <Link to={`/inactive/${manager_id}`}>
                        <CDBSidebarMenuItem icon="history">Historial</CDBSidebarMenuItem>

                        </Link>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
                        Sidebar Footer
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Clientes activos</h1>
                        <Form.Group className="mb-3">
                            <Form.Control
                                className="search"
                                variant="outline"
                            />
                        </Form.Group>                        
                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cedula</th>
                                    <th>Inicio</th>
                                    <th>Contacto</th>
                                    <th>Cantidad</th>
                                    <th>Ultimo cambio</th>
                                    <th>Semanas atrasadas</th>
                                    <th>Semanas pagadas</th>
                                    <th>Semanas pendientes</th>
                                    <th>Cantidad pagada</th>
                                    <th>Cantidad pendiente</th>
                                    <th>Pago total</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.customerName}</td>
                                        <td>{customer.customerPersonalId}</td>
                                        <td>{customer.createdAt}</td>
                                        <td>{customer.customerPhone}</td>
                                        <td>{customer.amount}</td>
                                        <td>{customer.updatedAt}</td>
                                        <td>{customer.weeksDue}</td>
                                        <td>{customer.weeksPaid}</td>
                                        <td>{customer.weeksNotPaid}</td>
                                        <td>{customer.amountPaid}</td>
                                        <td>{customer.amountNotPaid}</td>
                                        <td>{customer.totalPayment}</td>
                                        <td>
                                            <Link to={`/edit/${manager_id}/${customer.id}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                            <Link to={`/customerDetails/${manager_id}/${customer.id}`} className='btn btn-primary'><i className="fa-solid fa-money-bill-1"></i></Link>
                                            <Link to={`/history/${manager_id}/${customer.id}`} className='btn btn-success'><i className="fas fa-timeline"></i></Link>
                                            <button onClick={() => deleteCustomer(customer.id)} className="btn btn-danger"><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Customers;