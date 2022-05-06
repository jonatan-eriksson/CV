using CV.Api.Repositories.Documents;

namespace CV.Api.Repositories;

public interface IRepositoryManager
{
    IDocumentRepository Document { get; }
    int Save();
}
