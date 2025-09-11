/**
 * Classe Address responsável por representar um endereço (carregar dados e não manipular).
 * @class Address
 * @property {string} _street - Rua do endereço.
 * @property {number} _number - Número do endereço.
 * @property {string} _city - Cidade do endereço.
 * @property {string} _zipCode - CEP do endereço.
 */
export default class Address {

    _street: string = "";
    _number: number;
    _city: string = "";
    _zipCode: string = "";

    constructor(street: string, number: number, city: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._zipCode = zipCode;
        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get city(): string {
        return this._city;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    validate(): void {
        if (!this._street) {
            throw new Error('Street is required');
        }
        if (!this._number) {
            throw new Error('Number is required');
        }
        if (!this._city) {
            throw new Error('City is required');
        }
        if (!this._zipCode) {
            throw new Error('Zip code is required');
        }
    }
}