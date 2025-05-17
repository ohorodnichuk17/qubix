import {
	angryFeelingImg,
	basketballImg,
	birthdayImg,
	breakfastImg,
	celebratingImg,
	drinkingImg,
	eatingImg,
	flyingImg,
	footballImg,
	franceImg,
	happyFeelingImg,
	hearingImg,
	inLoveFeelingImg,
	juiceImg,
	laughingFeelingImg,
	loveImg,
	musicImg,
	particicapingImg,
	playingImg,
	portugalImg,
	readingImg,
	sadFeelingImg,
	searchingImg,
	shockedFeelingImg,
	sickFeelingImg,
	smilingFeelingImg,
	spainImg,
	starstruckFeelingImg,
	surprisedFeelingImg,
	tvImg,
	usaImg,
	viewingImg,
	waterImg,
	weddingImg,
	wineImg,
	winkFeelingImg,
	xmasImg,
} from "../../utils/images";
import type { IAction, ISubAction } from "./types";

export const FEELING_OPTIONS = [
	{
		emoji: angryFeelingImg,
		name: "Angry",
	},
	{
		emoji: happyFeelingImg,
		name: "Happy",
	},
	{
		emoji: inLoveFeelingImg,
		name: "In Love",
	},
	{
		emoji: laughingFeelingImg,
		name: "Laughing",
	},
	{
		emoji: sadFeelingImg,
		name: "Sad",
	},
	{
		emoji: shockedFeelingImg,
		name: "Shocked",
	},
	{
		emoji: sickFeelingImg,
		name: "Sick",
	},
	{
		emoji: smilingFeelingImg,
		name: "Smiling",
	},
	{
		emoji: starstruckFeelingImg,
		name: "Starstruck",
	},
	{
		emoji: surprisedFeelingImg,
		name: "Suprized",
	},
	{
		emoji: winkFeelingImg,
		name: "Wink",
	},
];
export const CELEBRATION_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: celebratingImg,
		name: "New Year",
	},
	{
		emoji: birthdayImg,
		name: "Birthday",
	},
	{
		emoji: loveImg,
		name: "Love",
	},
	{
		emoji: xmasImg,
		name: "Christmas",
	},
	{
		emoji: celebratingImg,
		name: "Friday",
	},
];

export const DRINKING_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: waterImg,
		name: "Water",
	},
	{
		emoji: juiceImg,
		name: "Juice",
	},
	{
		emoji: wineImg,
		name: "Wine",
	},
	{
		emoji: drinkingImg,
		name: "Beer",
	},
];

export const EATING_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: eatingImg,
		name: "Dinner",
	},
	{
		emoji: breakfastImg,
		name: "Breakfast",
	},
	{
		emoji: eatingImg,
		name: "Lunch",
	},
];

export const FLYING_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: usaImg,
		name: "USA",
	},
	{
		emoji: franceImg,
		name: "France",
	},
	{
		emoji: portugalImg,
		name: "Portugal",
	},
	{
		emoji: spainImg,
		name: "Spain",
	},
];

export const HEARING_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: musicImg,
		name: "Music",
	},
];

export const PARTICIPATING_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: weddingImg,
		name: "Wedding",
	},
	{
		emoji: xmasImg,
		name: "Celebrating christmas",
	},
	{
		emoji: birthdayImg,
		name: "Birthday organization",
	},
	{
		emoji: footballImg,
		name: "Football match",
	},
];

export const PLAYING_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: playingImg,
		name: "Xbox",
	},
	{
		emoji: playingImg,
		name: "Playstation",
	},
	{
		emoji: basketballImg,
		name: "Basketball",
	},
	{
		emoji: footballImg,
		name: "Football",
	},
];

export const READING_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: readingImg,
		name: "Romance novel",
	},
	{
		emoji: readingImg,
		name: "Twilight",
	},
	{
		emoji: readingImg,
		name: "The Da Vinci Code",
	},
	{
		emoji: readingImg,
		name: "Harry Potter",
	},
];

export const SEARCHING_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: searchingImg,
		name: "Balance",
	},
	{
		emoji: searchingImg,
		name: "Answers",
	},
	{
		emoji: searchingImg,
		name: "Perfection",
	},
];

export const VIEWING_SUB_ACTIONS_OPTIONS: ISubAction[] = [
	{
		emoji: tvImg,
		name: "Rick and Morty",
	},
	{
		emoji: tvImg,
		name: "Our Planet",
	},
	{
		emoji: tvImg,
		name: "News",
	},
];

export const ACTION_OPTIONS: IAction[] = [
	{
		emoji: celebratingImg,
		name: "Celebrating",
		subActions: CELEBRATION_SUB_ACTIONS_OPTIONS,
	},
	{
		emoji: playingImg,
		name: "Playing",
		subActions: PLAYING_SUB_ACTIONS_OPTIONS,
	},
	{
		emoji: drinkingImg,
		name: "Drinking",
		subActions: DRINKING_SUB_ACTIONS_OPTIONS,
	},
	{
		emoji: readingImg,
		name: "Reading",
		subActions: READING_SUB_ACTIONS_OPTIONS,
	},
	{
		emoji: eatingImg,
		name: "Eating",
		subActions: EATING_SUB_ACTIONS_OPTIONS,
	},
	{
		emoji: searchingImg,
		name: "Searching",
		subActions: SEARCHING_SUB_ACTIONS_OPTIONS,
	},
	{
		emoji: flyingImg,
		name: "Flying to",
		subActions: FLYING_SUB_ACTIONS_OPTIONS,
	},
	{
		emoji: viewingImg,
		name: "Viewing",
		subActions: VIEWING_SUB_ACTIONS_OPTIONS,
	},
	{
		emoji: hearingImg,
		name: "Hearing",
		subActions: HEARING_SUB_ACTIONS_OPTIONS,
	},
	{
		emoji: particicapingImg,
		name: "Participating in",
		subActions: PARTICIPATING_SUB_ACTIONS_OPTIONS,
	},
];
