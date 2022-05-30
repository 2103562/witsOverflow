<script>
import axios from "axios";
export default {
  name: "Account",
  data() {
    return {
      questions: [],
      // item sets upload image default to null and user avater image
      item: {
        image: null,
        imageUrl: "",
      },
    };
  },
  methods: {

      getQuestions() {
        axios
            .post("http://localhost:4000/account/questions", { username: this.$store.state.username })
            .then((response) => {
            console.log(response.data["result"]);
            this.questions = response.data["result"];
            });
        },

        //get user data from database
        getUserData() {
            var userObject;
            var usernameField = document.getElementById("dname");
            var emailField = document.getElementById("emailComp");
            var passField = document.getElementById("password");
            var confirmField = document.getElementById("confirm");
            axios
            .post("http://localhost:4000/account/get", {
                userId: this.$store.state.userId,
            })
            .then((response) => {
                userObject = response.data["result"];
                console.log(userObject);
                usernameField.setAttribute("value", userObject[0].Username);
                emailField.setAttribute("value", userObject[0].Email);
                passField.setAttribute("value", userObject[0].Password);
                confirmField.setAttribute("value", userObject[0].Password);
            })
            .catch((error) => {
                console.log(error);
            });
        },

        deleteUser() {},

        // on change upload function to change picture from files
        setDisplayPic(e) {
            const file = e.target.files[0];
            this.image = file;
            this.item.imageUrl = URL.createObjectURL(file);
        },

        validate() {
            //extract values
            var password = String(document.getElementById("password").value);
            var confirm = String(document.getElementById("confirm").value);
            var bValid = true;

            // validate password
            if (password.length < 8 || password.length == 0) {
                bValid = false;
                alert("Password must be at least 8 characters");
            }

            // validate confirm password
            if (password != confirm) {
                bValid = false;
                alert("Passwords do not match");
            }

            if (bValid) {
                axios.post('http://localhost:4000/account/set',{
                    username : this.$store.state.username,
                    password : this.password
                })
                .then(response =>{
                    console.log(response.data['status'])
                    if (response.data['status'] == 'true'){
                        alert("Password updated");
                    } 
                })
                .catch(error =>{
                    console.log(error);
                });
            } else {
                return;
            }
        },
    }, // end of methods

    mounted() {
        this.getUserData();
        this.getQuestions();
    },
};
</script>

<template>
  <div class="account-container d-flex flex-column">
    <div class="row">
      <h2>Account</h2>

      <div class="d-flex flex-column">
        <h5 class="avatar-header">Avatar</h5>
        <div id="preview" class="img-container d-flex">
          <!-- upload button functionality -->
          <img v-if="item.imageUrl" :src="item.imageUrl" class="user-avatar" />
          <label class="upload-button">
            <input
              id="browse"
              type="file"
              accept="image/*"
              style="hidden"
              @change="setDisplayPic"
            />
            <i></i> Upload
          </label>
        </div>
      </div>
    </div>
    <div id="invalidate">
      <div class="row d-flex flex-row justify-content-between">
        <div class="form-group">
          <label for="dname">Username:</label>

          <input
            maxlength="15"
            type="text"
            class="form-control"
            name="uname"
            id="dname"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="emailComp">Email:</label>
          <!-- changed it ot an email field for validation purposes- but not supported by all browsera
                    therefore extra validation is added in validate method -->
          <input
            type="email"
            class="form-control"
            name="email"
            id="emailComp"
            disabled
          />
        </div>
      </div>

      <div class="row justify-content-between">
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="password"
            name="password"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirm">Confirm password:</label>
          <input
            type="password"
            class="form-control"
            name="confirm"
            id="confirm"
            required
          />
        </div>
      </div>
    </div>
    <div class="row d-flex">
      <p><strong>Delete account</strong></p>
      <div class="d-flex justify-content-between delete-account">
        <p>By deleting your account you will lose all your data</p>
        <a @click="deleteAccount" class="delete-btn">Delete</a>
      </div>
    </div>

    <div class="row d-flex justify-content-between">
      <a @click="validate" class="custom-btn">Save changes</a>
    </div>

    <div class="top-questions-container d-flex flex-column">
      <h3>My Questions</h3>

      <div class="list-group">
        <a
          v-for="question in questions"
          :key="question.id"
          class="list-group-item list-group-item-action d-flex flex-row"
        >
          <div class="buttons-container d-flex flex-column col-1">
            <div class="votes-container">
              <p>{{ question.votes }}</p>
              <p>votes</p>
            </div>

            <div class="answers-container">
              <p>{{ question.answers }}</p>
              <p>answers</p>
            </div>
          </div>

          <div class="d-flex d-flex flex-column col-9">
            <h5 class="mb-1">{{ question.heading }}</h5>
            <p class="mb-1">{{ question.description }}</p>
            <p class="mb-1">{{ question.tags }}</p>
          </div>

          <div class="d-flex flex-column col justify-content-between">
            <small>{{ question.user }}</small>
            <small>{{ question.time }}</small>
          </div>
        </a>
      </div>
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
  transition: 0.2s;
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
  margin-left: 20px;
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