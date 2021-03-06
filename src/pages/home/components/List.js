import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { ListItem, ListInfo, LoadMore } from '../style';
import { Link } from 'react-router-dom';

class List extends PureComponent {
    render() {
        const { list, getMoreList, page } = this.props;
        return (
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <Link key={index} to={'/detail/' + item.get('id')}>
                                <ListItem >
                                    <img className="pic" src={item.get('imgUrl')} alt=''></img>
                                    <ListInfo>
                                        <h3 className="title">{item.get('title')}</h3>
                                        <p className="desc">{item.get('desc')}</p>
                                    </ListInfo>
                                </ListItem>
                            </Link>
                        )
                    })
                }
                <LoadMore onClick={() => getMoreList(page)}>更多</LoadMore>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.get('home').get('articleList'),
        page: state.getIn(['home', 'articlePage'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMoreList(page) {
            dispatch(actionCreators.getMoreList(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);