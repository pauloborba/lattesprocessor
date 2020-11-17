Feature: Grupos
    As a usuario
    I Want To cadastrar e remover grupos 
    So That I possa inserir um ou mais pesquisadores nestes grupos

Scenario: Formação bem-sucedida de um grupo
    Given eu estou na página de grupos
    Given nao existe um grupo de "Centro de Informatica" cadastrado no sistema
    When eu crio o grupo "Centro de Informatica"
    Then eu posso ver o grupo "Centro de Informatica"

Scenario: Insercao bem-sucedida de usuários em um grupo
    Given eu estou na página de grupos
    Given vejo o grupo "Centro de Informatica"
    Given o pesquisador "Paulo Henrique Monteiro Borba" esta cadastrado no sistema
    Given nao existe o pesquisador "Paulo Henrique Monteiro Borba" no grupo "Centro de Informatica"
    When eu tento inserir "Paulo Henrique Monteiro Borba" no grupo "Centro de Informatica"
    Then eu posso ver no grupo "Centro de Informatica" o pesquisador "Paulo Henrique Monteiro Borba"

Scenario: Remoção bem-sucedida de um grupo
    Given eu estou na página de grupos
    Given existe o grupo "Centro de Informatica" no sistema
    When eu tento remover o grupo "Centro de Informatica" do sistema
    Then não existe mais o grupo "Centro de Informatica" no sistema

# Scenario: Insercao bem-sucedida de pesquisadores de um grupo em outro grupo
#     Given eu estou na página de grupos
#     Given existem os grupos "CIn" e "UFPE" no sistema
#     Given existem os pesquisadores "Anjolina Grisi de Oliveira" e "Carlos Andre Guimaraes Ferraz" no grupo "CIn"
#     When eu tento cadastrar os pesquisadores do grupo "CIn" no grupo "UFPE"
#     Then eu posso ver os pesquisadores "Anjolina Grisi de Oliveira" e "Carlos Andre Guimaraes Ferraz" no grupo "UFPE"

