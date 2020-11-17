Feature: cadastro de pesquisadores
    As a pesquisador
    I want to importar arquivos XML do Currículo Lattes de pesquisadores
    So that eu possa fazer uma análise de suas publicações e gerar um ranking

Scenario: Cadastro bem-sucedido do arquivo XML de um pesquisador
    Given que estou na página de pesquisadores
    And o pesquisador "Carlos André Guimarães Ferraz" não está cadastrado no sistema
    When eu seleciono a opção de cadastrar escolhendo o arquivo "cagf.xml"
    Then uma mensagem de confirmação "Pesquisador cadastrado com sucesso!" é exibida
    And eu consigo ver o pesquisador "Carlos André Guimarães Ferraz" na lista de pesquisadores

Scenario: Upload do arquivo XML de um pesquisador já cadastrado
    Given que estou na página de pesquisadores
    And o pesquisador "Carlos André Guimarães Ferraz" está na lista de pesquisadores cadastrados no sistema
    When eu faço o upload do arquivo "cagf.xml"
    Then a mensagem de erro "O pesquisador não pode ser cadastrado!" é exibida
    And o pesquisador "Carlos André Guimarães Ferraz" não é cadastrado novamente no sistema

Scenario: Upload de um arquivo em formato inválido
    Given que estou na página de pesquisadores
    And o pesquisador "Paulo Henrique Monteiro Borba" não está na lista de pesquisadores
    When eu faço upload do arquivo "phmb_error.xml"
    Then a mensagem de erro "O pesquisador não pode ser cadastrado!" é exibida
    And o pesquisador "Paulo Henrique Monteiro Borba" não é cadastrado no sistema

Scenario: Atualizar informações de um pesquisador cadastrado no sistema
    Given que estou na página de pesquisadores
    And o pesquisador "Carlos André Guimarães Ferraz" está na lista de pesquisadores
    When eu seleciono a opção de atualizar enviando o arquivo "cagf_atualizado.xml" com as novas publicações
    Then a mensagem de confirmação "Pesquisador atualizado com sucesso!" é exibida
    And o pesquisador "Carlos André Guimarães Ferraz" está na lista de pesquisadores com as novas publicações
