Feature:
Como um professor, aluno ou pesquisador
Eu quero realizar estudos comparativos com os pesquisadores, departamentos e grupos de pesquisas
Para fazer um ranking com eles e suas produções

Scenario: Comparar pesquisadores com quantidades diferentes de artigos pelo método “quantidade de artigos”
Given Eu estou na página “Estudos Comparativos”
And O professor “Paulo” tem "6" artigos e o professor “Sílvio” tem “3” artigos 
When Eu escolho o método “quantidade de artigos”
And Eu gero o ranking
Then “Paulo” fica na primeira linha com "6" pontos e “Sílvio” na segunda com "6" pontos.

Scenario: Comparar pesquisadores com critérios de avaliação de artigos diferentes pelo método “critérios de avaliação personalizados”
Given Eu estou na página “Estudos Comparativos”
And O professor “Paulo” tem “3” artigos “A1”, 2 artigos “A2” e 1 artigo “B1”
And O professor “Sílvio” tem “3” artigos “A1”, 2 artigo “A2” e 1 artigos “B4”
When Eu escolho o método “critérios de avaliação personalizados”
And Eu atribuo os pesos "3", "2", "1", "0", "0", "0", "0", "0", respectivamente
And Eu gero o ranking
Then “Paulo” fica na primeira linha com “14” pontos e “Sílvio” na segunda com “13” pontos.

Scenario: Comparar pesquisadores que possuem mesmo currículo
Given eu estou na página “Estudos Comparativos”
And O professor “Paulo” tem "3" artigos e o professor “Sílvio” tem “3” artigos 
When Eu escolho o método “quantidade de artigos”
And Eu gero o ranking
Then “Paulo” fica na primeira linha com "3" pontos e “Sílvio” na segunda com "3" pontos.

Scenario: Comparar pesquisadores sem especificar os pesos pelo método “critérios de avaliação personalizados”
Given Eu estou na página “Estudos Comparativos”
And O professor “Paulo” tem “3” artigos “A1”, 2 artigos “A2” e 1 artigo “B1”
And O professor “Sílvio” tem “3” artigos “A1”, 2 artigo “A2” e 1 artigos “B4”
When Eu escolho o método “critérios de avaliação personalizados”
And Eu gero o ranking
Then Paulo” fica na primeira linha com “44” pontos e “Sílvio” na segunda com “29” pontos.