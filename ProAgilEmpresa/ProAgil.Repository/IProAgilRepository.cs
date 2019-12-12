using System.Collections.Generic;
using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entityArray) where T : class;
        Task<bool> SaveChangesAsync();

        Task<IEnumerable<Empresa>> GetAllEmpresaAsyncByNome(string nome);
        Task<IEnumerable<Empresa>> GetAllEmpresaAsync();
        Task<Empresa> GetEmpresaAsyncById(int id);

     
        
    }
}