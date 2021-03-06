import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string,
    description: string
}

@injectable()
export class CreateSpecificationUseCase {
        constructor(
            @inject("SpecificationsRepository")
            private specificationsRepository: ISpecificationsRepository) {

        }

    async execute({ name, description }: IRequest): Promise<void> {

        var hasSpecificationAlready = await this.specificationsRepository.findByName(name);

        if (hasSpecificationAlready) {
            throw new AppError("Specification Already Exists!");
        }

        await this.specificationsRepository.create({ name, description });
    }
}