namespace CV.Api.Models.Entity;

public class Document : BaseEntity
{
    public string Name { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string Profession { get; set; }
    public string Description { get; set; }
    public string Characteristics { get; set; }
    public string Languages { get; set; }

    public byte[]? Avatar { get; set; }

    public List<Work> Work { get; set; }
    public List<Project> Projects { get; set; }
    public List<Education> Educations { get; set; }
    public List<Skill> Skills { get; set; }
}
