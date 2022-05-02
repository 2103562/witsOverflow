<script>
export default {
    name : 'Signin'
}
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");

    function register(){
        x.style.left = "-400px";
        y.style.left = "50px";
        z.style.left = "110px";
    }

    function login(){
        x.style.left = "50px";
        y.style.left = "450px";
        z.style.left = "0";
    }
</script>

<template>
        <div class="hero">
            <div class="form__box">
                <div class="button__box">
                    <div id="btn"></div>
                    <button type="button" class="toggleBtn" onclick="login()">Log In</button>
                    <button type="button" class="toggleBtn" onclick="register()">Sign Up</button>
                </div>

                <div id="error"></div>

                <form id="login" class="input__group" action="/" method="POST">
                    <h2>Login</h2>
                        <input type="text" name="Username" class="input__field" placeholder="Username" required>
                        <input type="text" name="UserPassword" class="input__field" placeholder="Password" minlength=8 required>
                        <input type="checkbox" class="check__box"><span>Remember Password</span>
                        <button type="submit" class="submitBtn">Log In</button>   
                        
                </form>
                
                <form id="register" class="input__group" action="/" method="POST">
                    <h2>Sign Up</h2>
                    <input type="text" name="username" class="input__field" placeholder="Username" required>
                    <input type="text" name="email" class="input__field" placeholder="Email" required>
                    <input type="text" name="password" class="input__field" placeholder="Password" required>
                    <input type="text" class="input__field" placeholder="Confirm Password" required>
                    <input type="checkbox" class="check__box"><span>Sign up as a moderator</span>
                    <button type="submit" class="submitBtn">Sign Up</button>
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
    width: 110px;
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