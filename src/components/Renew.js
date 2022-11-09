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
import { Link, useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';


const url = process.env.REACT_APP_API;



const Renew = () => {
    const navigate = useNavigate()

    let { manager_id, id } = useParams();
    const [manager, setManager] = useState([]);

    useEffect(() => {
        getManagerData()
    }, [])

    const getManagerData = async () => {
        const res = await axios.get(`${url}${manager_id}`)
        setManager(res.data)
    }
    let company_name = '', user = '';

    manager.map((data) => (
        company_name = data.companyName,
        user = data.managerEmail
    ))


    let [customerName, setCustomerName] = useState(''), [customerPhone, setCustomerPhone] = useState(''),
        [customerPersonalId, setCustomerPersonalId] = useState(''), [amount, setAmount] = useState(''), [weeksPaid, setWeeksPaid] = useState(''),
        [paymentWeek, setPaymentWeek] = useState(''), [amountPaid, setAmountPaid] = useState(''),
        [amountNotPaid, setAmountNotPaid] = useState(''), [totalPayment, setTotalPayment] = useState(''),
        [weeksNotPaid, setWeeksNotPaid] = useState(''), [advance, setAdvance] = useState('')


    useEffect(() => {
        getCustomer()
}, [])

    const getCustomer = async() => {
        const res = await axios.get(`${url}customer/${manager_id}/${id}`)
        setCustomerName(res.data[0].customerName)
        setCustomerPhone(res.data[0].customerPhone)
        setCustomerPersonalId(res.data[0].customerPersonalId)
    }

    paymentWeek = (amount / 100) * 10;
    amountPaid = paymentWeek * weeksPaid;
    totalPayment = paymentWeek * 13;
    amountNotPaid = totalPayment - amountPaid
    weeksNotPaid = 13 - weeksPaid

    const saveCustomer = async(e) => {
        e.preventDefault();

        await axios.post(`${url}customer/`, {
            customerName: customerName, customerPersonalId: customerPersonalId, customerPhone: customerPhone, customer_id: manager_id, amount: amount, totalPayment: totalPayment,
            paymentWeek: paymentWeek, advance: advance, weeksPaid: weeksPaid, weeksNotPaid: weeksNotPaid, amountPaid: amountPaid, amountNotPaid: amountNotPaid
        },
            navigate(`/customers/${manager_id}`)

        );

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


            <div style={{display:'block', width:700, padding:30}}>
                <h1>Renovar cliente</h1>
                <Form onSubmit={saveCustomer}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                         value={customerName}
                         onChange={(e) => setCustomerName(e.target.value)}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cedula</Form.Label>
                        <Form.Control
                        value={customerPersonalId}
                        onChange={(e) => setCustomerPersonalId(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Semanas pagadas</Form.Label>
                        <Form.Control
                        value={weeksPaid}
                        onChange={(e) => setWeeksPaid(e.target.value)}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pago por semanas</Form.Label>
                        <Form.Control
                        value={paymentWeek}
                        onChange={(e) => setPaymentWeek(e.target.value)}
                        readOnly
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad pagada</Form.Label>
                        <Form.Control
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        readOnly
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad no pagada</Form.Label>
                        <Form.Control
                        value={amountNotPaid}
                        onChange={(e) => setAmountNotPaid(e.target.value)}
                        readOnly
                        />

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Semanas no pagadas</Form.Label>
                        <Form.Control
                        value={weeksNotPaid}
                        onChange={(e) => setWeeksNotPaid(e.target.value)}
                        readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Abono</Form.Label>
                        <Form.Control
                        value={advance}
                        onChange={(e) => setAdvance(e.target.value)}
                        
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Pago total</Form.Label>
                        <Form.Control
                        value={totalPayment}
                        onChange={(e) => setTotalPayment(e.target.value)}
                        readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="submit"
                            className="btn btn-primary"
                        />
                    </Form.Group>
                </Form>
            </div>


        </div>
    )

}

export default Renew