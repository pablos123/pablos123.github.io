# Reglas de la Básica

![Foto: IA](../../../shared/images/básica_warriors.png "Amigos Jugando")

## Historia

La Básica es un juego de cartas españolas basado en la Escoba de 15 que me enseñó mi tío hace muchos años. No hay una forma oficial de cómo jugarla, como cualquier otro juego de cartas.

En la adolescia, con mis amigos la jugamos muchísimo y con el tiempo fuimos agregando reglas hasta considerarla muy particular, la versión que jugamos está muy alejada de la que aprendí.

Esta es una digitalización de estas reglas a modo de manual para evitar discusiones y aplacar pérdidas de memoria.

---

🤼 2-6 jugadores.

⏰ 20-45 min.

---

La Básica es un juego en equipos. Estos equipos pueden tener una, dos o tres personas.

# Objetivo

El objetivo es que tu equipo llegue o supere la cantidad de puntos pactada.

# Preparación

Primero que nada se decide a cuántos puntos se va a jugar. No vaya a ser que después se peleen.

Algunos valores estándar son:

- 45 puntos: partida corta.

- 65 puntos: partida normal.

- 101 puntos: partida larga.

<details>

<summary>(También puede elegirse un número arbitrario entre 30 y 101 puntos)</summary>

--

<button id="b1" style="user-select:none; width:120px; height:60px;">Seré un número</button>

--

<script>
const b1 = document.getElementById('b1');
b1.addEventListener('click',
() => b1.textContent = `${ 30 + Math.floor(Math.random() * 71) }`);
</script>

Estás ejecutando esto:
```
const b1 = document.getElementById('b1');
b1.addEventListener('click',
() => b1.textContent = `${ 30 + Math.floor(Math.random() * 71) }`);
```

Pero si preferís otra cosa, podés hacerlo como más te guste:
```
echo "$(( RANDOM % 72 + 30 ))"
```

--

```
from random import randint
print(randint(30, 101))
```

--

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void main() {
  srandom(time(NULL));
  printf("%d", random() % 72 + 30);
}
```
</details>

Luego se decide cuál de los dos equipos juega primero. Una gran opción para decidir es el clásico piedra, papel o tijera. Aunque se aceptan otros métodos como pan y queso, un partido de bolitas o una carrera.

<details>

<summary>(También puede tirarse una moneda)</summary>

--

<button id="b2" style="user-select:none; width:120px; height:60px;">Cara: 🐲</br>Cruz: ⚔️</button>

--

<script>
const b2 = document.getElementById('b2');
const arr = ['🐲', '⚔️'];
b2.addEventListener('click',
() => b2.textContent = `${ arr[Math.floor(Math.random() * 2)] }`);
</script>

</details>

# Juegos

Durante varios momentos del juego se podrán cantar juegos.

Esta es una lista de los juegos con los repectivos puntos suponiendo siempre tres cartas:

|Juego|Valor|Forma|
|---|---|---|
|Escoba|1 punto|_Los números suman quince_|
|Full|1 punto|_Dos números iguales y uno distinto_|
|Dos de Chica/Dos de Miseria|2 puntos|_Los números suman menos de nueve_|
|Tres de Nueve|3 puntos|_Los números suman nueve_|
|Escalera|3 puntos|_Tres números consecutivos. Valen circulares_|
|Flor|3 puntos|_Las cartas son del mismo palo_|
|Pierna|4 puntos|_Tres números iguales_|
|Escalera Especial|6 puntos|_Los números son 1, 2 y 3. Si se canta_ Escalera Especial _no se puede cantar escalera_|
|Básica|20 puntos|_1 2 3 de Oro. Si se canta_ Básica _no se puede cantar ningún otro juego_|

# Contra-Juegos

# Comienzo de mano
Cada mano comienza repartiendo tres cartas a cada jugador y colocando cuatro cartas boca arriba en la mesa.

En el momento que se colocan las cartas los jugadores pueden cantar **juegos de mesa**.

# Turnos
Si es el primer turno de la mano entonces ver juegos de

# Juegos de mano
Los

# Juegos de mesa

Los Juegos de Mesa o de Postre son juegos que se forman en el momento que se ponen las cuatro cartas sobre la mesa.

En el momento que se colocan las cartas se puede cantar cualquier juego de la lista de juegos excepto la escoba, con cualquier combinación de tres cartas de las cuatro en la mesa.

### Juegos de mesa especiales
Si las cuatro cartas suman 15 puntos (forman una escoba). Este juego es un juego de mesa especial y no se puede contrarrestar.

El equipo del jugador de postre (el que colocó las cartas) comienza con las cuatro cartas y tiene una escoba.

Luego, el juego continua normal.

(No se colocan cartas nuevamente, el jugador mano comienza con la mesa vacía)

# Final de mano
El último equipo que juntó cartas de la mesa se lleva todas las cartas que sobran en la mesa cuando se termina la mano.

Ahora se cuenta

### Valor de las 70

Las setenta se cuentan buscando cuatro cartas, una de cada palo, el equipo que sume más puntos gana un punto:

|Carta|Valor|
|---|---|
|7|7 puntos|
|6|6 puntos|
|1|5.5 puntos|
|5| 5 puntos|
|4| 4 puntos|
|3| 3 puntos|
|2| 2 puntos|
|Negras|0.5 puntos|

# Final de partida
Gana el equipo que llegue o supere el monto de puntos decidido al principio.

Si un equipo gana se decide al terminar la ronda.

...

# TODO
Qué pasa con las dos cartas que sobran si se juega de a 3 o de 5, etc.
Se podría pensar agregarlas a la mesa luego de un rato de partida. Por ejemplo para las buenas.

También puede pensarse en agregarlas la primera ronda para el 4 jugador (Ayuda para el que no es mano)


