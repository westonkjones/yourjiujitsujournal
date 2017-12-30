import { Belt } from '../belt';

export class Instructor {
    constructor(private firstName: string, private lastName: string, private belt: Belt) {

    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    public getBelt(): Belt {
        return this.belt;
    }
}