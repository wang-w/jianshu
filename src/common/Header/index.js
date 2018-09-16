import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from './store';
import { 
    HeaderWrapper, 
    Logo, Nav, NavItem, 
    NavSearch, Addition, 
    Button, SearchWrapper, SearchInfo, SearchInfoTitle,
    SearchInfoSwitch, SearchInfoItem, SearchInfoList
} from './style';

class Header extends Component {
    getListArea() {
        const {focused, list, page, mouseIn, totalPage, handleChangePage} = this.props;
        const jsList = list.toJS();
        const pageList = [];
        if (jsList.length) {
            for (let i = (page - 1) * 10; i < page * 10; i++) {
                if (jsList[i]) {
                    pageList.push(
                        <SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>
                    )
                }
            }
        }
        if (focused || mouseIn) {
            return (
                <SearchInfo onMouseEnter={this.props.hanleMouseEnter} onMouseLeave={this.props.hanleMouseLeave}>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => {handleChangePage(page, totalPage, this.spinIcon)}}>
                        <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                            换一换
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        { pageList }
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null
        }
    }

    render() {
        const {focused, handleInputFocus, handleInputBlur, list} = this.props
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo />
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <NavSearch className={ focused ? 'focused' : ''}
                        onFocus = { () => handleInputFocus(list) } 
                        onBlur = {handleInputBlur} >
                        </NavSearch>
                        <i className={ focused ? 'iconfont focused zoom' : 'iconfont zoom'}>&#xe623;</i>
                        { this.getListArea(focused) }
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
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn'])
    }
}

const mapDisPatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            if (list.size === 0) {
                dispatch(actionCreators.getList())
            }
            const action = actionCreators.searchFocus();
            dispatch(action);
        },
        handleInputBlur() {
            const action = actionCreators.searchBlur();
            dispatch(action);
        },
        hanleMouseEnter() {
            dispatch(actionCreators.mouseEnter())
        },
        hanleMouseLeave() {
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            console.log(originAngle)
            if (originAngle) {
                originAngle = parseInt(originAngle, 10)
            } else {
                originAngle = 0
            }
            spin.style.transform = 'rotate(' + (originAngle + 360 ) + 'deg)'
            console.log(spin)
            if (page < totalPage) {
                dispatch(actionCreators.changePage(page + 1))
            } else {
                dispatch(actionCreators.changePage(1))
            }
            
        }
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Header);