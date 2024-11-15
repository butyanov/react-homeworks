import {makeAutoObservable} from "mobx";
import CardsService from "@/services/cards-service";

export default class CardsStore {
    private cardsService;
    isLoading: boolean = false;
    
    constructor() {
        this.cardsService = new CardsService();
        makeAutoObservable(this)
    }

    actionPull = () => {
        this.setIsLoading(true)
        
        setTimeout(() => {
            this.setIsLoading(false)
            
            return this.cardsService.pullAllCards()
        }, 1000);
    }

    actionPullWithPriorities = () => {
        this.setIsLoading(true)

        setTimeout(() => {
            this.setIsLoading(false)
        }, 1000);
        return this.cardsService.pullAllCardsWithPriorities()
    }
    
    actionPush = (cardContent: string) => {
        this.setIsLoading(true)
        
        this.cardsService.pushCard(cardContent)
        
        setTimeout(() => {
            this.setIsLoading(false)
        }, 1000);
    }

    actionDelete = (cardId: string) => {
        this.setIsLoading(true)

        this.cardsService.deleteCard(cardId)

        setTimeout(() => {
            this.setIsLoading(false)
        }, 1000);
    }
    
    setIsLoading = (value: boolean) => {
        this.isLoading = value
    }
}


