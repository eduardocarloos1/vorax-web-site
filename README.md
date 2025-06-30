# Vorax Web - Sistema de Orçamentos

Sistema completo de site profissional com formulário de orçamentos que envia emails automaticamente.

## 🚀 Funcionalidades

- ✅ Site responsivo e moderno
- ✅ Formulário de orçamentos funcional
- ✅ Envio automático de emails
- ✅ Confirmação para o cliente
- ✅ Interface administrativa via email

## 📧 Configuração do Sistema de Email

### 1. Configurar Email Gmail

Para usar o Gmail, você precisa:

1. **Ativar autenticação de 2 fatores** na sua conta Google
2. **Gerar uma senha de aplicativo**:
   - Vá para [Conta Google](https://myaccount.google.com/)
   - Segurança → Verificação em duas etapas → Senhas de app
   - Gere uma senha para "Email"

### 2. Configurar o Servidor

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Editar o arquivo `server.js`**:
   - Substitua `'seu-email@gmail.com'` pelo seu email Gmail
   - Substitua `'sua-senha-de-app'` pela senha de aplicativo gerada

3. **Iniciar o servidor**:
   ```bash
   npm start
   ```

### 3. Configurações Alternativas

#### Para Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransporter({
    service: 'outlook',
    auth: {
        user: 'seu-email@outlook.com',
        pass: 'sua-senha'
    }
});
```

#### Para Yahoo:
```javascript
const transporter = nodemailer.createTransporter({
    service: 'yahoo',
    auth: {
        user: 'seu-email@yahoo.com',
        pass: 'sua-senha-de-app'
    }
});
```

## 📁 Estrutura do Projeto

```
meu site/
├── index.html          # Página inicial
├── servicos.html       # Página de serviços
├── orcamento.html      # Formulário de orçamentos
├── server.js           # Servidor Node.js
├── package.json        # Dependências
├── README.md          # Este arquivo
└── img/               # Imagens do site
    └── hero-bg.jpg
```

## 🔧 Como Funciona

1. **Cliente preenche o formulário** em `/orcamento.html`
2. **Dados são enviados** para o servidor via API
3. **Email é enviado para você** com todos os detalhes
4. **Confirmação é enviada** para o cliente
5. **Formulário é resetado** e mensagem de sucesso é exibida

## 📧 Formato dos Emails

### Email para você (administrador):
- 📋 Informações completas do cliente
- 🎯 Detalhes do projeto solicitado
- 📝 Descrição detalhada
- ⏰ Data e hora da solicitação

### Email para o cliente:
- ✅ Confirmação de recebimento
- 📋 Resumo da solicitação
- ⏰ Informações sobre próximos passos

## 🛠️ Comandos Úteis

```bash
# Instalar dependências
npm install

# Iniciar servidor
npm start

# Modo desenvolvimento (reinicia automaticamente)
npm run dev

# Parar servidor
Ctrl + C
```

## 🔒 Segurança

- ✅ Validação de dados no servidor
- ✅ Tratamento de erros
- ✅ Senhas de aplicativo (não senha normal)
- ✅ CORS configurado

## 🌐 Acesso

Após iniciar o servidor, acesse:
- **Site**: http://localhost:3000
- **Orçamentos**: http://localhost:3000/orcamento
- **Serviços**: http://localhost:3000/servicos

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se o email e senha estão corretos
2. Confirme se a autenticação de 2 fatores está ativa
3. Teste com uma senha de aplicativo válida

---

**Vorax Web** - Explorando novos horizontes digitais 🚀 