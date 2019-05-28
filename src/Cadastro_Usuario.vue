<template>
<div>
	<div id="body" class="container">
		<div class="row justify-content-center align-items-center" style="height:100vh">
			<div class="col-4">
				<div class="card">
					<div class="card-body">
						<form autocomplete="off">
							<div class="form-group">
								<h6>Usuário</h6>
								<input v-model="usuarios.usuario" type="text" class="form-control">
							</div>
							<div class="form-group">
								<h6>Senha</h6>
								<input v-model="usuarios.senha" type="password" class="form-control">
							</div>
							<div class="form-group">
								<h6>Confirmação de Senha</h6>
								<input v-model="usuarios.confirma_senha" type="password" class="form-control">
							</div>				
							<button class="btn btn-outline-warning btn-block" type="submit" @click="onCadastraUsuario()">Cadastrar</button>							
							<router-link to="/login">
								<button class="btn btn-outline-danger btn-block mt-2" type="button">Voltar</button>
							</router-link>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
const firebase = require('firebase/app');
import { usuariosRef } from './firebase';
import { isEmpty } from 'lodash';
import { router } from './routes';

export default {
	data() {
		return {
			usuarios: [
				{
					usuario: '',
					senha: '',
					confirma_senha: ''
				}
			]
		}
	},

	firebase: {
		usuarios: usuariosRef,
	},
	
	methods:{
		onCadastraUsuario() {
			if(isEmpty(this.usuarios.usuario) || isEmpty(this.usuarios.senha) || isEmpty(this.usuarios.confirma_senha)){
				return this.$toasted.show('Há campos em branco! Não foi possível realizar o cadastro!', { 
					type: 'info',
					theme: "outline", 
					position: "top-center", 
					duration: 4000,
				});
			}
			if((this.usuarios.senha != this.usuarios.confirma_senha)) {
				return this.$toasted.show('Senhas divergentes! Por favor verifique!', { 
					type: 'info',
					theme: "outline", 
					position: "top-center", 
					duration: 4000,
				});
			}
			if((!isEmpty(this.usuarios.usuario) && (this.usuarios.senha == this.usuarios.confirma_senha))){
				usuariosRef.push({
					usuario: this.usuarios.usuario,
					senha: this.usuarios.senha
				});
			}
			this.$toasted.show('Cadastro realizado com sucesso!', { 
				type: 'success',
				theme: "outline", 
				position: "top-center", 
				duration: 4000,
			});
			router.push('login')
		},
	}
}
</script>

<style scoped>
#titulo {
	text-align: center
}
</style>
