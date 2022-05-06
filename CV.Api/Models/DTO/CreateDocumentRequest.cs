namespace CV.Api.Models.DTO;

public class CreateDocumentRequest
{
    public string Name { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Profession { get; set; }
    public string Description { get; set; }
    public string Characteristics { get; set; }
    public string Languages { get; set; }
    public IEnumerable<WorkRequest>? Work { get; set; }
    public IEnumerable<ProjectRequest>? Projects { get; set; }
    public IEnumerable<EducationRequest>? Educations { get; set; }
    public IEnumerable<SkillRequest>? Skills { get; set; }

    public class WorkRequest
    {
        public int? Id { get; set; }
        public string Employer { get; set; }
        public string Profession { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Visible { get; set; }
        public int Position { get; set; }
    }

    public class ProjectRequest
    {
        public int? Id { get; set; }
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

    public class EducationRequest
    {
        public int? Id { get; set; }
        public string School { get; set; }
        public string Degree { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Visible { get; set; }
        public int Position { get; set; }
    }
    public class SkillRequest
    {
        public int? Id { get; set; }
        public string Type { get; set; }
        public string Text { get; set; }
        public bool Visible { get; set; }
        public int Position { get; set; }
    }
}
