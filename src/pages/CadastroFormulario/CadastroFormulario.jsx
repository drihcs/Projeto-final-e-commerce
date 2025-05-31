import React, { useState } from 'react';
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
  const [inputEmFoco, setInputEmFoco] = useState('');

  const requisitosSenha = [
    { regex: /.{8,}/, label: 'Mínimo de 8 caracteres' },
    { regex: /[A-Z]/, label: 'Ao menos uma letra maiúscula' },
    { regex: /[a-z]/, label: 'Ao menos uma letra minúscula' },
    { regex: /[^A-Za-z0-9]/, label: 'Ao menos um caractere especial' },
  ];

  const validarRequisito = (regex) => regex.test(formData.senha);

  const todosRequisitosAtendidos = requisitosSenha.every(req => validarRequisito(req.regex));

  const formatarCPF = (cpf) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatarCelular = (celular) => {
    return celular
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let novoValor = value;

    if (name === 'cpf') novoValor = formatarCPF(value);
    if (name === 'celular') novoValor = formatarCelular(value);

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : novoValor,
    }));
  };

  const handleFocus = (e) => {
    setInputEmFoco(e.target.name);
  };

  const handleBlur = (e) => {
    if (e.target.name === 'senha' && todosRequisitosAtendidos) {
      setInputEmFoco('');
    } else if (e.target.name !== 'senha') {
      setInputEmFoco('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
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
            <input
              type="text"
              name="nome"
              placeholder="Insira seu nome"
              required
              autoFocus
              value={formData.nome}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <label>CPF *</label>
            <input
              type="text"
              name="cpf"
              placeholder="Insira seu CPF"
              required
              value={formData.cpf}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <label>Celular *</label>
            <input
              type="text"
              name="celular"
              placeholder="Insira seu celular"
              required
              value={formData.celular}
              onChange={handleChange}
              inputMode="numeric"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <label>E-mail *</label>
            <input
              type="email"
              name="email"
              placeholder="Insira seu email"
              required
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <label>Senha *</label>
            <input
              type="password"
              name="senha"
              placeholder="Insira sua senha"
              required
              value={formData.senha}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            {formData.senha.length > 0 && inputEmFoco === 'senha' && (
              <ul className={styles.requisitos}>
                {requisitosSenha.map((req, index) => {
                  const atendido = validarRequisito(req.regex);
                  return (
                    <li key={index} style={{ color: atendido ? '#000' : 'red' }}>
                      {req.label}
                    </li>
                  );
                })}
              </ul>
            )}

            <label>Confirmar Senha *</label>
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirme a senha"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>Informações de Entrega</legend>

            <label>Endereço *</label>
            <input
              type="text"
              name="endereco"
              placeholder="Insira seu endereço"
              required
              value={formData.endereco}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <label>Bairro *</label>
            <input
              type="text"
              name="bairro"
              placeholder="Insira seu bairro"
              required
              value={formData.bairro}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <label>Cidade *</label>
            <input
              type="text"
              name="cidade"
              placeholder="Insira sua cidade"
              required
              value={formData.cidade}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <label>CEP *</label>
            <input
              type="text"
              name="cep"
              placeholder="Insira seu CEP"
              required
              value={formData.cep}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <label>Complemento</label>
            <input
              type="text"
              name="complemento"
              placeholder="Insira complemento"
              value={formData.complemento}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
