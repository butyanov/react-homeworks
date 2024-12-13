import UUID from 'react-native-uuid';
export default class Card {
    id: string = UUID.v4()
    content: string;
    createdAt: Date;
    
    constructor(content: string, createdAt: Date) {
        this.content = content
        this.createdAt = createdAt
    }
}