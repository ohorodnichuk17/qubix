import type { IUser } from "../../../interfaces/account";
import type { IStory } from "../../story/list/types";

export interface ISearchUserResult extends IUser {
	stories: IStory[];
}
