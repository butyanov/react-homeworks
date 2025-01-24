import Realm from "realm";
import {ProductSchema} from "../domain/product.ts";

export const RealmContext = new Realm({ schema: [ProductSchema] });