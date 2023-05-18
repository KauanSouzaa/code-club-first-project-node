//  port = 3000; // FIZ ISSO PARA QUANDO EU QUISER MUDAR A PORTA NÃO TER QUE FICAR ALTERANDO O NÚMERO TODA HORA

/*
   - Query params => meusite.com/users?nome=kauan&age=16  // FILTROS
   - Route params => /users/2   // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO  
*/

//para acessar precisa colocar esse servidor no ar > terminal > node + nome do arquivo exemplo (index.js)
// Para acessar no google tem que fazer assim (número da porta e (nome do arquivo ou aquilo que você quer abrir)) : http://localhost:3000/users

/*

# [QUERY PARAMS]

- &lt;queryParams=&gt;
meusit.com/users?nome=lucas&amp;age=28 //filtros
- const express = require('express') 
const port = 3000; 
const app = express()
 
app.get('/users', (request, response) =&gt; console.log(request)); 
 
app.listen(port, () =&gt; console.log(🚀 Server started on port ${port}))
    - (...)
    _raw: '/users?nome=lucas&amp;age=22' 
        }, 
        params: {}, 
        query: { nome: 'lucas', age: '22' }, 
        res: &lt;ref *3&gt; ServerResponse { 
        _events: [Object: null prototype] { finish: [Function: bound resOnFinish] },
    (...)
    - o que importa e o "query: { nome: 'lucas', age: '22' },"
- const express = require('express')
const port = 3000;
const app = express()
 
app.get('/users', (request, response) =&gt; { 
    const name = request.query.name 
    const age = request.query.age
    console.log(name, age)// lucas 22
    return response.json({name: name, age: age})} 
 
app.listen(port, () =&gt; console.log(🚀 Server started on port ${port}))
    - ABREVIADO(Destructuring assignment)
        - const express = require('express')
        const port = 3000;
        const app = express()
 
        app.get('/users', (request, response) =&gt; { 
            const { name, age } = request.query
            return response.json({name, age })
        }
 
        app.listen(port, () =&gt; console.log(🚀 Server started on port ${port}))
    - response envia ao front a informção
como json a respeito do que chegou nele
        - { 
            "name": "lucas", 
            "age": "22" 
        } 
   
   
   
//AULA: QUERY PARAMS
//http: //localhost:3000/users?name=lucas&age=22
const name = request.query.name
const age = request.query.age
console.log(name, age)//lucas 22
return response.json({name: name, age: age})
//Destructuring assignment abrevidação:
const { name, age } = request.query
return response.json({name, age }) 
});
*/

/*
//AULA: ROUTE PARAMS
// 'users/:id' meio que cria uma variavel ":id" de acordo com o request do usuario EX: http://localhost:3000/users/uva  params: { id='uva' }
app.get('/users/:id', (request, response) => {
    const { id } = request.params
    //console.log(id)
    return response.json({id})
});
*/
/*
//AULA: BODY PARAMS: front tem um arquivo json onde usaremos o body params (nao e mostrado na url)
//insomnia(http://localhost:3000/users) > Body > JSON > 
//{
//    "name": "lucas",
//    "age": "22"
//}
app.use(express.json());//informar o formato de troca de dados. Ex:xml
app.get('/users', (request, response) => {
    //console.log(request.body)
    const { name, age } = request.body
    return response.json({ name, age })
})
*/

/** ROTAS
 * - GET            => Buscar informação no back-end
 * - POST           => Criar informação no back-end
 * - PUT / PATCH    => Alterar/Atualuzar informação no back-end
 * - DELETE         => Delete informação no back-end
 
  
  - Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dadso da requisição
 */
//GER
//ao reiniciar o servidor node perde todas as informações

const express = require("express");
const uuid = require("uuid");

port = 3000;
const app = express();
app.use(express.json());

const users = []; //pra isso nessa etapa era para salver um banco de dados. mas para fins didaticos.

const checkUserId = (request, response, next) => {
  const { id } = request.params

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ error: "User not found" });
  }

  request.userIndex = index;
  request.userId = id

  next()
};

app.get("/users", (request, response) => {
  return response.json({ users });
});

//falata o parametro id, porem ele e uma varaivel que precisa acrecentar sozinho a cada requisição, para isso usarmos:
//npm install uuid

app.post("/users", (request, response) => {
  const { name, age } = request.body; //captura informação

  //console.log(uuid.v4()
  const user = { id: uuid.v4(), name, age }; // coloca em um objeto e add id

  users.push(user); // objeto add em um arrey

  return response.status(201).json(user); //
});

app.put("/users/:id", checkUserId, (request, response) => {
  const { name, age } = request.body;
  const index = request.userIndex;
  const id = request.userId

  const updateUser = { id, name, age };

  users[index] = updateUser;

  return response.json({ updateUser });
});

app.delete("/users/:id", checkUserId, (request, response) => {
  const index = request.userIndex;

  users.splice(index, 1);

  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`🚀Server started on port ${port}`);
});
