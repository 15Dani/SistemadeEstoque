import localePt from '@angular/common/locales/pt';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Empresa } from './../_models/Empresa';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../_services/empresa.service';
import { registerLocaleData } from '@angular/common';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';


registerLocaleData(localePt);
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})

export class EmpresaComponent implements OnInit {

    dataCadastro: any;
    titulo = 'Empresas';
    empresas: Empresa[];
    empresa: Empresa;
    modoSalva = '';
    registerForm: FormGroup;
    _empresasFiltrados: Empresa[];
    _filtroLista: string;
    headerTextDelete = '';
    file: File;
    dataAtual: string;
    constructor(private empresaService: EmpresaService,
                private formBuilder: FormBuilder,
                private localeService: BsLocaleService,
                private toastr: ToastrService) {
      this.localeService.use('pt-br');
    }
    get filtroLista(): string {
      return this._filtroLista;
    }
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.empresasFiltrados = this.filtroLista ? this.filtrarEmpresa(this.filtroLista) : this.empresas;
    }
    get empresasFiltrados(): Empresa[] {
      return this._empresasFiltrados ? this._empresasFiltrados : this.empresas ;
    }
    set empresasFiltrados(value: Empresa[]) {
      this._empresasFiltrados = value;
    }
    ngOnInit() {
      this.validation();
      this.dataAtual = new Date().getMilliseconds().toString();
      this.getEmpresa();
    }
    openModal(template: any) {
      this.registerForm.reset();
      template.show();
    }
    filtrarEmpresa(filtroLista: string): Empresa[] {
      filtroLista = filtroLista.toLocaleLowerCase();
      return this.empresas.filter(empresa => empresa.nome.toLocaleLowerCase().indexOf(filtroLista) !== -1);
    }
    getEmpresa() {
      this.empresaService.getAllEmpresa().subscribe(
        (empres: Empresa[]) => {
          this.empresas = empres;
        },
        error => {
          console.log(error);
          this.toastr.error(`Ocorreu um erro ao carregar empresa: ${error.error}`);
        }
      );
    }
       salvarAlteracao(template: any) {
      if (this.registerForm.valid) {
        this.pesistirEmpresa().subscribe(
          (empresa: Empresa) => {
            this.empresaService.getAllEmpresa().subscribe(
              () => {
                template.hide();
                this.dataAtual = new Date().getMilliseconds().toString();
                this.getEmpresa();
                this.toastr.success('Empresa salvo com sucesso!');
              },
              error => {
                this.toastr.error(`Ocorreu um erro ao tentar salvar evento: ${error.error}`);
              }
            );
          },
          error => {
            this.toastr.error(`Ocorreu um erro ao tentar salvar empresa: ${error.error}`);
          }
        );
      }
    }
    pesistirEmpresa() {
      if (this.modoSalva === 'put') {
        this.empresa = Object.assign({id: this.empresa.id}, this.registerForm.value);
        return this.empresaService.putEmpresa(this.empresa);
      } else if (this.modoSalva === 'post') {
        this.empresa = Object.assign({}, this.registerForm.value);
        return this.empresaService.postEmpresa(this.empresa);
      }
    }
    novoEmpresa(template: any) {
      this.modoSalva = 'post';
      this.openModal(template);
    }
    editarEmpresa(empresa: Empresa, template: any) {
      this.modoSalva = 'put';
      this.openModal(template);
      this.empresa = Object.assign({}, empresa);
      this.registerForm.patchValue(this.empresa);
    }
    excluirEmpresa(empresa: Empresa, confirm: any) {
      this.headerTextDelete = empresa.nome;
      confirm.show();
      this.empresa = empresa;
    }
    confirmaExclusao(confirm: any) {
      this.empresaService.deleteEmpresa(this.empresa.id).subscribe(
        () => {
          confirm.hide();
          this.getEmpresa();
          this.toastr.success('Evento excluido com sucesso!');
        },
        (error) => {
          this.toastr.error(`Ocorreu um erro ao tentar excluir a Empresa: ${error.error}`);
        }
      );
    }
    validation() {
      this.registerForm = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        descricao: ['', Validators.required],
        dataCadastro: ['', Validators.required],
        telefone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        qtdeFuncionarios: ['', [Validators.required, Validators.max(120000)]],
      });
    }
    onFileChange(empres: any) {
      if (empres.target.files && empres.target.files.length) {
        this.file = empres.target.files;
      }
    }
    getControl(nomeControl: string): AbstractControl {
      return this.registerForm.get(nomeControl);
    }
    isFormControlInvalid(nomeControl: string): boolean {
      const control = this.getControl(nomeControl);
      return control.invalid && (control.dirty || control.touched);
    }
    isFormControlRequired(nomeControl: string): boolean {
      return this.getControl(nomeControl).hasError('required');
    }
    isFormControlMinLength(nomeControl: string): boolean {
      return this.getControl(nomeControl).hasError('minlength');
    }
    isFormControlMaxLength(nomeControl: string): boolean {
      return this.getControl(nomeControl).hasError('maxlength');
    }
    isFormControlMax(nomeControl: string): boolean {
      return this.getControl(nomeControl).hasError('max');
    }
    isFormControlEmailInvalid(nomeControl: string): boolean {
      return this.getControl(nomeControl).hasError('email');
    }
  }