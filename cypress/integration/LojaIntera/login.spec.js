describe('Login loja intera', () =>{

    beforeEach(() => {
        cy.visit('https://qastoredesafio.lojaintegrada.com.br/')
    })
    
    it('Verificar login passando senha menor que 5 caractere, validar mensagem de erro', () => {
        cy.contains('a', 'Minha Conta').click();
        cy.get('.controls > #id_email').type('teste-001@gmail.com');
        cy.get('#id_senha').type('123');
        
        cy.contains('button', 'Prosseguir').click();
        cy.contains('li', 'Certifique-se de que o valor tenha no mínimo 5 caracteres (ele possui 3).').should('be.visible');
    })

    it('Verificar login passando o email invalido', () => {
        cy.contains('a', 'Minha Conta').click();
        cy.get('.controls > #id_email').type('teste-wesley@gmail.com');
        cy.get('#id_senha').type('123456');
        cy.contains('button', 'Prosseguir').click();
        cy.contains('div', 'Não foi possível entrar pois o email ou senha não conferem. Por favor tente novamente com outro email ou senha.').should('be.visible');
    })

    it('Verificar login passando a senha invalida', () => {
        cy.contains('a', 'Minha Conta').click();
        cy.get('.controls > #id_email').type('teste-001@gmail.com');
        cy.get('#id_senha').type('1234sdfa');
        cy.contains('button', 'Prosseguir').click();
        cy.contains('div', 'Não foi possível entrar pois o email ou senha não conferem. Por favor tente novamente com outro email ou senha.').should('be.visible');
    })

    it('Verificar login passando usuario e senha correta', () => {
        cy.contains('a', 'Minha Conta').click();
        cy.get('.controls > #id_email').type('teste-001@gmail.com');
        cy.get('#id_senha').type('123456');
        cy.contains('button', 'Prosseguir').click();
        cy.get('.btn-group > .botao').should('be.visible');
    })

    it('Validar login e logout', () => {
        cy.contains('a', 'Minha Conta').click();
        cy.get('.controls > #id_email').type('teste-001@gmail.com');
        cy.get('#id_senha').type('123456');
        cy.contains('button', 'Prosseguir').click();
        cy.get('.btn-group > .botao').should('be.visible');
        cy.contains('a', 'Olá, Teste Wesley').click();
        cy.get('.menu-user-logout').click();
    })

    it('Verificar login não passando valores de senha e email', () => {
        cy.contains('a', 'Minha Conta').click();
        cy.contains('button', 'Prosseguir').click();
        cy.get(':nth-child(2) > .controls > .errorlist > li').should('be.visible');
        cy.get(':nth-child(3) > .controls > .errorlist > li').should('be.visible');
    })
})