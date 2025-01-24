import { makeAutoObservable } from "mobx";
import ProductService, { Product } from "../services/product-service";

class ProductStore {
    products: Product[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadProducts();
    }
    
    loadProducts() {
        const products = ProductService.getAllProducts();
        this.products = Array.from(products);
    }
    
    addProduct(data: Omit<Product, "_id">) {
        ProductService.createProduct(data);
        this.loadProducts();
    }
    
    updateProduct(id: Product["_id"], data: Partial<Omit<Product, "_id">>) {
        ProductService.updateProduct(id, data);
        this.loadProducts();
    }
    
    deleteProduct(id: Product["_id"]) {
        ProductService.deleteProduct(id);
        this.loadProducts();
    }
}

const productStore = new ProductStore();
export default productStore;
