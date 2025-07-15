// Configuração da API
const API_BASE_URL = 'http://localhost:8080/api';

// Elementos do DOM
const formCadastro = document.getElementById('form-cadastro');
const listaPessoas = document.getElementById('lista-pessoas');
const loading = document.getElementById('loading');
const modalSucesso = document.getElementById('modal-sucesso');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const btnAtualizar = document.getElementById('btn-atualizar');

// Aplicar máscara no CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = valor;
});

// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// Validações do formulário
function validarFormulario() {
    let valido = true;
    
    // Limpar mensagens de erro
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.pure-form input').forEach(el => el.classList.remove('error'));
    
    // Validar nome
    const nome = document.getElementById('nome').value.trim();
    if (!nome) {
        mostrarErro('nome', 'Nome é obrigatório');
        valido = false;
    } else if (nome.length < 2) {
        mostrarErro('nome', 'Nome deve ter pelo menos 2 caracteres');
        valido = false;
    }
    
    // Validar data de nascimento
    const dataNascimento = document.getElementById('dataNascimento').value;
    if (!dataNascimento) {
        mostrarErro('data', 'Data de nascimento é obrigatória');
        valido = false;
    } else {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        if (nascimento > hoje) {
            mostrarErro('data', 'Data de nascimento não pode ser futura');
            valido = false;
        }
    }
    
    // Validar CPF
    const cpf = document.getElementById('cpf').value;
    if (!cpf) {
        mostrarErro('cpf', 'CPF é obrigatório');
        valido = false;
    } else if (!validarCPF(cpf)) {
        mostrarErro('cpf', 'CPF inválido');
        valido = false;
    }
    
    return valido;
}

function mostrarErro(campo, mensagem) {
    const input = document.getElementById(campo === 'data' ? 'dataNascimento' : campo);
    const errorSpan = document.getElementById(`erro-${campo}`);
    
    input.classList.add('error');
    errorSpan.textContent = mensagem;
}

// Cadastrar pessoa
formCadastro.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validarFormulario()) {
        return;
    }
    
    const dados = {
        nome: document.getElementById('nome').value.trim(),
        dataNascimento: document.getElementById('dataNascimento').value,
        cpf: document.getElementById('cpf').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/pessoas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });
        
        if (response.ok) {
            modalSucesso.style.display = 'block';
            formCadastro.reset();
            carregarPessoas();
        } else {
            const erro = await response.json();
            alert('Erro ao cadastrar: ' + erro.error);
        }
    } catch (error) {
        alert('Erro de conexão com o servidor');
        console.error('Erro:', error);
    }
});

// Carregar lista de pessoas
async function carregarPessoas() {
    loading.style.display = 'block';
    listaPessoas.innerHTML = '';
    
    try {
        const response = await fetch(`${API_BASE_URL}/pessoas`);
        const pessoas = await response.json();
        
        if (pessoas.length === 0) {
            listaPessoas.innerHTML = `
                <div class="empty-state">
                    <h3>Nenhuma pessoa cadastrada</h3>
                    <p>Faça o primeiro cadastro usando o formulário acima.</p>
                </div>
            `;
        } else {
            listaPessoas.innerHTML = pessoas.map(pessoa => `
                <div class="pessoa-card">
                    <div class="pessoa-info">
                        <div class="pessoa-detalhes">
                            <h3>${pessoa.nome}</h3>
                            <p><strong>Data de Nascimento:</strong> ${formatarData(pessoa.dataNascimento)}</p>
                            <p><strong>CPF:</strong> ${pessoa.cpf}</p>
                        </div>
                        <div class="pessoa-id">
                            ID: ${pessoa.id}
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        listaPessoas.innerHTML = `
            <div class="empty-state">
                <h3>Erro ao carregar dados</h3>
                <p>Verifique se o servidor está rodando.</p>
            </div>
        `;
        console.error('Erro ao carregar pessoas:', error);
    } finally {
        loading.style.display = 'none';
    }
}

// Formatar data para exibição
function formatarData(dataString) {
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
}

// Event listeners
btnFecharModal.addEventListener('click', function() {
    modalSucesso.style.display = 'none';
});

btnAtualizar.addEventListener('click', carregarPessoas);

// Fechar modal clicando fora dele
window.addEventListener('click', function(event) {
    if (event.target === modalSucesso) {
        modalSucesso.style.display = 'none';
    }
});

// Carregar pessoas ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarPessoas);