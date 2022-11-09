import React, { useState, useEffect } from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";


const url = process.env.REACT_APP_API;

const CustomerDetails = () => {
    let navigate = useNavigate();

    let { manager_id, id } = useParams();


    let [amount, setAmount] = useState(''),
        [paymentWeek, setPaymentWeek] = useState(''),
        [totalPayment, setTotalPayment] = useState(''),
        [weeksPaid, setWeeksPaid] = useState(''),
        [weeksNotPaid, setWeeksNotPaid] = useState(''),
        [amountPaid, setAmountPaid] = useState(''),
        [amountNotPaid, setAmountNotPaid] = useState(''),
        [advance, setAdvance] = useState(''),
        [status, setStatus] = useState(''),
        [customerName, setCustomerName] = useState(''), [customerPersonalId, setCustomerPersonalId] = useState(''),
        [customerPhone, setCustomerPhone] = useState(''), [customer_id, setCustomer_Id] = useState(''),
        [mora, setMora] = useState(''), [weeksDue, setWeeksDue] = useState('');

    customer_id = manager_id;


    const [manager, setManager] = useState([]);

    useEffect(() => {
        getManagerData()
    }, [])

    useEffect(() => {
        getCustomerDetails()
    }, [])

    const getCustomerDetails = async () => {
        const res = await axios.get(`${url}customer/${manager_id}/${id}`)
        console.log(res.data)
        setCustomerName(res.data[0].customerName)
        setCustomerPhone(res.data[0].customerPhone)
        setCustomerPersonalId(res.data[0].customerPersonalId)
        setAmount(res.data[0].amount)
        setWeeksPaid(res.data[0].weeksPaid)
        setPaymentWeek(res.data[0].paymentWeek)
        setAmountPaid(res.data[0].amountPaid)
        setAmountNotPaid(res.data[0].amountNotPaid)
        setWeeksNotPaid(res.data[0].weeksNotPaid)
        setMora(res.data[0].mora)
        setAdvance(res.data[0].advance)
        setTotalPayment(res.data[0].totalPayment)
        setWeeksDue(res.data[0].weeksDue)
        setStatus(res.data[0].status)
    };



    const getManagerData = async () => {
        const result = await axios.get(`${url}${manager_id}`)
        setManager(result.data)
    }

    let company_name = '', user = '';

    manager.map((data) => (
        company_name = data.companyName,
        user = data.managerEmail
    ))
    status = 'inactive'

    const saveCustomerDetails = async (e) => {
        e.preventDefault();
        await axios.put(`${url}edit/${manager_id}/${id}`, { customerPersonalId: customerPersonalId, customerPhone: customerPhone, customerName: customerName, amount: amount, totalPayment: totalPayment, amountPaid: amountPaid, amountNotPaid: amountNotPaid, weeksPaid: weeksPaid, weeksNotPaid: weeksNotPaid, advance: advance, details_id: id, paymentWeek: paymentWeek, status: status },
            navigate(`/customers/${manager_id}`)

        )
    }


    return (
        <div style={{ display: 'flex', overflow: 'scroll initail' }}>
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
                        <a>
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
                <CDBSidebarFooter>
                    <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
                        Sidebar Footer
                    </div>
                </CDBSidebarFooter>

            </CDBSidebar>

            <div style={{ display: 'block', width: 700, padding: 30 }}>
                <h1>Guardar historial</h1>
                <Form onSubmit={saveCustomerDetails}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            readOnly
                        />

                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cedula</Form.Label>
                        <Form.Control
                            value={customerPersonalId}
                            onChange={(e) => setCustomerPersonalId}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Semanas pagadas</Form.Label>
                        <Form.Control
                            value={weeksPaid}
                            onChange={(e) => setWeeksPaid}
                            readOnly
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pago por semana</Form.Label>
                        <Form.Control
                            value={paymentWeek}
                            onChange={(e) => setPaymentWeek}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad pagada</Form.Label>
                        <Form.Control
                            value={amountPaid}
                            onChange={(e) => setAmount}

                            readOnly
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad no pagada</Form.Label>
                        <Form.Control
                            value={amountNotPaid}
                            onChange={(e) => setAmountNotPaid(e.target.value)}

                            readOnly
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Semanas no pagadas</Form.Label>
                        <Form.Control
                            value={weeksNotPaid}
                            onChange={(e) => setWeeksNotPaid(e.target.value)}

                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mora</Form.Label>
                        <Form.Control
                            value={mora}
                            onChange={(e) => setMora(e.target.value)}
                            readOnly

                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Abono</Form.Label>
                        <Form.Control
                            value={advance}
                            onChange={(e) => setAdvance(e.target.value)}

                            required
                            readOnly
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
                        <Form.Label>Semanas atrasadas</Form.Label>
                        <Form.Control
                            value={weeksDue}
                            onChange={(e) => setWeeksDue(e.target.value)}
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

export default CustomerDetails;