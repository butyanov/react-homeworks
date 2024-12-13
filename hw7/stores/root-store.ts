import CardsStore from "./cards-store";
import React from "react";
export default class RootStore {
    cardsStore
    
    constructor() {
        this.cardsStore = new CardsStore()
    }
}
export const rootStore = new RootStore()
export const storesContext = React.createContext(rootStore)

