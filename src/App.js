import './app.css'
import { useState, useEffect } from 'react';
import {db, auth} from './firestoreTeste'
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
function App() {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [cargo, setCargo] = useState('')
  const [salario, setSalario] = useState('')
  const [users , setUsers] = useState([])
  const [idUser, setidUser] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

useEffect(()=>{
  async function realTime(){
    const unsub = onSnapshot(collection(db, "User"), (snapshot) =>{
      let lista = [] // criando array vazia
      // criando forEach para percorrer documentos dentro meu snapshot
      snapshot.forEach((docs)=>{
        lista.push({
          id: docs.id,
          nome: docs.data().nome, // Passando cada informação que quero pegar
          idade: docs.data().idade,
          cargo: docs.data().cargo,
          salario: docs.data().salario,

        })
      })      
    setUsers(lista)
    })
    
  }
  realTime()
},[])


  async function cadastrarUser(){
    addDoc(collection(db, "User"),{
      nome:nome,
      idade:idade,
      cargo:cargo,
      salario:salario,
      
    })
    .then(()=>{
      alert('USUARIO CADASTRADO')
      setNome('')
      setCargo('')
      setIdade('')
      setSalario('')
    })
    .catch((erro)=>{
      alert('ERRO NO CADASTRO' + erro)
    })
  }

  async function buscarUser(){
    const postRef = collection(db, 'User') // Armazenando quais itens quero buscar dentro do banco e qual collection
    await getDocs(postRef)
    .then((snapshot)=>{
      let lista = [] // criando array vazia
      // criando forEach para percorrer documentos dentro meu snapshot
      snapshot.forEach((docs)=>{
        lista.push({
          id: docs.id,
          nome: docs.data().nome, // Passando cada informação que quero pegar
          idade: docs.data().idade,
          cargo: docs.data().cargo,
          salario: docs.data().salario,

        })
      })      
    setUsers(lista)

    })
    .catch((error)=>{
      alert('ERRO AO REALIZAR BUSCA' + error)
    })
    
  }

  async function editarUser(){
      const userRef = doc(db, "User", idUser)
      await updateDoc(userRef, {
      nome: nome,
      idade:idade,
      cargo:cargo,
      salario:salario,
    })
    .then(()=>{
      alert('EDITADO COM SUCESSO')
    })
    .catch((erro)=>{
      alert('ALGO ESTA ERRADO, DIGITE TODAS AS INFORMAÇÕES PARA EDITAR O USUARIO' + erro)
    })
  }

  async function excluirUser(id){
    const docRef = doc(db, "User", id);
    await deleteDoc(docRef)
    .then(()=>{
      alert('USUARIO DELETADO COM SUCESSO')
    })
    .catch(()=>{
      alert('ERRO')
    })
  }

  async function novoUser(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(()=>{
      alert('CADASTRO REALIZADO COM SUCESSO')
    })
    .catch((error)=>{
      if(error.code === 'auth/invalid-email'){
        alert('Email invalido, digite um email valido')
      }
      if(error.code === 'auth/weak-password'){
        alert('Senha fraca demais, melhore um pouco ela')
      }
    })
  }

  async function loginUser(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then(()=>{
      alert('LOGADO COM SUCESSO')
    })
    .catch((error)=>{
      if(error.code === 'auth/invalid-credential'){
        alert('SENHA INVALIDA')
      }
    })
  }

  async function singOutUser(){
    await signOut(auth)
    .then(()=>{
      alert('Você deslogou da sua conta!')
    })
  }

  return (
  
    <div className='container'>
        <div className='cadastro'>
          <h1>Cadastro usuarios TECH NAVE</h1>
          <label>Email</label><br></br>
          <input value={email} onChange={(e)=> setEmail(e.target.value)}/><br/>
          <label>Senha</label><br></br>
          <input value={senha}  onChange={(e) => setSenha(e.target.value)}/><br></br>
          <button onClick={novoUser}>Registrar</button>
          <button onClick={loginUser}>Login</button>
          <button onClick={singOutUser}>Sair da conta</button>
        </div>

        <div className='formulario'>
        <input type='text' placeholder='Digite o ID do usuario' onChange={(e)=> setidUser(e.target.value)}></input>
        <input type='text' placeholder='Digite seu nome' onChange={(element) => setNome(element.target.value)} required></input>
        <input type='number' placeholder='Digite sua idade' onChange={(element) => setIdade(element.target.value)} ></input>
        <input type='text' placeholder='Digite seu cargo' onChange={(element) => setCargo(element.target.value)}></input>
        <input type='number' placeholder='Digite seu salario' onChange={(element) => setSalario(element.target.value)}></input>
        <button onClick={cadastrarUser}>Cadastro</button>
        <button onClick={buscarUser}>Buscar</button>
        <button onClick={editarUser}>Editar</button>
        </div>
      <ul className='lista'>
          {users.map((usuarios)=>{
            return(
              <li key={usuarios.id}><br></br>
                <span>ID: {usuarios.id}</span><br></br>
                <span>Usuario: {usuarios.nome}</span><br></br>
                <span>Idade: {usuarios.idade}</span><br></br>
                <span>Cargo: {usuarios.cargo}</span><br></br>
                <span>Salario: {usuarios.salario}</span><br></br>
                <button onClick={()=> excluirUser(usuarios.id)}>Excluir</button>
              </li>             
            
            )
          })}
      </ul>
    </div>
  );
}

export default App;
