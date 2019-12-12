using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;
using ProAgil.WebApi.Dtos;

namespace ProAgil.WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly IProAgilRepository _repo;
        private readonly IMapper _mapper;
        public EmpresaController(IProAgilRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        //GET api/Empresa
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var empresas = await _repo.GetAllEmpresaAsync();

                var results = _mapper.Map<EmpresaDto[]>(empresas);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um falha ao acessar o banco de dados");
            }
        }

        // GET api/Empresa/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var empresa = await _repo.GetEmpresaAsyncById(id);
                var result = _mapper.Map<EmpresaDto>(empresa); 
                return Ok(result);
            }
            catch (System.Exception)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "Ocorreu um erro no banco de dados");
            }
        }

        [HttpGet("getByNome/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            try
            {
                var empresas = await _repo.GetAllEmpresaAsyncByNome(nome);
                var result = _mapper.Map<IEnumerable<EmpresaDto>>(empresas); 
                return Ok(result);
            }
            catch (System.Exception)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "Ocorreu um erro no banco de dados");
            }
        }

   
        [HttpPost]
        public async Task<IActionResult> Post(EmpresaDto model)
        {
            try
            {
                var empresa = _mapper.Map<Empresa>(model);
                _repo.Add(empresa);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"api/Empresa/{empresa.Id}", _mapper.Map<EmpresaDto>(empresa));
                }
            }
            catch (System.Exception e)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um falha ao acessar o banco de dados " + e.Message);
            }

            return StatusCode(StatusCodes.Status403Forbidden, $"Ocorreu um erro ao inserir {model}");
        }


        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int Id, EmpresaDto model)
        {
            try
            {
                var empresa = await _repo.GetEmpresaAsyncById(Id);
                if (empresa == null) return NotFound();


                _mapper.Map(model, empresa);
                _repo.Update(empresa);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/Empresa/{empresa.Id}", _mapper.Map<EmpresaDto>(empresa));
                }
            }
            catch (System.Exception)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "Ocorreu um erro no banco de dados");
            }

            return BadRequest();
        }

        [HttpDelete("{empresaid}")]
        public async Task<IActionResult> Delete(int empresaid)
        {
            try
            {
                var empresaDB = await _repo.GetEmpresaAsyncById(empresaid);
                if (empresaDB == null) return NotFound();

                _repo.Delete(empresaDB);
                if (await _repo.SaveChangesAsync()) return Ok();
            }
            catch (System.Exception)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "Ocorreu um erro no banco de dados");
            }

            return BadRequest();
        }
    }

}