import {Sku} from "./sku";
import {PricingRule} from "./pricingRule";

export class Checkout {
    private pricingRules: PricingRule[] = [];
    private items: Sku[] = [];

    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = pricingRules;
    }

    scan(item: Sku) {
        this.items.push(item);
    }

    total() {
        const itemsResult: {resultPrice: number, item: Sku, appliedRules: PricingRule[]}[] = [];

        return this.items.reduce((result, item, index, items) => {
            const appliedRules: PricingRule[] = []

            const resultForItem = this.pricingRules.reduce((ruleResult, rule) => {
                const price = rule.getItemPrice(items, ruleResult.item, index, ruleResult.resultPrice);
                const isRuleApplied = price !== ruleResult.resultPrice;

                if (isRuleApplied) {
                    ruleResult.appliedRules.push(rule);
                }

                ruleResult.resultPrice = price;

                return ruleResult
            }, {
                resultPrice: item.price,
                item,
                appliedRules,
            });

            result.totalPrice = result.totalPrice + resultForItem.resultPrice;
            result.itemsResult.push(resultForItem);

            return result;
        }, {
            totalPrice: 0,
            itemsResult
        })
    }
}
