import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // para redirecionar
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './CadastroFormulario.module.css';
import { supabaseUsuarios } from '/src/utils/supabase';

function CadastroFormulario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
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
      // 1. Cria o usuário no Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
      });

      if (signUpError) throw signUpError;

      // 2. Insere dados extras na tabela 'usuarios' usando o ID do usuário Auth
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([
          {
            id: signUpData.user.id,  // chave primária igual ao user.id do Auth
            nome: formData.nome,
            cpf: formData.cpf,
            celular: formData.celular,
            endereco: formData.endereco,
            bairro: formData.bairro,
            cidade: formData.cidade,
            cep: formData.cep,
            complemento: formData.complemento,
            receberNovidades: formData.receberNovidades,
          }
        ]);

      if (insertError) throw insertError;

      alert('Conta criada com sucesso! Você será redirecionada para o login.');
      navigate('/login');  // redireciona para página de login

    } catch (error) {
      alert('Erro ao criar conta: ' + error.message);
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
              type="password"
              name="senha"
              placeholder="Insira sua senha"
              required
              value={formData.senha}
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