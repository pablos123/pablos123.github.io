# Demostración - Mismos Conocidos

Demostración de que en todo grupo de dos o más personas existen siempre
dos personas que tienen exactamente el mismo número de conocidos en el
grupo.

Primero que nada asumamos que:

-   nadie del grupo se conoce a sí mismo;

-   nadie del grupo conoce a una persona más de una vez;

-   nadie del grupo conoce a una persona sin que esa persona lo conozca.

Podemos representar entonces el grupo de personas como $G = (V, E)$, un
grafo simple, donde:

-   $V = \{\text{personas en el grupo}\}$ y $|V| = n \geq 2$.

-   $E = \{(u, v) : u \text{ conoce a } v ;\ u,v \in V\}$ y $|E| = m$.

Por lo tanto y en definitiva, quiero ver que en un grafo simple de dos o
más vértices, dos de ellos tienen el mismo grado.

Sea $d$ la función que asigna a cada vértice de $V$ su número de
vecinos:

$$d: V(G) \rightarrow \mathbb{N}_{0}$$

$$v \mapsto |N(v)|$$

Si alguien no conoce a nadie es claro que nadie puede conocer a todos.

Esto es,
$\exists\ v \in V\ :\ d(v) = 0 \Rightarrow \nexists\ u \in V\ :\ d(u) = n - 1$.

Luego, tenemos que $Im(d) \not \subseteq \{0, .., n - 1\}$ y de aquí
$|Im(d)| \leq n - 1$

Como $|Dom(d)| = |V| = n$ tenemos que $d$ no puede ser biyectiva por el
principio del palomar.

Luego existen $u, v \in V$ distintos tal que $d(u) = d(v)$.

Por lo tanto en un grupo de dos o más personas existen siempre dos
personas que tienen exactamente el mismo número de conocidos.

$\blacksquare$
