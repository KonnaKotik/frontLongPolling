import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Chat from '@/components/Chat'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'login',
          component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signUp',
            name: 'signUp',
            component: Registration
        },
        {
            path: '/chat',
            name: 'chat',
            component: Chat
        },
       /* {
            path: '/getAll',
            name: 'chat',
            component: Chat
        }*/
    ]
})

export default router
