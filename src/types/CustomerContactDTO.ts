export interface CustomerContactDTO {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    customerId?: number; // opcional
}