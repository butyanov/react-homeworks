import Card from "@/models/card";
import CardsRepository from "@/repositories/cards-repository";
import DateTimeProvider from "@/services/date-time-provider";
import CardWithPriority from "@/models/card-with-priority";

export default class CardsService
{
    private maxPriority: Number = 0
    private cardsWithPriority: CardWithPriority[] = []
    private cardsRepository
    private dateTimeProvider
    
    constructor() {
        this.cardsRepository = new CardsRepository()
        this.dateTimeProvider = new DateTimeProvider()
    }
    
    pullAllCards = () => {
        let cardsWithPriority = this.cardsRepository.getAll().map((c, i) => {
            this.maxPriority = i;
            return new CardWithPriority(i, c.content, c.createdAt)
        })
        
        return this.cardsWithPriority = cardsWithPriority
    }

    pushCard = (cardContent: string) => {
        let utcNow = this.dateTimeProvider.utcNow
        let card = new Card(cardContent, utcNow)
        
        this.cardsRepository.createCard(card)
        
        this.cardsWithPriority.push(new CardWithPriority(this.maxPriority, card.content, card.createdAt))
    }

    deleteCard = (cardId: string) => {
        return this.cardsRepository.deleteCard(cardId)
    }

    pullAllCardsWithPriorities = () => {
        return this.cardsWithPriority
    }
    
    moveCardUp = (cardId: string) => {
        const index = this.cardsWithPriority.findIndex(card => card.id === cardId);
        if (index > 0) {
            [this.cardsWithPriority[index].priority, this.cardsWithPriority[index - 1].priority] =
                [this.cardsWithPriority[index - 1].priority, this.cardsWithPriority[index].priority];
            
            [this.cardsWithPriority[index], this.cardsWithPriority[index - 1]] =
                [this.cardsWithPriority[index - 1], this.cardsWithPriority[index]];
        }
    };
    
    moveCardDown = (cardId: string) => {
        const index = this.cardsWithPriority.findIndex(card => card.id === cardId);
        if (index < this.cardsWithPriority.length - 1) {
            [this.cardsWithPriority[index].priority, this.cardsWithPriority[index + 1].priority] =
                [this.cardsWithPriority[index + 1].priority, this.cardsWithPriority[index].priority];
            
            [this.cardsWithPriority[index], this.cardsWithPriority[index + 1]] =
                [this.cardsWithPriority[index + 1], this.cardsWithPriority[index]];
        }
    };
}