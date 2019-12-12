Feature: Importar qualis com extensão xls
As a: Pesquisador de um grupo de pesquisa
I want: to Importar planilhas com extensão xls com avaliação qualis de publicações de periódicos
So that: Eu consigo usar o critério qualis de avaliação para o rankeamento do número de produções acadêmicas de professores, departamentos e grupos de pesquisa

Scenario: Importar planilha com sucesso
Given Eu estou na página Qualis
And Nenhum periódico está armazenado no sistema
When Eu seleciono o arquivo "publicacoes_2016.xls"
And Eu seleciono a opção "Qualis Import" que carrega o arquivo
Then Eu vejo uma mensagem de sucesso
And Eu vejo os periódicos "ACM Transactions on Intelligent Systems and Technology" com ISSN "2157-6904" e avaliação "A1", "Applied Intelligence (Boston)" com ISSN "0924-669X" e avaliação "B1" e "BMC Genomics" com ISSN "1471-2164" e avaliação "B2"

Scenario: Limpar a tabela qualis com sucesso
Given Eu estou na página Qualis
And Eu consigo ver os periódicos "ACM Transactions on Intelligent Systems and Technology" com ISSN "2157-6904" e avaliação "A1", "Applied Intelligence (Boston)" com ISSN "0924-669X" e avaliação "B1" e "BMC Genomics" com ISSN "1471-2164" e avaliação "B2"
When Eu seleciono a opção "Clear Qualis" que limpa a tabela atual
Then Eu vejo nenhum periódico cadastrado no sistema

Scenario: Importar planilha com formáto inválido
Given Eu estou na página Qualis
And Nenhum periódico está armazenado no sistema
When Eu envio o arquivo "publicacoes_2018.xls", que possui uma formatação invalida
Then Eu vejo uma mensagem de erro indicando formatação errada na planilha

Scenario: Importar planilha vazia
Given Eu estou na página Qualis
And Nenhum periódico está armazenado no sistema
When Eu envio o arquivo "publicacoes_2019.xls", que não possui nenhuma entrada para periódico
Then Eu vejo uma mensagem de erro indicando que nenhum periódico foi cadastrado no sistema
