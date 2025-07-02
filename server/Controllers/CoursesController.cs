using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Data;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCourses()
        {
            var courses = _context.Courses.OrderByDescending(c => c.CreatedAt).ToList();
            return Ok(courses);
        }

        [HttpPost]
        public async Task<IActionResult> AddCourse([FromBody] Course course)
        {
            course.CreatedAt = DateTime.UtcNow;
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Course added successfully" });
        }
    }
} 