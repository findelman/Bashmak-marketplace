import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  private readonly companies = [
    {
        id: 1,
        name: 'Company1',
        city: {
            id: 1,
            data: {
                name: 'Алматы'
            }
        }
    },
    {
        id: 2,
        name: 'Company2',
        city: {
            id: 2,
            data: {
                name: 'Астана'
            }
        }
    }
  ];

  findAll() {
    return this.companies;
  }
}
