
import { ISpecificationsDTO, ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository';
import { getRepository, Repository } from 'typeorm';
import { Specification } from '../entities/Specification';

export class SpecificationsRepository implements ISpecificationsRepository {

    private repository:Repository<Specification>

    public constructor() {
        this.repository = getRepository(Specification)
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);

        return specifications;
    }


    async create({ name, description }: ISpecificationsDTO): Promise<Specification> {
        const specification = await this.repository.create(
              {
                  description,
                  name
                })

        await this.repository.save(specification)

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        var specif = await this.repository.findOne({name});
        return specif;
    }
}