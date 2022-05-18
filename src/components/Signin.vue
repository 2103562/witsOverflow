<script>
import axios from 'axios'
export default {
    name : 'Signin',
    data(){
        return{
            username : '',
            password : '',
            USERNAME : '',
            EMAIL : '',
            PASSWORD : '',
            CONFIRMPASSWORD : '',
             //regex for email validation
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            //moderatorCheckbox: false
        }
    },
    methods : {
        loginMove : function(){
            var x = document.getElementById("login");
            var y = document.getElementById("register");
            var z = document.getElementById("btn");

            x.style.left = "50px";
            y.style.left = "450px";
            z.style.left = "0";
        },

        registerMove : function(){
            var x = document.getElementById("login");
            var y = document.getElementById("register");
            var z = document.getElementById("btn");

            x.style.left = "-400px";
            y.style.left = "50px";
            z.style.left = "110px";
        },

        loginCall(){
             axios.post('http://localhost:4000/login',{
                 username : this.username,
                 password : this.password
             })
             .then(response =>{
                console.log(response.data['status'])
                if (response.data['status'] == 'true'){
                    this.$store.commit('logged',this.username)
                    console.log(this.$store.state.signedIn)
                    document.getElementById("account").click()
                } 
             }).catch(error =>{
                console.log(error);
            });
        },

        registerCall : function() {
            //validation
            var USERNAME = String(document.getElementById("USERNAME").value);
            var EMAIL = String(document.getElementById("EMAIL").value);
            var PASSWORD = String(document.getElementById("PASSWORD").value);
            var CONFIRMPASSWORD = String(document.getElementById("CONFIRMPASSWORD").value);
            var bValid = true;

            var strRegex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');
            console.log(EMAIL.match(strRegex))
            if (!this.reg.test(EMAIL)) {
                bValid = false;
                alert("Invalid e-mail")
            }

            if (PASSWORD != CONFIRMPASSWORD) {
                bValid = false;
                alert("Passwords do not match")
            }

            //validation complete (using above and in html below)
            if (bValid == true) {
                //using the server.js file
                axios.post('http://localhost:4000/register', {
                    //get values from form input
                    USERNAME : this.USERNAME,
                    EMAIL : this.EMAIL,
                    PASSWORD : this.PASSWORD,
                    CONFIRMPASSWORD : this.CONFIRMPASSWORD
                })
                .then(response => {
                    console.log(response.data['status'])
                    if (response.data['status'] == 'pass'){
                        //track if a user already signed in?
                        this.$store.commit('logged',this.USERNAME)
                        console.log(this.$store.state.signedIn)
                        //registration successful
                        alert('Registration successful!') //ONLY WORKS SOMETIMES????
                        //redirect to account page
                        document.getElementById("account").click(); //ONLY WORKS SOMETIMES????
                    }
                    else{
                        alert('Username already exists') //ONLY WORKS SOMETIMES????
                    }
                })
                .catch(function(error){
                    console.log(error.response.data);
                    alert("Error, please try again.")
                });
            } else {
                return
            }

        }

    }
}

</script>

<template>
        <div class="hero">
            <div class="form__box">
                <div class="button__box">
                    <div id="btn">

                    </div>
                    <button @click="loginMove" type="button" class="toggleBtn">Log In</button>
                    <button @click="registerMove" type="button" class="toggleBtn">Sign Up</button>
                </div>

                <div id="error"></div>

                <form id="login" class="input__group">
                    <h2>Login</h2>
                        <input v-model="username" type="text" name="Username" class="input__field" placeholder="Username" required>
                        <input v-model="password" type="text" name="UserPassword" class="input__field" placeholder="Password" minlength=8 required>
                        <input type="checkbox" class="check__box"><span>Remember Password</span>
                        <button @click="loginCall" type="submit" class="submitBtn">Log In</button>   
                        
                </form>
                
                <form id="register" class="input__group">
                    <h2>Sign Up</h2>
                    <input id="USERNAME" v-model="USERNAME" type="text"  class="input__field" placeholder="Username" maxlength="15" required>
                    <input id="EMAIL" v-model="EMAIL" type="text"  class="input__field" placeholder="Email" required>
                    <input id="PASSWORD" v-model="PASSWORD" type="text"  class="input__field" placeholder="Password" required minlength="8">
                    <input id="CONFIRMPASSWORD" v-model="CONFIRMPASSWORD"  type="text" class="input__field" placeholder="Confirm Password" required minlength="8">
                    <input type="checkbox" v-model="moderatorCheckbox" class="check__box"><span>Sign up as a moderator</span>
                    <button @click="registerCall" class="submitBtn">Sign Up</button>
                </form>
            </div>
        </div>
        
            
</template>

<style scoped>

.hero {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(rgba(5, 51, 97, 0.4),rgba(6, 26, 86, 0.4)),url(GreatHallWits.jpg);
    background-position: center;
    background-size: cover;
    position: absolute;
}

.logo {
    margin: 30px auto;
    text-align: center;
}
.logo img {
    width: 30px;
    bottom: 50px;
}

.form__box {
    width: 380px;
    height: 600px;
    position: relative;
    margin: 6% auto;
    background: #fff;
    padding: 5px;
    overflow: hidden;
}

.button__box {
    width: 235px;
    margin: 35px auto;
    position: relative;
    box-shadow: 0 0 20px 9px #0531f51f;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
}

.toggleBtn {
    padding: 10px 30px;
    margin-left: 5px;
    cursor: pointer;
    background: transparent;
    border: 0;
    outline: none;
    position: relative;
}

#btn {
    top: 0;
    left: 0;
    position: absolute;
    width: 124px;
    height: 100%;
    background: linear-gradient(to right, #2248e2, #649df1);
    border-radius: 30px;
    transition: .5s;
}

.input__group {
    top: 180px;
    position: absolute;
    width: 280px;
    transition: .5s;
}

.input__field {
    width: 100%;
    padding: 10px 0;
    margin: 5px 0;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid rgb(123, 135, 226);
    outline: none;
    background: transparent;
}

.submitBtn {
    width: 85%;
    padding: 10px 30px;
    cursor: pointer;
    display: block;
    margin: auto;
    background: linear-gradient(to right, #2248e2, #649df1);
    border: 0;
    outline: none;
    border-radius: 30px;
}

.check__box {
    margin: 30px 10px 30px 0;
}

span {
    color: rgb(136, 144, 205);
    font-size: 12px;
    bottom: 68px;
    position: absolute;
}

#login {
    left: 50px;
}

#register {
    left: 450px;
}

h2 {
    text-align: center;
    bottom: 50px;
    position: relative;
}
</style>