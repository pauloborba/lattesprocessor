Feature:
Como um professor, aluno ou pesquisador
Eu quero realizar estudos comparativos com os pesquisadores, departamentos e grupos de pesquisas
Para fazer um ranking com eles e suas produções

Scenario:Ranqueamento sem arquivo XML carregado
Given estou na página de 'estudos comparativos'
And o atributo “arquivo xml” está como “nenhum arquivo carregado”
When eu seleciono a opção “quantidade de artigos”
Then eu vejo uma mensagem informando que nenhum arquivo .xml foi carregado