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
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'
import { useParams, Link } from "react-router-dom";

const url =  process.env.REACT_APP_API; 

const Dashboard = () => {
    let { manager_id } = useParams();

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


    const [dataChart, setDataChart] = useState([])
    useEffect(() => {
        getData(manager_id)
    }, [])

    const getData = async (manager_id) => {
        const res = await axios.get(`${url}customer/${manager_id}`);
        setDataChart(res.data)
    }
    
    let borrowedAmount = 0, profits = 0, totalCharge = 0, amountPaid = 0;

    dataChart.map((data) => (
        borrowedAmount += data.amount,
        totalCharge += data.totalPayment,
        amountPaid += data.amountPaid
    ));
    profits = totalCharge - borrowedAmount;
    console.log(borrowedAmount, totalCharge, profits, amountPaid)

    //data for the chart
    const data = [
        { name: "Total Prestado", "cantidadEsperada": borrowedAmount },
        { name: "Intereses", "cantidadEsperada": profits },
        { name: "Total a cobrar", "cantidadEsperada": totalCharge },
        {name:"Total pagado", "cantidadEsperada": amountPaid}
    ];

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
                <BarChart width={600} height={600} data={data}>
                    <Bar dataKey='cantidadEsperada' fill='green' />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </BarChart>

            </div>
        </div>
    )
}

export default Dashboard;