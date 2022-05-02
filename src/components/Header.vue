<script>
export default {
    name : 'Header',
    data(){
        return {
            title : 'witsOverflow',
            state : this.$store.state.signedIn
        }
    }
}
</script>

<template>
    <nav class="navbar navbar-light bg-light d-flex justify-content-between p-3 shadow-sm">
    <div class="d-flex p-1">

        <a class="fa fa-navicon"></a>
        
        <a class="navbar-brand">{{title}}</a>

        <div class="navbar-nav d-flex flex-row">
            <a class="nav-item nav-link active" href="#/">Home</a>
            <a class="nav-item nav-link" href="#">Features</a>
            <a class="nav-item nav-link" href="#">Pricing</a>

            <template v-if="state == false">
            <a class="nav-item nav-link disabled" href="#/account">Account</a>
            <a class="btn btn-outline-primary btn-login" href="#/signin">Log in</a>
            <a class="btn btn-outline-primary btn-signup" href="#/signin">Sign up</a>
            </template>

            <template v-else>
            <a class="nav-item nav-link" href="#/account">Account</a>
            <a class="btn btn-outline-primary btn-login disabled" href="#/signin">Log in</a>
            <a class="btn btn-outline-primary btn-signup disabled" href="#/signin">Sign up</a>
            </template>



        </div>

    </div>
    

    <form class="form-inline d-flex">

        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>

    </form>

    </nav>
</template>

<style scoped>

a:hover{
    color: white;
}
.navbar-nav a{
    padding-left: 15px !important;
    padding-right: 15px !important;
    transition: 0.15s;
}

.btn-login{
    margin-right: 12px;
    margin-left: 12px;
    border-radius: 40px;
}

.btn-signup{
    border-radius: 40px;
}

.navbar-nav a:hover{
    color: #007bff !important;
    font-size: 17px;
}

a.btn-login:hover, a.btn-signup:hover{
    color: white !important;
}

.navbar-brand{
    margin-right: 40px;
    font-weight: 700;
}

.nav-item.nav-link.active{
    color: #007bff !important;
}

.fa.fa-navicon{
    margin-right: 40px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: gray;
}

</style>