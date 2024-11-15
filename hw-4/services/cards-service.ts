import CardsRepository from "@/repositories/cards-repository";

export default class CardsService {
    private repository = new CardsRepository();

    getCardsCount = () => {
        return this.repository.getCardsCount();
    }
    getAllCards = () => {
        return this.repository.getAll();
    };

    getCardsPaginated = (page: number, pageSize: number) => {
        return this.repository.getAllPaginated(page, pageSize);
    };

    createCard = (cardContent: string) => {
        this.repository.createCard(cardContent);
    };

    deleteCard = (cardId: string) => {
        this.repository.deleteCard(cardId);
    };

    increaseCardPriority = (cardId: string) => {
        this.repository.increaseCardPriority(cardId);
    };

    decreaseCardPriority = (cardId: string) => {
        this.repository.decreaseCardPriority(cardId);
    };
}
