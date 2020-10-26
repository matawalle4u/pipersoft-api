import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class BusinessSearchDTO {
    
    @IsOptional()
    @IsNotEmpty()
    businessName: string;

    @IsOptional()
    @IsNotEmpty()
    businessOwner: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    phoneNumber: string;

    @IsOptional()
    @IsNotEmpty()
    search:string;
    
}