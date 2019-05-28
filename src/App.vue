<template>
	<div class="corpo">
		<router-view></router-view>
	</div>
</template>

<script>
const firebase = require('firebase/app');
import { dbAuth } from './firebase';

export default {
	mounted(){
		dbAuth.auth().onAuthStateChanged(user => {
			window.uid = user ? user.uid : null

			if(window.uid){
				this.$router.push({ name: 'home' })
			}else{
				this.$router.push({ name: 'login' })
			}
		});

	}
}
</script>

<style scoped>
</style>
