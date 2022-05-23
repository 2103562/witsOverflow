<template>
    <div class="hero">
            <div class="form__box">
                

                <div id="error"></div>

                <form id="email" class="input__group">
                    <h3>Forgot Password</h3>
                    <label>Enter your email address</label>
                        <input type="email" class="input__field" placeholder="Email" required>
                        <button class="submitBtn">Submit</button>  
                        
                </form>
                
               
            </div>
        </div>
    
</template>

<script>
export default {
    name: 'Forgotpassword'
}
</script>

<style scoped>

.hero {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(rgba(5, 51, 97, 0.4),rgba(6, 26, 86, 0.4)),url(GreatHallWits.jpg);
    background-position: center;
    background-size: cover;
    position: absolute;
}

.form__box {
    width: 380px;
    height: 300px;
    position: relative;
    bottom: -50px;
    margin: 6% auto;
    background: #fff;
    padding: 5px;
    overflow: hidden;
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
    position: relative;
    bottom: 100px;
}

label {
    display: block;
    position: relative;
    bottom: 100px;
    color:black;
    font-weight: 600;
}

.submitBtn {
    width: 100%;
    height: 45px;
    padding: 10px 30px;
    cursor: pointer;
    display: block;
    margin: auto;
    background: #0d6efd;
    border: 0;
    outline: none;
    border-radius: 30px;
    position: relative;
    bottom: 80px;
    font-weight: 600;
}
.submitBtn:hover {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
}

#email {
    left: 50px;
}

h3 {
    text-align: center;
    bottom: 130px;
    position: relative;
}
</style>