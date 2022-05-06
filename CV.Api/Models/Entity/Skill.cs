namespace CV.Api.Models.Entity;

public class Skill : BaseEntity
{
    public int DocumentId { get; set; }

    public string Type { get; set; }
    public string Text { get; set; }

    public bool Visible { get; set; }
    public int Position { get; set; }
}
