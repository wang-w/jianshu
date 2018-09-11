import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { 
    HeaderWrapper, 
    Logo, Nav, NavItem, 
    NavSearch, Addition, 
    Button, SearchWrapper, SearchInfo, SearchInfoTitle,
    SearchInfoSwitch, SearchInfoItem, SearchInfoList
} from './style';

class Header extends Component {
    getListArea(show) {
        if (show) {
            return (
                <SearchInfo>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch>换一换</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {  
                            this.props.list.map((item, index) => {
                                return <SearchInfoItem key={index}>{item}</SearchInfoItem>
                            })
                        }
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null
        }
    }

    render() {
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
                    <NavSearch className={ this.props.focused ? 'focused' : ''}
                    onFocus = {this.props.handleInputFocus} 
                    onBlur = {this.props.handleInputBlur} >
                    </NavSearch>
                    <i className={ this.props.focused ? 'iconfont focused' : 'iconfont'}>&#xe623;</i>
                    { this.getListArea(this.props.focused) }
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
}

const mapStateToProps = (state) => {
    return {
        focused: state.get('header').get('focused'),
        list: state.getIn(['header', 'list'])
    }
}

const mapDisPatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            const action = actionCreators.searchFocus();
            dispatch(actionCreators.getList())
            dispatch(action);
        },
        handleInputBlur() {
            const action = actionCreators.searchBlur();
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Header);