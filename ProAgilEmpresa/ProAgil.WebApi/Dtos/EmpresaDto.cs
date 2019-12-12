using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebApi.Dtos
{
    public class EmpresaDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage="O campo {0} é de preenchimento obrigatório")]
        [StringLength(500,MinimumLength=2,ErrorMessage="O campo {0} deve possuir no mínimo 2 caractérie e no máximo 500 caractéries")]
        public string Nome { get; set; }
        public DateTime DataCadastro { get; set; }
        
        [Required(ErrorMessage="O campo {0} é obrigatório")]
        public string Descricao { get; set; }

        [Range(2,120000,ErrorMessage="O campo {0} de possuir no minimo 2 pessoas e no máximo 120000 pessoas")]
        public int QtdeFuncionarios { get; set; }
      
        [Phone(ErrorMessage="O campo {0} está inválido")]
        public string Telefone { get; set; }
        
        [EmailAddress(ErrorMessage="O campo {0} está inválido")]
        public string Email { get; set; }
     
       
 
    }
}