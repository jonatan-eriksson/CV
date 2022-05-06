using CV.Api.Data;
using CV.Api.Models.Entity;

namespace CV.Api.Repositories.Documents;

public class DocumentRepository : RepositoryBase<Document>, IDocumentRepository
{
    public DocumentRepository(AppDbContext context) : base(context)
    {
    }

    public Document GetById(int id)
    {
        var document = Find(d => d.Id == id)
            .Include(d => d.Work)
            .Include(d => d.Projects)
            .Include(d => d.Educations)
            .Include(d => d.Skills)
            .FirstOrDefault();

        return document;
    }

    public IEnumerable<Document> GetAll()
    {
        var documents = FindAll()
            .Include(d => d.Work)
            .Include(d => d.Projects)
            .Include(d => d.Educations)
            .Include(d => d.Skills);

        return documents;
    }
}
