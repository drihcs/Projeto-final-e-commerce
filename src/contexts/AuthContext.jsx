import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erroLogin, setErroLogin] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUsuario(data.session.user);
      }
      setCarregando(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUsuario(session.user);
          localStorage.setItem('usuario', JSON.stringify(session.user));
        } else {
          setUsuario(null);
          localStorage.removeItem('usuario');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, senha) => {
    console.log('[login] Tentando login com email:', email); 

    setCarregando(true);
    setErroLogin('');

    try {
      await supabase.auth.signOut(); 

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      console.log('[login] Resposta do Supabase:', { data, error });

      if (error) {
        if (error.message === 'Email not confirmed') {
          setErroLogin('Você precisa confirmar seu e-mail antes de entrar.');
        } else {
          setErroLogin('Erro ao fazer login: ' + error.message);
        }
        throw error;
      }

      if (!data.session) {
        throw new Error('Falha ao fazer login: sessão não encontrada.');
      }

      setUsuario(data.session.user);
      localStorage.setItem('usuario', JSON.stringify(data.session.user));
      return data.session.user;

    } finally {
      setCarregando(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      login,
      logout,
      carregando,
      erroLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}