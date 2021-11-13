import React from "react";
import "./Header.css"

export default props => 
    <header className="header" d-none d-sm d-sm-flex flex-column>
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon} mr-2`} ></i>{props.title}
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>