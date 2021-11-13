import React from "react";
import "./Nav.css"
import Aref from "./Aref";


export default props => 
    <aside className="menu-area">
        <nav className="menu">
            <Aref link="/" icon="home" name="Início" />
            <Aref link="/insumos" icon="archive" name="Insumos" />
            <Aref link="/produtos" icon="bitbucket" name="Produtos" />
        </nav>
    </aside>