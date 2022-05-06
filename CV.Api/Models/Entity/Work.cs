namespace CV.Api.Models.Entity;

public class Work : BaseEntity
{
    public int DocumentId { get; set; }

    public string Employer { get; set; }
    public string Profession { get; set; }

    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public bool Visible { get; set; }
    public int Position { get; set; }
}
