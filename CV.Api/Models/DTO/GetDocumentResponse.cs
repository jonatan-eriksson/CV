namespace CV.Api.Models.DTO;

public class GetDocumentResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Profession { get; set; }
    public string Description { get; set; }
    public string Characteristics { get; set; }
    public string Languages { get; set; }

    public IEnumerable<WorkResponse> Work { get; set; } = new List<WorkResponse>();
    public IEnumerable<ProjectResponse> Projects { get; set; } = new List<ProjectResponse>();
    public IEnumerable<EducationResponse> Educations { get; set; } = new List<EducationResponse>();
    public IEnumerable<SkillResponse> Skills { get; set; } = new List<SkillResponse>();

    public class WorkResponse
    {
        public int Id { get; set; }
        public string Employer { get; set; }
        public string Profession { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Visible { get; set; }
        public int Position { get; set; }
    }
    public class ProjectResponse
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Title { get; set; }
        public string Assignment { get; set; }
        public string Role { get; set; }
        public string Description { get; set; }
        public string Tech { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Visible { get; set; }
        public int Position { get; set; }
    }
    public class EducationResponse
    {
        public int Id { get; set; }
        public string School { get; set; }
        public string Degree { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Visible { get; set; }
        public int Position { get; set; }
    }
    public class SkillResponse
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Text { get; set; }
        public bool Visible { get; set; }
        public int Position { get; set; }
    }
}
