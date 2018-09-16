import React, { PureComponent } from 'react';
import { actionCreators } from './store';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { HomeWrapper, HomeLeft, HomeRight, BackTop } from './style'

class Home extends PureComponent {
    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img alt='' className="banner-img" src="//upload.jianshu.io/admin_banners/web_images/4461/e90d4b0b608e009c4aab2e9af02e30c0e30433eb.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"></img>
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
                {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null}
            </HomeWrapper>
        )
    }

    componentDidMount() {
        this.props.changeHomeData()
        this.bindEvent();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }

    handleScrollTop() {
        window.scrollTo(0, 0)
    }

    bindEvent() {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }
}

const mapStateToProps = (state) => {
    return {
        showScroll: state.getIn(['home', 'showScroll'])
    }
}

const mapDisPatchToProps = (dispatch) => {
    return {
        changeHomeData() {
            dispatch(actionCreators.getHomeInfo())
        },
        changeScrollTopShow() {
            console.log(document.documentElement.scrollTop)
            if (document.documentElement.scrollTop > 100) {
                dispatch(actionCreators.toggleTopShow(true))
            } else {
                dispatch(actionCreators.toggleTopShow(false))
            }
        }
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Home)