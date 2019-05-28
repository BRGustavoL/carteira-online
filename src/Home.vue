<template>
<div id="body">
  <div id="app">
    <div class="nav-bar">  
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand">
          <img src="./assets/wallet.png" width="25" height="25" class="d-inline-block align-top" alt="">
          Carteira Online
        </a>
        <form class="form-inline my-2 my-lg-0">
          <!-- <router-link to="/">
            <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">Sair</button>
          </router-link> -->
        </form>
      </nav>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">        
          <b-card class="mt-3" header-border-variant="primary" header="Cadastro de Movimento">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              
              <h6>Descrição</h6>
              <div class="input-group mb-3" id="input-group-1" label="Descrição:" label-for="input-1">
                <input v-model="form.descricao" type="text" class="form-control" placeholder="Digite uma descrição" aria-label="descricao" aria-describedby="basic-addon1">
              </div>

              <h6>Valor</h6>
              <div class="input-group mb-3" id="input-group-2" label="Descrição:" label-for="input-2">
                <input v-model="form.valor" type="text" class="form-control" placeholder="R$" aria-label="descricao" aria-describedby="basic-addon1">
              </div>

              <h6>Conta</h6>
              <div class="input-group mb-3" id="input-group-3" aria-label="Conta" label-for="input-3" v-for="option in options" v-bind:key="option.id">
                <select class="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon" v-model="form.conta" :options="options">
                  <option v-for="conta in contas" v-bind:key="conta.id">{{ conta.nome_Conta }}</option>
                </select>
                <div class="input-group-append">
                  <button class="btn btn-outline-primary" v-b-modal="'my-modal'">+ Conta</button>
                </div>
              </div>

              <div class="custom-control custom-radio">
                <input v-model="form.tipo" value="R" type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="customRadio1">Receita</label>
              </div>
              <div class="custom-control custom-radio">
                <input v-model="form.tipo" value="D" type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="customRadio2">Despesa</label>
              </div>
              <br>
              
              <button @click="onCadastrarMovimento" type="button" class="btn btn-outline-primary">Salvar</button>
              <button type="reset" class="btn btn-outline-secondary">Cancelar</button>
              
              <b-modal id="my-modal" title="Cadastro de Conta" centered hide-footer>
                <h6>Nome da Conta</h6>
                <div class="input-group-4 mb-3" id="input-group-4" label="Descrição:" label-for="input-4">
                  <input v-model="form_Conta.nome_Conta" type="text" class="form-control" placeholder="Digite o nome da conta" aria-label="descricao" aria-describedby="basic-addon1">
                  <button @click="onCadastraConta" type="reset" class="btn btn-outline-primary col mt-2">Salvar</button>
                </div>
              </b-modal>
            </b-form>
          </b-card>
        </div>
      </div>
    </div>

    <div class="container">
      <b-card class="mt-3" header-border-variant="primary" header="Relatórios">
        <div class="container">
          <div class="row">
            <h6>Movimentos por Conta</h6>
            <br>
            <div class="input-group mb-3 " v-for="option in options" v-bind:key="option.id">
              <select class="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon" v-model="form_Conta_Relatorio.nome_Conta_Relatorio" :options="options">
                <option v-for="conta in contas" v-bind:key="conta.id">{{ conta.nome_Conta }}</option>
              </select>
              <div class="input-group-append">
                <button class="btn btn-outline-primary" v-b-modal="'my-modal-relatorio-movimentos'">Filtrar Conta</button>
              </div>
              <div class="input-group-append ml-2">
                <button class="btn btn-outline-primary" v-b-modal="'my-modal-relatorio-saldos'">Saldos</button>
              </div>
            </div>
          </div>
        </div>
        <div id="painel-body-relatorio" class="panel-body">
          <div>
            <b-modal id="my-modal-relatorio-movimentos" scrollable centered hide-footer size="xl" title="Movimentos por Conta">
              <table class="table table-sm" >
                <thead class="thead-dark">
                  <tr>
                    <th>Descrição</th>
                    <th>Conta</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Operação</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="movimento in movimentos" :key="movimento.id">
                      <td v-if="form_Conta_Relatorio.nome_Conta_Relatorio == movimento.conta">
                        <a v-bind:href="movimento.url">{{ movimento.descricao }}</a>
                      </td>

                      <td v-if="form_Conta_Relatorio.nome_Conta_Relatorio == movimento.conta">
                        <a v-bind:href="movimento.url">{{ movimento.conta }}</a>
                      </td>

                      <td v-if="form_Conta_Relatorio.nome_Conta_Relatorio == movimento.conta">
                        <a v-bind:href="movimento.url">{{ movimento.tipo }}</a>
                      </td>

                      <td v-if="form_Conta_Relatorio.nome_Conta_Relatorio == movimento.conta">
                        <a v-bind:href="movimento.url">R$ {{ movimento.valor }}</a>
                      </td>

                      <td v-if="form_Conta_Relatorio.nome_Conta_Relatorio == movimento.conta">
                        <button @click="onExcluirMovimento(movimento['.key'])" type="reset" class="btn btn-outline-danger btn-sm">Excluir</button>
                      </td>
                    </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Receitas: R$ {{ getTotalReceita() }}</th>
                    <th>Despesas: R$ {{ getTotalDespesa() }}</th>
                    <th>Saldo: R$ {{ getTotalSaldo() }}</th>
                  </tr>
                </tfoot>
              </table>
            </b-modal>
            
            <b-modal id="my-modal-relatorio-saldos" scrollable centered hide-footer size="xl" title="Saldos por Conta">
              <table class="table table-sm" >
                <thead class="thead-dark">
                  <tr>
                    <th>Conta</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="conta in contas" :key="conta.id">
                      <td>
                        <a v-bind:href="conta.url">{{ conta.nome_Conta }}</a>
                      </td>
                      <td v-if="conta.nome_Conta == movimentos.conta">
                        <a v-bind:href="movimento.url">R$ {{ getTotalSaldo() }}</a>
                      </td>
                    </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Receita Total: R$ {{ somaDeReceitasTotais() }}</th>
                    <th>Despesa Total: R$ {{ somaDeDespesasTotais() }}</th>
                    <th>Saldo Total: R$ {{ somaDeSaldosTotais() }}</th>
                  </tr>
                </tfoot>
              </table>
            </b-modal>
          </div>  
        </div>
      </b-card>
    </div>
    <br>
  </div>
</div>

</template>

<script>
const firebase = require('firebase/app');
import { contasRef, movimentosRef } from './firebase';
import { totalmem } from 'os';
import { find, isUndefined, sum, subtract, isEmpty} from 'lodash';

  export default{
    data() {
      return {
        form_Conta: [
          {
            nome_Conta: ''
          }
        ],
          
        form: [
          {
            descricao: '',
            valor: '',
            conta: null,
            tipo: ''
          } 
        ],

        form_Conta_Relatorio: {
          nome_Conta_Relatorio: null
        },
  
        options: [
          { 
            value: ''
          },
        ],
        show: true,
      }
    },

    firebase: {
      contas: contasRef,
      movimentos: movimentosRef
    },
  
    methods:{

      //Cadastra uma conta
      onCadastraConta(){
        if(isEmpty(this.form_Conta.nome_Conta))
          return this.$toasted.show('Há campos em branco! Não foi possível realizar o cadastro!', { 
            type: 'info',
            theme: "outline", 
            position: "top-center", 
            duration: 4000,
          });

        contasRef.push({
          nome_Conta: this.form_Conta.nome_Conta
        });

        this.$toasted.show('Cadastro realizado com sucesso!', { 
          type: 'success',
            theme: "outline", 
            position: "top-center", 
            duration: 3000
          });

        this.form.conta = this.form_Conta.nome_Conta
        this.form_Conta.nome_Conta = ''
        this.$bvModal.hide('my-modal')
        
      },

      // Cadastra um movimento
      onCadastrarMovimento(){
        if((isEmpty(this.form.descricao)) && (isEmpty(this.form.valor)) && (isEmpty(this.form.conta)) && (isEmpty(!this.form.tipo)))
          return this.$toasted.show('Há campos em branco! Não foi possível realizar o cadastro!', { 
            type: 'info',
            theme: "outline", 
            position: "top-center", 
            duration: 4000,
          });
        
        movimentosRef.push({  
          descricao: this.form.descricao,
          valor: this.form.valor,
          conta: this.form.conta,
          tipo: this.form.tipo,
        });

        this.$toasted.show('Cadastro realizado com sucesso!', { 
          type: 'success',
            theme: "outline", 
            position: "top-center", 
            duration: 3000
          });

        this.form.descricao = '',
        this.form.valor = '',
        this.form.conta = '',
        this.form.tipo = ''          
      },

      onExcluirMovimento(key){
        movimentosRef.child(key).remove();

      },

      //Retorna saldo total por conta (CONSULTA POR CONTA)
      getTotalSaldo (movimento_id) {
        let totalDespesa = []
        let totalReceita = []
        let totalSaldo = []

        this.movimentos.forEach(item => {
          if (item.movimento == movimento_id) {
            if(item.conta == this.form_Conta_Relatorio.nome_Conta_Relatorio){
              if(item.tipo == 'D'){
                totalDespesa.push(item.valor)
              }
            }
          }
        })

        this.movimentos.forEach(item => {
          if (item.movimento == movimento_id) {
            if(item.conta == this.form_Conta_Relatorio.nome_Conta_Relatorio){
              if(item.tipo == 'R'){
                totalReceita.push(item.valor)
              }
            }
          }
        })

        totalReceita = totalReceita.map(Number)
        let auxReceita = sum(totalReceita)

        totalDespesa = totalDespesa.map(Number)
        let auxDespesa = sum(totalDespesa)
        
        totalSaldo = subtract(auxReceita, auxDespesa)
        return totalSaldo;
      },

      //Retorna despesa total por conta (CONSULTA POR CONTA)
      getTotalDespesa (movimento_id) {
        let totalDespesa = []

        this.movimentos.forEach(item => {
          if (item.movimento == movimento_id) {
            if(item.conta == this.form_Conta_Relatorio.nome_Conta_Relatorio){
              if(item.tipo == 'D'){
                totalDespesa.push(item.valor)
                console.log('Despesa ' + totalDespesa);
              }
            }
          }
        })
        totalDespesa = totalDespesa.map(Number)
        return sum(totalDespesa)
      },

      //Retorna receita total por conta (CONSULTA POR CONTA)
      getTotalReceita (movimento_id) {
        let totalReceita = []
        
        this.movimentos.forEach(item => {
          if (item.movimento == movimento_id) {
            if(item.conta == this.form_Conta_Relatorio.nome_Conta_Relatorio){
              if(item.tipo == 'R'){
                totalReceita.push(item.valor)
                console.log('Receita: ' + totalReceita);
              }
              
            }
          }
        })
        totalReceita = totalReceita.map(Number)
        return sum(totalReceita)
      },

      //Retorna receita total de todas as contas (VISUALIZAR SALDOS)
      somaDeReceitasTotais(movimento_id){
        let totalReceita = []
        
        this.movimentos.forEach(item => {
          if (item.movimento == movimento_id) {
            if(item.tipo == 'R'){
              totalReceita.push(item.valor)
              console.log('Receita: ' + totalReceita);
            }
          }
        })
        totalReceita = totalReceita.map(Number)
        totalReceita = sum(totalReceita)
        console.log(totalReceita);

        return totalReceita;

      },

      //Retorna despesa total de todas as contas (VISUALIZAR SALDOS)
      somaDeDespesasTotais(movimento_id){
        let totalDespesa = []
        
        this.movimentos.forEach(item => {
          if (item.movimento == movimento_id) {
            if(item.tipo == 'D'){
              totalDespesa.push(item.valor)
              console.log('Despesa ' + totalDespesa);
            }
          }
        })
        totalDespesa = totalDespesa.map(Number)
        totalDespesa = sum(totalDespesa)
        console.log(totalDespesa);

        return totalDespesa;

      },

      //Retorna saldo total de todas as contas (VISUALIZAR SALDOS)
      somaDeSaldosTotais(movimento_id){
        let totalReceita = []
        let totalDespesa = []
        let saldoTotal = []

        this.movimentos.forEach(item => {
          if (item.movimento == movimento_id) {
            if(item.tipo == 'R'){
              totalReceita.push(item.valor)
              console.log('Receita: ' + totalReceita);
            }
          }
        })
        totalReceita = totalReceita.map(Number)
        totalReceita = sum(totalReceita)
        console.log(totalReceita);
                
        this.movimentos.forEach(item => {
          if (item.movimento == movimento_id) {
            if(item.tipo == 'D'){
              totalDespesa.push(item.valor)
              console.log('Despesa ' + totalDespesa);
            }
          }
        })
        totalDespesa = totalDespesa.map(Number)
        totalDespesa = sum(totalDespesa)
        console.log(totalDespesa);
        
        saldoTotal = saldoTotal.map(Number)
        saldoTotal = subtract(totalReceita, totalDespesa)
        console.log(saldoTotal);
        
        return saldoTotal;
      },

      //Botões de Submit
      onSubmit(evt) {
        evt.preventDefault()
      },

      //Limpa os campos, caso clicado em 'Cancelar'
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.descricao = ''
        this.form.valor = ''
        this.form.conta = ''
        this.form.tipo = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
    }
  }
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


#bloco {
  text-align: left;
  color: #2c3e50;
  margin-top: 10px;

}

h1, h2 {
  font-weight: normal;
}

.nav-bar {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
