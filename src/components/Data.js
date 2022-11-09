import React, { useState, useEffect } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const url = process.env.REACT_APP_API;

const Data = () => {
  let { manager_id } = useParams();
  let [customer, setCustomer] = useState([]);
  let [manager, setManager] = useState([]);
  let [report, setReport] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getManagerData();
  }, []);

  let getManagerData = async () => {
    let res = await axios.get(`${url}${manager_id}`);
    setManager(res.data);
  };

  useEffect(() => {
    getReport();
  }, []);

  let getReport = async () => {
    let res = await axios.get(`${url}report/${manager_id}`);
    setReport(res.data);
  };

  let monthlyAmount = 0,
    monthlyPayment = 0,
    monthlyPendingAmount = 0;
  report.map(
    (data) => (
      (monthlyAmount += data.amount),
      (monthlyPayment += data.amountPaid),
      (monthlyPendingAmount += data.amountNotPaid)
    )
  );

  let company_name = "",
    user = "";

  manager.map(
    (data) => ((company_name = data.companyName), (user = data.managerEmail))
  );

  let getData = async () => {
    let res = await axios.get(`${url}customer/${manager_id}`);
    setCustomer(res.data);
  };

  let borrowedAmount = 0,
    profits = 0,
    totalCharge = 0,
    amountPaid = 0,
    amountNotPaid = 0;

  customer.map(
    (data) => (
      (borrowedAmount += data.amount),
      (totalCharge += data.totalPayment),
      (amountPaid += data.amountPaid),
      (amountNotPaid += data.amountNotPaid)
    )
  );

  profits = totalCharge - borrowedAmount;
  let customers = customer.length;
  return (
    <div style={{ display: "flex", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link
            to={`/dashboard/${manager_id}`}
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            {company_name}
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <a>
              <CDBSidebarMenuItem icon="user">{user}</CDBSidebarMenuItem>
            </a>
            <Link to={`/newCustomer/${manager_id}`}>
              <CDBSidebarMenuItem icon="add">
                Agregar cliente
              </CDBSidebarMenuItem>
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

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

      <div className="container">
        <div className="row">
          <div className="rol">
            <h1>Detalles de inversiones</h1>
            <table className="table">
              <thead className="table-primary">
                <tr>
                  <th>Capital</th>
                  <th>Pago total</th>
                  <th>Intereses</th>
                  <th>Clientes</th>
                  <th>Cantidad pagada</th>
                  <th>Cantidad pendiente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{borrowedAmount}</td>
                  <td>{totalCharge}</td>
                  <td>{profits}</td>
                  <td>{customers}</td>
                  <td>{amountPaid}</td>
                  <td>{amountNotPaid}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="rol">
            <h1>Reporte mensual</h1>
            <table className="table">
              <thead className="table-primary">
                <tr>
                  <th>Capital</th>
                  <th>Cantidad pagada</th>
                  <th>Cantidad no pagada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{monthlyAmount}</td>
                  <td>{monthlyPayment}</td>
                  <td>{monthlyPendingAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
