namespace CV.Api.Models.Entity;

public abstract class BaseEntity
{
    public int Id { get; set; }

    public string? CreatedBy { get; set; }
    public DateTime? CreatedAt { get; set; }

    public string? ModifiedBy { get; set; }
    public DateTime? ModifiedAt { get; set; }
}
