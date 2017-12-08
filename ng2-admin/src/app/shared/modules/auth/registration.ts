
export class Registration {

    identity: string; // Type of identity to register: `Individual` or `Organization`
    username: string;
    password: string;
    data: object = {
        // Sample data properties:
        // firstName: '';
        // lastName: '';
    }
    version: number = 1;
}