<script>
export default {
    name : 'Account'
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
                    
                <div class="img-container d-flex">

                    <img class="user-avatar" src="../assets/defaultDP.png">
                    <a class="upload-button">Upload</a>
                    <a class="remove-button">Remove</a>
        
                </div>
                    
            </div>
        </div>

        <div class="row d-flex flex-row justify-content-between">

            <div class="form-group">

                <label for="dname">Display Name:</label>
                <input type="text" class="form-control" id="dname">
            
            </div>

            <div class="form-group">

                <label for="name">Full Name:</label>
                <input type="password" class="form-control" id="name">

            </div>
            
        </div>

        <div class="row d-flex flex-row justify-content-between">

            <div class="form-group">

                <label for="email">Email:</label>
                <input type="text" class="form-control" id="email">
            
            </div>

            <div class="form-group">

                <label for="phone">Phone number:</label>
                <input type="text" class="form-control" id="phone">

            </div>

            
        </div>

        <div class="row d-flex flex-row justify-content-between">

            <div class="form-group">

                <label for="password">Password:</label>
                <input type="text" class="form-control" id="password">
            
            </div>

            <div class="form-group">

                <label for="confirm">Confirm password:</label>
                <input type="text" class="form-control" id="confirm">

            </div>

            
        </div>

        <div class="row d-flex">

            <p> <strong>Delete account</strong> </p>
            <div class="d-flex justify-content-between delete-account">
                <p>By deleting your account you will lose all your data</p>
                <a href="#">Delete account...</a>
            </div>

        </div>

        <div class="row d-flex justify-content-between">

            <a class="custom-btn" href="index.html">Back</a>

            <a class="custom-btn">Save changes</a>

        </div>

    </div>

</template>

<style scoped>
.account-container{
    width: 75%;
    border-radius: 15px;
    box-shadow: 0px 0px 14px -5px rgba(76, 75, 75, 0.75);
    padding: 35px;
    display: flex;
    margin: 60px auto;

}

.account-container .row:not(:first-child), .account-container .row:not(:last-child){
    margin-bottom: 20px;
    padding-bottom: 25px;
    border-bottom: 1px solid rgb(211, 211, 211);
    
}

.account-container .row:last-child{
    border-bottom: none;
}

.account-container .row:first-child{
    margin-bottom: 15px;
}

.form-group label{
    margin-bottom: 8px;
}


.form-group{
    width: 440px;
}

.delete-account a{
    text-decoration: none;
    color: var(--bs-body-color);
}


.avatar-header{
    margin-top: 30px;
}

.user-avatar{
    width: 85px;
    height: 85px;
    border: 1px rgb(201, 204, 207) solid;
    border-radius: 50%;
    padding: 3px;
}

.img-container{
    align-items: center;
}

.img-container a{
    margin-left: 25px;
    transition: .2s;

}

.upload-button, .remove-button{
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

.img-container a:hover{
    border: 1px solid #0d6efd;
    background: #0d6efd;
    color: white;
}

.custom-btn{
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
</style>