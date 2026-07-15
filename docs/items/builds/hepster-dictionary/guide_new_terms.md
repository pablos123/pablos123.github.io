# How to write a term for a dictionary

Conventions distilled from building the Cab Calloway *Hepster's Dictionary* page.
Use this as the spec when authoring or transforming dictionary entries.

## Data model (one entry)

```js
{
  term: "Headword",
  senses: [
    { pos: "n.", def: "definition prose.", ex: [["quote", "(gloss)"], ["quote"]] },
    { pos: "v.", def: "second sense." }
  ],
  syn:   ["Alternate name"],   // optional
  abbrv: ["Short form"]        // optional
}
```

- Top-level container is keyed by **initial letter**: `{ "A": [ … ], "B": [ … ] }`.
  Pre-organized = no runtime grouping, easy to edit by section.
- `senses` is always a **list**, even for one sense. Render shows `1.`, `2.`, … always.
- `pos` lives **per sense** (string), so one word can be `1. n.` and `2. v.`.

## Part of speech (`pos`)

- Goes **next to the sense number**, not next to the headword: `1. n. definition`.
- Use a **closed vocabulary** — reuse existing tags, do not invent new ones.
  Seen set: `n.` · `v.` · `adj.` · `exclamation.` · `command.` (+ combos `n, adj.` / `n, v.`).
- **Drop the plural marker (`n. pl.`)** and **don't trust source `(adv)`.** Source dicts
  (e.g. Hepcats) hand out both loosely: every `-s` headword gets `(n. pl.)` even for
  mass-noun meanings (Aces=perfection, Beans=change), and `(adv)` lands on plain
  adjectives (Anxious=good, Beat=worn out, Cuff=free, Dicty=superlative). Collapse
  `n. pl.`→`n.` and **reclassify `adv.` by the definition's actual meaning** — almost
  always `adj.`. Keep `adv.` only when the def is a true adverb (Natch="naturally").
- Every sense must have a pos. Classify phrase-entries by what the definition *is*:
  - "to acquire…" → `v.`  · "the wrong thing…" → `n.`  · "dressed…/lively…/wise…" → `adj.`
  - retorts / sayings / interjections ("Nothing doing, pal.", "What's your story?") → `exclamation.`

## Definition prose

- The `def` is **plain prose only** — no embedded examples, no quotes around examples.
- A word **cited but not exemplified** (a cross-reference to another headword) stays a
  plain word: e.g. Tick "…money is doubled in giving line." — `line` plain, no quotes/italic.

## Examples (`ex`)

- Each example is `[quote, gloss?]`. The **quote** renders italic between guillemets `«…»`;
  the optional **gloss** (a parenthetical translation) renders roman, normal color.
- **One example per array element** — split compound source examples joined by
  `or`, `,`, `;` into separate entries. `«You look beat»` / `«I feel beat.»` = two examples.
- Examples render **on their own line** beneath the definition (not inline).
- Punctuation rules:
  - Quote ends with **terminal punctuation** (`.`/`!`/`?`). Add `.` if missing.
    If the sentence is a question, the `?` belongs on the **quote**, not the gloss.
  - Gloss carries **no trailing dot** (lowercase, it's a translation not a sentence):
    `(lacking everything)`, `(went home)`, `(how much does this suit cost?)`.
- Drop any source "Ex.," / "Ex," marker — the italic + guillemets already signal an example.

## Synonyms & abbreviations

- **Alternate headword names** (source `X or Y`, `X (or Z)`) → keep the primary as `term`,
  put the rest in `syn: [...]`. Renders a `syn.` line; synonyms are searchable.
- **Abbreviations / contractions** → `abbrv: [...]`, rendered like `syn.`
  - "Usually abbreviated to *X*" → headword stays, `abbrv: ["X"]`.
  - If the **headword itself is an abbreviation** ("Gate, abbreviation for gate-mouth"),
    make the **full form** the headword and the short form the `abbrv` (Gate-mouth / Gate).

## Italic references (render-time, not stored)

- **Self-reference**: when the headword appears inside its own definition, italicize it
  (Ow! → "…it's *Ow!*"). Matched as a whole word, case-insensitive.
- **Cross-reference**: italicize the term(s) after `see` / `same as`
  ("(see *collar*; *knock*)", "same as *drape*"). Separators (`;`) stay roman.

## Multiple senses

- Source markers `(i) (ii) (iii)` map to separate `senses[]` elements, renumbered `1. 2. 3.`
- Each sense gets its own `pos`, `def`, and `ex`.

## Sanitizing a scanned/OCR source (e.g. Hepcats *Jive Talk*, T.W.O. Charles Co.)

Raw page dumps carry junk that is **not** dictionary content — strip it before parsing:

- **Reattach the section letter.** Each letter section drops its initial letter into the
  header, so the first headword is OCR'd missing it: under **C** `ABBAGE`→`Cabbage`,
  under **D** `ANCE`→`Dance`, under **F** `ACE`→`Face`, under **V** `Y (n)`→`V`.
- **Drop page furniture:** page numbers, the running header `JIVE WORDS`, and **photo
  captions / epigraphs** between entries (`DICK HAYMES (Top)`, `BENNY CARTER`,
  `NOBLE SISSLE`, `ANDY KIRK`) — these are not terms.
- **Fix obvious OCR garble** in defs (`eigarettd`→cigarette, `blaekjaek`→blackjack,
  `Vict.rola`→Victrola, `under¬ stand`→understand). When a token is too mangled to
  recover confidently, keep the best-guess headword rather than invent a new word
  (`Comte`, `Unleash "to hand"`). Semantic-fit corrections are OK (`NOBBOX`→`Nodbox`,
  bedroom = where you nod/sleep).
- **Parenthetical pos markers** (`(n)`, `(v)`, `(adj)`, `(adv)`, `(inter)`, `(n. pi.)`)
  are the source's pos, often OCR-mangled (`(odj)`, `(». pi.)`, `in)` for `(n)`). Map:
  `inter`→`exclamation.`; otherwise apply the `pos` rules above.

## Headword & definition casing

- **Headword:** capitalize first letter only, lowercase the rest (`Cake eater`,
  `Scratch sheet`). Keep all-caps abbreviations verbatim (`B.T.O.`, `S.T.O.`, `G.B.`, `V`).
  Multi-word headwords stay multi-word with `kind: "word"` unless told they're phrases.
- **Definition:** keep the source wording **verbatim**, only lowercase the **first
  character** and ensure a trailing `.`. Internal proper nouns stay capped (`North`,
  `Camel`, `French horn`, `Victrola`, `West Indian`, `Tarzan`).
- When reclassifying a source `adv.`/`n. pl.`, change **only the pos**, not the def text
  (`Ready` → `adj.` but def stays `"perfectly."`; `Cattle` → `n.` def `"girls."`).
- **Money amounts:** spell out and hyphenate (`$1 bill`→`one-dollar bill.`,
  `$10`→`ten-dollar bill.`, `$100`→`one-hundred-dollar bill.`).
- **`(also X)` / `(or X)` after a def** → `syn: ["X"]` (`Superman` def `"your fellow."`,
  `syn: ["Tarzan"]`). A bare `See X` def → `def: "see X."` (renders the cross-ref italic).

## Workflow tip

Author/clean data with a **one-shot Node script** (parse → normalize → re-serialize → write
back into the file), not by hand and not with fragile render-time regex. Keep the runtime
renderer dumb: it just reads the structured fields. The build is watched: editing
`page/.../data/<dict>.json` triggers `shtatic` to regenerate the `docs/` copy automatically.
