import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './CadastroFormulario.module.css';
import { supabaseUsuarios } from '/src/utils/supabaseUsers';



useEffect(() => {
  async function inserirUsuarioTeste() {
    const { error } = await supabaseUsuarios
      .from('usuarios')
      .insert([
        {
          nome: "Joana Silva",
          cpf: "123.456.789-00",
          email: "joana.silva@example.com",
          celular: "(11) 91234-5678",
          endereco: "Rua das Flores, 123",
          bairro: "Jardim Primavera",
          cidade: "São Paulo",
          cep: "01234-567",
          complemento: "Apto 101, Bloco B",
          receberNovidades: true
        }
      ]);

    if (error) console.error("Erro ao inserir:", error.message);
    else console.log("Usuário de teste inserido com sucesso!");
  }

  inserirUsuarioTeste();
}, []);


function CadastroFormulario() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    celular: '',
    endereco: '',
    bairro: '',
    cidade: '',
    cep: '',
    complemento: '',
    receberNovidades: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabaseUsuarios
        .from('users') // ou o nome da sua tabela
        .insert([formData]);

      if (error) throw error;

      alert('Conta criada com sucesso!');
    } catch (err) {
      alert('Erro ao criar conta: ' + err.message);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Criar Conta</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <legend>Informações Pessoais</legend>
            <input
              type="text"
              name="nome"
              placeholder="Insira seu nome"
              required
              value={formData.nome}
              onChange={handleChange}
            />
            <input
              type="text"
              name="cpf"
              placeholder="Insira seu CPF"
              required
              value={formData.cpf}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Insira seu email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="celular"
              placeholder="Insira seu celular"
              required
              value={formData.celular}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Informações de Entrega</legend>
            <input
              type="text"
              name="endereco"
              placeholder="Insira seu endereço"
              required
              value={formData.endereco}
              onChange={handleChange}
            />
            <input
              type="text"
              name="bairro"
              placeholder="Insira seu bairro"
              required
              value={formData.bairro}
              onChange={handleChange}
            />
            <input
              type="text"
              name="cidade"
              placeholder="Insira sua cidade"
              required
              value={formData.cidade}
              onChange={handleChange}
            />
            <input
              type="text"
              name="cep"
              placeholder="Insira seu CEP"
              required
              value={formData.cep}
              onChange={handleChange}
            />
            <input
              type="text"
              name="complemento"
              placeholder="Insira complemento"
              value={formData.complemento}
              onChange={handleChange}
            />
          </fieldset>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="receberNovidades"
              checked={formData.receberNovidades}
              onChange={handleChange}
            />
            Quero receber por email ofertas e novidades das lojas da Digital Store.
          </label>

          <button type="submit" className={styles.button}>Criar Conta</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CadastroFormulario;