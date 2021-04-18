import {combineReducers} from "redux";
import {UserReducer} from "./UserReducer";
import {ChannelReducer} from "./ChannelReducer";
import {RefreshReducer} from "./RefreshReducer";

const RootReducer = combineReducers({
    userInfo : UserReducer,
    channel : ChannelReducer,
    refresh : RefreshReducer
});

export default  RootReducer;

export type RootState = ReturnType<typeof RootReducer>;
