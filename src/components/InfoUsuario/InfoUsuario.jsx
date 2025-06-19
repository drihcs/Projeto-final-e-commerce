import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../utils/supabase'
import styles from './InfoUsuario.module.css'

function Usuario() {
  const { usuario: authUser, logout } = useAuth()
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsuario() {
      if (!authUser?.id) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', authUser.id)
        .single()

      if (error) {
        console.error('Erro ao buscar dados do usuário:', error)
      } else {
        setUsuario(data)
      }
      setLoading(false)
    }

    fetchUsuario()
  }, [authUser])

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      logout()
    }
  }

  if (loading) return <p className={styles.aviso}>Carregando informações...</p>
  if (!usuario) return <p className={styles.aviso}>Usuário não encontrado.</p>

  const {
    nome,
    email,
    cpf,
    celular,
    endereco,
    bairro,
    cidade,
    cep,
    complemento,
    receberNovidades
  } = usuario

  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <div className={styles.profileHeader}>
          <h2 className={styles.profileTitle}>Minhas Informações</h2>
          <button className={styles.editButton}>Editar</button>
        </div>

        <div className={styles.profileSections}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Informações Pessoais</h3>
            <div className={styles.fieldsGrid}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Nome:</label>
                <p className={styles.fieldValue}>{nome || '-'}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>CPF:</label>
                <p className={styles.fieldValue}>{cpf || '-'}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Email:</label>
                <p className={styles.fieldValue}>{email || '-'}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Celular:</label>
                <p className={styles.fieldValue}>{celular || '-'}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Receber Novidades:</label>
                <p className={styles.fieldValue}>
                  {receberNovidades ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Endereço de Entrega</h3>
            <div className={styles.fieldsGrid}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Endereço:</label>
                <p className={styles.fieldValue}>{endereco || '-'}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Complemento:</label>
                <p className={styles.fieldValue}>{complemento || '-'}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Bairro:</label>
                <p className={styles.fieldValue}>{bairro || '-'}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Cidade:</label>
                <p className={styles.fieldValue}>{cidade || '-'}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>CEP:</label>
                <p className={styles.fieldValue}>{cep || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </div>
    </div>
  )
}

export default Usuario