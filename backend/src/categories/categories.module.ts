import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
    imports: [HttpModule],
    controllers: [CategoriesController],
    providers: [CategoriesService]
})
export class CategoriesModule {};
