using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApiDomain.Domain;
using WebApiRepository.Context;

namespace WebApiDomain.Services
{
    public class BrandService
    {
        private readonly AppDBContext context;
        public BrandService(AppDBContext context)
        {
            this.context = context;
        }

        public IEnumerable<BrandViewModel> getBrand()
        {
            var result = context.Brand.ToList();
            return Mapper.Map<IEnumerable<BrandViewModel>>(source: result);

        }
    }
}
