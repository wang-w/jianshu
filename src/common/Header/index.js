import React from 'react';
import { connect } from 'react-redux';

import { 
    HeaderWrapper, 
    Logo, Nav, NavItem, 
    NavSearch, Addition, 
    Button, SearchWrapper
} from './style'

const Header = (props) => {
    console.log(props)
    return (
        <HeaderWrapper>
            <Logo />
            <Nav>
                <NavItem className='left active'>首页</NavItem>
                <NavItem className='left'>下载App</NavItem>
                <NavItem className='right'>登录</NavItem>
                <NavItem className='right'>
                    <i className="iconfont">&#xe636;</i>
                </NavItem>
                <SearchWrapper>
                    <NavSearch className={ props.focused ? 'focused' : ''}
                    onFocus = {props.handleInputFocus} 
                    onBlur = {props.handleInputBlur} >
                    </NavSearch>
                    <i className={ props.focused ? 'iconfont focused' : 'iconfont'}>&#xe623;</i>
                </SearchWrapper>
            </Nav>
            <Addition>
                <Button className='writting'>
                    <i className="iconfont">&#xe624;</i>
                    写文章
                </Button>
                <Button className='reg'>注册</Button>
            </Addition>
        </HeaderWrapper>
    )

}

const mapStateToProps = (state) => {
    return {
        focused: state.focused
    }
}

const mapDisPatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            const action = {
                type: 'search_focus'
            };
            dispatch(action);
        },
        handleInputBlur() {
            const action = {
                type: 'search_blur'
            };
            dispatch(action);
        }
    }
}



export default connect(mapStateToProps, mapDisPatchToProps)(Header);