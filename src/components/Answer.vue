<script>

import axios  from "axios";
export default {
    name : 'Answer',
    data(){

        return{ 
            question_asked : [] , 
            questionAnswers:[],
            qid : '',
            answer_given : '',
        }
    },

    methods : {

        parameterCall: function() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const qid = urlParams.get('qid');
            console.log(qid); 

            axios.post('http://localhost:4000/questionAsked',{
                qid
            })
            .then(response =>{
                console.log(response.data['result'])
                this.question_asked = response.data['result']
            })
            .catch(function(error){
                console.log(error.response.data);
                alert("Error")
            });

            //displaying other answers to the question
            axios.post('http://localhost:4000/questionAnswers',{
                qid
            })
            .then(response =>{
                console.log(response.data['result'])
                this.questionAnswers = response.data['result']
            })
            .catch(function(error){
               console.log(error.response.data);
               alert("Error1")
            });

        },

        AnswerCall : function(){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const qid = urlParams.get('qid');
            console.log(qid);
            console.log(this.$store.state.username)
            
            var answer_given = String(document.getElementById("answer_given").value);
            axios.post('http://localhost:4000/answer',{
                qid,
                answer_given : this.answer_given,
                username : this.$store.state.username,
            })
            .then(response => {
                console.log(response.data['status'])
                if (response.data['status'] == 'pass'){
                    alert ("Answer Submitted")
                    document.getElementById("questions").click(); 
                }  
            })
            .catch(function(error){
                console.log(error.response.data);
                alert("Error, please try again.")
            });
        },

        ModeratorDeleteAnswer : function(){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const questionAnswers = urlParams.get('questionAnswers');
            console.log(questionAnswers); 

            axios.post('http://localhost:4000/DeleteAnswer',{
                questionAnswers
            })
            .then(response =>{
                console.log(response.data['result'])
                if (response.data['status'] == 'pass1'){
                    alert("Answer removed");
                    document.getElementById("questions").click(); 
                }else{
                    alert("Answer could not be deleted, try again");
                }
                
            })
            .catch(function(error){
                console.log(error.response.data);
                alert("Error")
            });
        },

        ModeratorDeleteQuestion : function(){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const qid = urlParams.get('qid');
            console.log(qid); 

            axios.post('http://localhost:4000/DeleteQuestion',{
                qid
            })
            .then(response =>{
                console.log(response.data['status'])
                if (response.data['status'] == 'pass'){
                    alert("Question removed");
                    //this.testCall()
                    //document.getElementById("questions").click(); 
                }else{
                    alert("Question could not be deleted, try again");
                }
                
            })
            .catch(function(error){
                console.log(error.response.data);
                alert("Error")
            });
             
            axios.post('http://localhost:4000/DeleteQuestionAnswers',{
                qid
            })
            .then(response =>{
                console.log(response.data['status'])
            })
            .catch(function(error){
                console.log(error.response.data);
                alert("Error")
            });
            
        }

    },
    mounted(){
        this.parameterCall()
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

                    <b><p style=" position: relative;left:20px; top:10px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif ;  "  font-weight:bold >Question Asked:</p></b>
                    <p v-for="question_asked in question_asked" :key="question_asked.id" style=" position: relative;left:20px; top:10px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">{{question_asked.description}}</p>
                    <p></p>
                    
                    <b><p style=" position: relative;left:20px; top:10px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif">Other Answers:</p></b>
                   <div class="top-questions-container d-flex flex-column">
                   <div class="list-group" >

                    
                    <a v-for="questionAnswers in questionAnswers" :key="questionAnswers.Answerid" class="list-group-item list-group-item-action d-flex flex-row" 
                        :href="'?questionAnswers=' + questionAnswers.Answerid + '#/deleteanswer' " >
                   <div class="buttons-container d-flex flex-column col-1">
                        <div class="answers-container">
                            <p>{{questionAnswers.votes}}</p>
                                <p>votes</p>
                        </div>
                        
                        <div class="delete-answers">
                            <button type="button" @click="ModeratorDeleteAnswer">Delete Answer</button>
                        </div>
                        </div>

                        <div class="d-flex d-flex flex-column col-9">
                        <p class="mb-1">{{questionAnswers.answer}}</p>
                        </div>

                    </a>
                    </div>
                    </div>

                    <input v-model="answer_given" id="answer_given"  type="text"  class="question" placeholder="answer the question"  width="100%" required>
                    <button class="post-answer-btn" @click="AnswerCall" >Submit Answer</button>
                    <p></p>

                    <button @click="ModeratorDeleteQuestion" type="button">Delete this Question</button>
                    
                </form>
                </div> 
        </div>    
</template>


<style scoped>

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

.delete-answers button{
    position: relative;
    left: 710px;
    bottom: 25px;
    width: 120px;
    background: #ee0303;
    border: 0;
    outline: none;
    border-radius: 6px;
    color: white;
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


</style>