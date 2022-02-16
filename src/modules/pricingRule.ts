
import {Sku} from "./sku";
import {PRICE_RULE_REPOSITORY} from "../repositories/priceRuleRepository";

export interface PricingRuleData {
    id: string;
    description: string;

    getItemPrice(allItems: Sku[], item: Sku, index: number, currentPrice: number): number;
}

export class PricingRule implements PricingRuleData {
    id;
    description;
    getItemPrice;

    private static PRICE_RULE_REPOSITORY: PricingRuleData[] = PRICE_RULE_REPOSITORY;

    static ERROR_TYPES = {
        PRICING_RULE_NOT_FOUND: 'PRICING_RULE_NOT_FOUND'
    }

    static async getPricingRuleById(id: string) {
        const rule = this.PRICE_RULE_REPOSITORY.find(item => item.id === id);

        if (!rule) {
            throw new Error(PricingRule.ERROR_TYPES.PRICING_RULE_NOT_FOUND);
        }

        return new PricingRule(rule.id, rule.description, rule.getItemPrice);
    }

    constructor(id: string, description: string, getItemPrice: (allItems: Sku[], item: Sku, index: number, currentPrice: number) => number ) {
        this.id = id;
        this.description = description;
        this.getItemPrice = getItemPrice;
    }
}
