import type { IUser } from "../../../interfaces/account";
import type { IStory } from "../Story/list/types";

export interface ISearchUserResult extends IUser {
   stories: IStory[];
}