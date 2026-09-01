# jononj.love

Site de Jon Onj — HTML, CSS et JavaScript statiques, hébergés sur GitHub Pages.
Reconstruction fidèle du site Webflow d'origine, sans Webflow.

---

## 1. Modifier le contenu

**Tout ce qui change souvent est dans un seul fichier : [`content.js`](content.js).**

Dates de concerts, liens BUY/LISTEN, adresses e-mail, réseaux sociaux, vidéo
YouTube, textes du formulaire. Le fichier est commenté ligne par ligne.

Depuis GitHub, sans rien installer :

1. Ouvrir `content.js` dans le dépôt
2. Cliquer sur le crayon ✏️ en haut à droite
3. Modifier, puis **Commit changes**
4. Le site est à jour en ~1 minute

### Ajouter une date de concert

Copier un bloc existant dans `tour:` et l'adapter :

```js
{
  date: "14/06/26",
  venue: "Le Molotov",
  city: "Marseille",
  note: "Entrée gratuite",
  link: "",              // URL de billetterie, ou "" si aucune
  linkText: "",          // texte cliquable, ou ""
},
```

Les dates s'affichent dans l'ordre du fichier. Pour en retirer une, supprimer le
bloc entier, de `{` à `},`.

### Changer l'affiche de tournée

1. Déposer la nouvelle image dans `assets/img/` (carrée, ~1200×1200)
2. Dans `content.js`, mettre son nom de fichier dans `tourPoster.file`
   (sans extension si c'est un `.webp`, sinon voir le point 5 ci-dessous)

---

## 2. Aperçu en local

```bash
python3 -m http.server 4173
```

Puis ouvrir http://localhost:4173

---

## 3. Structure

```
index.html      structure de la page (rarement modifiée)
content.js      >>> LE CONTENU — c'est ici qu'on travaille
styles.css      mise en forme
main.js         assemblage de la page + formulaire (rarement modifié)
assets/
  img/          images du site, en WebP
  font/         Druk Wide Bold (sous-ensemble WOFF2)
  originals/    fichiers sources non compressés — À CONSERVER
  og-image.jpg  vignette affichée quand on partage le lien
404.html        redirige vers l'accueil
```

`assets/originals/` contient les fichiers d'origine récupérés depuis Webflow.
**Ne pas les supprimer** : une fois l'abonnement Webflow résilié, ils ne sont
plus récupérables ailleurs.

---

## 4. Newsletter (Mailchimp) — à finir de brancher

Le formulaire est prêt mais **pas encore relié**. Tant que les identifiants sont
vides, il bascule sur un simple e-mail : le site n'est jamais cassé.

Pour l'activer, remplir la section `mailchimp` de `content.js` :

> Mailchimp → **Audience** → **Signup forms** → **Embedded forms** → *Continue*
>
> Dans le code affiché, repérer la ligne `<form action="…">` :
>
> ```
> https://jononj.us21.list-manage.com/subscribe/post?u=a1b2c3&id=d4e5f6&f_id=00abc
>          ^^^^^^ ^^^^                                  ^^^^^^    ^^^^^^      ^^^^^
>          account  dc                                    u         id        f_id
> ```

```js
mailchimp: {
  account: "jononj",
  dc:      "us21",
  u:       "a1b2c3",
  id:      "d4e5f6",
  f_id:    "00abc",
  fallbackEmail: "jononjmusic@gmail.com",
},
```

L'inscription se fait alors sans quitter la page, avec les mêmes messages de
confirmation qu'avant.

> ⚠️ **Avant de résilier Webflow** : exporter les adresses déjà collectées.
> Webflow → *Site settings* → **Forms** → export CSV. Elles sont perdues à la
> résiliation.

---

## 5. Ajouter ou remplacer une image

Les images du site sont en WebP (bien plus léger). Pour convertir :

```bash
cwebp -q 85 mon-image.jpg -o assets/img/mon-image.webp
```

Déposer aussi l'original dans `assets/originals/`. Si le fichier n'est pas un
WebP, remplacer `src`/`srcset` de l'image concernée dans `index.html`.

---

## 6. Mise en ligne

Le site est publié automatiquement par GitHub Pages à chaque `git push` sur
`main`. Aucune commande de build.

### Basculer le domaine jononj.love vers GitHub Pages

Aujourd'hui `jononj.love` et `www.jononj.love` pointent encore sur Webflow
(`CNAME → cdn.webflow.com`). Une fois le site vérifié sur l'URL github.io :

**a. Déclarer le domaine dans le dépôt**

```bash
echo "www.jononj.love" > CNAME && git add CNAME && git commit -m "Domaine personnalisé" && git push
```

**b. Chez le registrar du domaine**, remplacer les enregistrements Webflow par :

| Type  | Nom   | Valeur                  |
|-------|-------|-------------------------|
| A     | `@`   | `185.199.108.153`       |
| A     | `@`   | `185.199.109.153`       |
| A     | `@`   | `185.199.110.153`       |
| A     | `@`   | `185.199.111.153`       |
| CNAME | `www` | `<compte>.github.io.`   |

**c. Dans le dépôt** : *Settings → Pages → Custom domain* → `www.jononj.love`,
puis cocher **Enforce HTTPS** (attendre que le certificat soit émis, ~15 min).

La propagation DNS prend de quelques minutes à 24 h. Le site Webflow reste en
ligne pendant ce temps : ne résilier l'abonnement qu'une fois la bascule
confirmée.

> Le site garde `www.jononj.love` comme adresse principale, comme aujourd'hui.
> Pour préférer `jononj.love` sans `www`, mettre `jononj.love` dans le fichier
> `CNAME` — GitHub redirige alors le `www` vers le domaine nu.

---

## 7. Ce qui change par rapport au site Webflow

**Identique** — vérifié par comparaison pixel à pixel sur les captures des deux
sites : hauteur de page identique (3644 px en 1440, 3507 px en 375) et écart
structurel de 0,04 % en desktop / 0,18 % en mobile, cet écart étant uniquement
le badge « Made in Webflow » qui disparaît.

**Corrigé**

- **Tablettes et petits portables.** Entre 480 px et ~1150 px de large, le site
  Webflow débordait horizontalement (302 px à 820 px de large) : le menu était
  coupé et les boutons BUY / LISTEN sortaient de l'écran. Cette tranche de
  tailles n'avait jamais reçu de mise en page. Elle en a une maintenant.
- **Poids.** ~8 Mo → ~450 Ko au premier chargement. Le fond granuleux était un
  JPEG de 3,9 Mo en 4000×4000 : c'est en réalité un bruit uniforme, remplacé par
  une tuile de 46 Ko répétée. Images en WebP, police réduite de 142 Ko à 20 Ko.
- **Partage de lien.** Le site n'avait aucune vignette : partagé sur WhatsApp ou
  Instagram, il apparaissait sans image. Il y en a une (`assets/og-image.jpg`).
- **Accessibilité.** Section active annoncée aux lecteurs d'écran, contours de
  focus au clavier, respect de « animations réduites », `lang="fr"`.

**Inchangé volontairement** — tous les textes, au caractère près. La vidéo
YouTube démarre toujours automatiquement (en sourdine, seule façon dont les
navigateurs l'autorisent).

---

## 8. Police Druk Wide

`assets/font/DrukWide-Bold.woff2` est **Druk Wide Bold, © 2014 Commercial Type**,
une police sous licence commerciale. Elle vient du site Webflow d'origine, où
elle avait été déposée.

Elle est ici réduite aux caractères latins utiles (20 Ko au lieu de 142 Ko), ce
qui limite sa réutilisation hors du site. Le dépôt étant public — condition de
GitHub Pages gratuit — le fichier y est téléchargeable, comme il l'était déjà
depuis le CDN Webflow. **À vérifier avec le détenteur de la licence** (le
créateur du site d'origine, SoopaWeb) que cet usage reste couvert.
