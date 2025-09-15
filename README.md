# Arquitetura Limpa (Clean Architecture)

Este documento resume os princípios e conceitos da Arquitetura Limpa, conforme proposto por Robert C. Martin (Uncle Bob), com base nos estudos do curso FullCycle.

## O Que é a Arquitetura Limpa?
Criada por Robert C. Martin em 2012 e popularizada em seu livro *"Arquitetura Limpa: O Guia do Artesão Para Estrutura e Design de Software"*, a Arquitetura Limpa é um padrão de design de software que visa a separação de interesses (separation of concerns).

Seu principal objetivo é proteger o domínio da aplicação (as regras de negócio) de detalhes de implementação externos, como frameworks, bancos de dados e interfaces de usuário. Ela pode ser vista como uma evolução de arquiteturas anteriores, como a Arquitetura Hexagonal, adicionando mais detalhes sobre os níveis de responsabilidade.

Seus pilares são o **baixo acoplamento** e a **alta coesão**, alcançados através do uso de interfaces e da orientação a casos de uso.

## O Objetivo de uma Boa Arquitetura
Uma boa arquitetura vai muito além da organização de pastas. Ela é a espinha dorsal que facilita todo o ciclo de vida de um projeto.

> "O objetivo principal da arquitetura é dar suporte ao ciclo de vida do sistema. Uma boa arquitetura torna o sistema fácil de entender, fácil de desenvolver, fácil de manter e fácil de implantar. O objetivo final é minimizar o custo de vida útil do sistema e maximizar a produtividade do programador."  
> — Robert C. Martin, *Clean Architecture* (p. 137)

Para atingir esse objetivo, uma boa arquitetura se baseia em um princípio fundamental: **manter as opções abertas (Keep Options Open)**.

> "A estratégia por trás dessa facilitação é deixar o máximo de opções abertas possível, pelo maior tempo possível."  
> — Robert C. Martin, *Clean Architecture* (p. 136)

Isso significa que a decisão sobre qual banco de dados, framework web ou sistema de filas usar deve ser adiada ao máximo, pois eles são detalhes e não o coração da aplicação.

## Os Círculos e a Regra da Dependência
A Arquitetura Limpa é frequentemente representada por um diagrama de círculos concêntricos. Cada círculo representa uma camada do software.

<img width="772" height="567" alt="image" src="https://github.com/user-attachments/assets/970e3bc3-c7e9-4d9f-aa7f-366c8c70a7fb" />

**A Regra da Dependência:** As dependências do código-fonte só podem apontar para dentro. Nada em um círculo interno pode saber qualquer coisa sobre algo em um círculo externo.

As camadas, da mais interna para a mais externa, são:
- **Enterprise Business Rules (Entities):** Contêm as regras de negócio mais críticas e de mais alto nível. Elas são as menos propensas a mudar quando algo externo muda.
- **Application Business Rules (Use Cases):** Orquestram o fluxo de dados de e para as Entities. Contêm as regras de negócio específicas da aplicação, encapsulando e implementando todos os casos de uso do sistema.
- **Interface Adapters:** Camada de conversão e adaptação. Converte os dados do formato mais conveniente para os Use Cases e Entities para o formato mais conveniente para as camadas externas (frameworks, drivers). É aqui que residem os Controllers, Presenters e Gateways (como implementações de Repositórios).
- **Frameworks & Drivers:** A camada mais externa, composta por detalhes como a UI, o banco de dados, o framework web, etc.

## Conceitos Fundamentais
### Regras de Negócio vs. Detalhes
- **Regras de Negócio (Coração do Software):** Devem ser puras e independentes de qualquer detalhe de implementação.
- **Detalhes (Mecanismos de Entrega):** Ajudam a suportar as regras, mas não as definem.

Se um detalhe impacta uma regra de negócio, a delimitação arquitetural falhou. A forte conexão com Domain-Driven Design (DDD) vem daqui: ambas as abordagens buscam atacar a complexidade no coração do software, protegendo o domínio.

# Casos de Uso (Use Cases)

Os casos de uso representam a intenção do usuário. Cada ação que um sistema pode realizar é um caso de uso.

## Clareza e Intenção
Um caso de uso descreve uma história, um fluxo de operações. Ele deixa explícito o comportamento do software.  
Ex: *"Criar Pedido"*, *"Alterar Endereço do Cliente"*.

## Regras de Aplicação vs. Regras de Negócio
É crucial distinguir o fluxo de um caso de uso (uma regra da aplicação) das regras de negócio imutáveis contidas nas entidades.  
Um caso de uso orquestra as entidades para executar uma tarefa.

## Use Cases e o Princípio da Responsabilidade Única (SRP)
É comum a tentação de "reaproveitar" código entre casos de uso semelhantes para seguir o princípio **DRY (Don't Repeat Yourself)**. No entanto, isso pode ser perigoso.

**Exemplo:**  
- *InserirCliente* e *AlterarCliente*. Ambos podem validar o CPF do cliente e persistir os dados. Contudo, são intenções diferentes e devem ser casos de uso separados.

**Razão da Mudança (SRP):**  
O motivo para alterar o fluxo de *InserirCliente* (ex: adicionar um e-mail de boas-vindas) é diferente do motivo para alterar *AlterarCliente* (ex: notificar sobre a mudança de dados).  
Eles mudam por razões diferentes e, portanto, devem ter responsabilidades separadas.

**Duplicação Acidental vs. Real:**  
O que parece duplicação de código pode ser uma duplicação acidental. Resistir à vontade de abstrair prematuramente é fundamental para manter os casos de uso desacoplados.

## Limites Arquiteturais (Boundaries)
Tudo que não impacta diretamente as regras de negócio deve estar do outro lado de um limite arquitetural.  
A comunicação através desses limites é feita via interfaces (abstrações).

**Exemplo de um limite correto (Regras não conhecem o DB):**
```
Business Rules -> Database Interface <I> <- Database Access -> Database
```
Neste cenário, a camada de negócio depende de uma abstração (*Database Interface*), e a camada de acesso a dados implementa essa abstração.  
A **Regra da Dependência** é respeitada.

**Exemplo de uma arquitetura frágil (Acoplamento):**
```
Business Rules <-> Database
```
Aqui, as camadas se conhecem, criando um acoplamento forte que dificulta a manutenção e a testabilidade.

## Padrões de Implementação
### Entidades (Entities) e a Relação com DDD
Existe uma confusão comum entre o termo **Entity** na Clean Architecture e no **DDD**.

- **Entidade na Clean Architecture:** Refere-se à camada mais interna, que contém as regras de negócio corporativas. Uncle Bob é intencionalmente vago sobre como implementar essa camada.
- **Padrões Táticos do DDD:** Para implementar a camada de Entities da Clean Architecture, comumente utilizamos os seguintes padrões:
  - **Aggregates:** Um cluster de objetos de domínio (Entidades DDD e Value Objects) que podem ser tratados como uma única unidade.
  - **Entities (DDD):** Objetos com identidade, ciclo de vida e que encapsulam regras de negócio.
  - **Value Objects:** Objetos sem identidade, definidos por seus atributos.
  - **Domain Services:** Operações de domínio que não se encaixam naturalmente em uma entidade ou agregado.

**Resumo:** Usamos as táticas do DDD para materializar a camada de *Entidades* da Clean Architecture.

### DTOs (Data Transfer Objects)
DTOs são objetos simples e anêmicos usados para trafegar dados entre os limites arquiteturais.

**Características:**
- Não possuem comportamento ou regras de negócio.
- Contêm apenas dados (propriedades e getters/setters).
- São imutáveis (idealmente).

**Fluxo Típico:**
1. O *Controller* (na camada Interface Adapters) recebe uma requisição (ex: JSON).
2. Ele monta um *Input DTO* com os dados da requisição e o envia para o *Use Case*.
3. O *Use Case* executa seu fluxo, utilizando *Entities* e *Repositories*.
4. Ao final, o *Use Case* cria um *Output DTO* com o resultado e o retorna.
5. O *Controller* recebe o *Output DTO* e o entrega para a próxima etapa (geralmente um *Presenter*).

Este fluxo garante que as camadas internas não sejam contaminadas por detalhes das camadas externas.

### Input e Output
No final, todo software pode ser simplificado como um sistema que recebe um **Input** e retorna um **Output**.

- **Input:** Os dados entram pela camada mais externa (*Frameworks & Drivers*) e transitam para dentro, sendo transformados em DTOs até chegar ao *Use Case*.
- **Output:** Os dados de resultado são gerados nas camadas internas, transitam para fora na forma de DTOs e são formatados para a entrega na camada mais externa.

Pensar em termos de Input/Output simplifica o raciocínio ao projetar os casos de uso.

### Presenters
*Presenters* são objetos de transformação responsáveis por formatar o *Output DTO* do caso de uso para um formato específico de entrega.

**Responsabilidade:** Adequar a saída para diferentes tipos de clientes (JSON para uma API REST, XML para um serviço SOAP, HTML para a web, etc.).

**Exemplo de Fluxo:**
```java
// Controller recebe o output do Use Case
OutputDTO output = createCategoryUseCase.execute(input);

// Presenter formata o DTO para diferentes formatos
String jsonResult = new CategoryPresenter(output).toJson();
String xmlResult = new CategoryPresenter(output).toXML();
```

O uso de *Presenters* garante que o *Use Case* permaneça completamente ignorante sobre como os dados serão apresentados ao usuário final.

## Desenvolvimento
### Unitários
- Caso ocorra erro de execução de todos os unitários, provavelmente é devido a versão do Node. Para resolver, basta executar o comando abaixo:
```bash
nvm use --lts
```
- Este comando faz com que o node seja atualizado para a última versão. Se realmente for problema de versão, ao executar os unitários, os mesmos devem voltar a funcionar.

### Trabalhando com APIs
- Instalando o express e o dotenv para trabalhar com endpoints
```bash
npm i express @types/express dotenv
```
- Instalando o nodemon para lidar com o server
```bash
npm i nodemon
```
