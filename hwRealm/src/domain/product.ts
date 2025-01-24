export const ProductSchema = {
    name: "Product",
    properties: {
        _id: "objectId",
        name: "string",
        description: "string",
        price: "float",
        image: "string",
    },
    primaryKey: "_id",
};
