namespace CV.Api.Models.Entity;

public class Project : BaseEntity
{
    public int DocumentId { get; set; }

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
