using static CV.Api.Models.DTO.CreateDocumentRequest;

namespace CV.Api.Models.DTO;

public class UpdateDocumentRequest
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
}
