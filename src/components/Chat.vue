<template>
    <div class="main-container">
        <nav class="navbar navbar-light" style="background: #95cdf0;">
            <a class="navbar-brand" style="color: #ffffff">Chat</a>
        </nav>
        <div class="container" v-if="user.role === 'USER'">
            <div v-for="message in messages" :key="message.id">
                <div class="text-left">
                    <h6 style="color: #95cdf0">{{message.nameAuthor}}</h6><h5>{{message.value}}</h5>
                </div>
            </div>
            <div class="row" style="bottom: 3%;right: 2%;left: 5%; position: fixed">
                <input class="col-10 themed-grid-col" required type="text" name="nameSurvey"
                       placeholder="Введите сообщение" v-model="newMessage.value">
                <div class="col-2 text-right" style="padding: 15px;">
                    <button class="btn btn-outline-success" style="color: #000000" @click="submit">Send</button>
                </div>
            </div>

        </div>
        <nav class="navbar fixed-bottom navbar-expand-sm navbar-light" style="background: #adb1ed"></nav>
    </div>

</template>

<script>
    import axios from '../http-common'
    import router from '../router'
    import jwt from 'jsonwebtoken'


    export default {
        name: 'Chat',
        data: () => ({
            messages: [],
            user: {
                id: null,
                role: 'USER',
                email: ''
            },
            newMessage: {
                value: 'Hello',
                nameAuthor: ''
            }
        }),
        mounted() {
            this.loadUserData();
            this.loadFirstMessage()
        },
        methods: {
            openLoginForm: function () {
                router.push({name: 'email'})
            },
            moveBack: function () {
                window.history.back()
            },
            loadMessages: function () {
                const token = localStorage.getItem('token');
                if (typeof token !== 'undefined' && token) {
                    axios
                        .get(window.hostname + '/chat', {
                            headers: {'Authorization': token}
                        })
                        .then(response => {
                            this.messages.unshift((response.data)[0]);
                            // this.messages.unshift(response.data);
                            this.loadMessages()
                        })


                } else {
                    this.openLoginForm()
                }
            },

            /*  loadMessagesFetch: function() {
                  fetch(window.hostname + '/chat')
                      .then(response => {
                          this.messages = response.data
                          this.loadMessages()
                      })
              },*/

            loadUserData: function () {
                const token = localStorage.getItem('token');
                if (typeof token !== 'undefined' && token) {
                    var decoded = jwt.decode(token.slice(7));
                    this.user.id = decoded.sub;
                    this.user.role = decoded.role;
                    this.user.email = decoded.email;
                } else {
                    this.openLoginForm()
                }
            },
            loadFirstMessage: function () {
                const token = localStorage.getItem('token');
                if (typeof token !== 'undefined' && token) {
                    var decoded = jwt.decode(token.slice(7));
                    axios.get(window.hostname + '/chat/getAll', {
                        headers: {'Authorization': token}
                    })
                        .then(response => {
                            for(var i = 0; i < response.data.length; i++) {
                                this.messages.unshift((response.data)[i])
                            }
                        })
                    axios.post(window.hostname + '/chat', {
                        value: "Hi!",
                        nameAuthor: decoded.email

                    }, {
                        headers: {'Authorization': token}
                    })
                        .then(response => {
                            this.newMessage = response.data;
                            this.loadMessages();

                            // console.log(response.data)
                        })
                } else {
                    this.openLoginForm()
                }

            },
            submit: function () {
                const token = localStorage.getItem('token');
                if (typeof token !== 'undefined' && token) {
                    var decoded = jwt.decode(token.slice(7));
                    axios.post(window.hostname + '/chat', {
                        value: this.newMessage.value,
                        nameAuthor: decoded.email

                    }, {
                        headers: {'Authorization': token}
                    })
                        .then(response => {
                            this.newMessage = response.data;
                          //  this.loadMessages();
                            // this.messages.unshift(response.data[0])
                            // eslint-disable-next-line no-console
                            console.log(response.data)
                            //  this.loadMessages()
                        })

                } else {
                    this.openLoginForm()
                }

            }
        },

    }
</script>

<style type="text/css">
    @import '../assets/style/grid.css';
</style>
