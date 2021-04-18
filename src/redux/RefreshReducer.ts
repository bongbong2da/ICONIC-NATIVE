export const REFRESH_CHANNEL_LIST = 'refresh/REFRESH_CHANNEL_LIST';
export const REFRESH_POSTING_LIST = 'refresh/REFRESH_POSTING_LIST';

export const refreshChannelList = () => ({type : REFRESH_CHANNEL_LIST});
export const refreshPostingList = () => ({type : REFRESH_POSTING_LIST});

const initialRefreshStates = {
    channelList : false,
    postingList : false,
}

export const RefreshReducer = (state = initialRefreshStates, action : any) => {
    switch (action.type) {
        case REFRESH_CHANNEL_LIST:
            return {
                ...state,
                channelList : !state.channelList
            }
        case REFRESH_POSTING_LIST:
            return {
                ...state,
                postingList : !state.postingList
            }
        default : return state;
    }
}
