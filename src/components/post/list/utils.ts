import { ACTION_OPTIONS, FEELING_OPTIONS } from "../../feelings/constants.ts";
import type { IAction, IFeeling, ISubAction } from "../../feelings/types.ts";

export const getPublicationDate = (date: string) =>
	new Date(date).toDateString();

export const getActionImage = (action: IAction, subAction: ISubAction) =>
	subAction
		? ACTION_OPTIONS.find((a) => a.name === action.name)?.subActions?.find(
				(s) => s.name === subAction.name,
			)?.emoji
		: ACTION_OPTIONS.find((a) => a.name === action.name)?.emoji;

export const getFeelingImage = (feeling: IFeeling) =>
	FEELING_OPTIONS.find((f) => f.name === feeling.name)?.emoji;
