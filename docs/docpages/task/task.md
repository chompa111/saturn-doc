# Task 

Quando temos uma animação no Saturno, como por exemplo: uma bolinha se movendo ou trocando de cor, temos uma task;
``` java
Task moveTask = circle.move(200,200); 
//mais um exemplo
Task changeColorTask = circle.changeColor(Color.yellow); 
```
a task é responsavel por alterar os objetos na apresentação pouco a pouco a cada quadro da animação durante um determinado tempo.

Para executa-la é necessario invocar o método `execute()` a partir da instancia da Task, como pode ser visto no exemplo a seguir:

``` java
Task t = circle.move(200,200);
t.execute(); 
```

> ao invocar o metodo `execute()`  a execução permanecerá presa nesta linha até a conclusão da task.

---

## Composição de Tasks

Para falar sobre composição de Tasks vamos iluistrar o seguinte exemplo primeiro:
``` java
Gobject circle = CircleBuilder.aCircle().build();
Task t1 = circle.move(200,0);
Task t2 = circle.changeColor(Color.red);

t1.execute();
t2.execute();
```
Nesse exemplo, temos um circulo e duas tasks: a de move-lo `200` unidades pra direita(`t1`) e de mudar sua cor pra vermelho(`t2`).
Como vimos na sessão anterior ao chamarmos o metodo `execute()` a execução fica presa na linha até a conclusão da task.
Desse modo, a taks `t2` só vai rodar depois de `t1`.
#### E se quisessemos executar em paralelo? 

Nesse caso seria necessário compor as duas tasks em uma nova task que as execute em paralelo, veja a seguir:

``` java
Gobject circle = CircleBuilder.aCircle().build();
Task t1 = circle.move(200,0);
Task t2 = circle.changeColor(Color.red);

Task paralelTaks = new ParalelTask(t1,t2);
paralelTask.execute();
```

as vezes gostariamos de juntar varias tasks, no entanto, para executar em sequencia mesmo. um dos motivos desejados pra fazer isso é para ter uma task complexa como
retorno de uma função, veja o exemplo;

``` java
Task moveAndThenChangeColor(Gobject gobject){
	Task t1 = gobject.move(200,0);
	Task t2 = gobject.changeColor(Color.red);	
	Task sequenceTask = new SequenceTask(t1,t2);
	return sequenceTask;
}
```



---

## Duração

as taks sempre tem uma duração pra ocorrer, geralmente é possivel especificar a duração adicionando um parametro, se ele não for obrigatório ou fixo.

``` java
int numFrames=30;
Task t = circle.move(200,200,numFrames); 
```
se sua apresentação estiver numa taxa de `30 quadros/segundo` então passando `30` no argumento de duração, o movimento do circulo irá durar 1 segundo.

Porém não é pratico ter que calcular quantidade  de quadros pra atingir a duração desejada. Para isso temos a função `seconds()` que leva em consideração o *framerate* da sua apresentação e calcula a quantidade de frames pra atingir o tempo desejado.

``` java
Task t = circle.move(200,200,seconds(2.5)); // 2.5 segundos 
```







## Entendendo mais a fundo