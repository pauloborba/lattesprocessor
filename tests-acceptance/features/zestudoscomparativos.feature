Feature:
Como um professor, aluno ou pesquisador
Eu quero realizar estudos comparativos com os pesquisadores, departamentos e grupos de pesquisas
Para fazer um ranking com eles e suas produções

Scenario: Comparar pesquisadores com quantidades diferentes de artigos pelo método “quantidade de artigos”
Given Eu estou na página Estudos Comparativos
Given O professor "Paulo" tem "6" artigos e o professor "Sílvio" tem "3" artigos 
When Eu escolho o método quantidade de artigos
When Eu gero o ranking
Then "Paulo" fica na primeira linha com "6" pontos e "Sílvio" na segunda com "6" pontos.

Scenario: Comparar pesquisadores com critérios de avaliação de artigos diferentes pelo método “critérios de avaliação personalizados”
Given Eu estou na página Estudos Comparativos
Given O professor "Paulo" tem "3" artigos "A1", 2 artigos "A2" e 1 artigo "B1"
Given O professor "Sílvio" tem "3" artigos "A1", 2 artigo "A2" e 1 artigo “B4"
When Eu escolho o método critérios de avaliação personalizados
When Eu atribuo os pesos "3", "2", "1", "0", "0", "0", "0", "0", respectivamente
When Eu gero o ranking
Then "Paulo" fica na primeira linha com "14" pontos e "Sílvio" na segunda com "13" pontos.

Scenario: Comparar pesquisadores que possuem mesmo currículo
Given Eu estou na página Estudos Comparativos
Given O professor "Paulo" tem "3" artigos e o professor "Sílvio" tem "3" artigos 
When Eu escolho o método quantidade de artigos
When Eu gero o ranking
Then "Paulo" fica na primeira linha com "3" pontos e "Sílvio" na segunda com "3" pontos.

Scenario: Comparar pesquisadores sem especificar os pesos pelo método "critérios de avaliação personalizados"
Given Eu estou na página Estudos Comparativos
Given O professor "Paulo" tem "3" artigos "A1", "2" artigos "A2" e "1" artigo "B1"
Given O professor "Sílvio" tem "3" artigos "A1", "2" artigos "A2" e "1" artigo "B4"
When Eu escolho o método critérios de avaliação personalizados
When Eu gero o ranking
Then "Paulo" fica na primeira linha com "44" pontos e "Sílvio" na segunda com "29" pontos.

Scenario:Ranqueamento sem arquivo XML carregado
Given estou na página de "estudos comparativos"
And o atributo "arquivo xml" está como "nenhum arquivo carregado"
When eu seleciono a opção "quantidade de artigos"
Then eu vejo uma mensagem informando que nenhum arquivo .xml foi carregado

Scenario:Ranqueamento de pesquisadores com entrada inválida de pesos de artigo
Given estou na página de "estudos comparativos"
And o atributo "arquivo xml" está como "UFPE.xml"
When eu seleciono a opção "critérios de avaliação personalizados"
And atribui os pesos "3",  "2", "1", "1", "1", "1", "1" e "J" respectivamente para "A1", "A2", "B1", "B2", "B3", "B4", "B5", "B5" e "C"
And eu seleciono a "opção executar avaliação" 
Then eu vejo uma mensagem de que os valores para os pesos são inválidos