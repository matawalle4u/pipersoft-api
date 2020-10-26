import {Injectable, Get,Post, Body, ParseUUIDPipe, NotFoundException} from '@nestjs/common';
import { Business } from './business.model';
import { BusinessCreationDTO } from './dto/BusinessCreationDTO';
import { BusinessSearchDTO } from './dto/BusinessSearchDTO';
//import * as uuid from 'uuid/v';
import { v4 as uuidv4 } from 'uuid';
import * as PouchDB from 'pouchdb';

//import { Body } from '@nestjs/common';
@Injectable()
export class BusinessService {
    private businesses: Business[] = [];
    public  vv = {};
    //private business_db = new PouchDB('http://localhost:5984/businesses');
    private bus = new PouchDB('sample');

    
    getBusinesses():Business[]{

        


        // function showBusinesses(db):any {
        //     db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        //      console.log(doc.rows);
        //     });
        //   }

          this.businesses = this.bus.allDocs({include_docs: true, descending: true});

          //showBusinesses(this.bus);
          //console.log(this.businesses);
          return this.businesses;
        
    }

    getBusinessByID(id:string):Business{
        const result = this.businesses.find(business=>business._id===id);
        if(!result){
            throw new NotFoundException(`No Business record with ID "${id}" `);
        }
        return result;
    }

    getFilteredBusiness(filterDTO: BusinessSearchDTO):Business[]{
        const {businessName, businessOwner, email, phoneNumber, search} = filterDTO;
        let businesses  = this.getBusinesses();
        
        if(search){
            businesses = businesses.filter(business=>
                business.businessName.includes(search) ||
                business.businessOwner.includes(search),
            );
        }

        return businesses;
    }

   
   
    createBusiness(businessCreationDTO: BusinessCreationDTO){
       const {businessName, businessOwner, email, phoneNumber} = businessCreationDTO;
       
       const bus_details: Business = {
           _id:uuidv4(),
           businessName,
           businessOwner,
           email,
           phoneNumber,
       };


       

        this.bus.put(bus_details, function callback(err, result) {
          if (!err) {
            console.log('Successfully added a Business!');
            //this.bus.save();
          }else{
              console.log(err);
          }
        });
     


      function showBusinesses(db) {
        db.allDocs({include_docs: true, descending: true}, function(err, doc) {
         console.log(doc.rows);
        });
      }

      //addBusiness(bus_details);
      showBusinesses(this.bus);

       //this.businesses.push(bus_details);
       //console.log(bus_details['id']);
       //return this.businesses;
       
    }


}
