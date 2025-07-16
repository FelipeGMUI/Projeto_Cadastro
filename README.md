# Sistema de Cadastro de Pessoas

Um sistema web completo para gerenciamento de cadastro de pessoas, desenvolvido com Java Spring Boot no backend e HTML/CSS/JavaScript no frontend.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Sistema web responsivo para cadastro e gerenciamento de pessoas, com interface intuitiva e operações CRUD completas. Desenvolvido seguindo boas práticas de desenvolvimento e arquitetura MVC.

### Principais Características

- ✅ Interface responsiva e moderna
- ✅ Validação de dados no frontend e backend
- ✅ API RESTful documentada
- ✅ Banco de dados PostgreSQL
- ✅ Sistema de busca e filtros
- ✅ Tratamento de erros robusto
- ✅ Deploy em Tomcat

## 🚀 Funcionalidades

- **Cadastro de Pessoas**: Criação de novos registros com validação
- **Listagem**: Visualização de todas as pessoas cadastradas
- **Busca**: Sistema de pesquisa por nome, email ou telefone
- **Edição**: Atualização de dados existentes
- **Exclusão**: Remoção de registros com confirmação
- **Validação**: Verificação de dados em tempo real
- **Responsividade**: Interface adaptável a diferentes dispositivos

## 🛠 Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Web**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **Apache Tomcat 9**

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Bootstrap 5**
- **Font Awesome**

### Banco de Dados
- **PostgreSQL 13+**

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

```bash
# Java 17 ou superior
java -version

# Maven 3.6+
mvn -version

# PostgreSQL 13+
psql --version

# Apache Tomcat 9+
# Git
git --version
```

### Instalação das Dependências (Ubuntu/Debian)

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Java 17
sudo apt install -y openjdk-17-jdk

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instalar Maven
sudo apt install -y maven

# Instalar Tomcat 9
sudo apt install -y tomcat9

# Ferramentas auxiliares
sudo apt install -y curl jq git
```

## 🔧 Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/sistema-cadastro-pessoas.git
cd sistema-cadastro-pessoas
```

### 2. Configurar PostgreSQL

```bash
# Iniciar PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Criar usuário e banco de dados
sudo -u postgres createuser -P cadastro
# Digite a senha: senha123

sudo -u postgres createdb -O cadastro cadastro_pessoas
```

### 3. Criar Estrutura do Banco

```bash
# Executar script de criação das tabelas
sudo -u postgres psql -d cadastro_pessoas -f database/schema.sql
```

### 4. Compilar o Backend

```bash
cd backend/
mvn clean package
```

### 5. Fazer Deploy

```bash
# Parar Tomcat
sudo systemctl stop tomcat9

# Copiar arquivo WAR
sudo cp target/cadastro-pessoas-1.0.0.war /var/lib/tomcat9/webapps/api.war

# Copiar arquivos do frontend
sudo cp -r ../frontend/* /var/lib/tomcat9/webapps/ROOT/

# Iniciar Tomcat
sudo systemctl start tomcat9
```

## ⚙️ Configuração

### Configuração do Banco de Dados

Edite o arquivo `backend/src/main/resources/application.properties`:

```properties
# Configuração do Banco de Dados
spring.datasource.url=jdbc:postgresql://localhost:5432/cadastro_pessoas
spring.datasource.username=cadastro
spring.datasource.password=senha123
spring.datasource.driver-class-name=org.postgresql.Driver

# Configuração JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Configuração do servidor
server.port=8080
server.servlet.context-path=/api
```

### Configuração CORS (Tomcat)

Adicione ao arquivo `server.xml` do Tomcat:

```xml
<filter>
    <filter-name>CorsFilter</filter-name>
    <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
    <init-param>
        <param-name>cors.allowed.origins</param-name>
        <param-value>*</param-value>
    </init-param>
    <init-param>
        <param-name>cors.allowed.methods</param-name>
        <param-value>GET,POST,HEAD,OPTIONS,PUT,DELETE</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CorsFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

## 🎮 Uso

### Acessar a Aplicação

1. **Frontend**: http://localhost:8080
2. **API**: http://localhost:8080/api

### Testando a API

```bash
# Listar todas as pessoas
curl -X GET http://localhost:8080/api/pessoas

# Cadastrar nova pessoa
curl -X POST http://localhost:8080/api/pessoas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua A, 123"
  }'

# Buscar pessoa por ID
curl -X GET http://localhost:8080/api/pessoas/1

# Atualizar pessoa
curl -X PUT http://localhost:8080/api/pessoas/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Santos",
    "email": "joao.santos@email.com",
    "telefone": "(11) 88888-8888",
    "endereco": "Rua B, 456"
  }'

# Deletar pessoa
curl -X DELETE http://localhost:8080/api/pessoas/1
```

## 📁 Estrutura do Projeto

```
sistema-cadastro-pessoas/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── cadastro/
│   │   │   │           ├── controller/
│   │   │   │           │   └── PessoaController.java
│   │   │   │           ├── model/
│   │   │   │           │   └── Pessoa.java
│   │   │   │           ├── repository/
│   │   │   │           │   └── PessoaRepository.java
│   │   │   │           ├── service/
│   │   │   │           │   └── PessoaService.java
│   │   │   │           └── CadastroPessoasApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── static/
│   │   └── test/
│   ├── pom.xml
│   └── target/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── assets/
├── database/
│   └── schema.sql
├── config/
│   └── server.xml
├── docs/
│   └── MANUAL_INSTALACAO.md
└── README.md
```

## 🔌 API Endpoints

### Pessoas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/pessoas` | Lista todas as pessoas |
| `GET` | `/api/pessoas/{id}` | Busca pessoa por ID |
| `POST` | `/api/pessoas` | Cadastra nova pessoa |
| `PUT` | `/api/pessoas/{id}` | Atualiza pessoa existente |
| `DELETE` | `/api/pessoas/{id}` | Remove pessoa |
| `GET` | `/api/pessoas/buscar?q={termo}` | Busca pessoas por termo |

### Exemplo de Payload

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "telefone": "(11) 99999-9999",
  "endereco": "Rua das Flores, 123"
}
```

### Códigos de Resposta

- `200 OK`: Operação realizada com sucesso
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro interno do servidor

## 🧪 Testes

### Executar Testes do Backend

```bash
cd backend/
mvn test
```

### Testes Manuais

1. **Teste de Cadastro**:
   - Acesse http://localhost:8080
   - Preencha o formulário
   - Clique em "Cadastrar"

2. **Teste de Busca**:
   - Digite um termo na barra de busca
   - Verifique os resultados filtrados

3. **Teste de Edição**:
   - Clique no botão "Editar" de uma pessoa
   - Modifique os dados
   - Salve as alterações

## 🔧 Solução de Problemas

### Erro de Conexão com Banco

```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Testar conexão
sudo -u postgres psql -d cadastro_pessoas -c "SELECT 1;"
```

### Erro de Permissão no Tomcat

```bash
sudo chmod 755 /var/lib/tomcat9/webapps/
sudo chown -R tomcat9:tomcat9 /var/lib/tomcat9/webapps/
```

### Porta 8080 Ocupada

```bash
# Verificar processo na porta 8080
sudo netstat -tlnp | grep :8080

# Matar processo se necessário
sudo kill -9 <PID>
```

### Visualizar Logs

```bash
# Logs do Tomcat
sudo tail -f /var/log/tomcat9/catalina.out

# Logs do PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-13-main.log
```

## 📚 Comandos Úteis

```bash
# Reiniciar serviços
sudo systemctl restart postgresql
sudo systemctl restart tomcat9

# Verificar status dos serviços
sudo systemctl status postgresql
sudo systemctl status tomcat9

# Backup do banco
sudo -u postgres pg_dump cadastro_pessoas > backup.sql

# Restaurar banco
sudo -u postgres psql cadastro_pessoas < backup.sql

# Compilar e fazer deploy rápido
cd backend/ && mvn clean package && sudo systemctl stop tomcat9 && sudo cp target/cadastro-pessoas-1.0.0.war /var/lib/tomcat9/webapps/api.war && sudo systemctl start tomcat9
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use mensagens de commit descritivas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Seu Nome** - *Desenvolvimento inicial* - [seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- Comunidade Spring Boot
- Documentação do PostgreSQL
- Stack Overflow pela ajuda com problemas específicos

---

## 📞 Suporte

Em caso de dúvidas ou problemas:

- 📧 Email: seu-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/sistema-cadastro-pessoas/issues)
- 📖 Wiki: [GitHub Wiki](https://github.com/seu-usuario/sistema-cadastro-pessoas/wiki)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐
