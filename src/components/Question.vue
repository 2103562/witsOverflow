<script>
import axios from 'axios'
export default {
    name : 'Question',
    data(){
        return{
            HEADING : '',
            DISCRIPTION : '',
            TAGS : '',
        }
    },

    methods : {
        PostQuestionMove : function(){
            var x = document.getElementById("HEADING");
            var y = document.getElementById("DISCRIPTION");
            var z = document.getElementById("TAGS");
        },
        
        PostQuestionCall(){
             axios.post('http://localhost:4000/AskQuestion',{
                 heading : this.heading,
                 description : this.description,
                 tags : this.tags,
                 user : this.$store.state.username,
             })
             .then(response =>{
                console.log(response.data['status'])
                if (response.data['status'] == 'true'){
                    alert("Question posted successfully")
                    document.getElementById("question").click();
                } 
             }).catch(error =>{
                console.log(error);
                alert("please fill in all fields")
            });
        }
    }   

}
</script>

<template>
        <div class="account-container d-flex flex-column">
            <div class="row">
                    <h2>Ask Question</h2>
            </div>
                <div class="input-group">
                <!-- title, description and tags input -->
                    <form>
                    <p style=" position: relative;left:20px; top:10px;">Title:</p>
                    <input id="heading" v-model="heading" type="text" class="title" placeholder="Type Title...">
                    <p style=" position: relative;left:20px; top:10px;">Question:</p>
                    <input id="description" v-model="description" class="question" type="text" placeholder="Type Question...">
                    <p style=" position: relative;left:20px; top:10px;">Tags:</p>
                    <input id="tags" v-model="tags" class="title" type="text" placeholder="e.g CSS,PHP,HTML ">
                    </form>
               <span class="input-group-btn" >
             </span>
            </div>
            <button @click="PostQuestionCall" type="submit" class="post-question-btn">Post Question</button>
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

.post-question-btn{
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

.title{
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

.question{
    height: 400px;
    width: 800px;
    resize : none; 
    text-align: left;
    vertical-align: top;
    padding-left:0;
    padding-top:0;
    padding-bottom:0.4em;
    padding-right: 0.4em; 
    margin: 20px 20px;
    border: 3px solid #ccc;
    border-radius: 4px;
    font-size:20px;
    box-sizing: border-box;
}

.question::-webkit-scrollbar {
    width: 1em;
}

.question::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

.question::-webkit-scrollbar-thumb {
  background-color: #1aa3ff;
  outline: 1px solid slategrey;
}
</style>
