import './app.css'
import { useState } from 'react';
import {db} from './firestoreTeste'
import { addDoc, collection } from 'firebase/firestore';
function App() {
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [cargo, setCargo] = useState('')
  const [salario, setSalario] = useState('')

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
  return (
    <div className='container'>
        <div className='formulario'>
        <input type='text' placeholder='Digite seu nome' onChange={(element) => setNome(element.target.value)}></input>
        <input type='number' placeholder='Digite sua idade' onChange={(element) => setIdade(element.target.value)} ></input>
        <input type='text' placeholder='Digite seu cargo' onChange={(element) => setCargo(element.target.value)}></input>
        <input type='number' placeholder='Digite seu salario' onChange={(element) => setSalario(element.target.value)}></input>
        <button onClick={cadastrarUser}>Cadastro</button>
        </div>
    </div>
  );
}

export default App;
