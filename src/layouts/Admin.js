import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import { rutas } from "config/rutas.js";
import PrivateRoute from "config/PrivateRoute.js";
import { rutasReportes } from "config/rutasReportes.js";
import PrivateRouteReport from "config/PrivateRouteReport.js";
import Unauthorized from "views/security/Unauthorized.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/security/Unauthorized" exact component={Unauthorized} />
            {rutas.map(({ key, path, component }) => (
              <PrivateRoute key={key} path={path} exact component={component} />
            ))}
            {rutasReportes.map(({ key, path, component }) => (
              <PrivateRouteReport key={key} path={path} exact component={component} />
            ))}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
