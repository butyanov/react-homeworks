import { makeAutoObservable } from "mobx";
import CardsService from "@/services/cards-service";
import CardWithPriority from "@/models/card-with-priority";

export default class CardsStore {
    private service = new CardsService();
    cardsWithPriority: CardWithPriority[] = [];
    isLoading: boolean = false;
    page: number = 0;
    pageSize: number = 5;
    totalPages: number = 0;

    constructor() {
        makeAutoObservable(this);
    }
    
    loadCards = async () => {
        this.isLoading = true;
        try {
            this.totalPages = Math.ceil(this.service.getCardsCount() / this.pageSize);
            this.cardsWithPriority = this.service.getCardsPaginated(this.page, this.pageSize);
        } finally {
            this.isLoading = false;
        }
    };
    
    nextPage = async () => {
        if (this.page < this.totalPages) {
            this.page++;
           await this.loadCards();
        }
    };
    
    previousPage = async() => {
        if (this.page > 0) {
            this.page--;
            await this.loadCards();
        }
    };
    
    addCard = async(cardContent: string) => {
        this.service.createCard(cardContent);
        await this.loadCards(); 
    };
    
    removeCard = async(cardId: string) => {
        this.service.deleteCard(cardId);
        await this.loadCards();
    };
    
    increasePriority = async(cardId: string) => {
        this.service.increaseCardPriority(cardId);
        await this.loadCards();
    };
    
    decreasePriority = async(cardId: string) => {
        this.service.decreaseCardPriority(cardId);
        await this.loadCards();
    };
}
