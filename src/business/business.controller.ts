import { Controller,Get, Post, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Business } from './business.model';
import { BusinessService } from './business.service';
import * as PouchDB from 'pouchdb';
import { BusinessCreationDTO } from './dto/BusinessCreationDTO';
import { BusinessSearchDTO } from './dto/BusinessSearchDTO';

@Controller('business')
export class BusinessController {
    constructor(private businessService:BusinessService){}
    //private business_db = new PouchDB('http://localhost:5984/businesses');


    @Get()
    getBusinesses(@Query(ValidationPipe) searchDTO: BusinessSearchDTO): Business []{
        
        if(Object.keys(searchDTO).length){
            return this.businessService.getFilteredBusiness(searchDTO);
        }else{
            return this.businessService.getBusinesses();
        }
        
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBusiness(@Body() createBusinessDTO: BusinessCreationDTO) {
        //run d create logic here
        this.businessService.createBusiness(createBusinessDTO);
        
        
    }
}
