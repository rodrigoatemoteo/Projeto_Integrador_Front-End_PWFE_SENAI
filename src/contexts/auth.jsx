import React, { createContext, useState, useEffect } from 'react';
//Importação dos comandos do React necessários para o arquivo de contexto

import { useNavigate } from 'react-router-dom';
//Importação do comando useNavigate do react-router-dom para direcionamento de rota

import { api, createSession, logar } from "../services/api";
//importação do service que se conecta com a API e do comando para criação de sessão

export const AuthContext = createContext();
/*criação do contexto de autenticação para o sistema de login utilizando o comando
  createContext e armazenando o mesmo na constante AuthContext*/

export const AuthProvider = ({children}) => {
//Criação do Provider que irá disponibilizar os dados do contexto de autenticação
//children é passada como parâmetro, ou seja, AuthProvider receberá todos os elementos
//filhos(nodes do HTML) de um elemento onde o provider for invocado
  
  const navigate = useNavigate();
  //criação do objeto de navegação que irá direcionar o fluxo para a rota desejada
  
  const [user, setUser] = useState(null);
  //criação da propriedade user do provedor AuthProvider utilizando useState

  const [loading, setLoading] = useState(true);
  //criação da propriedade loading do provedor AuthProvider utilizando useState

  useEffect(() => {
    const recoveryUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    //Recupera o usuário e o token no localStorage - Armazenamento local

    if(recoveryUser && token){
      //setUser({'email':'admin@admin.com','password':'123'});
      
      setUser(recoveryUser);
      //setUser(JSON.parse(recoveryUser));
      //api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    //Verifica se o usuário e token existem. Eu modifiquei um pouco essa condicional, no original
    //ele só verificava se o usuário existia. Acrescentei a verificação do token porque para
    //mim fazia mais sentido em questão de segurança.
    //A parte comentada da condicional, na primeira linha converte o valor recuperado do 
    //localStorage para JSON e utiliza o state para inserir o valor na propriedade user do provider.
    //Na segunda linha na parte comentada da condicional, ele insere o token no campo Authorization
    //do cabeçalho HTTP. Caso queiram se aprofundar no assunto deixo aqui um artigo para leitura
    //https://swagger.io/docs/specification/authentication/bearer-authentication/

    setLoading(false);
    //insere o valor booleano false na propriedade loading usando State.
    //A utilização do loading irá passar despercebido caso não haja um tempo de espera,
    //ou seja, se estiver utilizando dados fake sem uma API, praticamente você não verá o loading
    //funcionando.

  }, []);

  const login = async (email, password) => {
  //Criação da função login, quando ligado com uma API essa função deve ser assícrona.
  //Essa função permite o usuário logar e ter acesso a uma área privada por uma rota privada.
  //Eu usei dados fake, pois não tinha uma API funcional, mas vocÊs podem usar suas APIs trocando
  //os dados fake pelas partes que comentei que faziam ligação com o service que criei, ou criar
  //um service de vocês mesmo para ligar com a vossa API.

    const res = await logar(""+email, ""+password);

    const response = {'email': res.data.email,'password':res.data.senha,'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjoiSldUIFJ1bGVzISIsImlhdCI6MTQ1OTQ0ODExOSwiZXhwIjoxNDU5NDU0NTE5fQ.-yIVBD5b73C75osbmwwshQNRC7frWUYrqaTjTpza2y4'};
    
    //alert("Email: "+response.email);

    //A variável response receberá um valor fake nesse caso para que o usuário possa logar e ter acesso a tela home.
    //O valor passado é um JSON que contém o email, a senha e o token. No original, este campo
    //recebe um valor retornado da API informando apenas email e senha como pode ser visto na pasta
    //service, no arquivo api.js

    //const response = await createSession();
    //Essa parte deve ser utilizada quando conectado com uma API, caso siga a lógica usada neste
    //sistema de login. O await é usado aqui por conta do uso da palavra reservada async que transforma
    //toda a função em uma função assícrona. Caso queiram saber mais sobre funções assíncronas deixo aqui esse artigo para leitura:
    //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function

    console.log('login', response);
    //teste

    const loggedUser = {'email':response.email, 'password':response.password};
    const token = response.token;
    //Inserção de dados para manter o usuário logado
    //O que é um token HTTP?
    //Esse token é um código em Base64 que armazena objetos JSON com os dados que permitem a 
    //autenticação da requisição. No exemplo da Figura 1 vemos um cliente que enviará uma 
    //requisição HTTP ao endpoint de autenticação de uma API. Nela o cliente envia, no corpo da 
    //requisição dados como endereço de e-mail e senha.
    //Uma biblioteca para quem quiser explorar web tokens é a JWT, caso queiram se aprofundar
    //neste assunto deixo aqui o link da página da JWT, lá vocês terão acesso a toda documentação
    //da mesma.
    //https://jwt.io/

    /*const loggedUser = response.data.user;
    const token = response.data.token;*/
    //No original tanto loggedUser e token recebem os valores vindos da API que foram armazenados
    //na variável response. 

    localStorage.setItem("user", loggedUser);
    localStorage.setItem("token", token);
    //Insere as informações do usuário e o token no localStorage passadas através da variável
    //loggedUser e token


    /*localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);*/
    //Armazena os dados do usuário e o token no localStorage.
    //Detalhe para a conversão do JSON armazenado em loggedUser para uma string, pois o localStorage
    //só aceita valores em formato de texto.

    //api.defaults.headers.Authorization = `Bearer ${token}`;
    //Inserção do token no campo Authorization no cabeçalho HTTP.

    setUser(loggedUser);
    //Insere os dados do usuário na propriedade user do provider. Esses dados, quando o front estiver
    //ligado com a API, estarão vindo da API

    navigate('/');
    //Direciona o usuário para rota raiz, no caso a tela Home
    
  };

  const logout = () => {
  //Criação da função logout, esta função será responsável por finalizar a sessão e apagar
  //todas as informações do usuário

    console.log("logout");
    //teste

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    //Remove os dados do usuário e o token do localStorage(armazenamento local)

    //api.defaults.headers.Authorization = `Bearer ${token}`;
    //Insere o token no cabeçalho HTTP. Procedimento de segurança. Se houver dúvidas, ler o artigo
    //abaixo sobre Bearer token, JWT e outros mais:
    //https://www.brunobrito.net.br/jwt-cookies-oauth-bearer/

    setUser(null);
    //Insere o valor nulo na propriedade user do provider.

    navigate('/login');
    //Direciona o usuário para a tela de login
  };

  const cadastrar = async (email, password) => {
    //Criação da função login, quando ligado com uma API essa função deve ser assícrona.
    //Essa função permite o usuário logar e ter acesso a uma área privada por uma rota privada.
    //Eu usei dados fake, pois não tinha uma API funcional, mas vocÊs podem usar suas APIs trocando
    //os dados fake pelas partes que comentei que faziam ligação com o service que criei, ou criar
    //um service de vocês mesmo para ligar com a vossa API.
  
      const res = await createSession(""+email, ""+password);
  
      const response = res.status;
      
      if(response === 200){
        alert("Conta cadastrada com sucesso!");
      
      }else{
        alert("Error status: "+response)
      }
  
      //A variável response receberá um valor fake nesse caso para que o usuário possa logar e ter acesso a tela home.
      //O valor passado é um JSON que contém o email, a senha e o token. No original, este campo
      //recebe um valor retornado da API informando apenas email e senha como pode ser visto na pasta
      //service, no arquivo api.js
  
      //const response = await createSession();
      //Essa parte deve ser utilizada quando conectado com uma API, caso siga a lógica usada neste
      //sistema de login. O await é usado aqui por conta do uso da palavra reservada async que transforma
      //toda a função em uma função assícrona. Caso queiram saber mais sobre funções assíncronas deixo aqui esse artigo para leitura:
      //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function
  
      console.log('login', response);
      //teste
      
    };
  
  return(
    <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout, cadastrar}}>
      {children}  
    </AuthContext.Provider>
    //Este componente retorna o provedor dos dados armazenados no contexto. Insere também
    //dados do usuário, loading, a função login, a função logout e uma verificação se o
    //usuário está autenticado
  );

}

//Caso desejem um outro passo a passo como este que fiz para vocês, estou deixando o link de um
//bem semalhante, mas se atentem nos pontos que estã depreciados.
//https://dev.to/rafacdomin/autenticacao-no-react-com-context-api-e-hooks-4bia