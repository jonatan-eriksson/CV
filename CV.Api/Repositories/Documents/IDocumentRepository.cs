using CV.Api.Models.Entity;

namespace CV.Api.Repositories.Documents;

public interface IDocumentRepository : IRepositoryBase<Document>
{
    Document GetById(int id);
    IEnumerable<Document> GetAll();
}
