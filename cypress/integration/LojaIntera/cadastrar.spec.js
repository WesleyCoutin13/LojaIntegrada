describe('Login loja intera', () =>{
    
    beforeEach(() => {
        cy.visit('https://qastoredesafio.lojaintegrada.com.br/')
    })

    it('Verifica mensagem de erro ao clicar no botao cadastrar sem passar email', () => {
        cy.contains('a', 'Minha Conta').click();
        cy.contains('button', 'Cadastrar').click();
        cy.contains('div', 'Email não informado, digite seu email no campo para cadastro.').should('be.visible');
    })

    it('Validar campo de adicionar um email a ser cadastrado', () => {
        cy.contains('a', 'Minha Conta').click();
        cy.get('fieldset > div > #id_email').type('teste-wesley@gmail.com');
        cy.contains('button', 'Cadastrar').click();
    })

    it('Validar criacao de um usuario ja criado', () => {
        cy.contains('a', 'Minha Conta').click();
        cy.get('fieldset > div > #id_email').type('teste-wesley2@gmail.com');
        cy.contains('button', 'Cadastrar').click();
        cy.contains('div', 'Já existe um cliente cadastrado com este email.').should('be.visible');    
    })

    const usuario = require('../../fixtures/usuarios.json')
    usuario.forEach(usuario => {

        it(`Validar criacao de um novo usuario ${usuario.nome} `, () => {
            cy.contains('a', 'Minha Conta').click();
            cy.get('fieldset > div > #id_email').type(usuario.email);
            cy.contains('button', 'Cadastrar').click();
            cy.get('#id_confirmacao_email').type(usuario.email);
            cy.get('#id_senha').type(usuario.senha);
            cy.get('#id_cep').type(usuario.cep);
            cy.get('#id_numero').type(usuario.numerocasa);
            cy.get('#id_confirmacao_senha').type(usuario.senha);
            cy.get('#id_nome').type(usuario.nome);
            cy.get('#id_cpf').type(usuario.cpf);
            cy.get('#id_telefone_celular').type(usuario.celular);
            cy.get('#id_telefone_principal').type(usuario.telefone);
            cy.get('#id_sexo').as('sexo').select('Masculino');
            cy.get('#id_data_nascimento').type(usuario.datanascimento);
            cy.contains('button', 'Criar Conta').click();
        })
    });
})