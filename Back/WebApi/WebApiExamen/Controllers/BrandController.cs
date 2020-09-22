using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiDomain.Services;

namespace WebApiExamen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly BrandService _service;

        public BrandController(BrandService service)
        {
            _service = service;

        }
        [HttpGet]
        public IActionResult GetBrand()
        {
            var result = _service.getBrand();

            return Ok(result);
        }
    }
}
