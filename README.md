# Lista_de_Tarefas
Lista de tarefa básica no Local Storage. <br>
**Link**: https://ks7j8w.csb.app/

## Detalhes
O programa armazena todos os dados do `Input` no `Local Storage` em formato json.
> ![image](https://user-images.githubusercontent.com/86087548/213800508-80488629-1eb7-4f3d-8690-46e884764eaf.png)

Mostra as tarefas salvas na página `Index`, com o: _ID_, _Detalhes_ e a _Data_ de quando foi criada.<br>
Permitindo ordenar, excluir ou dar um _checked_ no item.
> ![image](https://user-images.githubusercontent.com/86087548/213803144-83a0d587-7c1f-40ff-9047-e549eb44ee8a.png)

E caso a data de criação seja maior que um dia, a tarefa ficará em destaque:
> ![image](https://user-images.githubusercontent.com/86087548/213803249-2d967cec-3e1f-4421-a93f-0719eefcf435.png)

<br>

! As tarefas excluídas ainda permanecerão no `Local Storage`, caso queria excluir completamente uma ou todas as tarefas, terá de ser feito manualmente:<br>
Aperte `Ctrl` `Shift` + `i`   ou   Pressione o botão direito do mouse e clique em `Inspecionar`.<br>
Vá em `Application` *(Caso não apareça, procure na seta `»`)*<br>
No `Local Storage`: <br>
**Deletar 1 Item:** Selecione o item a ser excluído e clique no `x` do lado do *Input*.<br>
**Deletar Todos os Itens**: Clique no `bloqueio = ∅` ao lado do *Input*.
