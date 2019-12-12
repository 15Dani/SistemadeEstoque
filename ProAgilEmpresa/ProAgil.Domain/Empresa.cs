using System;
using System.Collections.Generic;

namespace ProAgil.Domain
{
    public class Empresa
    {
        public int Id { get; set; }

        public string Nome { get; set; }
        public DateTime DataCadastro { get; set; }
        public string Descricao { get; set; }
        public int QtdeFuncionarios { get; set; }  
        public string Telefone { get; set; }
        public string Email { get; set; }
   
    }
}