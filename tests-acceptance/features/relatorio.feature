Feature: Geração de relatórios a partir dos ranqueamentos
Como usuário
Quero acessar a página de ranqueamento
Assim posso gerar relatórios a partir do ranking dos pesquisadores

Scenario: Gerar com sucesso o relatório
Given que estou na “página de ranqueamento”
And há no sistema os pesquisadores “Paulo” com 2 periódicos avaliados em “A1” e “João com 1 periódico avaliado em “A1”
And eu adiciono “1*A1” como fórmula para ranqueamento
And eu seleciono “Pesquisadores” como tipo do relatório
When eu seleciono a opção gerar relatório
Then eu posso ver uma opção para baixar o relatório
And continuo na “página de ranqueamento”

Scenario: Problema ao gerar relatório (relatório vazio)
Given que eu estou na “página de ranqueamento”
And há no sistema os pesquisadores “Paulo” com 2 periódicos avaliados em “A1” e “João com 1 periódico avaliado em “A1”
And eu adiciono “A2*5” como fórmula para ranqueamento
And eu seleciono “Pesquisadores” como tipo do relatório
When eu seleciono a opção gerar relatório
Then eu vejo "Erro: Relatório vazio", uma vez que não há nenhum pesquisador avaliado com “A2”

Scenario: Não preenchimento de todos os campos
Given que eu estou na “página de ranqueamento”
And há no sistema os pesquisadores “Paulo” com 2 periódicos avaliados em “A1” e “João com 1 periódico avaliado em “A1”
And eu preencho “A1” na opção de fórmula
When eu seleciono a opção gerar relatório
Then eu vejo a mensagem “Campo 'tipo' não preenchido”.

Scenario: Fórmula inválida
Given que eu estou na “página de ranqueamento”
And há no sistema os pesquisadores “Paulo” com 2 periódicos avaliados em “A1” e “João com 1 periódico avaliado em “A1”
And eu adiciono “(A1/0 + A2/3 + B1/5)/3)“ como fórmula de ranqueamento
And eu seleciono “Grupos de pesquisas” o tipo de relatório
When seleciono a opção “gerar relatório”
Then eu vejo a mensagem "Fórmula inválida"
