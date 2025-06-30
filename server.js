// Servidor Express básico
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(cors());

// Configuração do transporter de email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'voraxweeb@gmail.com',
        pass: 'zhzo wrue hhnd ajap'
    }
});

// Verificar conexão
transporter.verify(function(error, success) {
    if (error) {
        console.log('❌ Erro na configuração do email:', error);
        console.log('💡 Dica: Verifique se a senha de aplicativo está correta');
    } else {
        console.log('✅ Servidor de email pronto para enviar mensagens');
    }
});

// Rota para servir os arquivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/orcamento', (req, res) => {
    res.sendFile(path.join(__dirname, 'orcamento.html'));
});

app.get('/servicos', (req, res) => {
    res.sendFile(path.join(__dirname, 'servicos.html'));
});

// Endpoint para receber dados do formulário de orçamento
app.post('/api/enviar-orcamento', async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            service,
            budgetValue,
            deadline,
            description
        } = req.body;

        // Validação básica
        if (!name || !email || !service || !description) {
            return res.status(400).json({
                success: false,
                message: 'Por favor, preencha todos os campos obrigatórios.'
            });
        }

        // Configuração do email
        const mailOptions = {
            from: 'voraxweeb@gmail.com', // Seu email
            to: 'voraxweeb@gmail.com', // Email onde você quer receber os orçamentos
            subject: `Novo Orçamento - ${name} - ${service}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                        🚀 Novo Orçamento Solicitado - Vorax Web
                    </h2>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #007bff; margin-top: 0;">📋 Informações do Cliente</h3>
                        <p><strong>Nome:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
                        <p><strong>Empresa:</strong> ${company || 'Não informado'}</p>
                    </div>

                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #007bff; margin-top: 0;">🎯 Detalhes do Projeto</h3>
                        <p><strong>Serviço:</strong> ${getServiceName(service)}</p>
                        <p><strong>Orçamento:</strong> R$ ${budgetValue ? parseInt(budgetValue).toLocaleString('pt-BR') : 'Não informado'}</p>
                        <p><strong>Prazo:</strong> ${getDeadlineName(deadline)}</p>
                    </div>

                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #007bff; margin-top: 0;">📝 Descrição do Projeto</h3>
                        <p style="white-space: pre-wrap; line-height: 1.6;">${description}</p>
                    </div>

                    <div style="background-color: #e8f4fd; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff; margin: 20px 0;">
                        <p style="margin: 0; color: #0056b3;">
                            <strong>⏰ Data e Hora:</strong> ${new Date().toLocaleString('pt-BR')}
                        </p>
                    </div>

                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <p style="color: #666; font-size: 14px;">
                            Este email foi enviado automaticamente pelo sistema de orçamentos da Vorax Web.
                        </p>
                    </div>
                </div>
            `
        };

        // Enviar email
        await transporter.sendMail(mailOptions);

        // Enviar confirmação para o cliente
        const clientMailOptions = {
            from: 'voraxweeb@gmail.com',
            to: email,
            subject: 'Orçamento Recebido - Vorax Web',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                    <h2 style="color: #333; text-align: center;">
                        ✅ Orçamento Recebido com Sucesso!
                    </h2>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <p>Olá <strong>${name}</strong>,</p>
                        <p>Recebemos sua solicitação de orçamento e agradecemos seu interesse em nossos serviços!</p>
                        
                        <h3 style="color: #007bff;">📋 Resumo da Solicitação</h3>
                        <ul>
                            <li><strong>Serviço:</strong> ${getServiceName(service)}</li>
                            <li><strong>Orçamento:</strong> R$ ${budgetValue ? parseInt(budgetValue).toLocaleString('pt-BR') : 'Não informado'}</li>
                            <li><strong>Prazo:</strong> ${getDeadlineName(deadline)}</li>
                        </ul>
                    </div>

                    <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #007bff; margin-top: 0;">⏰ Próximos Passos</h3>
                        <p>Nossa equipe analisará seu projeto com cuidado e entrará em contato em até <strong>24 horas</strong> com uma proposta personalizada.</p>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #666;">
                            Obrigado por escolher a <strong>Vorax Web</strong>!<br>
                            Explorando novos horizontes digitais.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(clientMailOptions);

        res.json({
            success: true,
            message: 'Orçamento enviado com sucesso! Verifique seu email para confirmação.'
        });

    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao enviar orçamento. Tente novamente mais tarde.'
        });
    }
});

// Funções auxiliares
function getServiceName(service) {
    const services = {
        'website': 'Website',
        'design': 'Design de Interface',
        'performance': 'Otimização de Performance',
        'ecommerce': 'E-commerce',
        'app': 'Aplicação Web',
        'maintenance': 'Manutenção Técnica'
    };
    return services[service] || service;
}

function getDeadlineName(deadline) {
    const deadlines = {
        'urgent': 'Urgente (1-2 semanas)',
        'normal': 'Normal (1-2 meses)',
        'flexible': 'Flexível (3+ meses)'
    };
    return deadlines[deadline] || deadline;
}

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📧 Sistema de envio de email configurado`);
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
});

console.log('Sistema iniciado!'); 