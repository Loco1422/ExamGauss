using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApiDomain.Domain;
using WebApiRepository.Context;
using WebApiRepository.Entities;

namespace WebApiDomain.Services
{
    public class ProductService
    {
        private readonly AppDBContext context;
        public ProductService(AppDBContext context)
        {
            this.context = context;
        }
        public void Add(ProductViewModel view)
        {   
            try
            {
                if (view.Id != 0)
                    throw new Exception("Error al crear");

                var entity = Mapper.Map<Product>(source: view);
                context.Product.Add(entity);
                context.SaveChanges();
                view.Id = entity.Id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //verifico si el producto ya existe
        public ProductViewModel getProductByNameBrand(ProductViewModel view)
        {
            var result = context.Product.Where(x => x.IdBrand == view.IdBrand && x.Name == view.Name).ToList().FirstOrDefault();
            return Mapper.Map<ProductViewModel>(source: result);

        }
        public ProductViewModel GetByID(int id)
        {
            try
            {
                var result = context.Product.Where(x => x.Id == id).ToList().FirstOrDefault();
                return Mapper.Map<ProductViewModel>(source: result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<ProductGridViewModel> GetAll()
        {
            try
            {
                var result = context.Product.Include(x=> x.IdBrandNavigation).Select(x => new ProductGridViewModel() 
                { 
                    Id= x.Id,
                    Name= x.Name,
                    Brand = x.IdBrandNavigation.Name,
                    Price = x.Price,
                    Cost = x.Cost
                }).ToList();
                return Mapper.Map<IEnumerable<ProductGridViewModel>>(source: result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void Delete(int id)
        {
            try
            {
                var entity = context.Product.Where( x => x.Id == id).ToList().FirstOrDefault();
                context.Remove(entity);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Product Update(ProductViewModel view)
        {
            try
            {
                var entity = Mapper.Map<Product>(source: view);
                context.Update(entity);
                context.SaveChanges();
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
