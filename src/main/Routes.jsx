import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Home from "../components/home/Home"
import InsumoCrud from "../components/Insumos/InsumoCrud";
import ProdutoCrud from "../components/Produtos/ProdutoCrud";
import ComposicaoCrud from "../components/Composicao/ComposicaoCrud";

export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/insumos" component={InsumoCrud} />
        <Route path="/produtos" component={ProdutoCrud} />
        <Route path="/composicao" component={ComposicaoCrud} />
        <Redirect from="*" to="/" />
    </Switch>