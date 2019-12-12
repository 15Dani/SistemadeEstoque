using System.Linq;
using AutoMapper;
using ProAgil.Domain;
using ProAgil.Domain.Identity;
using ProAgil.WebApi.Dtos;

namespace ProAgil.WebApi.Helpers
{
    public class AutoMappingProfiles : Profile
    {
        public AutoMappingProfiles()
        {
           CreateMap<Empresa, EmpresaDto>().ReverseMap();
           CreateMap<User,UserDto>().ReverseMap();
           CreateMap<User,UserLoginDto>().ReverseMap();

        }
    }
}