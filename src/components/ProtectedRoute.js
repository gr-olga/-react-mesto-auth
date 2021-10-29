import React from "react";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props})=>{
    return(
        <Route  path={props.path}>
            {
                ()=> props.isLogged ? <Component{...props}/> : <Redirect to="/signup"/>
            }
        </Route>
    )
}
export default ProtectedRoute