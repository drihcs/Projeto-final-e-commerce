import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './CadastroFormulario.module.css';
import { supabase } from '/src/utils/supabase';

function CadastroFormulario() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailDoCadastro = location.state?.email || '';

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: emailDoCadastro,
    senha: '',
    celular: '',
    endereco: '',
    bairro: '',
    cidade: '',
    cep: '',
    complemento: '',
    receberNovidades: false,
  });

  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === 'cpf') {
      newValue = value.replace(/\D/g, '').slice(0, 11);
      newValue = newValue.replace(/(\d{3})(\d)/, '$1.$2')
                         .replace(/(\d{3})(\d)/, '$1.$2')
                         .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    if (name === 'celular') {
      newValue = value.replace(/\D/g, '').slice(0, 11);
      newValue = newValue.replace(/(\d{2})(\d)/, '($1) $2')
                         .replace(/(\d{5})(\d)/, '$1-$2');
    }

    if (name === 'cep') {
      newValue = value.replace(/\D/g, '').slice(0, 8);
      newValue = newValue.replace(/(\d{5})(\d)/, '$1-$2');
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== confirmarSenha) {
      setErroSenha('As senhas não coincidem!');
      return;
    }

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
      });

      if (signUpError) throw signUpError;

      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([{
          id: signUpData.user.id,
          nome: formData.nome,
          cpf: formData.cpf,
          celular: formData.celular,
          endereco: formData.endereco,
          bairro: formData.bairro,
          cidade: formData.cidade,
          cep: formData.cep,
          complemento: formData.complemento,
          receberNovidades: formData.receberNovidades,
        }]);

      if (insertError) throw insertError;

      alert('Conta criada com sucesso! Você será redirecionada para o login.');
      navigate('/login');

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

            <label>Nome Completo *</label>
            <input type="text" name="nome" autoFocus placeholder="Insira seu nome" required value={formData.nome} onChange={handleChange} />

            <label>CPF *</label>
            <input type="text" name="cpf" placeholder="Insira seu CPF" required value={formData.cpf} onChange={handleChange} />

            <label>Celular *</label>
            <input type="text" name="celular" placeholder="Insira seu celular" required value={formData.celular} onChange={handleChange} />

            <label>E-mail *</label>
            <input type="email" name="email" placeholder="Insira seu email" required value={formData.email} onChange={handleChange} />

            <label>Senha *</label>
            <input type="password" name="senha" placeholder="Insira sua senha" required value={formData.senha} onChange={handleChange} />

            <label>Confirmar Senha *</label>
            <input type="password" name="confirmarSenha" placeholder="Confirme a senha" required value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />

            {erroSenha && <p className={styles.naoOk}>As senhas não coincidem!</p>}
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Informações de Entrega</legend>

            <label>Endereço *</label>
            <input type="text" name="endereco" placeholder="Insira seu endereço" required value={formData.endereco} onChange={handleChange} />

            <label>Bairro *</label>
            <input type="text" name="bairro" placeholder="Insira seu bairro" required value={formData.bairro} onChange={handleChange} />

            <label>Cidade *</label>
            <input type="text" name="cidade" placeholder="Insira sua cidade" required value={formData.cidade} onChange={handleChange} />

            <label>CEP *</label>
            <input type="text" name="cep" placeholder="Insira seu CEP" required value={formData.cep} onChange={handleChange} />

            <label>Complemento</label>
            <input type="text" name="complemento" placeholder="Insira complemento" value={formData.complemento} onChange={handleChange} />

            <label className={styles.checkbox}>
              <input type="checkbox" name="receberNovidades" checked={formData.receberNovidades} onChange={handleChange} />
              Quero receber por email ofertas e novidades das lojas da Digital Store.
            </label>
          </fieldset>

          <button type="submit" className={styles.button}>Criar Conta</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CadastroFormulario;
