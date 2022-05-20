import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

// Create a new store instance.
const store = createStore({
    state () {
      return {
        signedIn : false,
        userId : "",
        username : ""

      }
    },
    mutations: {
      logged (state,name) {
        state.signedIn = true
        state.username = name
      },
      setId (state,id){
        state.userId = id
      }
    }
  })

const app = createApp(App)

app.use(store)

app.mount('#app')
