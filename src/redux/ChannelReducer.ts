export type ChannelTypes = {
    chanIdx : number,
    chanType : string,
    chanName : string,
    chanEmoji : string,
    chanPopMax : number,
    chanAnnounce : string,
    chanManager : string,
    chanIsPublic : string,
    chanReg : string,
    chanCode : string
}

export const SAVE_SELECTED_CHANNEL = 'channel/SAVE_SELECTED';

export const saveSelectedChannel = (channel : number) => ({type : SAVE_SELECTED_CHANNEL, payload : channel});

const initialChannelStates = {
    selectedChannel : 0
};

export const ChannelReducer = (state = initialChannelStates, action : any) => {
    switch (action.type) {
        case SAVE_SELECTED_CHANNEL:
            return {
                ...state,
                selectedChannel: action.payload
            };
        default: return state;
    }
}
