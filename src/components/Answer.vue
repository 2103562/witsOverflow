<script>
import axios  from "axios";
export default {
    name : 'Answer',
    data(){

        return{ answer_given : ''}
    },

    methods : {

        AnswerCall : function(){
            var answer_given = String(document.getElementById("answer_given").value);
            axios.post('http://localhost:4000/answer',{
             answer_given : this.answer_given
                })
                .then(response => {
                    console.log(response.data['status'])
                    if (response.data['status'] == 'pass'){
                        alert ("Question Submited")
                        }
                    
                })
                .catch(function(error){
                    console.log(error.response.data);
                    alert("Error, please try again.")
                });
            

        }


    }


}

</script>


<template>
        
            
                <div> 
                
                <form id="answer" class="input__group">
                    <h2>ANSWER  QUESTION</h2>
                    <h1>Question  :   <output id="question">"question will be  displayed here"</output> </h1>



                    <input id="answer_given" v-model="answer_given" type="text"  class="input__field" placeholder="insert your answer here"  width="100%" required>
                    <button @click="AnswerCall" class="submitBtn">Submit Answer</button>

                    <div class="d-flex function-buttons-container">
            <a class="btn-Questions-table" href="#/questions">
                Questions Table
            </a>       
        </div>
                    
                </form>

            </div>

        
      
        
            
</template>



<style>

.logo {
    margin: 30px auto;
    text-align: center;
}
.logo img {
    width: 30px;
    bottom: 50px;
}



.button__box {
    width: 100%;
    margin: 50%;
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
    width:100%;
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