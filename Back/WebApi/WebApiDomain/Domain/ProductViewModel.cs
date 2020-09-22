using System;
using System.Collections.Generic;
using System.Text;

namespace WebApiDomain.Domain
{
    public class ProductViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public int IdBrand { get; set; }
        public decimal Cost { get; set; }
        public decimal Price { get; set; }

    }
    public class ProductGridViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Brand { get; set; }
        public decimal Cost { get; set; }
        public decimal Price { get; set; }

    }
}
