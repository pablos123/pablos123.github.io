# Reglas de la Básica

## Historia

La Básica es un juego de cartas españolas basado en la Escoba de 15 que me enseñó mi tío hace muchos años.

No hay una forma oficial de cómo jugarla, como cualquier otro juego de cartas.

En la adolescia, con mis amigos la jugamos muchísimo y con el tiempo fuimos agregando reglas hasta considerarla muy particular. Por eso la que jugamos es la _Básica Real_, la _Real (rē(ə)l) Básica_ o, meramente, la _Básica_, que, para nosotros, es esta y no la que aprendí cuando era chico.

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

<summary>(También se puede tirar una moneda)</summary>

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

Esta es una lista de los juegos con los repectivos puntos:

- Escoba: 1 punto. (Las cartas suman quince)

- Full: 1 punto. (Dos cartas iguales y una distinta)

- Dos de chica/Dos de miseria: 2 puntos. (Las cartas suman menos de nueve)

- Tres de nueve: 3 puntos. (Las cartas suman nueve)

- Escalera: 3 puntos. (Valen circulares. Tres números consecutivos)

- Flor: 3 puntos. (Las cartas son del mismo)

- Escalera especial: 6 puntos.

- Pierna: 4 puntos.

- Básica: 20 pts. (1 2 3 de Oro)


# Comienzo de mano
Cada mano comienza repartiendo tres cartas a cada jugador y colocando cuatro cartas boca arriba en la mesa.

Luego ver

# Turnos
Si es el primer turno de la mano entonces ver juegos de


# Juegos de mano

# Juegos de mesa

Los Juegos de Mesa o de Postre

# Contra-Juegos

Siempre

# Final de mano

# Final de partida
Gana el
