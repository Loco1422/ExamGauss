using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using AutoMapper;
using WebApiDomain.Domain;
using WebApiRepository.Entities;

namespace WebAPI.Domain.SICOMA.Mapping
{
    public class MappingProfile : Profile
    {
        /// <summary>
        /// Create automap mapping profiles
        /// </summary>
        public MappingProfile()
        {
            CreateMap<Product, ProductViewModel>().ReverseMap();
            CreateMap<Brand, BrandViewModel>().ReverseMap();

        }

    }





}
