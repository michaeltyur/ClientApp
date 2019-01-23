export class NailWork {
    serviceType: ServiceType;
    description: string;
    price: number;
    quantityMinutes: number;
    constructor(serviceType: ServiceType, quantityMinutes: number) {
        this.serviceType = serviceType;
        this.quantityMinutes = quantityMinutes;
    }
}
export const enum ServiceType {
    manicure = 'manicure',
    pedicure= 'pedicure',
    medical_pedicure= 'medical pedicure',
    male_manicure= 'male manicure'
}
