<template>
<div>
	<div id="body" class="container">
		<div class="row justify-content-center align-items-center" style="height:100vh">
			<div class="col-4">
				<div class="card">
					<div class="card-body">
						<form @submit.prevent="onLogin()" autocomplete="off">
							<div class="form-group">
								<h6>E-mail</h6>
								<input v-model="email" type="email" class="form-control" required>
							</div>
							<div class="form-group">
								<h6>Senha</h6>
								<input v-model="password" type="password" class="form-control" required>
							</div>
							<button class="btn btn-outline-primary btn-block" type="submit">Login</button>
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
import { dbAuth } from './firebase';
import { isEmpty } from 'lodash';
import { routes } from './routes';
import { setTimeout } from 'timers';

export default {
	data() {
		return {
			email: 'gustavo@gmail.com',
			password: '123123'
		}
	},
	methods:{
		async onLogin() {
			const email = this.email;
			const password = this.password;
			
			try{
				const res = await dbAuth.auth().signInWithEmailAndPassword(email, password);
				window.uid = res.user.uid;
			
				setTimeout(()=> {
					this.$router.push({ name: 'home' })
				}, 300);

				
			}catch(err){
				console.log(err);
				
			}
		},
	}
}
</script>

<style scoped>
#titulo {
	text-align: center
}
</style>
