import Card from "./card";

export default class CardWithPriority extends Card {
    priority: Number
    constructor(priority: Number, cardContent: string, createdAt: Date) {
        super(cardContent, createdAt)
        this.priority = priority
    }
    
    setPriority = (value: Number) => {
        this.priority = value
    }

    get getPriority() {
        return this.priority
    }
}