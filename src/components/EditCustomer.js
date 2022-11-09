import { useState, useEffect } from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const url = process.env.REACT_APP_API;
const Edit = () => {
    let { manager_id, id } = useParams();
    const navigate = useNavigate();
    let [manager, setManager] = useState([])

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

    let [customerName, setCustomerName] = useState(''),
        [customerPersonalId, setCustomerPersonalId] = useState(''),
        [customerPhone, setCustomerPhone] = useState(''),
        [amount, setAmount] = useState(''),
        [totalPayment, setTotalPayment] = useState(''),
        [weeksPaid, setWeeksPaid] = useState(''),
        [paymentWeek, setPaymentWeek] = useState(''),
        [amountPaid, setAmountPaid] = useState(''),
        [amountNotPaid, setAmountNotPaid] = useState(''),
        [weeksNotPaid, setWeeksNotPaid] = useState(''),
        [advance, setAdvance] = useState('');

    paymentWeek = (amount / 100) * 10;
    totalPayment = paymentWeek * 13;
    amountPaid = paymentWeek * weeksPaid;
    amountNotPaid = totalPayment - amountPaid;
    weeksNotPaid = 13 - weeksPaid;

    console.log(advance)
    useEffect(() => {
        getCustomer();
    }, [])

    const getCustomer = async () => {
        const res = await axios.get(`${url}customer/${manager_id}/${id}`);
        setCustomerName(res.data[0].customerName)
        setCustomerPersonalId(res.data[0].customerPersonalId)
        setCustomerPhone(res.data[0].customerPhone)
        setAmount(res.data[0].amount)
        setTotalPayment(res.data[0].totalPayment)
        setWeeksPaid(res.data[0].weeksPaid)
        setPaymentWeek(res.data[0].paymentWeek)
        setAmountPaid(res.data[0].amountPaid)
        setWeeksNotPaid(res.data[0].weeksNotPaid)
        setAdvance(res.data[0].advance)
        setWeeksPaid(res.data[0].weeksPaid)
    }

    const updateCustomer = async (e) => {
        e.preventDefault()
        await axios.put(`${url}edit/${manager_id}/${id}`, {
            customerName: customerName,
            customerPersonalId: customerPersonalId,
            customerPhone: customerPhone,
            amount: amount,
            totalPayment: totalPayment,
            weeksPaid: weeksPaid,
            weeksNotPaid: weeksNotPaid,
            amountPaid: amountPaid,
            amountNotPaid: amountNotPaid,
            advance: advance
        })
        navigate(`/customers/${manager_id}`)
        saveCustomerDetails()
    }

    const handleAdvance = () => {
        let  x = (advance * 10) / amount;
        x = x.toFixed(2);
        weeksPaid = weeksPaid +  parseFloat(x);
       setWeeksPaid(weeksPaid)
    };

    const saveCustomerDetails = async () => {
        await axios.post(`${url}details/${id}`, { customerPersonalId: customerPersonalId, customerPhone: customerPhone, customerName: customerName, amount: amount, totalPayment: totalPayment, amountPaid: amountPaid, amountNotPaid: amountNotPaid, weeksPaid: weeksPaid, weeksNotPaid: weeksNotPaid, advance: advance, details_id: id, paymentWeek: paymentWeek })
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

            <div style={{ display: 'block', width: 700, padding: 30 }}>
                <h1>Editar cliente</h1>
                <Form onSubmit={updateCustomer}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
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
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
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
                        <Form.Label>Pago por semana</Form.Label>
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
                            type="button"
                            value="Aplicar abono"
                            onClick={handleAdvance}
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
export default Edit;