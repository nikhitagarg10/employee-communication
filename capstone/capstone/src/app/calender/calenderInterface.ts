export interface CalenderInterface{
    id?: String,
    title: string,
    start: string,
    end: string,
    category: categoryEnum,
    description?: String,
}

export enum categoryEnum{
    meeting="meeting",
	work="work",
	holiday="holiday",
	casual="casual",
	other="other"
}