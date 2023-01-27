<html lang="en">
<script src="https://pagecdn.io/lib/ace/1.4.12/ace.js" type="text/javascript" charset="utf-8"></script>
</html>

# Gobject

 Gobject: diminuição de (_Graphical objects_), são literalmente todas as entidades que podem ser escritas em tela, desde as formas mais basicas até as composições mais complexas de formas, textos e videos etc...

sua apresentação contém uma lista de Gobjects, na qual é preciso adicionar caso queira que o objeto em questão apareça nos frames.

``` java
Gobject gobject = //algum gobject
add(gobject); // é necessario adicinar para que apareça na tela;

```

## Tasks de Gobjects

### move

a função move gera um task que vai mover o objeto `(x,y)` posições no espaço, é possivel determinar o numero de passos passando um terceiro argumento como veremos a seguir:

``` java
Gobject gobject = //algum gobject

gobject.move(200,-100); // 200 unidades à direita, 100 para baixo

gobject.move(200,-100,30); // durante 30 quadros

// ou ainda

gobject.move(200,-100,seconds(1.5)); // durante 1.5 segundos

```
> note que `seconds(double s)` é um metodo de presentation que calcula a quantidade de quadros no fps configurado para alcançar o tempo desejado.


### moveTo

a função move gera um task que vai mover o objeto **ate a location `(x,y)`**, diferentemente da funtion move que adiciona x, y a posição atual. a função move to calcula quantas unidades é necessario andar para atingir a location passada.

``` java
Gobject gobject = //algum gobject

gobject.moveTo(Location.at(500,500)); // move para a posicao 500,500 não importa de onde esteja 

gobject.moveTo(Location.at(500,500),30); // durante 30 quadros

// ou ainda

gobject.moveTo(Location.at(500,500),seconds(1.5)); // durante 1.5 segundos

```

### rotate

a função rotate gera um task que vai girar o objecto em `(x)` radianos;

``` java
Gobject gobject = //algum gobject

gobject.rotate(3.141592); // meia volta a direita;
gobject.rotate(-3.141592); // meia volta a esquerda;

// se preferir converta graus para radianos

gobject.moveTo(Math.toRadians(180)); // meia volta da mesma maneira

// o argumento de duaração tmb é valido aqui
gobject.moveTo(Math.toRadians(180),seconds(2));

```

### scale

a função move gera um task que vai mover o objeto **ate a location `(x,y)`**, diferentemente da funtion move que adiciona x, y a posição atual. a função move to calcula quantas unidades é necessario andar para atingir a location passada.

``` java
Gobject gobject = //algum gobject

gobject.moveTo(Location.at(500,500)); // move para a posicao 500,500 não importa de onde esteja 

gobject.moveTo(Location.at(500,500),30); // durante 30 quadros

// ou ainda

gobject.moveTo(Location.at(500,500),seconds(1.5)); // durante 1.5 segundos

```

=== "Saturn Terminal"
    <html lang="en">
    <div id="divitest2">    
    </div>
    <script src='../../../javascripts/codeblock.js'></script>
    <script >
        createCodeBlock('divitest2','4',
            'Math.random(20);\n'+
            'var pepe =  new Color(0,0,222);');
    </script>

    </html>

=== "Static"

    ``` java
    Math.random(20);
    ```

=== "Saturn Terminal2"
    <html lang="en">
    <div id="divitest3">    
    </div>
    <script src='../../../javascripts/codeblock.js'></script>
    <script >
        createCodeBlock('divitest3','3',
            `Math.random(20);
            var pepe =  new Color(0,0,222);`);
    </script>

    </html>


### sdakldjlaksjd

ksdjalkjdlaksjdla

* a

* n