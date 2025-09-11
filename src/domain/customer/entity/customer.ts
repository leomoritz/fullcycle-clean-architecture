import Address from "../value-object/address";

/**
 * Entidade Customer (contexto de negócio e não de persistência)
 * Representa um cliente com propriedades de identificação, nome e endereço.
 * Fornece métodos para acessar e modificar essas propriedades.
 * Trata-se de uma entidade anêmica, onde a classe só carrega dados e o identificador é o único atributo que define a identidade do cliente.
 * @class Customer
 * @property {string} _id - Identificador único do cliente.
 * @property {string} _name - Nome do cliente.
 * @property {string} _address - Endereço do cliente.
 */
export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get isActive(): boolean {
    return this._active;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate(): void {
    if (!this._id) {
      throw new Error('ID is required');
    }
    if (!this._name) {
      throw new Error('Name is required');
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address): void {
    if (address === undefined || address === null) {
      throw new Error('Invalid address');
    }

    this._address = address;
  }

  activate(): void {
    if (this._address === undefined || this._address === null) {
      throw new Error('Cannot activate customer without address');
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  addRewardPoints(points: number): void {
    if (points < 0) {
      throw new Error("Reward points must be greater than zero");
    }

    this._rewardPoints += points;
  }
}

/**
 * Complexidade de negócio
 * Domain
 *  - Entity
 *   -- customer.ts (regra de negócio)
 * Complexidade acidental
 * Infrastructure
 *  - Entity / Model
 *   -- customer.ts (persistência, possui get e set para os atributos)
 */
