namespace CV.Api.Models.Entity;

public class Education : BaseEntity
{
    public int DocumentId { get; set; }

    public string School { get; set; }
    public string Degree { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public bool Visible { get; set; }
    public int Position { get; set; }
}
