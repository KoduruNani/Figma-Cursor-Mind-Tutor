namespace server.Models
{
    public class Course
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string ThumbnailUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }
} 