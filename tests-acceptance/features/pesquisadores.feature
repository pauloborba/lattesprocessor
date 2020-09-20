Feature: cadastro de pesquisadores
    As a pesquisador
    I want to importar arquivos XML do Currículo Lattes de pesquisadores
    So that eu possa fazer uma análise de suas publicações e gerar um ranking

Scenario: Cadastro bem-sucedido do arquivo XML de um pesquisador
    Given que estou na página “Pesquisadores”
    And o pesquisador “Paulo Henrique Monteiro Borba” não está na lista de pesquisadores
    When seleciono a opção de “Upload”
    And escolho o arquivo “paulo-borba.xml”
    Then a mensagem de confirmação “Pesquisador cadastrado com sucesso!” é exibida
    And consigo ver o pesquisador “Paulo Henrique Monteiro Borba” na lista de pesquisadores