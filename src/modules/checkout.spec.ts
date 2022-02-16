import {Checkout} from "./checkout";
import {PricingRule} from "./pricingRule";
import {Sku} from "./sku";


describe("checkout tests", () => {
    it("should calculate correct total for rule 3 for 2 deal", () => {
        const pricingRule1 = new PricingRule('1', '3 for 2 deal on Apple TVs', (allItems, item, index, currentPrice: number) => {
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
        });

        const ca1 = new Checkout([pricingRule1]);
        const ca2 = new Checkout([pricingRule1]);

        ca1.scan(new Sku('atv', 'Apple TV', 10950));
        ca1.scan(new Sku('atv', 'Apple TV', 10950));
        ca1.scan(new Sku('atv', 'Apple TV', 10950));

        ca2.scan(new Sku('atv', 'Apple TV', 10950));
        ca2.scan(new Sku('atv', 'Apple TV', 10950));
        ca2.scan(new Sku('atv', 'Apple TV', 10950));
        ca2.scan(new Sku('atv', 'Apple TV', 10950));
        ca2.scan(new Sku('atv', 'Apple TV', 10950));
        ca2.scan(new Sku('atv', 'Apple TV', 10950));

        expect(ca1.total().totalPrice).toBe(21900);
        expect(ca2.total().totalPrice).toBe(43800);
    });

    it("should calculate correct total for rule discount if you buy more than 4 Super iPad", () => {
        const pricingRule2 = new PricingRule('2', 'Super iPad discount if you buy more than 4 Super iPad', (allItems, item, index, currentPrice: number) => {
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
        });

        const ca1 = new Checkout([pricingRule2]);

        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));

        expect(ca1.total().totalPrice).toBe(54999 * 4);

        ca1.scan(new Sku('ipd', 'Super iPad', 54999));

        expect(ca1.total().totalPrice).toBe(49999 * 5);
    });

    it("should calculate correct total with different skus and multiple price rules", () => {
        const pricingRule1 = new PricingRule('1', '3 for 2 deal on Apple TVs', (allItems, item, index, currentPrice: number) => {
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
        });
        const pricingRule2 = new PricingRule('2', 'Super iPad discount if you buy more than 4 Super iPad', (allItems, item, index, currentPrice: number) => {
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
        });

        const ca1 = new Checkout([pricingRule1, pricingRule2]);

        ca1.scan(new Sku('atv', 'Apple TV', 10950));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('atv', 'Apple TV', 10950));
        ca1.scan(new Sku('atv', 'Apple TV', 10950));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));

        expect(ca1.total().totalPrice).toBe(5 * 49999 + 2 * 10950);
    });

    it("should calculate correct total without pricing rules", () => {
        const ca1 = new Checkout([]);

        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));
        ca1.scan(new Sku('ipd', 'Super iPad', 54999));

        expect(ca1.total().totalPrice).toBe(54999 * 4);

        ca1.scan(new Sku('ipd', 'Super iPad', 54999));

        expect(ca1.total().totalPrice).toBe(54999 * 5);
    });

    it('should return total totalPrice in total() response', () => {
        const ca1 = new Checkout([]);

        expect(ca1.total()).toHaveProperty('totalPrice');

        ca1.scan(new Sku('ipd', 'Super iPad', 54999));

        expect(ca1.total()).toHaveProperty('totalPrice');
    })
});
