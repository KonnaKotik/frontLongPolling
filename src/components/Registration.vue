<template>
    <div class="main-container">
        <a href="/signUp"></a>
        <nav class="navbar navbar-light" style="background: #95cdf0;">
            <a class="navbar-brand" style="color: #ffffff">Chat</a>
            <form class="form-inline">
                <div class="nav-item" @click="moveBack">
                    <a class="btn btn-outline-light my-2 my-sm-0">Назад</a>
                </div>
            </form>
        </nav>
        <div class="container">
            <div class="loginbox">
                <h1>Регистрация</h1>
                <div v-if="error" class="alert alert-warning" role="alert">
                    {{error}}
                </div>
                <form>
                    <p>Email</p>
                    <input type="text" id="inputEmail" required name="email" placeholder="Email" v-model="email"/>
                    <p>First Name</p>
                    <input type="text" id="firstName" required name="firstName" placeholder="First Name" v-model="firstName"/>
                    <p>Last Name</p>
                    <input type="text" id="lastName" required name="lastName" placeholder="Last Name" v-model="lastName"/>
                    <p>Password</p>
                    <input type="password" id="password" required name="password" placeholder="Password" v-model="password">
                    <p>Re-Password</p>
                    <input type="password" id="inputRePassword" required name="rePassword" placeholder="Re-password" v-model="passwordCheck">
                    <input type="button" value="Зарегистрироваться" @click="submit">
                </form>
            </div>
        </div>

        <nav class="navbar fixed-bottom navbar-expand-sm navbar-light" style="background: #adb1ed"></nav>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from '../router'

    export default {
        name: 'Registration',
        data: () => ({
            email: '',
            firstName:'',
            lastName:'',
            password: '',
            passwordCheck: '',
            error: '',
        }),
        methods: {
            submit: function () {
                if (!this.email || !this.password || !this.passwordCheck || !this.firstName || !this.lastName) {
                    this.error = 'Введены не все данные'
                    return
                }
                if (this.password !== this.passwordCheck) {
                    this.error = 'Пароли не совпадают'
                    return
                }
                axios
                    .post(window.hostname + '/signUp', {
                        email: this.email,
                        password: this.password,
                        firstName: this.firstName,
                        lastName: this.lastName
                    })
                    .then(response => {
                        // eslint-disable-next-line no-console
                        console.log(response.data);
                        router.push({name: 'login'})
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.log(error.response.data);
                        this.error = 'Логин занят'
                    })
            },
            openLoginForm: function () {
                router.push({name: 'email'})
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

