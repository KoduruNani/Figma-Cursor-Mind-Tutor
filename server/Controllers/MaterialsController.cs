using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterialsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public MaterialsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetMaterials()
        {
            var materials = _context.Materials.OrderByDescending(m => m.UploadedAt).ToList();
            return Ok(materials);
        }

        [HttpPost]
        public async Task<IActionResult> AddMaterial([FromBody] Material material)
        {
            material.UploadedAt = DateTime.UtcNow;
            _context.Materials.Add(material);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Material uploaded successfully" });
        }
    }
} 