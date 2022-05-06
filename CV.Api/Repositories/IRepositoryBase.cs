using System.Linq.Expressions;

namespace CV.Api.Repositories;

public interface IRepositoryBase<T>
{
    IQueryable<T> Find(Expression<Func<T, bool>> expression);
    IQueryable<T> FindAll();
    T Create(T entity);
    T Update(T entity);
    void Delete(T entity);
}
