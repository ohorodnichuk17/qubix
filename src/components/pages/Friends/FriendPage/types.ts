export interface IFriendRecommendation{
    id:string;
    firstName:string;
    lastName:string;
    avatar:string;
}

export interface ISendFriendRequest {
    userId: string;
    friendId: string;
}
