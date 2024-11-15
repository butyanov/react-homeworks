import Card from "@/models/card";

export default class CardsRepository
{
    private cards: Card[] = [
    ]
    getAll = () => {
        return this.cards
    }
    
    createCard = (card: Card) => {
        this.cards.push(card)
        return true
    }

    deleteCard = (cardId: string) => {
        let newSet = this.cards.filter(x => x.id == cardId)
        this.cards = newSet
        
        return true
    }
}