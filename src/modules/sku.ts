import {SKU_REPOSITORY} from "../repositories/skuRepository";

export interface SkuData {
    id: string;
    name: string;
    price: number;
}

export class Sku implements SkuData {
    id;
    name;
    price;

    static ERROR_TYPES = {
        SKU_NOT_FOUND: 'SKU_NOT_FOUND'
    }

    static SKU_REPOSITORY: SkuData[] = SKU_REPOSITORY;

    static async getSkuById(id: string): Promise<Sku> {
        const skuData = this.SKU_REPOSITORY.find(item => item.id === id);

        if (!skuData) {
            throw new Error(Sku.ERROR_TYPES.SKU_NOT_FOUND);
        }

        return new Sku(skuData.id, skuData.name, skuData.price);
    }

    constructor(id: string, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
