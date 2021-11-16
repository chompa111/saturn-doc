<html lang="en">
<script src="https://pagecdn.io/lib/ace/1.4.12/ace.js" type="text/javascript" charset="utf-8"></script>
<script src='../../../javascripts/codeblock.js'></script>
</html>

# Paralel Task



As tasks paralelas foram construidas com a inteção de executar multiplos passos da sua animação simultaneamente.
Internamente a task paralela tem uma lista de subtasks, e cada passo seu, é na verdade dar um passo em suas sub-taks.
Existem alguns jeitos de construi-las como mostraremos a seguir:

### Construtor com lista

``` java

Task t1 = //some task
Task t2 = //other task;

List<Task> taskList = new ArrayList<>();
taskList.add(t1);
taskList.add(t2);

Task paralelTask = new ParalelTask(taskList);
```

### Construtor com var args

``` java

Task t1 = //some task
Task t2 = //other task;

Task paralelTask = new ParalelTask(t1,t2);
```
> essa forma equivale a passar um vetor `Task[]`


### Utilizando os metodo `parallel()` da interface Task

Essa forma pode vir bastante a calhar, reduzindo potencialmente a _verbozidade_ do código, consiste em construir a task paralela a partir de outras tasks como no padrão **builder**, veja o exemplo:

``` java

Task t1 = //some task
Task t2 = //other task;

Task paralelTask = t1.parallel(t2);
```

Na maioria dos casos não queremos/precisamos armazenar referencias paras as partes da task paralela, escrevendo o código de maneira mais objetiva:

``` java
Task paralelTask = gobject.move(200,0).parallel(gobject.changeColor(Color.blue));
```

Voce pode chamar quantas vezes quiser o metodo `parallel()` à partir de uma task (mesmo que seja um task paralela), isso vai ser equivalente ao metodo de contrução por lista ou varArgs com mais elementos, para ilustrar:


``` java

Task t1 = //some task
Task t2 = //other task;
Task t3 = //one more task;

//1
Task paralelTask = t1.parallel(t2).parallel(t3); // this can go on for ever

//2
Task equivalent = new ParalelTask(t1,t2,t3);

//3
List<Task> taskList = new ArrayList<>();
taskList.add(t1);
taskList.add(t2);
taskList.add(t3);

Task equivalent2 = new ParalelTask(taskList);
```

## Exemplo prático

vamos mostrar um exemplo simples de duas tasks compostas em paralelo, o exemplo vai em dois circulos, um oscilando sua posição no eixo horizontal, e o outro na vertical.
os dois movimentos vão acontecer em paralelo, dai o motivo do exemplo, veja o código:

````java

  @Override
    protected void buildPresentation() {

        Circle circle1 = CircleBuilder.aCircle()
                .withCenter(100, 250)
                .withColor(Color.red)
                .build();

        Circle circle2 = CircleBuilder.aCircle()
                .withCenter(400, 100)
                .withColor(Color.blue)
                .build();

        add(circle1);
        add(circle2);

        var task1 = circle1.move(300,0).andThen(circle1.move(-300,0)).repeat(5);
        var task2 = circle2.move(0,300).andThen(circle2.move(0,-300)).repeat(5);

        task1.parallel(task2).execute();

    }

````

### Teste voce mesmo este exemplo !

<html lang="en">
<div id="divitest"> 
</div>
<script >
    createCodeBlock('divitest','3',     
`Circle circle1 = CircleBuilder.aCircle()
        .withCenter(100, 250)
        .withColor(Color.red)
        .build();

Circle circle2 = CircleBuilder.aCircle()
        .withCenter(400, 100)
        .withColor(Color.blue)
        .build();

add(circle1);
add(circle2);

var task1 = circle1.move(300,0).andThen(circle1.move(-300,0)).repeat(5);
var task2 = circle2.move(0,300).andThen(circle2.move(0,-300)).repeat(5);

task1.parallel(task2).execute();`
);
</script>
</html>