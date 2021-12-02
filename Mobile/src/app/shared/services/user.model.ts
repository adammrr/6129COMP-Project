export class User {
    userId!: number;
    email!: string;
    firstTimeLogin!: boolean;
    firstName!: string;
    surname!: string;
    gender!: string;
    dob!: string;
    address1!: string;
    address2!: string;
    address3!: string;
    postcode!: string;
    accountType!: string;

    private userData: any = [];

    constructor(data: any[]) {
        this.userData = data;
        this.userId = this.userData.userId;
        this.email = this.userData.email;
        this.firstTimeLogin = this.userData.firstTimeLogin;
        this.firstName = this.userData.firstName;
        this.surname = this.userData.surname;
        this.gender = this.userData.gender;
        this.dob = this.userData.dob;
        this.address1 = this.userData.address1;
        this.address2 = this.userData.address2;
        this.address3 = this.userData.address3;
        this.postcode = this.userData.postcode;
        this.accountType = this.userData.accountType;
    }
}
