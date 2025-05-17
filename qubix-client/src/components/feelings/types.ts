export interface IFeeling {
	id?: string;
	name: string;
	emoji: string;
}

export interface IAction {
	id?: string;
	name: string;
	emoji: string;
	subActions?: ISubAction[];
}

export interface ISubAction {
	id?: string;
	name: string;
	emoji: string;
}
