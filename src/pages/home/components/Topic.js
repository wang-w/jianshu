import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWrpper, TopicItem } from '../style';

class Topic extends PureComponent {
    render() {
        const {list} = this.props;
        return (
            <TopicWrpper>
                {
                    list.map((item) => {
                        return (
                            <TopicItem key={ item.get('id') }>
                                <img className="topic-pic" src={item.get('imgUrl')} alt=''></img>
                                { item.get('title') }
                            </TopicItem>
                        )
                    })
                }

            </TopicWrpper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.get('home').get('topicList'),
    }
}

export default connect(mapStateToProps, null)(Topic);