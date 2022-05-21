<script>
import Header from './components/Header.vue'
import Account from './components/Account.vue'
import Home from './components/Home.vue'
import Signin from './components/Signin.vue'
import Question from './components/Question.vue'

const routes = {
  '/': Home,
  '/account': Account,
  '/signin': Signin,
  '/signup': Signin,
  '/question': Question,
}

export default{
  name : 'App',
  components : {
    Header,
    Home,
    Account,
    Signin

  },
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }

}
</script>

<template>
  <Header />
  <component :is="currentView" />
</template>

