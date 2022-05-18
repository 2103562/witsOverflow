<script>
 //java script

import axios from "axios"
export default {
    name : 'Questions-List'
}

</script>

<template>
<!--users-list.ejs html-->
<!DOCTYPE html>
<html lang="en">
  <link rel="shortcut icon" href="/assets/favicon.ico" />
  <link rel="stylesheet" href="/assets/decode.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

   <head>
    <title>Questions</title>
  </head>
  <body>
    <div class="table-data">
      <h2 font-weight:bold>Wits Overflow</h2>
      <table class="content-table" border="1" frame="void" rules="rows">
        <tr>
          <th>Heading</th>
          <th>Description</th>
          <th>Users</th>
          <th>Time</th>
        </tr>

        &lt%if(userData.length!=0){ var i=1; userData.forEach(function(result){ %>
        <tr>
          <td>&lt%=result.heading %></td>
          <td>&lt%%=result.description %></td>
          <td>&lt%%=result.user_id %></td>
          <td>&lt%%=result.time %></td>
          <td>
            <a href="/users/edit/<%=data.id%>"
              >View All Answers To this Question
            </a>
          </td>
        </tr>
        &lt%% i++; }) %> &lt%% } else{ %>
        <tr>
          <td colspan="7">No Data Found</td>
        </tr>
        &lt%% } %>
      </table>

      <button>Home</button>
    </div>
  </body>
</html>

</template>

<style scoped>
/*style-lis.ejs css*/
* {
      font-family: sans-serif; /* Change your font family */
    }

    .content-table {
      border-collapse: collapse;
      margin: 25px 0;
      font-size: 0.9em;
      min-width: 100%;
      border-spacing: 100px;
      border-radius: 5px 5px 0 0;
      overflow: hidden;
      box-shadow: 0 0 20px #007bff;
      text-align: left;
    }

    .content-table thead tr {
      background-color: #007bff;
      color: #007bff;
      text-align: center;
      font-weight: bold;
    }

    .content-table th,
    .content-table td {
      padding: 12px 15px;
    }

    .content-table tbody tr {
      border-bottom: 1px solid #007bff;
    }

    .content-table tbody tr:nth-of-type(even) {
      background-color: #d3d3d3;
    }

    .content-table tbody tr:last-of-type {
      border-bottom: 2px solid #007bff;
    }

    .content-table tbody tr.active-row {
      font-weight: bold;
      color: #007bff;
    }
</style>