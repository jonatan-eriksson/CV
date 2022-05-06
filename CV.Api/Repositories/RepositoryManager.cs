using CV.Api.Data;
using CV.Api.Repositories.Documents;

namespace CV.Api.Repositories;

public class RepositoryManager : IRepositoryManager
{
    private readonly AppDbContext context;

    public RepositoryManager(AppDbContext context)
    {
        this.context = context;
        Document = new DocumentRepository(context);
    }

    public IDocumentRepository Document { get; private set; }

    public int Save() => context.SaveChanges();

}
