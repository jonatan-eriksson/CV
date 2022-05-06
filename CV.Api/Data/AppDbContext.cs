using CV.Api.Models.Entity;

namespace CV.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Document> Documents { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Work> Work { get; set; }
    public DbSet<Education> Educations { get; set; }
    public DbSet<Skill> Skills { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Document>().ToTable("Document");
        modelBuilder.Entity<Project>().ToTable("Project");
        modelBuilder.Entity<Work>().ToTable("Work");
        modelBuilder.Entity<Education>().ToTable("Education");
        modelBuilder.Entity<Skill>().ToTable("Skill");
    }

    public override int SaveChanges()
    {
        AddBaseInfo();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        AddBaseInfo();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void AddBaseInfo()
    {
        var entities = ChangeTracker.Entries<BaseEntity>()
            .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        var dateNow = DateTime.Now;

        foreach (var entity in entities)
        {
            if (entity.State == EntityState.Added)
            {
                entity.Entity.CreatedAt = dateNow;
                entity.Entity.CreatedBy = "";
            }
            if (entity.State == EntityState.Modified)
            {
                entity.Entity.ModifiedAt = dateNow;
                entity.Entity.ModifiedBy = "";
            }
        }
    }
}
