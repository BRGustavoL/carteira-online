import Home from './Home.vue';
import Login from './Login.vue';
import Cadastro_Usuario from './Cadastro_Usuario.vue';


export const routes = [
    { path: '/login', name: 'login', component: Login},
    { path: '/cadastroUsuario', name: 'cadastroUsuario' , component: Cadastro_Usuario},
    { path: '/home', name: 'home' , component: Home}
];