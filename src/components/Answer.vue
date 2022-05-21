<script>

import axios  from "axios";
export default {
    name : 'Answer',
    data(){

        return{ question_asked : [] , Q_ANSWERS : [] }
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
                        alert ("Answer Submited")
                        }
                    
                })
                .catch(function(error){
                    console.log(error.response.data);
                    alert("Error, please try again.")
                });
            

        } ,


        QuestionCall(){
             var question_asked_id = String(document.getElementById("qid").value);
             var question_asked = '';
             axios.get('http://localhost:4000/questionAsked')
             .then(response =>{
                 console.log(response.data['result'])
                 this.questions_asked = response.data['result']
             })
                
        } ,


        AllAnswersCall(){
            
             axios.get('http://localhost:4000/questionAnswers')
             .then(response =>{
                 console.log(response.data['result'])
                 this. Q_ANSWERS = response.data['result']
             })

        }

    } ,

    mounted(){
        this.QuestionCall()
        this.AllAnswersCall()
        //this.AnswerCall
    }


}

</script>


<template>
        
            
                <div class="account-container d-flex flex-column" > 
                    <div   class = "row"> <h2>ANSWER QUESTION</h2>
                     </div>
                <div class="output-group">
                    <!--question asked-->
                
                <form>

                    <p style=" position: relative;left:20px; top:10px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif ;  ">Question Asked:</p>
                    <p>{{question_asked}}</p>
                    <h1 type="text" id="question_asked"  style=" position: relative;left:20px; top:10px ; " >  </h1>
                    <p style=" position: relative;left:20px; top:10px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">Answers:</p>
<!--display all answers-->
                    <div class="list-group">
                    <li><a v-for="Q_ANSWER in Q_ANSWERS" :key="Q_ANSWER.id" class="list-group-item list-group-item-action d-flex flex-row">
                    <div class="buttons-container d-flex flex-column col-1">
                        
                        <div class="answers-container">
                                <p>{{Q_ANSWER.votes}}</p>
                                <p>votes</p>

                        </div>
                    </div>

                    <div class="d-flex d-flex flex-column col-9">
                       <!--<h5 class="mb-1">{{question.heading}}</h5>-->
                        <p class="mb-1">{{Q_ANSWER.description}}</p>
                        <!--<p class="mb-1">{{Q_ANSWER.tags}}</p>-->
                    </div>

                   <!-- <div class="d-flex flex-column col justify-content-between">
                        <small>{{question.user}}</small>
                        <small>{{question.time}}</small>
                    </div> -->

                </a></li>
                </div>
                

                    <textarea id="answer_given"  type="text"  class="question" placeholder="Insert your answer here"  width="100%" required></textarea>
                    <button class="post-answer-btn" @click="AnswerCall" >Submit Answer</button>
                </form>
                </div>
                       
        </div>    
</template>



<style scoped>

.fa.fa-navicon{
    margin-right: 40px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: gray;
}
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
.top-questions-container{
    margin: 50px auto;
    width: 90%;
}
.list-group{
    width: 100%;
    margin: 30px auto;
}
.list-group a{
    padding: 15px;
}
.buttons-container{
    margin-right: 40px;
    justify-content: center;
    align-items: center;
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
.post-answer-btn{
    width: 150px;
    height: 40px;
    color: white;
    font-weight: 700;
    background: #1aa3ff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    text-decoration: none;
    margin-left: auto;
}
.question{
    height: 50px;
    width: 800px;
    resize : none; 
    text-align: left;
    padding-left:0;
    padding-top:0;
    padding-bottom:0.4em;
    padding-right: 0.4em; 
    margin: 20px 20px;
    border: 3px solid #ccc;
    border-radius: 4px;
    text-align: left;
    font-size:20px;
    box-sizing: border-box;
}
.answer{
    height: 400px;
    width: 800px;
    resize : none; 
    text-align: left;
    padding-left:0;
    padding-top:0;
    padding-bottom:0.4em;
    padding-right: 0.4em; 
    margin: 20px 20px;
    border: 3px solid #ccc;
    border-radius: 4px;
    text-align: left;
    font-size:20px;
    box-sizing: border-box;
}
.question::-webkit-scrollbar {
    width: 1em;
}
.question::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
.question::-webkit-scrollbar-thumb {
  background-color: #1aa3ff;
  outline: 1px solid slategrey;
}




.top-questions-container{
    margin: 50px auto;
    width: 90%;
}


.list-group{
    width: 100%;
    margin: 30px auto;
}

.list-group a{
    padding: 15px;
}

.buttons-container{
    margin-right: 40px;
    justify-content: center;
    align-items: center;
}

.votes-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: hsl(210,8%,45%);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    text-align: center;
    width: 90px;
}

.answers-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: hsl(140,40%,55%);
    border-radius: 6px;
    text-align: center;
    width: 90px;
}

.answers-container p{
    color: white;
}


.votes-container p, .answers-container p{
    margin: 0;
}

.function-buttons-container{
    justify-content: center;
    align-items: center;
}

.function-buttons-container a{
    margin: 10px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    width: 130px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
}

.btn-ask-question{
    background: #0d6efd;
    color: white;
}


</style>