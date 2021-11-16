<html lang="en">
<script src="https://pagecdn.io/lib/ace/1.4.12/ace.js" type="text/javascript" charset="utf-8"></script>
<script src='../../../javascripts/codeblock.js'></script>
</html>



![baner7](https://user-images.githubusercontent.com/43425971/131168286-6077a2c9-7572-4c39-97e1-6da6636addd2.png)

# Bem vindos à Saturn Wiki

Seja bem vindo à documentação do *Saturn-GL* em português, a seguir veja alguns exemplos de código.
Fique à vontade para ***alterar*** e rodar os exemplos encontrados nas caixas ***interativas*** de código abaixo:

---

### Uma pequena bolinha rosa:
<html lang="en">
<div id="divcode1">    
</div>
<script src='../../../javascripts/codeblock.js'></script>
<script >
    createCodeBlock('divcode1','1',
`Circle circle = CircleBuilder.aCircle()
.withCenter(100, 500)
.withColor(new Color(200,0,200))
.build();

add(circle);

circle.move(500,0,seconds(3)).execute();`
        );
</script>

</html>



### Uma  explosão:

neste exemplo *100* circulos são criados e enviados a partir do centro da tela em direção as extremidades 
são criadas por tanto, 100 [tasks](docpages/task/task.md) são criadas, uma para cada bolinha. 

<html lang="en">
<div id="divcode2">    
</div>
<script src='../javascripts/codeblock.js'></script>
<script >
    createCodeBlock('divcode2','2',
`for (int i = 0; i < 100; i++) {
            Circle circle = CircleBuilder.aCircle()
                    .withCenter(500, 500)
                    .withColor(Color.white)
                    .withRadius(20)
                    .build();

            add(circle);

            var ang = Math.random() * 6.28;
            var distance = Math.random() * 400;
            
            circle.move(distance * Math.cos(ang), distance * Math.sin(ang), seconds(3))
                    .parallel(wait(seconds(1.5)).andThen(circle.changeColor(new Color(0, 0, 0, 0))))
                    .executeInBackGround();
}`
        );
</script>

</html>



