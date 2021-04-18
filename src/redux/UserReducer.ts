const SAVE_USERINFO = 'user/SAVE';
const SET_LOGIN_STATUS = 'user/SET_LOGIN_STATUS'

export type UserInfoType = {
    id : number,
    username : string,
    token : string,
    profileImg : string,
    email : string,
    roles : string[],
    type : string,
}

export const saveUserInfo = (payload : UserInfoType) => ({type : SAVE_USERINFO, payload : payload});
export const setLoginStatus = (payload : boolean) => ({type : SET_LOGIN_STATUS, payload : payload});

const initialUserState = {
    userInfo : {} as UserInfoType,
    loginStatus : false
}

export const UserReducer = (state = initialUserState, action : any) => {
    switch (action.type) {
        case SAVE_USERINFO:
            return {
                ...state,
                userInfo: action.payload
            }
        case SET_LOGIN_STATUS:
            return {
                ...state,
                loginStatus: action.payload
            }
        default:
            return state;
    }
}
