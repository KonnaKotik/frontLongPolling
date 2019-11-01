<template>
    <div class="main-container">
        <nav class="navbar navbar-light" style="background: #95cdf0;">
            <a class="navbar-brand" style="color: #ffffff">Chat</a>
        </nav>
        <div class="container">
            <div class="loginbox">
                <h1>Авторизация</h1>
                <div v-if="error" class="alert alert-warning" role="alert">
                    {{error}}
                </div>
                <form>
                    <p>Логин</p>
                    <input required type="text" id="inputEmail" name="email" placeholder="Login" v-model="email"/>
                    <p>Пароль</p>
                    <input required type="password" id="inputPassword" name="password" placeholder="Password" v-model="password"/>
                    <input type="button" value="Войти" @click="submit">
                    <div class="text-center">
                        <router-link to="/signUp" style="color: #000000">Вы еще не зарегистрированы?</router-link>
                    </div>
                </form>
            </div>
        </div>
        <nav class="navbar fixed-bottom navbar-expand-sm navbar-light" style="background: #adb1ed"></nav>
    </div>
</template>

<script>
    import axios from '../http-common'
    import router from '../router'

    export default {
        name: 'Login',
        data: () => ({
            email: '',
            password: '',
            error: ''
        }),
        methods: {
            submit: function () {
                if (!this.email || !this.password) {
                    this.error = 'Не введены данные'
                    return
                }
                axios
                    .post(window.hostname + '/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then(response => {
                        localStorage.setItem('token', response.data.token)
                        router.push({name: 'chat'})
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.log(error.response.data)
                        this.error = 'Неверно введен логин/пароль'
                    })
            },
            openSignUpPage: function () {
                router.push({name: 'signUp'})
            },
            moveBack: function () {
                window.history.back()
            }
        }
    }

</script>

<style type="text/css">
    @import '../assets/style/signIn.css';
</style>
