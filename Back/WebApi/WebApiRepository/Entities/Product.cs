using System;
using System.Collections.Generic;
using System.Text;

namespace WebApiRepository.Entities
{
    public partial class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? IdBrand { get; set; }
        public decimal Cost { get; set; }
        public decimal Price { get; set; }

        public Brand IdBrandNavigation { get; set; }
    }
}
