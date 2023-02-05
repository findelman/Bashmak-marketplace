import { Body, Controller, Get, Post } from '@nestjs/common';
import { Company } from 'src/models/company.model';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() company: any) {
    const newCompany = new Company(company);
    return await newCompany.save();
  }

  @Get()
  async findAll(): Promise<any[]> {
    return await Company.find();
  }
}