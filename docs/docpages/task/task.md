<html lang="en">
<script src="https://pagecdn.io/lib/ace/1.4.12/ace.js" type="text/javascript" charset="utf-8"></script>
</html>

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
=== "Construtor lista"
	``` java
	Gobject circle = CircleBuilder.aCircle().build();
	Task t1 = circle.move(200,0);
	Task t2 = circle.changeColor(Color.red);

	Task paralelTaks = new ParalelTask(t1,t2);
	paralelTask.execute();
	```
=== "Builder-like"
	``` java
	Gobject circle = CircleBuilder.aCircle().build();
	Task t1 = circle.move(200,0);
	Task t2 = circle.changeColor(Color.red);

	 t1.parallel(t2).execute();
	```

> uma task paralela é encerrada quando todas as _subtasks_ são encerradas, em outras palavras a duração composição das tasks será igual a da maior task.

Veja mais detalhes sobre as tasks paralelas [aqui](paraleltask.md)

As vezes gostariamos de juntar varias tasks, no entanto, para executar em sequencia mesmo. um dos motivos desejados pra fazer isso é para ter uma task complexa como
retorno de uma função, veja o exemplo;

``` java
Task moveAndThenChangeColor(Gobject gobject){
	Task t1 = gobject.move(200,0);
	Task t2 = gobject.changeColor(Color.red);	
	Task sequenceTask = new SequenceTask(t1,t2);
	return sequenceTask;
}
```

podemos compor tasks em taks cada vez mais complexas veja o caso:


=== "Construtor"
	``` java
	Task complexTask(Task t1,Task t2,Task t3,Task t4,Task t5,Task t6){
		Task parallelTask1 = new ParalelTask(t4,t5,t6);
		Task sequenceTask = new SquenceTask(t1,t2);
		Task parallelTask2 = new ParalelTask(sequenceTask,parallelTask1);
		return paralelTaks2;
	}
	```
=== "Builder-like"
	``` java
	Task complexTask(Task t1,Task t2,Task t3,Task t4,Task t5,Task t6){
		return t1.andThen(t2).andThen(t3).parallel(t4.parallel(t5).parallel(t6));
	}
	```

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgIFNlcXVlbmNlVGFzayAtLT4gVGFzazFcblxuICAgVGFzazEgLS0-IFRhc2syXG4gICBUYXNrMiAtLT4gVGFzazNcblxuICAgUGFyYWxsZWxUYXNrIC0tPiBUYXNrNFxuICAgUGFyYWxsZWxUYXNrIC0tPiBUYXNrNVxuICAgUGFyYWxsZWxUYXNrIC0tPiBUYXNrNlxuXG4gICBwYXJhbGxlbFRhc2syIC0tPiBTZXF1ZW5jZVRhc2sgXG4gICBwYXJhbGxlbFRhc2syIC0tPiBQYXJhbGxlbFRhc2tcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkYXJrIn0sInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)](https://mermaid.live/edit#eyJjb2RlIjoiZ3JhcGggVERcbiAgIFNlcXVlbmNlVGFzayAtLT4gVGFzazFcblxuICAgVGFzazEgLS0-IFRhc2syXG4gICBUYXNrMiAtLT4gVGFzazNcblxuICAgUGFyYWxsZWxUYXNrIC0tPiBUYXNrNFxuICAgUGFyYWxsZWxUYXNrIC0tPiBUYXNrNVxuICAgUGFyYWxsZWxUYXNrIC0tPiBUYXNrNlxuXG4gICBwYXJhbGxlbFRhc2syIC0tPiBTZXF1ZW5jZVRhc2sgXG4gICBwYXJhbGxlbFRhc2syIC0tPiBQYXJhbGxlbFRhc2tcbiIsIm1lcm1haWQiOiJ7XG4gIFwidGhlbWVcIjogXCJkYXJrXCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)


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

### Zona de código livre:


<html lang="en">
<div id="divitest2">	
</div>
<script src='../../../javascripts/codeblock.js'></script>
<script >
	createCodeBlock('divitest2','4');
</script>

</html>

<html>
<button id="myBtn">Open Modal</button>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div id="pepemujica"class="modal-content">
    <span class="close">&times;</span>
    
  </div>

</div>
<script >
	// Get the modal
var modal = document.getElementById("myModal");
	createStaticBlock('pepemujica','5',`
package graphical.basics.task;

import graphical.basics.presentation.Presentation;

import java.util.function.Function;
import java.util.function.Supplier;

public interface Task {

    void setup();

    void step();

    boolean isDone();

    default Task andThen(Task t2) {
        if (this instanceof SequenceTask) {
            ((SequenceTask) this).addTask(t2);
            return this;
        } else {
            return new SequenceTask(this, t2);
        }
    }

    default Task andThen(Supplier<Task> supplier) {
        return andThen(new ContextSetupTask(supplier));
    }

    default Task parallel(Task t2) {
        if (this instanceof ParalelTask) {
            ((ParalelTask) this).addTask(t2);
            return this;
        } else {
            return new ParalelTask(this, t2);
        }
    }

    default Task parallel(Supplier<Task> supplier) {
        return parallel(new ContextSetupTask(supplier));
    }

    default Task repeat(int times) {
        return new RepeatTask(times, this);
    }

    default Task wait(int steps) {
        return this.andThen(new WaitTask(steps));
    }

    default Task step(Runnable runnable) {
        return this.andThen(new SingleStepTask(runnable));
    }

    static void consume(Task task) {
        task.setup();
        while (!task.isDone()) {
            task.step();
        }
    }

    default void execute() {
        Presentation.staticReference.execute(this);
    }

    default InterruptableTask executeInBackGround() {
        return Presentation.staticReference.backGroundTask.append(this);
    }


//
//    public static <T extends Task> Collector<T, ?, ParalelTask> toList() {
//        return new Collectors.CollectorImpl(ArrayList::new, List::add, (left, right) -> {
//            left.addAll(right);
//            return left;
//        }, CH_ID);
//    }

}
		`);

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>

</html>




