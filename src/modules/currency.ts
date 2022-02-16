interface CurrencyData {
    id: string;
    name: string;
    shortChar: string;
}

const CURRENCY_REPOSITORY: CurrencyData[] = [
    {
        id: 'USD',
        name: 'US Dollar',
        shortChar: '$'
    }
]

export class Currency {
    id: string;
    name: string;
    shortChar: string;

    static ERROR_TYPES = {
        CURRENCY_NOT_FOUND: 'CURRENCY_NOT_FOUND'
    }

    static async getCurrencyById(id: string): Promise<Currency> {
        const currencyData = CURRENCY_REPOSITORY.find(item => item.id === id);

        if (!currencyData) {
            throw new Error(Currency.ERROR_TYPES.CURRENCY_NOT_FOUND);
        }

        return new Currency(currencyData.id, currencyData.name, currencyData.shortChar);
    }

    constructor(id: string, name: string, shortChar: string) {
        this.id = id;
        this.name = name;
        this.shortChar = shortChar;
    }
}
