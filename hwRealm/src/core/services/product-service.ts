import { RealmContext } from "../../persistence/realm-context.ts";
import { ObjectId } from "bson";

export type Product = {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    image: string;
};

export default class ProductService {
    static createProduct(data: Omit<Product, "_id">) {
        RealmContext.write(() => {
            RealmContext.create("Product", { ...data, _id: new ObjectId() });
        });
    }
    
    static getAllProducts() {
        return RealmContext.objects("Product") as unknown as Product[];
    }
    
    static updateProduct(id: ObjectId, data: Partial<Omit<Product, "_id">>) {
        RealmContext.write(() => {
            const product = RealmContext.objectForPrimaryKey<Product>("Product", id);
            if (product) {
                Object.assign(product, data);
            }
        });
    }

    static deleteProduct(id: ObjectId) {
        RealmContext.write(() => {
            const product = RealmContext.objectForPrimaryKey<Product>("Product", id);
            if (product) {
                RealmContext.delete(product);
            }
        });
    }
}
