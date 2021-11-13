import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Home from "../components/home/Home"
import InsumoCrud from "../components/Insumos/InsumoCrud";
import ProdutoCrud from "../components/Produtos/ProdutoCrud";


export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/insumos" component={InsumoCrud} />
        <Route path="/produtos" component={ProdutoCrud} />
        <Redirect from="*" to="/" />
    </Switch>