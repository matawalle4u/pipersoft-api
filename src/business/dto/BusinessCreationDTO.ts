//import { BusinessStatus } from "../business.model";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class BusinessCreationDTO {

    _id:string;

    @IsNotEmpty()
    businessName: string;

    @IsNotEmpty()
    businessOwner: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phoneNumber: string;

}