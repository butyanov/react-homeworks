import Card from "../models/card";
import CardWithPriority from "../models/card-with-priority";
import DateTimeProvider from "../services/date-time-provider";

export default class CardsRepository {
    private dateTimeProvider = new DateTimeProvider();
    private maxPriority: number = 0;
    private cardsWithPriority: CardWithPriority[] = [];
    
    getCardsCount = () => {
        return this.maxPriority;
    }
    
    getAll = () => {
        return this.cardsWithPriority;
    };
    
    getAllPaginated = (page: number, pageSize: number) => {
        const start = page * pageSize;
        const end = start + pageSize;
        return this.cardsWithPriority.slice(start, end);
    };

    createCard = (cardContent: string) => {
        let utcNow = this.dateTimeProvider.utcNow;
        let card = new Card(cardContent, utcNow);
        const newCardWithPriority = new CardWithPriority(++this.maxPriority, card.content, card.createdAt);
        this.cardsWithPriority.push(newCardWithPriority);
    };

    deleteCard = (cardId: string) => {
        if (this.cardsWithPriority.length === 0) return false;
        this.maxPriority -= 1;
        this.cardsWithPriority = this.cardsWithPriority.filter(card => card.id !== cardId);
        return true;
    };

    increaseCardPriority = (cardId: string) => {
        const index = this.cardsWithPriority.findIndex(card => card.id === cardId);
        if (index > 0) {
            [this.cardsWithPriority[index].priority, this.cardsWithPriority[index - 1].priority] =
                [this.cardsWithPriority[index - 1].priority, this.cardsWithPriority[index].priority];

            [this.cardsWithPriority[index], this.cardsWithPriority[index - 1]] =
                [this.cardsWithPriority[index - 1], this.cardsWithPriority[index]];
        }
    };

    decreaseCardPriority = (cardId: string) => {
        const index = this.cardsWithPriority.findIndex(card => card.id === cardId);
        if (index < this.cardsWithPriority.length - 1) {
            [this.cardsWithPriority[index].priority, this.cardsWithPriority[index + 1].priority] =
                [this.cardsWithPriority[index + 1].priority, this.cardsWithPriority[index].priority];

            [this.cardsWithPriority[index], this.cardsWithPriority[index + 1]] =
                [this.cardsWithPriority[index + 1], this.cardsWithPriority[index]];
        }
    };
}
