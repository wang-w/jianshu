import React, { Component } from 'react';
import {connect} from "react-redux";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {
    LoginWrapper
} from './style';
import {actionCreators} from "../Header/store";

const FormItem = Form.Item;

class Login extends Component {

    render() {
        return (
            <LoginWrapper>
                <Form className="login-form">
                    <FormItem>
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    </FormItem>
                    <FormItem>
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.props.handleSubmit} className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </LoginWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.getIn(['header', 'login'])
    }
}

const mapDisPatchToProps = (dispatch) => {
    return {
        handleSubmit() {
            const action = {
                type: 'change_login',
                login: true
            }
            dispatch(action)
        },
    }
}


export default connect(mapStateToProps, mapDisPatchToProps)(Login);