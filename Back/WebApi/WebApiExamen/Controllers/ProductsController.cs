using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiDomain.Domain;
using WebApiDomain.Services;

namespace WebApiExamen.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : Controller
    {
        private readonly ProductService _service;

        public ProductsController(ProductService service)
        {
            _service = service;

        }
        //Traigo todos los productos
        [HttpGet]
        public IActionResult GetAllProduct()
        {
            var result = _service.GetAll();

            return Ok(result);
        }
        //nuevo producto
        [HttpPost]
        public IActionResult AddProduct([FromBody]ProductViewModel entity)
        {
            var exists = _service.getProductByNameBrand(entity);
            if (exists != null)
            {
                return StatusCode(417, "Ya existe el producto.");
            }
            _service.Add(entity);
            return Created("Creado correctamente", entity);
        }
        //producto por id
        [HttpGet("id")]
        public IActionResult ProductById(int id)
        {
            var result = _service.GetByID(id);
            if (result == null)
            {
                return StatusCode(204, "No existe el producto deseado");
            }
            return Ok(result);
        }
        //borro el producto
        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            var result = _service.GetByID(id);
            if (result == null)
            {
                return StatusCode(204, "No existe el producto a eliminar");
            }
            _service.Delete(id);
            return Ok();
        }
        //actualizo el producto
        [HttpPut]
        public IActionResult Update([FromBody] ProductViewModel entity)
        {
            if (entity.Id == 0)
                return StatusCode(304, "Error al modificar.El producto no existe.");
            _service.Update(entity);
            return Accepted("Update", entity);
        }
    }
}
