import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
    imports: [AuthModule, HttpModule],
    controllers: [CategoriesController],
    providers: [CategoriesService]
})
export class CategoriesModule {};
