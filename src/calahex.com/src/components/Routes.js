import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../utils/PropsRoute";
import Landing from "../pages/Home/Landing";
import SignUp from "../pages/Auth/SignUp";
import Login from "../pages/Auth/LogIn";
import TokenInfoBase from "../pages/Tokens/TokenBaseInfo";
import TokenExchange from "../pages/Tokens/TokenExchange";
import CryptoExchange from "../pages/Crypto/CryptoExchange";
import Terms from "../pages/Help/Terms";
import ESign from "../pages/Help/ESign";
import Future from "../pages/Future/Future";

function Routes(props) {
    const { selectLanding } = props;

    return (
        <Switch>
            <PropsRoute path="/" exact component={Landing} selectLanding={selectLanding} />
            <PropsRoute path="/login" exact component={Login} selectLanding={selectLanding} />
            <PropsRoute path="/sign-up" exact component={SignUp} selectLanding={selectLanding} />
            <PropsRoute path="/token-info-base" exact component={TokenInfoBase} selectLanding={selectLanding} />
            <PropsRoute path="/token-exchange" exact component={TokenExchange} selectLanding={selectLanding} />
            <PropsRoute path="/crypto-exchange" exact component={CryptoExchange} selectLanding={selectLanding} />
            <PropsRoute path="/future-trading" exact component={Future} selectLanding={selectLanding} />
            <PropsRoute path="/terms" exact component={Terms} selectLanding={selectLanding} />
            <PropsRoute path="/esign" exact component={ESign} selectLanding={selectLanding} />
        </Switch>
    );
}

Routes.propTypes = {
    selectLanding: PropTypes.func.isRequired,
};

export default memo(Routes);
