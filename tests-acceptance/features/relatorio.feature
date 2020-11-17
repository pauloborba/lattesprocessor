Feature: gerar relatórios
          As a pesquisador
          I want to gerar relatórios baseados em um intervalo de tempo determinado.
 		  So that eu posso analisar as publicações.

Scenario: Relatório geral gerado com sucesso.
        Given que estou ná página “Relatórios”  
        And os campos "Data inicial" e "Data Final" não estão preenchidos
        And não vejo um relatório sem data definida na lista de relatorios
        When eu clico no botão “Gerar relatório”
        Then vejo um relatório sem data definida na lista de relatorios
Scenario: Nao gerar relatorio duplicado.
        Given que estou ná página “Relatórios” 
        And os campos "Data inicial" e "Data Final" não estão preenchidos
        And vejo um relatório sem data definida na lista de relatorios
        When eu clico no botão “Gerar relatório”
        Then a mensagem "Relatorio já gerado, atualize o relatório" é exibida
Scenario: Atualizar um relatorio
        Given que estou ná página “Relatórios” 
        And vejo um relatório de ID "0" na lista de relatorios
        When eu clico no botão "Atualizar" no relatório de ID "0" 
        Then a mensagem "Relatório atualizado com sucesso" é exibida
Scenario: Deletar um relatório com sucesso
        Given que estou ná página “Relatórios” 
        And vejo um relatório de ID "0" na lista de relatorios
        When eu clico no botão "Deletar" no relatório de ID "0" 
        Then não vejo um relatório de ID "0" na lista de relatorios
Scenario: Relatorio baseado em intervalo de tempo gerado com sucesso
        Given que estou ná página “Relatórios” 
        And no campo "Ano inicial" coloco o valor "2000", e no campo "Ano final" coloco o valor "2020"
        And não vejo um relatório "Ano inicial" em "2000" e "Ano final" em "2020" na lista de relatorios
        When eu clico no botão “Gerar relatório”
        Then vejo um relatório "Ano inicial" em "2000" e "Ano final" em "2020" na lista de relatorios
Scenario: Não gerar relatórios baseados em intervalos de tempo duplicados
        Given que estou ná página “Relatórios” 
        And vejo um relatório "Ano inicial" em "2000" e "Ano final" em "2020" na lista de relatorios
        And no campo "Ano inicial" coloco o valor "2000", e no campo "Ano final" coloco o valor "2020"
        When eu clico no botão “Gerar relatório”
        Then a mensagem "Relatorio já gerado, atualize o relatório" é exibida
Scenario: Não gerar relatório com data inicial maior que a final
        Given que estou ná página “Relatórios” 
        And no campo "Ano inicial" coloco o valor "2021", e no campo "Ano final" coloco o valor "2020"
        When eu clico no botão “Gerar relatório”
        Then a mensagem "A data final deve ser maior que a data inicial." é exibida
        And não vejo um relatório "Ano inicial" em "2021" e "Ano final" em "2020" na lista de relatorios

