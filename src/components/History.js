import React, { useState, useEffect } from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {useParams, Link}  from "react-router-dom";

const url =  process.env.REACT_APP_API; 



const CustomerHistory = () => {
    let {manager_id, id} = useParams();
    const [newCustomerModal, setNewCustomerModal] = useState(false);
    const closeNewCustomerModal = () => setNewCustomerModal(false);
    const showNewCustomerModal = () => setNewCustomerModal(true);

    const [manager, setManager] = useState([]);
    useEffect(() => {
        getManagerData()
    },[]);

    const getManagerData = async() => {
        const result = await axios.get(`${url}${manager_id}`)
        setManager(result.data)

    }

    let company_name = '', user = '';
    manager.map((data) => (
        company_name = data.companyName,
        user = data.managerEmail
    ))

    const [customerName, setCustomerName] = useState(''), [customerPersonalId, setCustomerPersonalId] = useState(''),
          [amount, setAmount] = useState(''), [customerPhone, setCustomerPhone] = useState('')

    const saveCustomer = async (e) => {
        e.preventDefault();
        await axios.post(`${url}customer`, { customerName: customerName, customerPersonalId: customerPersonalId, amount: amount,  customerPhone: customerPhone, customer_id: manager_id });
        closeNewCustomerModal();

    }

    const [history, setHistory] = useState([]);
    useEffect(() => {
        getCustomerHistory();
    }, [])


    const getCustomerHistory = async () => {
        const res = await axios.get(`${url}details/${id}`);
        setHistory(res.data);

    }

    return (
        <div style={{ display: 'flex',  overflow: 'scroll initial' }}>
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
                        <a onClick={showNewCustomerModal}>
                            <CDBSidebarMenuItem icon="add">Agregar cliente</CDBSidebarMenuItem>
                        </a>
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

            <Modal show={newCustomerModal} onHide={closeNewCustomerModal} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign: 'center' }}>Agregar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={saveCustomer}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                type="text"
                                placeholder="e.g Jane Doe"
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cedula</Form.Label>
                            <Form.Control
                                value={customerPersonalId}
                                onChange={(e) => setCustomerPersonalId(e.target.value)}
                                type="text"
                                placeholder="400-2800510-0"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contacto</Form.Label>
                            <Form.Control
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                type="text"
                                required
                                placeholder="822-556-6855"
                            />

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="text"
                                required
                                placeholder="5,000.00"

                            />

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                                type="submit"
                                className="btn btn-primary"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Historial de pagos</h1>
                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cedula</th>
                                    <th>Cantidad</th>
                                    <th>Semanas</th>
                                    <th>Pago por semanas</th>
                                    <th>Total a pagar</th>
                                    <th>Cantidad pagada</th>
                                    <th>Cantidad no pagada</th>
                                    <th>Semanas pagadas</th>
                                    <th>Semanas no pagadas</th>
                                    <th>Abono</th>
                                    <th>Semanas atrasadas</th>
                                    <th>Ultimo cambio</th>
                                </tr>

                            </thead>
                            <tbody>
                                {history.map((details) =>(
                                    <tr key={details.id}>
                                        <td>{details.customerName}</td>
                                        <td>{details.customerPersonalId}</td>
                                        <td>{details.amount}</td>
                                        <td>{details.weeks}</td>
                                        <td>{details.paymentWeek}</td>
                                        <td>{details.totalPayment}</td>
                                        <td>{details.amountPaid}</td>
                                        <td>{details.amountNotPaid}</td>
                                        <td>{details.weeksPaid}</td>
                                        <td>{details.weeksNotPaid}</td>
                                        <td>{details.advance}</td>
                                        <td>{details.weeksDue}</td>
                                        <td>{details.createdAt}</td>

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


export default CustomerHistory;