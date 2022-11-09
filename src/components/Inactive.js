import React, { useState, useEffect } from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const url = process.env.REACT_APP_API;

const Inactive = () => {
    let { manager_id, id } = useParams();
    let [manager, setManager] = useState([])

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

    let [inactiveCustomer, setInactiveCustomer] = useState([])

    useEffect(() => {
        getInactiveCustomer()
}, [])

    const getInactiveCustomer = async() => {
        const res = await axios.get(`${url}inactive/${manager_id}`)
        setInactiveCustomer(res.data)
    }

    const deleteCustomer = async(id) => {
         axios.delete(`${url}customer/${id}`)
        getInactiveCustomer()
       
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
                        <h1>Clientes inactivos</h1>
                        <table className="table">
                            <thead className="table-primary">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cedula</th>
                                    <th>Inicio</th>
                                    <th>Contacto</th>
                                    <th>Cantidad</th>
                                    <th>Ultimo cambio</th>
                                    <th>Semanas pagadas</th>
                                    <th>Semanas pendientes</th>
                                    <th>Cantidad pagada</th>
                                    <th>Cantidad pendiente</th>
                                    <th>Pago total</th>
                                    <th>Semanas atrasadas</th>
                                    <th>Mora</th>
                                    <th>Semanas</th>
                                    <th>Abono</th>
                                    <th>Accion</th>

                                </tr>

                            </thead>
                            <tbody>
                                {inactiveCustomer.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.customerName}</td>
                                        <td>{data.customerPersonalId}</td>
                                        <td>{data.createdAt}</td>
                                        <td>{data.customerPhone}</td>
                                        <td>{data.amount}</td>
                                        <td>{data.updatedAt}</td>
                                        <td>{data.weeksPaid}</td>
                                        <td>{data.weeksNotPaid}</td>
                                        <td>{data.amountPaid}</td>
                                        <td>{data.amountNotPaid}</td>
                                        <td>{data.totalPayment}</td>
                                        <td>{data.weeksDue}</td>
                                        <td>{data.mora}</td>
                                        <td>{data.weeks}</td>
                                        <td>{data.advance}</td>
                                        <td>
                                        <Link to={`/history/${manager_id}/${data.id}`} className='btn btn-success'><i className="fas fa-timeline"></i></Link>
                                        <Link to={`/renew/${manager_id}/${data.id}`} className='btn btn-primary'><i className="fas fa-edit"></i></Link>
                                        <button onClick={() => deleteCustomer(data.id)} className="btn btn-danger" ><i className="fas fa-trash-alt"></i></button>


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

export default Inactive;
