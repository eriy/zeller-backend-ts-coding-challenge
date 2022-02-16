type CURRENCY = 'us cents' | 'euro cents';

const PRICE_REPOSITORY = [
    {
        id: '1',
        value: 54900,
        currency: 'us cents' as CURRENCY
    },
    {
        id: '2',
        value: 139999,
        currency: 'us cents' as CURRENCY
    },
    {
        id: '3',
        value: 10950,
        currency: 'us cents' as CURRENCY
    },
    {
        id: '4',
        value: 3000,
        currency: 'us cents' as CURRENCY
    },
]

export class Price {
    id: string;
    value: number;
    currency: CURRENCY;

    static ERROR_TYPES = {
        PRICE_NOT_FOUND: 'PRICE_NOT_FOUND'
    }

    static async getPriceById(id: string) {
        const priceData = PRICE_REPOSITORY.find(item => item.id === id);

        if (priceData) {
            return new Price(priceData.id, priceData.value, priceData.currency)
        } else {
            throw new Error(Price.ERROR_TYPES.PRICE_NOT_FOUND);
        }
    }

    constructor(id: string, value: number, currency: CURRENCY) {
        this.id = id;
        this.value = value;
        this.currency = currency
    }
}
