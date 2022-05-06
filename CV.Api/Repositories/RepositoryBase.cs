using System.Linq.Expressions;
using CV.Api.Data;
using CV.Api.Models.Entity;

namespace CV.Api.Repositories;

public class RepositoryBase<T> : IRepositoryBase<T> where T : BaseEntity
{
    protected readonly AppDbContext context;

    public RepositoryBase(AppDbContext context)
    {
        this.context = context;
    }

    public IQueryable<T> Find(Expression<Func<T, bool>> expression)
    {
        return context.Set<T>().Where(expression);
    }

    public IQueryable<T> FindAll()
    {
        return context.Set<T>();
    }

    public T Create(T entity)
    {
        var result = context.Set<T>().Add(entity);
        return result.Entity;
    }

    public T Update(T entity)
    {
        var result = context.Set<T>().Update(entity);
        return result.Entity;
    }

    public void Delete(T entity)
    {
        context.Set<T>().Remove(entity);
    }
}
