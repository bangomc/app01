import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES;
  public resposta: string = '';
  public rodada: number = 0;
  public rodadaFrase: Frase;
  public progresso: number = 0;
  public tentativas: number = 3;
  
  @Output()
  public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() { 
    this.atualizaRodada();
  }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;    
  }

  public verificarResposta(): void {
    if(this.resposta == this.rodadaFrase.fraseP){      
      this.rodada++;
      this.progresso += 25;

      if(this.rodada === 4){
        this.encerrarJogo.emit('vitoria');
      }
      
      this.atualizaRodada();
    }else{
      this.tentativas--;
      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }

}
