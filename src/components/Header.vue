<script>
export default {
    name : 'Header',
    data(){
        return {
            title : 'witsOverflow',
        }
    },
    methods : {
        filterFunction() {
            // Declare variables
            var input, filter, list, a, i, txtValue, divs, header;
            input = document.getElementById('myInput');
            filter = input.value.toUpperCase();
            list = document.getElementsByClassName("list-group")[0];
            a = list.getElementsByTagName('a');
            console.log(a)
            console.log(filter)

            // Loop through all list items, and hide those who don't match the search query
            for (i = 0; i < a.length; i++) {
                divs = a[i].getElementsByTagName("div")[3];
                header = divs.getElementsByTagName("h5")[0];
                txtValue = header.textContent || header.innerText;
                console.log(txtValue.toUpperCase().indexOf(filter) > -1)
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    a[i].setAttribute("style","display:flex !important");
                } else {
                    a[i].setAttribute("style","display:none !important");
                }
            }
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
            <a id="home" class="nav-item nav-link active" href="#/">Home</a>
   
            <template v-if="this.$store.state.signedIn == false">
            <a class="btn btn-outline-primary btn-login" href="#/signin" >Sign in</a>
            <a class="btn btn-outline-primary btn-signup" href="#/signin">Sign up</a>
            <a style="visibility:hidden;" class="nav-item nav-link" href="#/">Logout</a>
            <a style="visibility:hidden;" id="account" class="nav-item nav-link disabled" href="#/account">Account</a>
            <a style="visibility:hidden;" class="nav-item nav-link" href="#/questions"> View all questions</a>
            <a style="visibility:hidden;" class="nav-item nav-link" href="#/question">Ask a question</a>
            </template>

            <template v-else>
            <a class="nav-item nav-link" href="#/account">Account</a>
            <a class="nav-item nav-link" href="#/questions"> View all questions</a>
            <a class="nav-item nav-link" href="#/question">Ask a question</a>
            <a class="nav-item nav-link" href="/">Logout</a>
            <a class="btn btn-outline-primary btn-login disabled" href="#/signin">Log in</a>
            <a class="btn btn-outline-primary btn-signup disabled" href="#/signin">Sign up</a>
            </template>

        </div>

    </div>
    

    <form class="form-inline d-flex">

        <input class="form-control mr-sm-2" id="myInput" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary my-2 my-sm-0" type="button" @click="filterFunction()">Search</button>

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
