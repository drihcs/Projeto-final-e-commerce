import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import styles from './InfoUsuario.module.css'

function Usuario() {
  const { usuario, logout } = useAuth()

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      logout()
    }
  }

  if (!usuario) {
    return <p className={styles.aviso}>Usuário não encontrado.</p>
  }

  const { nome, email, cpf, celular, endereco = {} } = usuario

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
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Informações de Entrega</h3>
                <div className={styles.fieldsGrid}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Endereço:</label>
                    <p className={styles.fieldValue}>{endereco.rua || endereco.logradouro || '-'}</p>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Bairro:</label>
                    <p className={styles.fieldValue}>{endereco.bairro || '-'}</p>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Cidade:</label>
                    <p className={styles.fieldValue}>
                      {endereco.cidade || endereco.localidade || '-'}, {endereco.estado || endereco.uf || '-'}
                    </p>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>CEP:</label>
                    <p className={styles.fieldValue}>{endereco.cep || '-'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão logout fora das seções */}
            <button onClick={handleLogout} className={styles.logoutButton}>
              Sair
            </button>
          </div>
        </div>
  )
}

export default Usuario