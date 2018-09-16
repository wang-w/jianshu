import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const changeHomeData = (data) => ({
    type: constants.CHANGE_HOME_DATA,
    topicList: data.topicList,
    articleList: data.articleList,
    recommendList: data.recommendList
})

const addHomeList = (list, nextPage) => ({
    type: constants.ADD_ARTICLE_LIST,
    list: fromJS(list),
    nextPage
})

export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('/api/home.json').then((res) => {
            const data = res.data.data
            var action = changeHomeData(data)
            dispatch(action)
        }).catch(() => {

        })
    }
}

export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get('/api/homeList.json?page=' + page).then((res) => {
            const data = res.data.data
            dispatch(addHomeList(data, page + 1))
        }).catch(() => {

        })
    }
}

export const toggleTopShow = (show) => ({
    type: constants.TOGGLE_TOP_SHOW,
    show
})

