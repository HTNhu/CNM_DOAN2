import { Service } from './service.entity';
import { ServiceService } from './service.service';
export declare class ServiceResolver {
    private readonly typeService;
    constructor(typeService: ServiceService);
    getAllService(): Promise<Service[]>;
}
