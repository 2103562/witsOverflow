<script>
export default {
    name: 'Account',
    data() {
        return {
            //regex for email validation
            
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            // item sets upload image default to null and user avater image 
             item:{
       image : null,
          imageUrl: "../assets/defaultDP.png"
             }
        }
    },
    methods: {
        // on change upload function to change picture from files
            onChange(e) {
      const file = e.target.files[0]
      this.image = file
      this.item.imageUrl = URL.createObjectURL(file)
            },
        validate() {

           

            //extract values
            var userName = String(document.getElementById("dname").value);
            var email = String(document.getElementById("emailComp").value);
            var password = String(document.getElementById("password").value);
            var confirm = String(document.getElementById("confirm").value);
            // var userNameValid = (document.getElementById("dname"));
            // var emailValid = (document.getElementById("email"));
            // var passwordValid = (document.getElementById("password"));
            // var confirmValid = (document.getElementById("confirm"));



            var bValid = true;

            // validating phone numbers-> if needed in future
            // if (!this..match('^[0-9]{10}$')) { bValid=false }
        
            var strRegex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');
            console.log(email.match(strRegex))
            if (!this.reg.test(email)) {
                bValid = false;
                alert("Invalid e-mail")
               
            }

            if (userName.length > 15 || userName.length == 0) {
                bValid = false;
                alert("Invalid username length")
            }

            // can show errors to user on ui later
            if (password != confirm || password.length == 0) {
                bValid = false;
                alert("Passwords do not match")
            }
            if (bValid) {
                //add to DB later
                alert("User details captured successfully")
            } else {

                return
            }
        },
    },
}
</script>

<template>
    <div class="account-container d-flex flex-column">
        <div class="row">
            <h2>Account</h2>

            <div class="d-flex flex-column">

                <h5 class="avatar-header">
                    Avatar
                </h5>
                <div id="preview" class="d-flex flex-row">
     <!-- upload button functionality -->
    <img v-if="item.imageUrl" :src="item.imageUrl" class="user-avatar" />
        <label class="upload-button">
     <input id="browse" type = "file" accept="image/*" style="hidden" @change="onChange" />
      <i ></i> Upload
     </label>
       </div>
            </div>
        </div>
        <div id="invalidate">
            <div class="row d-flex flex-row justify-content-between">

                <div class="form-group">

                    <label for="dname">Username:</label>

                    <!-- chage max lengtha ccordingly later -->
                    <input maxlength="15" type="text" class="form-control" name="uname" id="dname" required>

                </div>

                <div class="form-group">

                    <label for="emailComp">Email:</label>
                    <!-- changed it ot an email field for validation purposes- but not supported by all browsera
                    therefore extra validation is added in validate method -->
                    <input type="email" class="form-control" name="email" id="emailComp" required>

                </div>

            </div>

            <div class="row justify-content-between">

                <div class="form-group">

                    <label for="password">Password:</label>
                    <input type="password" class="form-control" id="password" name="password" required>

                </div>

                <div class="form-group">

                    <label for="confirm">Confirm password:</label>
                    <input type="password" class="form-control" name="confirm" id="confirm" required>

                </div>


            </div>
        </div>
        <div class="row d-flex">

            <p> <strong>Delete account</strong> </p>
            <div class="d-flex justify-content-between delete-account">
                <p>By deleting your account you will lose all your data</p>
                <a href="#">Delete account</a>
                <a class="delete-btn" href="#">Delete</a>
            </div>

        </div>

        <div class="row d-flex justify-content-between">

            <a @click="validate" class="custom-btn">Save changes</a>

        </div>


    </div>

</template>


<style scoped>
.account-container {
    width: 75%;
    border-radius: 15px;
    box-shadow: 0px 0px 14px -5px rgba(76, 75, 75, 0.75);
    padding: 35px;
    display: flex;
    margin: 60px auto;

}

.account-container .row:not(:first-child),
.account-container .row:not(:last-child) {
    margin-bottom: 20px;
    padding-bottom: 25px;
    border-bottom: 1px solid rgb(211, 211, 211);

}

.account-container .row:last-child {
    border-bottom: none;
}

.account-container .row:first-child {
    margin-bottom: 15px;
}

.form-group label {
    margin-bottom: 8px;
}


.form-group {
    width: 440px;
}

.delete-account a {
    text-decoration: none;
    color: var(--bs-body-color);
}


.avatar-header {
    margin-top: 30px;
}

.user-avatar {
    width: 85px;
    height: 85px;
    border: 1px rgb(201, 204, 207) solid;
    border-radius: 50%;
    padding: 3px;
}

.img-container {
    align-items: center;
}

.img-container a {
    margin-left: 25px;
    transition: .2s;

}

.upload-button,
.remove-button {
    border: 1px solid #ced4da;
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: 600;
    border-radius: 4px;
}

.img-container a:hover {
    border: 1px solid #0d6efd;
    background: #0d6efd;
    color: white;
}

.custom-btn {
    width: 160px;
    height: 45px;
    color: white;
    font-weight: 700;
    background: #0d6efd;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    text-decoration: none;
}

.delete-btn {
    width: 160px;
    height: 45px;
    color: white;
    font-weight: 700;
    background: #af0000;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    text-decoration: none;
}
/* makes input file type on upload button invisible */
input[type="file"] {
        display: none;
    }
</style>