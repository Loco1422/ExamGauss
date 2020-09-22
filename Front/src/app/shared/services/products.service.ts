
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})

export class ProductsService{
    private apiRoute = '/api/Products';
    protected baseUrl: string;
    constructor(private http: HttpClient) {
        this.baseUrl = environment.endpoints.length > 0 ? environment.endpoints[0].uri : 'https://localhost:44358';
    }

    getProductById(id: number) {
        return this.http.get(this.baseUrl + this.apiRoute + '/id?id=' + id);
    }
    getProducts(){
        return this.http.get(this.baseUrl + this.apiRoute);
    }
    editProducts(product: any){
        return this.http.put(this.baseUrl + this.apiRoute, product);
    }
    addProducts(product: any){
        return this.http.post(this.baseUrl + this.apiRoute, product);
    }
    deleteProducts(id: number){
        return this.http.delete(this.baseUrl + this.apiRoute + '?id=' + id);
    }
    getBrand(){
        return this.http.get(this.baseUrl + '/api/Brand');
    }
}




