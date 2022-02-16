import {PricingRuleData} from "../modules/pricingRule";

export const PRICE_RULE_REPOSITORY: PricingRuleData[] = [
    {
        id: '1',
        description: '3 for 2 deal on Apple TVs',
        getItemPrice(allItems, item, index, currentPrice: number) {
            const skuIdToApply = 'atv';
            const isRelatedSku = skuIdToApply === item.id;

            if (!isRelatedSku) {
                return currentPrice;
            }

            const isThird = allItems.slice(0, index).filter(item => item.id === 'atv').length % 3 === 2;

            if (isThird) {
                return 0;
            }

            return currentPrice;
        },
    },

    {
        id: '2',
        description: 'Super iPad discount if you buy more than 4 Super iPad',
        getItemPrice(allItems, item, index, currentPrice: number) {
            const skuIdToApply = 'ipd';
            const isRelatedSku = skuIdToApply === item.id;

            if (!isRelatedSku) {
                return currentPrice;
            }

            const isMoreThan4 = allItems.filter(item => item.id === 'ipd').length > 4;

            if (isMoreThan4) {
                return 49999;
            }

            return currentPrice;
        },
    }
];
