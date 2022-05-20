import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes = Array<Cliente>();
  curCliente? : Cliente;
  editando : boolean = false;

  constructor(private cliService: ClienteService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.cliService.listar().subscribe(clientes => {
      this.clientes = clientes;
    })
  }

  novo() {
    this.curCliente = new Cliente();
    this.editando = false;
  }

  salvar() {
    if (this.curCliente) {
      if(!this.editando) {
        this.cliService.inserir(this.curCliente).subscribe(_ => {
          this.listar();
          this.curCliente = undefined;
        })
      } else {
        this.cliService.update(this.curCliente).subscribe(_ => {
          this.listar();
          this.curCliente = undefined;
        })
      }
    }
  }

  selecionar(cli : Cliente) {
    this.curCliente = cli;
    this.editando = true;
  }

  delete(id: number) {
    this.cliService.delete(id).subscribe(() => {
      this.listar();
      this.curCliente = undefined;
    })
  }
}
