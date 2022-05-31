<script>
import axios from 'axios'
export default {
    name : 'Home',
    data(){
        return{
            isPressed:false,
            questions : [
                {
                    votes : 12,
                    answers : 2,
                    heading :'How to center a div',
                    description : 'I am having a hard time centering a div using flexbox and css, the following code i have used is not helpful, vertical-align : center',
                    time : '4 days ago',
                    user : 'Jacob',
                    tags : 'php,html,css',
                    id : 1
                },
                {
                    votes : 2,
                    answers : 28,
                    heading :'Hello world problem',
                    description : 'The following print statement would print "hello world". Could anyone explain this?',
                    time : '4 days ago',
                    user : 'Jeffery',
                    tags : 'php,html,css',
                    id : 2
                },
                {
                    votes : 32,
                    answers : 344,
                    heading :'yii module not working',
                    description : 'I recently started to work with yii, where can i find the yii version of my yii app?',
                    time : '4 days ago',
                    user : 'Johnathan',
                    tags : 'php,html,css',
                    id : 3
                }                
            ]
        }
    },
    methods:{
       /* testCall(){
            axios({
                method: 'post',
                url: 'http://localhost:4000/hello',
                data: {
                    username: '1234567',
                    password: '1234567pass'
                }
                }).then(function (response) {
                // handle success
                console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        } */
         testCall(){
             axios.get('http://localhost:4000/questionsHomepage')
             .then(response =>{
                 console.log(response.data['result'])
                 this.questions = response.data['result']
             })

                
        },
       upvote(upvote){
           upvote++
           this.isPressed=false;
           console.log(upvote)
            console.log(this.isPressed)
         
          
        }

    },
    mounted(){
        this.testCall()
    }
}
</script>

<template>
        <div class="top-questions-container d-flex flex-column">
            <h3>Top Questions</h3>

            <div class="list-group">

                <a v-for="question in questions" :key="question.id" class="list-group-item list-group-item-action d-flex flex-row">
                    <div class="buttons-container d-flex flex-column col-1">
                        <div class="votes-container">
                                <p>{{question.votes}}</p>
                                <p>votes</p>

                        </div>

                        <div class="answers-container">                            
                        </div>
                    </div>

                    <div class="d-flex d-flex flex-column col-9">
                        <h5 class="mb-1">{{question.heading}}</h5>
                        <p class="mb-1">{{question.description}}</p>
                        <p class="mb-1">{{question.tags}}</p>
                    </div>

                    <div class="d-flex flex-row row justify-content-between">
                        <small>{{question.user}}</small>
                        <small>{{question.time}}</small>
                        <div class="d-flex flex-row row justify-content-between" >
                        <button class="btn-upvote"   @click.once="question.votes++">Upvote</button>
                        <button class="btn-upvote" v-if="question.votes>=1"  @click.once=question.votes-->Downvote</button>
                        </div>
                    </div>

                </a>

            </div>

        </div>

        <div class="d-flex function-buttons-container">
            <template v-if="this.$store.state.signedIn == false">
            <a class="btn-ask-question" href="#/signin">
                Ask a question
            </a>
            </template>

            <template v-else>
            <a class="btn-ask-question" href="#/question">
                Ask a question
            </a>
            </template>   
        </div>

        <div class="top-questions-container d-flex flex-column">
            <h3>Latest Questions</h3>

            <div class="list-group">

                <a v-for="question in questions" :key="question.id" class="list-group-item list-group-item-action d-flex flex-row">
                    <div class="buttons-container d-flex flex-column col-1">
                        <div class="votes-container">
                                <p>{{question.votes}}</p>
                                <p>votes</p>

                        </div>

                        <div class="answers-container">
                            <p>{{question.answers}}</p>
                            <p>answers</p>
                            
                        </div>
                    </div>

                    <div class="d-flex d-flex flex-column col-9">
                        <h5 class="mb-1">{{question.heading}}</h5>
                        <p class="mb-1">{{question.description}}</p>
                        <p class="mb-1">{{question.tags}}</p>
                    </div>

                    <div class="d-flex flex-row row justify-content-between">
                        <small>{{question.user}}</small>
                        <small>{{question.time}}</small>
                        <button class="btn-upvote" :class="{disabledbutton: !isPressed}" :disabled="!isPressed" @click.once="question.upvote">Upvote</button>
                        <button class="btn-upvote" v-if="question.votes>=1" :class="{disabledbutton: !isPressed}" :disabled="!isPressed" @click.once=question.votes-->Downvote</button>

                    </div>

                </a>

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

.btn-upvote{
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    width: 90px;
    height: 45px;
    padding: 7px;
    margin-top: 8px;
    background: #0d6efd;
    border: 1px #0d6efd solid ;
    color: white;
    display: flex;
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
.disabledbutton{
    background-color: #d8d8d8;
    cursor: not-allowed
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

.btn-ask-question, .btn-upvote{
    background: #0d6efd;
    color: white;
}
</style>
