
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormGroup } from '@angular/forms';
@Injectable({
    providedIn: 'root'
})

export class ValidatorsService{
    priceLowerCost(price: any, cost: any){
        return( formGroup: FormGroup) =>{
            const priceControl = formGroup.controls[price];
            const costControl = formGroup.controls[cost];
            if (priceControl.value >= costControl.value) {
                costControl.setErrors(null);
            }else{
                costControl.setErrors({isLower: true});
            }
        }
    }
}




