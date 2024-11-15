import { v4 as uuid } from 'uuid';
export default class Card {
    id: string = uuid()
    content: string;
    createdAt: Date;
    
    constructor(content: string, createdAt: Date) {
        this.content = content
        this.createdAt = createdAt
    }
}