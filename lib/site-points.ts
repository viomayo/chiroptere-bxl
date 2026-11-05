export interface PointDef {
  numero: number
  x: number | null
  y: number | null
  commentaire: string
}

export const SITE_POINTS: Record<string, Partial<Record<string, PointDef[]>>> = {
  "CAM": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 150793.57, y: 166088.49, commentaire: `à gauche de l'embarcadère en regardant l'étang: panneau qui portait le nom du sentier (Embarcadère);
le point se situe à hauteur du 1er arbre à gauche de ce panneau, face à l'étang` },
      { numero: 2, x: 150842.84, y: 166117.73, commentaire: `poursuivre vers la gauche (sens des aiguilles d'une montre; le point suivant est situé à hauteur de la 1ère poubelle juste avant les 2 bancs` },
      { numero: 3, x: 150886.1, y: 166125.8, commentaire: `11 m après le dernier tronc à main droite; autre repère: à hauteur du dernier gros hêtre qui borde la pelouse à plusieurs mètres à gauche du chemin` },
      { numero: 4, x: 150938.1535, y: 166122.0243, commentaire: `5 m après la plaque d'égout ronde située dans la pelouse à 2 m du chemin (= 3 m après l'emplacement pour 1 mât de drapeau situé entre le chemin et la berge, peu visible)` },
      { numero: 5, x: 150977.8791, y: 166095.3036, commentaire: `1 m après le 2ème banc (+ 1 poubelle entre les 2 bancs)` },
      { numero: 6, x: 151015.09, y: 166051.59, commentaire: `1 m après la dernière la poubelle avant le bosquet (sous l'eau: une grosse buse sombre émerge légèrement de la berge)` },
      { numero: 7, x: 151030.17, y: 166011.77, commentaire: `entre 2ème et 3ème arbre le long de la berge; attention: berge pentue` },
      { numero: 8, x: 151045.25, y: 165962.29, commentaire: `à hauteur du dernier arbre (tombé, avec branches arrivant dans l'eau) côté berge avant une zone de pelouse (= ± 6 m avant le banc); attention: berge raide` },
      { numero: 9, x: 151057.7342, y: 165922.5875, commentaire: `le point suivant est situé à hauteur du croisement des chemins; attention: berge pentue` },
      { numero: 10, x: 151057.42, y: 165860.42, commentaire: `2 m avant le 3ème banc; attention: berge raide` },
      { numero: 11, x: 151052.39, y: 165809.89, commentaire: `à hauteur du banc (+ poubelle) face à une petite zone de pelouse juste après le croisement; attention: berge raide` },
      { numero: 12, x: 151035.2, y: 165763.85, commentaire: `à hauteur de la poubelle située quelques mètres avant la vaste zone de pelouse (repère sur la berge: juste avant le gros arbre -châtaigner); attention: berge raide` },
      { numero: 13, x: 150992.0163, y: 165718.7338, commentaire: `5 m avant le bout de l'étang (à prendre au sens le plus strict)` },
      { numero: 14, x: 150961.64, y: 165764.38, commentaire: `repère sur le chemin: 3ème gros tronc le long du bord droit du chemin; descendre à cette hauteur vers la berge et poursuivre vers la gauche jusqu'au repère sur la berge; attention: berge raide; repère sur la berge: tronc de hêtre avec branche de ± 18 cm de diamètre coupée à ± 1 m du sol (peu avant châtaigner); revenir sur le chemin après le point d'écoute` },
      { numero: 15, x: 150969.84, y: 165810.42, commentaire: `à hauteur de dernier arbre avant une petite zone de pelouse;` },
      { numero: 16, x: 150981.1817, y: 165882.5601, commentaire: `4 m avant le 2ème gros tronc situé le long du bord droit du chemin; repère sur la berge: à hauteur de 2 gros troncs situés à <1m l'un de l'autre (marronnier et érable); revenir sur le chemin après le point d'écoute` },
      { numero: 18, x: 150930.42, y: 165935.04, commentaire: `chemin qui descend vers l'étang et vers l'arrière du chalet: arbre (hêtre) marqué en jaune: 4320 (inscription peu visible) (= dernier gros hêtre à droite en descendant le chemin); le point est situé sur la berge à hauteur de cet arbre; attention, berge raide` },
      { numero: 19, x: 150883.59, y: 165941.65, commentaire: `à hauteur de la plaque: défense de s'engager sur la glace située ± 12 mètres avant que le chemin ne remonte;` },
      { numero: 21, x: 150786.8672, y: 165920.0102, commentaire: `descendre vers la berge par la pelouse puis prendre la berge à droite (= rebrousser chemin) pendant 25 à 30 m: repère sur la berge: premier gros tronc (hêtre) qui passe juste au-dessus de la berge et se divise en 2 à ± 4 m de haut;` },
      { numero: 22, x: 150732.6092, y: 165925.3126, commentaire: `le point est situé à hauteur du panneau défense de s'engager sur la glace (+ poubelle de l'autre côté du chemin) avant le 1er banc;` },
      { numero: 23, x: 150690.71, y: 165947.74, commentaire: `juste après le petit canal vers les faux rochers;` },
      { numero: 24, x: 150662.93, y: 165988.22, commentaire: `face à la poubelle; repère visible uniquement sur la berge: à hauteur du coude d'une buse (au milieu de la zone de pelouse) située sous la surface de l'eau (en cas de niveau d'eau bas, la buse sort de l'eau);` },
      { numero: 25, x: 150659.045, y: 166027.4961, commentaire: `à hauteur du 1er tronc à droite après la pelouse, tronc situé à ± 3 m de la berge;` },
      { numero: 26, x: 150718.49, y: 166070.24, commentaire: `à hauteur du dernier tronc avant la pelouse, ce tronc (fin) est situé à 2 m de la berge;` },
      { numero: 27, x: 150759.24, y: 166074.47, commentaire: `à hauteur du 1er banc (placé à gauche du chemin) peu avant le 1er embarcadère;` },
    ],
    "Transect forestier (3 min)": [
      { numero: 1, x: 151099.21, y: 165385.65, commentaire: `Entrée du « sentier des myosotis » (côté Avenue de Boitsfort), à hauteur du panneau « sentier des myosotis »` },
      { numero: 2, x: 151150.51, y: 165363.52, commentaire: `À gauche : 8e arbre parmi ceux situés à moins de 2 m de la route (= ± 1 m après un monticule de terre d'environ 1 m de haut) ;` },
      { numero: 3, x: 151228.1461, y: 165370.4596, commentaire: `À droite, vous voyez d'abord : • Le 1er arbre d'une série de 3 arbres alignés en diagonale ; • Puis plus loin : à ± 40 m : un fossé de drainage à droite ; • Puis à gauche : à ± 4 m : un hêtre contre lequel ; Le point de comptage se trouve au niveau de ce hêtre ;` },
      { numero: 4, x: 151281.27, y: 165386.65, commentaire: `À environ 20 m après le banc (= à hauteur du fossé de drainage sur la gauche (= environ 5 m après la souche)) ;` },
      { numero: 5, x: 151313.45, y: 165342.4, commentaire: `Environ 5 m après le virage à gauche, au point le plus bas de la route (= à hauteur de la souche à droite après le virage), 2m avant la souche à gauche ;` },
      { numero: 6, x: 151374.5729, y: 165359.9224, commentaire: `À hauteur du panneau « sentier des myosotis » au croisement ;` },
      { numero: 7, x: 151424.1, y: 165319.26, commentaire: `Restez à droite ; après le virage à droite : 2e arbre à droite (= ± 4/5 m après le fossé de drainage sur la droite) ; Sur la Chaussée de la Hulpe : prenez à gauche ;` },
      { numero: 8, x: 151429.13, y: 165281.04, commentaire: `Le long de la Chaussée de la Hulpe : 3 m après la petite cabine électrique (= 1er arbre à gauche le long de la route) ; Traverser la route ; Prendre la Drève de Boondael ;` },
      { numero: 9, x: 151482.44, y: 165240.81, commentaire: `Entrée de la Drève de Boondael pavée ; Le point de comptage se trouve à 2/3 m après le poteau, au niveau de la barrière ;` },
      { numero: 10, x: 151489.1389, y: 165174.5895, commentaire: `70 m plus loin ; Au niveau de la 3e souche parmi les souches sur la droite` },
      { numero: 11, x: 151496.52, y: 165121.11, commentaire: `Environ 70 m plus loin : fin du carrefour avec la Drève du Maréchal ;` },
      { numero: 12, x: 151504.56, y: 165062.77, commentaire: `70 m plus loin, groupe de 3 souches sur la droite (une grosse et deux petites)` },
      { numero: 13, x: 151512.61, y: 164995.38, commentaire: `70 m plus loin, 10m avant sentier sur la droite, à hauteur d'une chandelle de 2m de haut sur la gauche ;` },
      { numero: 14, x: 151521.66, y: 164924.97, commentaire: `Au milieu du carrefour avec l'Avenue de l'Hippodrome; Continuez tout droit` },
      { numero: 15, x: 151528.7, y: 164862.61, commentaire: `Sur la gauche, vous verrez 2 tas de terre (arbres abattus par le vent) ; Le point de comptage se trouve à hauteur du 2e tas de terre, 10m avant le carrefour ; Au carrefour : prendre à droite (suivre la route principale) ;` },
      { numero: 16, x: 151489.48, y: 164820.36, commentaire: `7e arbre (<2 m de la route) à droite après le carrefour, arbre avec tronc séparé en 2 à 40cm de hauteur ;` },
      { numero: 17, x: 151446.22, y: 164769.07, commentaire: `Sur la gauche dans le virage à gauche : 1 arbre qui entoure un deuxième arbre plus fin à la base (le tronc le plus fin derrière le plus gros), 2m après béton situé à 10m sur la gauche du chemin ;` },
      { numero: 18, x: 151463.32, y: 164718.77, commentaire: `Au milieu du carrefour avec la Drève du Fort Jaco ; Continuez tout droit` },
      { numero: 19, x: 151476.4, y: 164635.29, commentaire: `À gauche, vous voyez d'abord : - 1 souche, - puis ± 15 m plus loin : 1er arbre épais à gauche, - puis ± 10 m plus loin : 2e arbre épais à gauche -> se sépare en 7 presque à la base, À hauteur de ce 2e arbre épais à gauche ;` },
      { numero: 20, x: 151500.6515, y: 164589.168, commentaire: `Presque en haut : à hauteur d'un petit sentier vers la droite` },
    ],
  },
  "CNL": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 145520.0691, y: 167780.9533, commentaire: `Point d'écoute n° 1: sur la Senne: rue Bollinckx (14), côté est de la Senne; accès via le boulevard Industriel; le point d'écoute est situé juste à gauche de la barrière métallique blanc et rouge (peu visible) le long de la berge; Après le point n°1: - prendre le boulevard Industriel vers le nord; - emprunter le boulevard Paepsem vers la gauche et traverser le pont; - dès que possible, faire demi tour et reprendre le boulevard Paepsem vers le boulevard Industriel; - traverser le pont dans l'autre sens (direction boulevard Industriel) et prendre la 1ère à droite (= immédiatement après le pont en tant que tel), avant le boulevard Industriel;` },
      { numero: 2, x: 145616.9551, y: 168202.9071, commentaire: `Point d'écoute n° 2: sur le quai de Aa, entre le pont du boulevard Paepsem (59) et le n°2J quai de Aa: le point d'écoute est situé juste en face de la rue qui descend du boulevard Paepsem, sur la berge du canal à côté des 2 panneaux directionnels réfléchissants qui indiquent la fin de la rue; Après le point d'écoute: - reprendre le boulevard Industriel vers la gauche (= vers le nord); - tacher de rejoindre rapidement la digue du canal; - à l'approche du point d'écoute suivant (1er pont), le plus facile est peut-être de garer la voiture le plus près possible du pont et de le rejoindre à pieds;` },
      { numero: 3, x: 146212.1551, y: 169043.6682, commentaire: `Point d'écoute n° 3: sur le pont de la rue de la Petite Île; le point est situé au milieu du pont, côté sud / amont (= avec le point n° 1 de face); Après le point: Poursuivre la Digue du Canal vers le nord;` },
      { numero: 4, x: 146460.7127, y: 169421.0743, commentaire: `Point d'écoute n° 4: Digue du Canal (n°8) à hauteur de l'inscription CdS (sur le mur d'entreprise). (WP 9) Après le point d'écoute: - poursuivre la Digue du Canal vers le nord; - au carrefour, prendre à droite, passer sous le pont du chemin de fer et suivre la route principale qui tourne immédiatement après le pont vers la gauche; - au carrefour: poursuivre tout droit (longer la ligne de chemin de fer) et rejoindre le canal (Quai de l'Industrie);` },
      { numero: 5, x: 146658.3802, y: 170136.433, commentaire: `Point d'écoute n° 5: le long du Quai de l'Industrie, face à la rue des Matériaux, à côté de la structure métallique inusitée qui enjambe l'eau; parking possible rue des Matériaux; Après le point d'écoute: rejoindre l'autre berge du canal (= quai de Mariemont), par le pont rue Ropsy Chaudron;` },
      { numero: 6, x: 147234.228, y: 170751.2349, commentaire: `Point d'écoute n° 6: sur le pont qui relie la rue de Manchester et la rue de Liverpool (= pont des Hospices qui relie les quais de Mariemont et de l'Industrie); le point est situé au milieu du pont, côté sud / amont (= avec le point n° 1 de face);` },
      { numero: 7, x: 148186.8076, y: 171647.4058, commentaire: `Point d'écoute n° 7: sur le 3ème pont pour voitures, celui qui relie la rue de Witte de Haelen et la rue de l'Avenir; au milieu du pont côté sud / amont (= avec le point n°1 de face); Après le point d'écoute: - s'arranger pour rejoindre le boulevard de Nieuport plus loin sur la même berge est, puis poursuivre le long du canal; - laisser les 2 ponts proches l'un de l'autre (boulevard Léopold 2) à main gauche et poursuivre sur la même berge en s'engageant sur le Quai des Péniches;` },
      { numero: 8, x: 148553.1267, y: 172230.6199, commentaire: `Point d'écoute n° 8: quai des Péniches face à un très grand bâtiment musée à main droite la fresque de Corto Maltese; le point est situé au bas de l'escalier qui descend vers l'eau; Après le point: - poursuivre le Quai des Péniches vers le nord jusqu'au prochain pont; - le plus facile est peut-être de garer la voiture peu avant le carrefour;` },
      { numero: 9, x: 148868.0, y: 172724.0, commentaire: `Point d'écoute n° 9: côté sud du bassin Vergote (amont du bassin) devant le site d'amarrage 98 D; Après le point: - prendre à gauche pour traverser le canal; - prendre à droite dans l'Avenue du Port; - dès que la rue tourne vers la droite (avenue Clasessens), chercher une place de parking;` },
      { numero: 10, x: 149315.4052, y: 173564.4012, commentaire: `Point d'écoute n° 10: petit parc sur le bord nord du bassin Vergote (monument au Travail): le point est situé au coin du bassin et de la Senne; Après le point d'écoute: - poursuivre vers le nord du même côté du canal (berge ouest) et prendre la chaussée de Vilvorde; - à hauteur du Palais Royal, garer la voiture sur un des derniers emplacements de parking à droite de la chaussée (si visible, un peu plus passé le bâtiment Metro de l'autre côté de la berge);` },
      { numero: 11, x: 149759.0, y: 174151.0, commentaire: `Point d'écoute n° 11: à hauteur du palais royal, juste après le tournant vers la droite de la route et du canal; point de repère: indication 43 C; Après le point: - poursuivre la chaussée de Vilvorde vers le nord-est; - laisser le pont Van Praet à main droite et poursuivre sur la chaussée de Vilvorde sur ± 400 m puis prendre à droite vers le port de plaisance;` },
      { numero: 12, x: 150871.7487, y: 174984.9581, commentaire: `Point d'écoute n° 12: au début du quai de Heembeek, juste après le port de plaisance (site d'amarrage 225 B); Après le point d'écoute n°12: poursuivre vers le nord, vers le bout du quai;` },
      { numero: 13, x: 151170.9215, y: 175189.3208, commentaire: `Point d'écoute n° 13: au bout du quais, le long du canal (site d'amarrage 191 B); Après le point, n° 13: - reprendre la chaussée de Vilvorde vers la droite (nord-ouest); - au bout de la ligne droite, la chaussée tourne légèrement vers la gauche puis vers la droite et à nouveau à gauche pour rejoindre le canal; - juste après ce dernier tournant à gauche, un passage pour piéton;` },
      { numero: 14, x: 151816.0, y: 175634.0, commentaire: `Point d'écoute n° 14: à hauteur du passage pour piétons situé au bout de la rue des trois Pertuis, juste après que la chaussée de Vilvorde ait rejoint le canal; Après le point: poursuivre la chaussée de Vilvorde vers le nord-ouest;` },
      { numero: 15, x: 152203.9912, y: 176141.9069, commentaire: `Point d'écoute n° 15: Sur le pont en béton (construit en 2016-2017) surplombant la route (± 700 mètres après le point 14) à hauteur des bâtiments Truck Wash / Loxam (de l'autre côté du canal: les bâtiments de la meunerie Ceres), se placer au 'mirador' sur le pont d'où on a un point de vue sur le canal. Après le point n° 15: poursuivre la chaussée de Vilvorde vers le nord-ouest sur environ 1 km;` },
      { numero: 16, x: 152738.5658, y: 177136.1249, commentaire: `Point d'écoute n° 16: pont de Buda; le point d'écoute est situé au milieu du pont, côté sud-ouest (= avec le point 1 de face), juste au-dessus du signal lumineux pour la batellerie;` },
    ],
  },
  "DAR": {
    "Transect forestier (3 min)": [
      { numero: 1, x: 154706.6508, y: 163168.428, commentaire: `1er arbre à droite de la Drève du Relais des Dames (au milieu du carrefour)` },
      { numero: 2, x: 154724.6332, y: 163219.9896, commentaire: `9e arbre à droite parmi ceux qui bordent la route. Il s'agit d'un hêtre en chandelle, avec une marque rose de 20 cm de diamètre, situé à 1 m d'un hêtre de 50 cm de diamètre ;` },
      { numero: 3, x: 154766.2325, y: 163304.4422, commentaire: `Grosse souche à droite (à 4-5 m de la route), au croisement avec le sentier équestre ;` },
      { numero: 4, x: 154779.75, y: 163354.56, commentaire: `50 m plus loin. Au milieu de la clairière sur la gauche` },
      { numero: 5, x: 154790.3724, y: 163385.3221, commentaire: `Après 50 m, un gros hêtre (avec une écorce un peu rouge) sur la gauche de la route avec un panneau GR, à environ 30 m avant une barrière en bois` },
      { numero: 6, x: 154794.24, y: 163468.6114, commentaire: `Au croisement avec la route goudronnée, rester sur la gauche. Après le croisement : 3e arbre à gauche parmi les arbres situés à moins de 5 m du bord de la route (environ 70 mètres après le point précédent)` },
      { numero: 7, x: 154790.2286, y: 163531.628, commentaire: `sur la droite, vous voyez d'abord : • 1 arbre en diagonale par rapport au point de comptage n° 6 ; • puis plus loin, toujours sur la droite : 1 gros arbre, 1 arbre fin, 1 gros arbre, 1 arbre fin, 1 groupe d'érables, 1 souche située à environ 3 m de la route ; Point d'écoute situé à hauteur de la dernière souche mentionnée ;` },
      { numero: 8, x: 154777.064, y: 163584.9423, commentaire: `2e arbre à gauche, il s'agit d'un saule situé à côté d'une petite dépression (anciennement une mare) ;` },
      { numero: 9, x: 154768.9679, y: 163635.2825, commentaire: `1er gros arbre (hêtre) à droite, 2e hêtre à 50cm à environ 50 cm de la route, après une souche ;` },
      { numero: 10, x: 154764.5406, y: 163708.0276, commentaire: `1er arbre à droite (chêne, à 4-5 m du bord de la route) après le croisement avec le sentier équestre sur la gauche ;` },
      { numero: 11, x: 154761.0955, y: 163745.9584, commentaire: `2e arbre à gauche, près du bord de la route ;` },
      { numero: 12, x: 154776.7434, y: 163799.6405, commentaire: `1er arbre à droite (hêtre) situé au bord de la route ; (= juste avant le sentier des muguets) ;` },
      { numero: 13, x: 154776.8501, y: 163857.5913, commentaire: `2e arbre à gauche situé au bord de la route ; arbre avant la souche (= dernier arbre avant le Chemin du Moulin) ;` },
      { numero: 14, x: 154788.7719, y: 163893.123, commentaire: `Souche, 2m après piquet « Drève du Comte de Flandres »` },
      { numero: 15, x: 154792.7062, y: 163941.2282, commentaire: `1er arbre à gauche après un petit pont en pierre très bas, parmi les arbres situés à environ 5 m du bord de la route ;` },
      { numero: 16, x: 154806.101, y: 163995.4021, commentaire: `Dernier arbre à droite avant petit pont en pierre` },
      { numero: 17, x: 154815.8713, y: 164086.4081, commentaire: `Gros arbre à droite parmi les arbres situés à environ 3 m du bord de la route ; Hêtre à droite en face d'un hêtre à gauche` },
      { numero: 18, x: 154829.9572, y: 164189.6517, commentaire: `1er gros arbre à gauche parmi les arbres situés à moins de 2 m du bord de la route ;` },
      { numero: 19, x: 154838.1696, y: 164251.6362, commentaire: `Grosse motte de terre surélevée provenant d'un arbre tombé sur le côté gauche ;` },
      { numero: 20, x: 154856.492, y: 164337.1011, commentaire: `Après le 3e arbre à droite (1 petit groupe d'arbres, espacés de moins de 1 m, compte ici pour 1 arbre) après le sentier équestre, entre une vieille souche envahie par la végétation (à environ 4 m de la route, côté droit) et un sureau isolé (à 10 m de la route, côté droit). Au niveau du saule tombé.` },
    ],
  },
  "DPD": {
    "Transect forestier (3 min)": [
      { numero: 1, x: 155398.0165, y: 165252.2466, commentaire: `Croisement entre le chemin de Diependelle et la Drève du Relais des Dames ; prendre le chemin de Diependelle : Point d'écoute n° 1 : Croisement le chemin de Diependelle et la Drève du Relais des Dames, du côté ouest de la chaussée de la Drève du Relais des Dames ;` },
      { numero: 2, x: 155356.2183, y: 165244.9745, commentaire: `4e hêtre sur la droite après gros chêne (à environ 15m du chêne);` },
      { numero: 3, x: 155306.4519, y: 165239.4076, commentaire: `1er gros arbre à gauche, en face d'un tas de bûche, 5m avant un chemin sur la droite;` },
      { numero: 4, x: 155266.9194, y: 165233.5291, commentaire: `2e arbre à gauche après la petite clairière sur la gauche ;` },
      { numero: 5, x: 155158.9593, y: 165203.4621, commentaire: `Au point le plus bas de la route (croisement) : À hauteur de l'arbre situé à droite, juste en face de l'entrée du ponceau sur la droite ;` },
      { numero: 6, x: 155114.1556, y: 165189.0529, commentaire: `1ère souche à gauche, parmi les arbres situés à moins de 2 m du bord de la route ;` },
      { numero: 7, x: 155065.2471, y: 165183.2482, commentaire: `8e arbre à gauche, parmi les arbres situés à environ 1 m du bord de la route (juste avant une souche) ; dans la montée, 5m avant 1er hêtre sur la droite` },
      { numero: 8, x: 154994.7999, y: 165173.3741, commentaire: `Dernier arbre à gauche avant le carrefour (Drève du Comte de Flandre) ; C gravé dessus` },
      { numero: 9, x: 154949.623, y: 165172.4409, commentaire: `2ème souche sur la droite après le carrefou;` },
      { numero: 10, x: 154907.9954, y: 165154.5159, commentaire: `60 m plus loin : arbre à gauche avec, à 1,5 m de hauteur, une bande blanche autour du tronc ;` },
      { numero: 11, x: 154869.5398, y: 165148.1705, commentaire: `6e arbre à gauche parmi ceux situés à moins d'un mètre du bord de la route (= 1 m avant l'arbre avec la bande blanche) ;` },
      { numero: 12, x: 154819.2506, y: 165148.0623, commentaire: `50 mètres (à mesurer à pas à partir du point de comptage n° 11). 5m avanr arbre marqué de « 3 », +/- 30m après grosse chandelle sur la gauche` },
      { numero: 13, x: 154748.5795, y: 165136.2811, commentaire: `Au croisement avec la piste cyclable et le cours d'eau (à sec)` },
      { numero: 14, x: 154664.1971, y: 165124.8197, commentaire: `1er arbre plus gros (diamètre 20 cm, portant le n° « 6 ») à gauche, un peu après une grosse souche à gauche (qui ressemble un peu à un monticule de sable) ;` },
      { numero: 15, x: 154619.9286, y: 165124.6428, commentaire: `3e arbre gros à gauche parmi les arbres qui se trouvent au bord de la route ; juste avant un autre arbre + fin` },
      { numero: 16, x: 154570.9609, y: 165115.9118, commentaire: `À mi-chemin de la clairière à droite, en face d'une souche à gauche` },
      { numero: 17, x: 154501.0263, y: 165097.6775, commentaire: `1ère souche à gauche de la route après les bancs et la table sur la droite` },
      { numero: 18, x: 154440.7178, y: 165095.5026, commentaire: `3e arbre à gauche, au croisement avec la piste cyclable` },
      { numero: 19, x: 154394.9494, y: 165090.0354, commentaire: `2e arbre (chêne ?) à droite parmi les arbres qui bordent la route ;` },
      { numero: 20, x: 154351.3772, y: 165080.3646, commentaire: `± 13 m après le 1er arbre à gauche de la route (= au milieu du carrefour)` },
    ],
  },
  "INF": {
    "Transect forestier (3 min)": [
      { numero: 1, x: 152656.7494, y: 163114.2695, commentaire: `Départ : intersection entre la Drève de l'Infante et la Drève Saint-Hubert. Suivre la Drève de l'Infante vers le nord. Point d'écoute n° 1 : 1er arbre à droite, à l'angle de l'intersection ;` },
      { numero: 2, x: 152631.3148, y: 163162.2066, commentaire: `50 m plus loin (= sur la droite : 1er arbre fin après une grosse souche envahie par la végétation), après deux bosquets de noisetiers ;` },
      { numero: 3, x: 152608.6355, y: 163187.553, commentaire: `50 m plus loin, à hauteur de la 2e rigole de drainage à droite (bossage dans la chaussée) = 2 à 3 m après le dernier arbre (fin)` },
      { numero: 4, x: 152575.4231, y: 163241.3665, commentaire: `50 m plus loin (= 1ere souche épaisse à droite après la clairière, à côté d'une autre souche)` },
      { numero: 5, x: 152537.7175, y: 163292.1615, commentaire: `50 m plus loin (= 4e arbre à gauche après les jeunes arbres plantés, avec marque orange dans le bas du tronc) ;` },
      { numero: 6, x: 152505.7308, y: 163341.3953, commentaire: `50 m plus loin (= 9e arbre à gauche après le chemin forestier vers la gauche arrière (coupe-feu ; très difficile à voir)) ; c'est environ 8 m avant le début de la chaussée surélevée. 1er arbre juste après le tournant ;` },
      { numero: 7, x: 152468.5823, y: 163388.7561, commentaire: `50 m plus loin (= 2e gros arbre à gauche, dans la descente) ;` },
      { numero: 8, x: 152463.6657, y: 163426.4066, commentaire: `40 m plus loin (= dernier arbre à gauche avant le croisement) ; Au croisement, prenez à gauche` },
      { numero: 9, x: 152433.8948, y: 163367.1292, commentaire: `Environ 100 m plus loin (soit ± 80 m (- loin) après la barrière d'accès) ; 2 m avant le (deuxième) arbre portant un balisage blanc et rouge (itinéraire GR) (le rouge a presque disparu) ; soit environ 7 m après le petit pont en bois, 2m avant arbre sur la droite avec « H » gravé ;` },
      { numero: 10, x: 152394.1934, y: 163295.9124, commentaire: `50 m plus loin ; à hauteur d'une souche à droite, 6 m avant le deuxième petit pont (buse)` },
      { numero: 11, x: 152379.0, y: 163243.0, commentaire: `50 m plus loin ; troisième dernier arbre (hêtre avant la fin de la rangée d'arbres à droite de la route ;` },
      { numero: 12, x: 152345.0, y: 163208.28, commentaire: `50 m plus loin (= après le petit pont : arbre à droite avec une marque rouge et blanche (= itinéraire GR) ; = 5 m avant le croisement avec le sentier vers la gauche) ; Continuez sur le sentier de droite` },
      { numero: 13, x: 152305.38, y: 163176.5, commentaire: `50 m plus loin (= arbre entre la route et le ruisseau, encore avant le premier petit pont (en bois), sur le côté gauche) ; Continuez tout droit` },
      { numero: 14, x: 152270.4866, y: 163136.3943, commentaire: `50 m plus loin (= après 2 petits ponts) ;; c'est 5 m après un arbre avec une double bande blanche sur le côté droit du sentier ;` },
      { numero: 15, x: 152235.45, y: 163101.69, commentaire: `50 m plus loin (= chêne sur la droite, à 3 m de la route) ;` },
      { numero: 16, x: 152198.86, y: 163067.35, commentaire: `50 m plus loin (= arbre fin sur la droite de la route, juste après un tronc tombé et juste avant une pente raide avec 2 poteaux) ;` },
      { numero: 17, x: 152156.98, y: 163044.58, commentaire: `50 m plus loin ; gros hêtre qui enjambe le sentier (= à hauteur du virage), 5m avant tronc couché traversant le sentier ;` },
      { numero: 18, x: 152110.7209, y: 163006.2079, commentaire: `50 m plus loin ; 4 m après le gros hêtre (= sur la droite de la route, tronc court d'environ 1 m de haut) ;` },
      { numero: 19, x: 152062.8592, y: 162980.3815, commentaire: `50 m plus loin (= chêne sur le côté gauche de la route, le long du ruisseau) ;` },
      { numero: 20, x: 152004.7033, y: 162971.6938, commentaire: `50 m plus loin (= 2e hêtre sur le côté gauche de la route ; gros hêtre à double tronc) ;` },
    ],
  },
  "LAA": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 145036.84, y: 175124.24, commentaire: `Point d'écoute n°1: côté sud-ouest de l'étang principal, sous l'escalier;` },
      { numero: 2, x: 145066.18, y: 175158.86, commentaire: `Point d'écoute n°2: sur le petit pont à l'est de l'étang principal;` },
    ],
    "Transect forestier (3 min)": [
      { numero: 0, x: 145261.81, y: 175147.34, commentaire: `Entrée par la large voie qui monte à droite après le parking au bout de l’Avenue du Laerbeek.
Prendre le large chemin qui passe à droite à côté du chalet.
Passez le kiosque et la barrière et suivez le chemin jusqu'à la première intersection (route venant en diagonale depuis la gauche).` },
      { numero: 1, x: 145252.08, y: 175196.55, commentaire: `Le point est situé ± 5 mètres avant cette intersection, à hauteur d'un tronc d'arbre.
Une rondelle de gros tronc d’arbre est au sol derrière l’arbre.` },
      { numero: 2, x: 145242.36, y: 175245.19, commentaire: `Allez tout droit et suivez l'avenue principale.
Le point est situé au bout de la table de pique-nique à gauche du chemin. Autre repère : ± 6 mètres devant un tronc d'arbre portant 2 bandes (blanche et rouge) (sentier de randonnée).` },
      { numero: 3, x: 145232.63, y: 175293.84, commentaire: `Passez devant un arbre sur la gauche avant la clôture (avec deux bandes - blanche et rouge).
Le point se situe ± 2 m plus loin, à la hauteur du 1er arbre à droite, après cet arbre à gauche.` },
      { numero: 4, x: 145223.47, y: 175342.48, commentaire: `Comptez 2 arbres à gauche devant la clôture, puis :
un épais tronc d'arbre à droite de la route.
Le point est situé 2 mètres après l’épais tronc d’arbre à droite de la route.` },
      { numero: 5, x: 145197.72, y: 175380.25, commentaire: `Continuer jusqu'au panneau à droite de la route, juste avant la sortie vers les potagers.
A 2 mètres devant le panneau, à droite : une vieille souche.
Le point est à la hauteur de la souche, au niveau du piquet balise avec un triangle rouge.` },
      { numero: 6, x: 145149.65, y: 175388.26, commentaire: `Tourner à gauche au carrefour (ignorer le ravin).
Comptez les arbres du côté droit de la route.
Le point est situé 2 mètres après le 2ème gros rondin à droite au bout du chemin. Autre repère : ± 12 mètres après le tronc à gauche.` },
      { numero: 7, x: 145101.58, y: 175388.83, commentaire: `A droite : un tronc très épais (vieux hêtre).
Le point est située 9 mètres au-delà de ce tronc très épais (= à hauteur d'un tronc mince à gauche, à deux mètres de la route). A la hauteur d’un arbre en chablis coupé, à droite à 15m` },
      { numero: 8, x: 145052.94, y: 175399.7, commentaire: `A droite de la route : tronc d'arbre avec un point de peinture verte.
La pointe est située à ± 2/3 m devant ce tronc.` },
      { numero: 9, x: 145002.58, y: 175403.14, commentaire: `A gauche, devant la clôture, un tronc de hêtre très épais derrière. Plus loin sur un deuxième tronc très épais, à gauche de la route.
Le point se situe au 9ème tronc d'arbre à gauche devant la clôture, devant ce 2ème tronc épais.` },
      { numero: 10, x: 144953.94, y: 175399.7, commentaire: `Passez devant le tronc épais sur la gauche, puis :
ancienne souche à gauche ± 10 mètres plus loin, puis :
2ème ancienne souche ± 15 mètres plus loin à gauche, puis :
à droite, 1 malle au bord de la route.
Le point est situé à 3/4 mètres derrière ce tronc sur le côté droit. Autre repère : 2 mètres avant des buissons (noisetiers) à gauche de la route.` },
      { numero: 11, x: 144904.15, y: 175390.55, commentaire: `2 mètres avant une vieille souche sur la droite de la route et 5m après une grosse souche à gauche.` },
      { numero: 12, x: 144886.98, y: 175351.06, commentaire: `Comptez les souches au bord du chemin à droite.
1 à 1/2 mètres du point 11, puis :
1 à ± 15 mètres, puis :
1 à ± 23 mètres.
15 mètres plus loin : 1 tronc d'arbre à droite.
4 mètres plus loin : un petit tronc coupé le long de la cloture à gauche.
Le point est située à la hauteur de ce petit tronc coupé.` },
      { numero: 13, x: 144878.97, y: 175301.27, commentaire: `Au milieu du carrefour, face à la berge de l'autre côté du carrefour.` },
      { numero: 14, x: 144871.53, y: 175251.49, commentaire: `Prendre le large chemin qui descend à gauche de la route où se trouvent les points précédents (ne pas emprunter la route qui descend du côté de la berge).
Passer une 1ère bosse au milieu de la route (avant l'évacuation des eaux).
Le point est situé au niveau du 1er arbre (érable) à droite après la bosse. Autre repère : ± 6 / 7 mètres avant l'épais tronc d'arbre à gauche de la route).
Au niveau du panneau Bruxelles-Envrionnement-Réserve naturelle (petit).` },
      { numero: 15, x: 144861.23, y: 175200.56, commentaire: `Un monticule de terre couvert de ronce et une grande souche à gauche de la route, juste après un tronc d'arbre, puis :
± 11 mètres plus loin, à droite de la route, un petit morceau de souche coupé en diagonale.
Le point est situé à la hauteur de ce morceau de souche.` },
      { numero: 16, x: 144878.4, y: 175154.78, commentaire: `Une petite bosse au milieu de la route (pour écoulement des eaux), puis :
une clôture à droite de la route.
Le point est situé 2 mètres au-delà du panneau BIM à droite de la route, 1 mètre derrière la clôture (à hauteur d'un tronc d'arbre à gauche de la route).` },
      { numero: 17, x: 144881, y: 175157, commentaire: `± 11 mètres après l'épais tronc d'arbre (frêne) à gauche de la route. 20m avant un panneau “attention” rouge.` },
      { numero: 18, x: 144928.19, y: 175066.08, commentaire: `Longer plusieurs troncs d'arbres sur le côté gauche de la route, avant la clôture.
La clôture à gauche de la route s’éloigne légèrement de la route.
Le point est situé à ± 6 mètres au-delà de l'épais tronc d'arbre à gauche de la route et de la barrière en bois au milieu du chemin, avant la clôture, après que la clôture s'est éloignée de la route.` },
      { numero: 19, x: 144955.65, y: 175024.87, commentaire: `Continuez tout droit à l'intersection.
Après l'intersection, comptez les arbres devant la clôture à droite :
1 x 2 tiges fines côte à côte, puis :
1 tronc assez fin devant un autre tronc plus épais à 2 mètres de la clôture.
Le point est à 6 mètres. Autre repère : 2 troncs d'arbres (érable et saule) à droite du chemin.` },
      { numero: 20, x: 144984.27, y: 174984.24, commentaire: `Le point est 30 pieds avant les planches qui maintiennent la terre ensemble sur le côté gauche de la route. Autre repère : un mince tronc d'arbre à droite et une zone plus humide à droite. 20m avant un panneau “attention” rouge en métal.
 Bois de Dieleghem` },
    ],
  },
  "MAL": {
    "Transect forestier (3 min)": [
      { numero: 1, x: 154902.0187, y: 170298.2655, commentaire: `Avec l'avenue de Woluwe dans le dos : 2 m avant la plaque d'égout, sur le côté gauche de la large route, un peu avant le plan du parc Malou` },
      { numero: 2, x: 154945.242, y: 170270.9378, commentaire: `À hauteur du dernier arbre avant le premier lampadaire, sur la gauche (banc derrière l'arbre) ;` },
      { numero: 3, x: 154980.836, y: 170249.7999, commentaire: `2 m après le premier lampadaire (après le lampadaire mentionné pour le point de repère n° 2) sur la gauche ;` },
      { numero: 4, x: 155038.0873, y: 170227.9218, commentaire: `10 m après le lampadaire sur la gauche, à hauteur d'un petit chemin sur la gauche ;` },
      { numero: 5, x: 155075.9833, y: 170212.7277, commentaire: `Grille d'égout au milieu de la route, à hauteur platane avec banc derrière sur la gauche ;` },
      { numero: 6, x: 155125.5133, y: 170202.6914, commentaire: `Derrière les poteaux qui arrêtent les voitures : 4 m après le lampadaire, sur le côté droit de la route ; Tournez à droite` },
      { numero: 7, x: 155136.4401, y: 170152.5364, commentaire: `Début de la route pavée sur la droite, à côté du lampadaire à gauche (n° 110) situé au début de la zone de stationnement, après l'entrée de la plaine de jeu ;` },
      { numero: 8, x: 155098.1334, y: 170139.9265, commentaire: `1er arbre après le lampadaire n° 109 (+ poubelle) sur le côté droit de la route ;` },
      { numero: 9, x: 155042.3776, y: 170122.7284, commentaire: `2e arbre (+ 1 souche) après le 1er lampadaire sur le côté droit de la route (= dernier arbre avant le lampadaire n° 105) ;` },
      { numero: 10, x: 154991.7285, y: 170106.0282, commentaire: `À l'entrée de la cour : 1 m après le coin de la rue pavée, sur le côté gauche de la route ; Traverser la cour et prendre à droite le long du bâtiment ; Après quelques mètres, prendre la route à gauche.` },
      { numero: 11, x: 154948.497, y: 170092.4206, commentaire: `À hauteur de la poubelle sur la droite de la petite route (= avant le virage à droite vers le parking) ;` },
      { numero: 12, x: 154915.7223, y: 170063.2835, commentaire: `Lampadaire situé juste à la sortie du parking ; Ne pas prendre la route à droite et continuer tout droit ; Au prochain croisement (avec le poteau d'éclairage en bois carré de couleur marron), prendre la route à droite.` },
      { numero: 13, x: 154874.0905, y: 170040.03, commentaire: `10 m après le carrefour, à hauteur de l'érable su la gauche après lampadaire carré ; Au carrefour suivant, prendre à gauche` },
      { numero: 14, x: 154835.2863, y: 170022.8978, commentaire: `6 m après le poteau d'éclairage en bois carré et rectangulaire de couleur marron du carrefour (laissez le poteau d'éclairage en bois carré sur votre droite) ;` },
      { numero: 15, x: 154812.3919, y: 169979.4983, commentaire: `2 m après la  située sur la gauche ;` },
      { numero: 16, x: 154776.9818, y: 169925.8567, commentaire: `Traverser la rue ; Juste après le trottoir, entre le poteau d'éclairage carré en bois brun et le poteau vert « Woluwevallei » avec des flèches ;` },
      { numero: 17, x: 154748.33, y: 169881.692, commentaire: `Prendre le petit chemin à droite vers le pont en bois carré au-dessus des roseaux et du ruisseau ; Le point est situé à l'extrémité du pont en bois carré ; Retour sur la route et continuer vers la droite.` },
      { numero: 18, x: 154739.8171, y: 169843.9087, commentaire: `3e arbre sur la droite après le pont ;` },
      { numero: 19, x: 154734.7242, y: 169783.9324, commentaire: `1ère poubelle sur le côté gauche de la route, juste devant le banc ;` },
      { numero: 20, x: 154728.9889, y: 169739.4347, commentaire: `1er grand arbre (saule) d'un petit groupe d'arbres après la pelouse sur le côté droit de la route ; (= 6 m avant la cabine électrique basse)` },
    ],
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154859.08, y: 170098.42, commentaire: `Accès: accès par le boulevard de la Woluwe;

le point de départ est situé à proximité de l'extrémité sud de l'étang, sur le pont d'arrivée de la Woluwe;` },
      { numero: 2, x: 154857.06, y: 170146.43, commentaire: `à hauteur du 1er passage pour piétons du boulevard de la Woluwe; un peu + que 15 mètres avant le 1er massif d’aubépines` },
      { numero: 3, x: 154871.81, y: 170194.44, commentaire: `passer le large escalier en pierre (3 marches);
le point d'écoute a lieu à hauteur du 2ème buisson (aubépine sp.) après l'escalier;` },
      { numero: 4, x: 154885.69, y: 170242.45, commentaire: `± 7 m après le coin en angle obtus de l'étang, à hauteur du premier tronc d'arbre à gauche du chemin (5 mètres avant un banc);` },
      { numero: 5, x: 154927.34, y: 170244.19, commentaire: `passer le pont au nord de l'étang;
le point est situé 1 m après le 1er arbre situé à gauche du chemin (= ± 5 m après le pont nord);` },
      { numero: 6, x: 154936.6, y: 170196.17, commentaire: `Le point d’écoute a lieu là où un nouveau chemin venant de la gauche rejoint le chemin de ronde autour de l’étang (présence d’un bloc en béton avec des vis).` },
      { numero: 7, x: 154915.48, y: 170157.42, commentaire: `Passer un banc, le point a lieu au niveau du 2e avaloir dans la rigole, (en face des branchages morts sortant de l’eau)` },
      { numero: 8, x: 154891.19, y: 170116.06, commentaire: `Struybeek;
rejoindre la large drève qui part du boulevard à proximité du lion;
prendre cette drève vers la gauche;
à hauteur d'un point lumineux (ceux avec une boule ronde, le 2ème en venant du boulevard), un sentier part à gauche dans la végétation (passer le tronc mort en travers du sentier);
le point est situé au bout du sentier, au bord de l'eau (sous les buissons);
Attention aux détritus` },
      { numero: 9, x: 154950, y: 170294, commentaire: `revenir sur la large drève et prendre à droite;
juste avant l'entrée de la Woluwe dans le marais (plaque en béton), un sentier part vers la droite;
quelques mètres plus loin, prendre à gauche au premier carrefour, et poursuivre 10 mètres jusqu’au bout de la petite péninsule,
le point d'écoute a lieu au bout de cette péninsule, contre la berge;` },
      { numero: 10, x: 154935, y: 170360, commentaire: `revenir sur ses pas puis reprendre la drève à droite;
prendre à droite le chemin qui longe toute la vallée de la Woluwe;
Le chemin traverse une grande prairie ; au niveau de la poubelle et d’un poteau métallique, tourner à droite et pénétrer dans la pelouse, entrer dans le bois entre passant entre le premier et le deuxième grand peuplier, suivre une trace sur 10 mètres jusqu’au bord de l’eau ; le point se trouve sur la berge face à l’eau.` },
    ],
  },
  "MDJ": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 146095.16, y: 174547.41, commentaire: `sur la plateforme au sommet du bâtiment, face au marais;` },
      { numero: 2, x: 145912.89, y: 174501.55, commentaire: `à la pointe ouest du site: Dellemoeras (attention à l'état du caillebotis qui y mène); le point est situé au bout du ponton;` },
      { numero: 3, x: 145978.51, y: 174479.33, commentaire: `revenir sur ses pas et prendre le premier sentier à droite; le sentier quitte le caillebotis puis, quelques mètres plus loin, entame un tournant à 45° vers la gauche; le point d'écoute est situé au milieu de ce tournant vers la gauche; arbre mort couché au sol.` },
      { numero: 4, x: 146048.36, y: 174480.92, commentaire: `poursuivre le sentier vers le nord-ouest; sur le côté droit du chemin, à hauteur d'un groupe de 3 troncs coupés à quelques dizaines de cm de hauteur; grand bois mort au sol ; derrière un arbre couvert de vigne.` },
      { numero: 5, x: 146110.8, y: 174490.44, commentaire: `poursuivre le sentier vers le nord-ouest; laisser un sentier à main gauche; peu après, un autre carrefour avec un sentier vers la droite; le point d'écoute est situé au carrefour avec le sentier qui part à main droite; plaque d'égout.` },
      { numero: 6, x: 146189.64, y: 174502.61, commentaire: `prendre le sentier à droite qui descend vers le sud, c'est-à-dire vers la voie de chemin de fer; le sentier passe dans un épais bouquet d'arbres avant de déboucher dans une clairière qui borde la voie de chemin de fer; le point d'écoute est situé 15 m après la sortie dans la clairière, dans l'axe du chemin, à proximité du piézomètre; à coté du bouleau isolé à l'entrée de la clairière` },
      { numero: 7, x: 146231.45, y: 174547.59, commentaire: `étang central, extrémité sud de la partie circulaire du point d'eau (présence de roseaux en bonne saison, mais tant pis);` },
      { numero: 8, x: 146124.03, y: 174430.11, commentaire: `extrémité est de l'étang central: sur le caillebotis qui surplombe l'eau, peu avant que l'eau ne disparaissent sous l'avenue de l'Exposition;` },
    ],
  },
  "MRK": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 151774.69, y: 174557.45, commentaire: `Accès au point d'écoute n° 1: au bout de la rue Carli, traverser le ruisseau et suivre vers la droite le sentier qui longe le Moeraske par le nord. Laisser le premier pylône à haute tension à main gauche, puis un buisson toujours à main gauche. Le sentier tourne ensuite à droite. Juste après la fin de ce tournant vers la droite, prendre la trouée dans la rangée de sureaux à main droite. Point d'écoute n° 1: au bout de la trouée, au bas de la berge, à droite d'un bouquet de gros arbres;` },
      { numero: 2, x: 151699.28, y: 174558.78, commentaire: `rejoindre le sentier et revenir sur ses pas; laisser le buisson à main droite; quelques mètres plus loin, à main gauche, entre le pylône et le buisson chemin à gauche qui rejoint l'eau; attention, la descente peut être glissante; le point d'écoute se déroule au bas de la berge, au bord de l'eau.` },
      { numero: 3, x: 151610.64, y: 174522.4, commentaire: `Point d'écoute n° 3: rejoindre la rue Carli; avant la première construction à main gauche, un terre-plein herbeux domine la roselière; le point d'écoute se déroule à l'extrémité de la petite zone herbeuse face à la roselière; Le point est inaccessible (ronce et orties, rester sur le trottoir) Se diriger vers le parc Walckiers: juste avant de traverser le ruisseau, prendre le chemin vers la gauche et longer les potagers; l'entrée du parc est située tout au bout du chemin par une grille fermée par un cadenas; une fois le cadenas ouvert, tirer la grille avec un peu de force; refermer porte et cadenas derrière soi;` },
      { numero: 4, x: 151396.68, y: 174406.57, commentaire: `prendre la 2ème à gauche juste avant la clairière et s'engager sur le petit sentier (sentier peu visible) qui monte; en haut, le sentier tourne brusquement vers la droite, redescend brusquement puis, quelques mètres plus loin, débouche dans le haut d'une clairière qui s'étend à main droite (à main gauche: la clôture grillagée du site); le point d'écoute a lieu sur le sentier, au milieu de la clairière;` },
      { numero: 5, x: 151348.51, y: 174407.14, commentaire: `poursuivre le sentier qui traverse la clairière et remonte en sous-bois; un peu plus loin, le sentier descend vers la droite dans une trouée; quelques mètres plus loin, prendre à gauche et passer sous faux rocher (obélisque au sommet); le point d'écoute a lieu ±6 m après le faux rocher, sur une ancienne dalle en hauteur;` },
      { numero: 6, x: 151323.9, y: 174374.6, commentaire: `Revenir à l'entrée des faux rochers, prendre le sentier et au 1er gros arbre à main gauche, prendre à 90° à gauche en hors sentier jusqu'à la butte; bois mort couvert de lierre au sol.` },
      { numero: 7, x: 151320.33, y: 174423.42, commentaire: `Revenir sur le sentier, contourner le monument en pierre en restant sur le sentier, laisser 2 sentiers à main droite, le point est au niveau du carrefour (13m après la sortie de cavité) ;` },
      { numero: 8, x: 151283.02, y: 174444.05, commentaire: `Prendre à gauche au carrefour, continuer jusqu'à un arbre pourri couché (+- 30m après le carrefour), derrière l'arbre il y a un panneau de signalisation, le point se fait au niveau de la plaque d'égout, situé juste derrière l'arbre pourri` },
      { numero: 9, x: 151357.63, y: 174459.53, commentaire: `Revenir sur ses pats, passer devant le point 7, aller tout droit jusqu'à la grande clairière, passer à main droite un 1er tas d'arbres, s'arrêter à un gros arbre à main gauche. Sur l'arbre, un nichoir numéro 2205 ; au pied de l'arbre une plaque en taule. C'est le site du dernier point d'écoute;` },
    ],
  },
  "NEE": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 143399.4415, y: 168472.9198, commentaire: `sur le talus herbeux, juste à gauche du pont en béton, face à l'étang;` },
      { numero: 2, x: 143370.0556, y: 168427.3849, commentaire: `laisser le panneau et le banc situé juste après le point est situé 3 m avant le banc suivant; (passer la 1ère table)` },
      { numero: 3, x: 143349.21, y: 168397.95, commentaire: `À la fin de la 2e table;` },
      { numero: 4, x: 143290.2095, y: 168371.8439, commentaire: `tout au début du tournant du chemin vers la gauche: petit espace entre les arbres le long de la berge;` },
      { numero: 5, x: 143258.9636, y: 168372.4734, commentaire: `11 m après le 1er banc (= 10 m avant arbre -aulne sp.);` },
      { numero: 6, x: 143202.2262, y: 168361.7902, commentaire: `15 m après le banc (= juste au début du tournant vers la gauche);` },
      { numero: 7, x: 143156.39, y: 168336.28, commentaire: `4 m avant le 1er banc;` },
      { numero: 8, x: 143124.64, y: 168310.97, commentaire: `juste avant le 1er bouquet d'arbres d'une longue série d'arbres (aulnes sp.) qui poussent le long de la berge;` },
      { numero: 9, x: 143072.18, y: 168271.86, commentaire: `juste avant un bouquet de 5 troncs d'arbres -aulnes sp.- qui marquent la fin d'une courte zone herbeuse sans arbres le long de la berge (= ± 20 m avant le tournant). En face du début de la palissade située sur la gauche du chemin;` },
      { numero: 10, x: 143050.5735, y: 168308.4493, commentaire: `9 m après le dernier bouquet d'arbres (saule sp.) le long de la berge;` },
      { numero: 11, x: 143035.82, y: 168358.37, commentaire: `poubelle juste après l'escalier;` },
      { numero: 13, x: 143000.85, y: 168452.71, commentaire: `point de repère à gauche du chemin: après le tournant vers la gauche, un bâtiment forme le coin entre le chemin qui longe l'étang et la rue de Neerpede; le point d'écoute est situé 4 m avant l'extrémité arrière du bâtiment en brique;` },
      { numero: 14, x: 142999.93, y: 168508.39, commentaire: `point de repère: de l'autre côté de la rue, longue grille, après la première habitation, 2 accès pour les voitures situés à une dizaine de mètres l'un de l'autre; le point d'écoute est situé, côté étang, mais à hauteur de la poubelle située juste avant le 2ème accès pour voitures;` },
      { numero: 15, x: 143045.95, y: 168524.04, commentaire: `juste après le pont en béton, contre la clôture;` },
      { numero: 16, x: 143089.6501, y: 168502.3173, commentaire: `contre la berge, à la fin de la palissade; (= 5ème arbre à droite du chemin);` },
      { numero: 17, x: 143129.183, y: 168465.0194, commentaire: `10m avant le gros saule noté « 13487 »;` },
      { numero: 18, x: 143174.34, y: 168434.76, commentaire: `1m après la poubelle placée à gauche du chemin, à hauteur du noyer poussant sur la berge, avec inscription « 13473 » ;` },
      { numero: 19, x: 143206.09, y: 168453.63, commentaire: `à hauteur du 4ème arbre planté à droite le long du chemin après le point précédent (ne pas compter les arbres qui poussent le long de la berge), avec insciption « 13466 »;` },
      { numero: 20, x: 143241.2468, y: 168497.8446, commentaire: `à hauteur du 5ème arbre avec inscription « 13455 » (la souche d'arbre coupé comprise) planté à droite le long du chemin après le point précédent (ne pas compter les arbres qui poussent le long de la berge), 5m après le banc ;` },
      { numero: 21, x: 143274.1354, y: 168535.1932, commentaire: `à hauteur du 5ème arbre planté à droite le long du chemin après le point précédent, avec insciption « 13440 » (ne pas compter les arbres qui poussent le long de la berge), après le banc;` },
      { numero: 22, x: 143327.553, y: 168564.7668, commentaire: `à hauteur du 7ème arbre planté à droite le long du chemin après le point précédent (ne pas compter les arbres qui poussent le long de la berge), (autre point de repère : arbre entre le panneau informatif QR Code et le panneau indication nœuds de vélo (73, 72, 88));` },
      { numero: 23, x: 143362.55, y: 168530.48, commentaire: `3 m après le 3ème arbre planté à droite le long du chemin après le point précédent (ne pas compter les arbres qui poussent le long de la berge); (= début du banc situé à gauche du chemin)` },
    ],
  },
  "POE": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 145952.74, y: 174748.81, commentaire: `dans le coin sud-ouest de l'étang (= le coin le plus proche de l'entrée);` },
      { numero: 2, x: 145937.98, y: 174790.59, commentaire: `1 m après la 10ème emplacement pour les pêcheurs (= carrés de planches au bord de l'eau); (= 3 m avant urinoir (plaque métallique tordue en forme de U situé sur le bord gauche de la berge)` },
      { numero: 3, x: 145947.0, y: 174841.2, commentaire: `autre partie de l'étang, 2 m après la cabane des pêcheurs;` },
      { numero: 4, x: 145936.95, y: 174850.99, commentaire: `quitter l'étang par le sentier à gauche après la cabane des pêcheurs (quelques marches) et passer la porte; le point d'écoute est situé 10 mètres après la porte.` },
      { numero: 5, x: 145907.58, y: 174890.94, commentaire: `sur la rive une petite souche cassé dans le dos un gros hêtre (point 7);` },
      { numero: 6, x: 145899.11, y: 174926.93, commentaire: `juste après le tournant en épingle à cheveux du sentier vers la gauche, peu après le début de la montée;` },
      { numero: 7, x: 145892.23, y: 174896.24, commentaire: `à hauteur d'un gros hêtre à tronc unique situé à proximité du sentier à gauche dans la montée; il faut d'abord laisser à main gauche un autre tronc (diamètre moyen) qui se divise en 2 à très faible hauteur; Poursuivre le chemin qui se transforme brusquement en sentier étroit` },
      { numero: 8, x: 145892.76, y: 174835.12, commentaire: `à hauteur des nichoir n° 3 et 9 (visible sur le côté gauche du nichoir) placé à gauche du sentier, là où ce sentier étroit tourne à droite à angle droit;` },
      { numero: 9, x: 145844.87, y: 174845.96, commentaire: `après le nichoir suivant, à hauteur du 1er tronc tombé sur le sentier et coupé pour permettre le passage;` },
      { numero: 10, x: 145818.15, y: 174867.66, commentaire: `à hauteur du nichoir n° 6 situé à gauche du chemin à 1,5 m de haut;` },
      { numero: 11, x: 145807.3, y: 174904.97, commentaire: `plusieurs mètres à gauche sentier: une très large grille (jadis, passage potentiel de véhicules) dans la clôture; le point d'écoute est situé sur le sentier à hauteur de la fin de la grille;` },
      { numero: 12, x: 145819.47, y: 174962.91, commentaire: `le point d'écoute est situé à hauteur d'un couple d'arbres dont 1 des troncs est orné d'un tronc de lierre; (= 10 m avant le nichoir placé à droite du sentier)` },
      { numero: 13, x: 145849.63, y: 174991.22, commentaire: `± 15 m après un tronc situé à droite du sentier, tronc avec tronc de lierre qui se divise en 2 à ±1,5 m de haut: le point d'écoute est situé à hauteur d'un 1 tronc situé à droite du sentier, tronc muni dans le bas de 2 troncs de lierre se divisant rapidement;` },
      { numero: 14, x: 145881.38, y: 175014.77, commentaire: `Point d'écoute n° 14: ±10 m après tournant vers la gauche à proximité de l'école; (à hauteur du nichoir) ; hauteur de l'arbre étêté. Revenir sur ses pas et sortir par l'étang. Pour le retour, ne pas rater le tournant en épingle à cheveux vers la droite (au Point d'écoute n°6): si vous passez au-dessus d'un fin tronc en travers du chemin avec, à droite un nichoir (marqué n°11 à l'avant du nichoir), il faut rebrousser chemin sur quelques mètres et descendre alors vers la gauche pour rejoindre l'étang; en quittant, il est demandé de refermer le loquet à l'arrière (en haut à gauche) de la porte intérieure et de ne pas oublier de refermer la porte extérieure à l'aide du cadenas.` },
    ],
    "Transect forestier (3 min)": [
      { numero: 0, x: 145596.74, y: 174580.67, commentaire: `Accès via L’Avenue de l’Exposition.
Au feu, emprunter la Promenade Verte jusqu'au marais de Jette.
Ignorez le marais de Jette. La route tourne à droite et traverse les buissons. Continuez jusqu'à la première intersection.` },
      { numero: 1, x: 145642.39, y: 174602.41, commentaire: `La route mène à une intersection. Deux routes partent à droite.
Le point est situé au milieu de l'intersection.` },
      { numero: 2, x: 145688.77, y: 174621.25, commentaire: `Dos à la voie ferrée, prendre la route en face qui monte à droite et tourne légèrement (ne pas prendre la route droite à gauche qui débouche sur une route pavée).
Un peu plus loin se trouve le portail d'entrée du pré, à gauche de la route.
Comptez les arbres du côté gauche devant la clôture depuis la clôture, sans compter les troncs fins.
La pointe se situe au niveau du 9ème tronc (sans compter les troncs fins). Autre repère : en face un groupe d'arbustes (noisetiers) qui pousse sur le versant de la route à droite. Dernier repère : ± 21 mètres au-delà de la clôture.` },
      { numero: 3, x: 145736.6, y: 174638.64, commentaire: `La route tourne à gauche, puis à droite.
Dans le virage à droite : le portail d'entrée du pré à gauche et à droite.
Le point est situé à ± 4 mètres devant la clôture.` },
      { numero: 4, x: 145782.97, y: 174656.03, commentaire: `Continuer.
A l'intersection (une route qui vient en diagonale depuis la gauche) : continuer tout droit.
Passez devant 2 portes opposées, une de chaque côté de la route. Depuis le portail de droite, comptez les arbres à droite de la route.
Le point se situe au niveau du 3ième tronc (sans compter les 2 troncs fins), avec un arbre à l’étiquette 2155. Autre repère : tronc juste devant un Houx.` },
      { numero: 5, x: 145829.35, y: 174674.15, commentaire: `La route tourne à gauche.
Le point est à 2 mètres au-delà du virage. Autre repère : 2 mètres après un morceau de fermeture parallèle lâche sur la gauche de la route.` },
      { numero: 6, x: 145876.45, y: 174692.26, commentaire: `Au carrefour suivant, continuez tout droit sur la route qui monte (entrée du Poelbos Communal). Marche d’escalier faite par des racines.
Le point est situé à ± 5 mètres derrière l'intersection. Autre repère : 1 mètre avant le tronc épais (robinier) à droite de la route, devant la clôture.` },
      { numero: 7, x: 145922.83, y: 174713.28, commentaire: `La route traverse un passage étroit, puis tourne légèrement à droite puis à gauche.
La route tourne à nouveau légèrement à gauche, puis descend rapidement une colline.
Le point est situé 2 mètres avant le début de la colline. Autre repère : ± 5 mètres après un gros tronc dans le virage du côté droit de la route.` },
      { numero: 8, x: 145953.99, y: 174742.99, commentaire: `À partir du point 7, comptez les arbres du côté droit du chemin, avant la clôture (côté chemin).
Le point se situe 5 mètres au-delà du 3ème (mince) tronc (érable). Autre repère : ce 3ème (mince) tronc (érable) passe juste devant un gros tronc derrière la clôture à droite de la route.` },
      { numero: 9, x: 145990.22, y: 174768.35, commentaire: `La route traverse un passage étroit puis s'élargit (accès à l'étang de Poelbos).
Restez du côté droit de la route.
La clôture autour de l'étang forme un angle et longe à nouveau la route sur la gauche.
Le point est situé à ± 5 mètres au-delà du coin de la clôture. Autre repère : entre le 2ème et le 3ème poteau métallique de la clôture. 2m après passage d’évacuation d’eau sous la route.` },
      { numero: 10, x: 146023.56, y: 174803.86, commentaire: `Continuez le long de la route en passant devant la clôture.
Plus loin, la clôture forme un angle vers la gauche (et quitte le bord de la route).
Le point est situé à ce coin.` },
      { numero: 11, x: 146068.49, y: 174785.02, commentaire: `Le point suivant est 50 m plus loin (= 50 grandes foulées comptent).
Suivre la route tout droit (le long de la clôture à droite), et plus loin ne pas prendre le chemin à droite fermé, mais continuer tout droit. Vous dépassez un érable à 3 troncs épais sur votre gauche, avec un sentier raide à gauche peu après. Le point 11 est situé 5m au-delà de ce chemin.` },
      { numero: 12, x: 146106.89, y: 174759.66, commentaire: `Plus loin, longez un chemin court mais large qui descend jusqu'à l'aire de jeux (escalier).
Continuer environ 20 mètres après un autre passage qui descend fortement vers la gauche, en direction de l'aire de jeux, barré par un arbre en oblique.
Le point est situé 1/2 mètre au-delà de ce dernier passage vers l'aire de jeux. Autre repère : ± 6 / 7 mètres devant un tronc d'arbre à gauche de la route, qui se trouve lui-même à ± 3 mètres devant une poubelle à gauche de la route.

Attention : les points 13 à 16 d'origine ne sont plus accessibles. Ceux-ci ont été remplacés en 2017 par les nouveaux points 21 à 24. Cependant, en 2020, les points 21 à 23 n'étaient également plus accessibles, 3 nouveaux points ont été désignés (25 à 27). Par conséquent, veuillez noter : copiez la numérotation correcte des points ci-dessous sur votre formulaire de transect !` },
      { numero: 17, x: 146135.16, y: 174576.32, commentaire: `Revenez vers la clôture et la gouttière. Peu après, il y a un arbre (assez fin) avec une marque rouge et blanche sur le côté droit de la route. Continuez tout droit.
Le point est situé 5 mètres avant un groupe de 3 troncs épais à droite de la route, un des troncs porte également un marquage rouge-blanc.` },
      { numero: 18, x: 146087.33, y: 174562.55, commentaire: `Continuer.
A l'intersection, prendre la route à droite qui descend vers le marais de Jette.
Le point est situé à ± 6 mètres au-delà de l'ancienne serre. Autre repère : 2 mètres avant un tronc d'arbre (cerisier) sur la droite de la route.` },
      { numero: 19, x: 146039.5, y: 174549.51, commentaire: `Continuer.
Traversez le pont et tournez à droite au carrefour.
La pointe se situe au niveau du 1er arbre à droite du chemin (aulne noir). Autre repère : ± 7 mètres devant le poteau d'éclairage.` },
      { numero: 20, x: 145990.22, y: 174537.19, commentaire: `Passez devant 2 lampadaires puis comptez les arbres à droite du ruisseau :
le point est située au niveau du 3ème arbre à droite du ruisseau. Autre repère : ± 17 / 18 mètres au-delà du 2ème poteau d'éclairage (= ± entre les 2 poteaux d'éclairage).
 Moeras de Ganshoren` },
      { numero: 24, x: 145962, y: 174524, commentaire: `Suivez le chemin plus loin. Après environ 120 m, il y a une clôture en béton sur la gauche de la route et une gouttière traverse le chemin en diagonale. Reculez ensuite un peu : le point 24 est 20m avant la clôture et le caniveau.` },
      { numero: 25, x: 145872, y: 174613, commentaire: `Faites demi-tour, revenez sur vos pas puis continuez à suivre le chemin. Revenez au carrefour suivant (depuis l'entrée de Poelbos ; c'était entre les points 5 et 6). Là, suivez la route à gauche. Le point se situe environ 70 m plus loin, à la prochaine intersection.` },
      { numero: 26, x: 145968, y: 174625, commentaire: `Tourner à gauche et suivre le chemin qui longe la lisière de la forêt. Ce chemin continue tout droit pendant un long moment et, à un certain moment, il fait un virage à gauche. Le point est situé dans ce virage.` },
      { numero: 27, x: 146073, y: 174645, commentaire: `Continuez le chemin. Après un certain temps, vous trouverez un banc sur la gauche, 2 m devant une planche au-dessus d'un ruisseau. La pointe est située à la hauteur de ce banc.` },
    ],
  },
  "RB1": {
    "Plan d'eau (2 min)": [
      { numero: 101, x: 147056.93, y: 174771.35, commentaire: `au bout ouest de l'étang, à prendre au sens le plus strict (côté parc Roi Baudouin phase 2 et chaussée de Wemmel);` },
      { numero: 102, x: 147099.26, y: 174798.6, commentaire: `côté nord de l'étang, juste passé l'îlot central;` },
      { numero: 103, x: 147145.56, y: 174783.79, commentaire: `extrémité est la plus extrême de l'étang, au niveau du ponton à canard;` },
      { numero: 104, x: 147102.97, y: 174757.06, commentaire: `côté sud de l'étang, entre les 2 gros arbres, face à l'îlot;` },
    ],
    "Transect forestier (3 min)": [
      { numero: 1, x: 146879.74, y: 174617.57, commentaire: `Entrée par le Steenweg sur Jette, entre les numéros 307 et 289.
Le premier point est situé à environ 140 mètres après l'entrée.

Marchez jusqu'aux rochers dans une pelouse du côté droit de la route.
± 10 mètres plus loin, intersection avec un chemin venant de la droite.
Le point est au début de ce chemin venant de la droite.` },
      { numero: 2, x: 146945.78, y: 174689.77, commentaire: `Traversez le large chemin par lequel vous êtes arrivé et suivez la route qui longe le pré et tourne à droite.
Le point est situé 2 mètres avant le 2ème poteau d'éclairage à droite de la route, quelques mètres avant un banc du côté gauche de la route. Autre repère : juste après le 4ème arbre à droite après la fin du carrefour précédent.` },
      { numero: 3, x: 146973.52, y: 174729.39, commentaire: `Au carrefour, marchez à droite.
Le point se situe au niveau du 2ème arbre à droite après l'intersection, quelques mètres avant un lampadaire. Autre repère : quelques mètres avant un banc à gauche de la route.` },
      { numero: 4, x: 146941.82, y: 174746.12, commentaire: `Continuez votre marche, puis empruntez le chemin pavé qui part à gauche et mène à la fontaine.
Avant la fontaine, tournez à droite et montez les escaliers.
Le point est situé en haut des escaliers, à l'intersection avec l'avenue pavée bordée d'arbres (peupliers).` },
      { numero: 5, x: 146905.27, y: 174774.3, commentaire: `Prendre à gauche le Kasaidreef bordé de peupliers jusqu'à l'intersection.
Le point est situé au milieu de l'intersection.` },
      { numero: 6, x: 146908.8, y: 174824.93, commentaire: `A l'intersection, tourner à droite, puis immédiatement tout droit encore à gauche et traverser les buissons (ne pas prendre les routes qui partent à gauche et à droite).
Le chemin tourne à droite. Dans le virage se trouve un gros tronc à droite du chemin, et 2 ou 3 mètres plus loin, toujours à gauche, un houx (feuilles épaisses et souvent épineuses).
Le point est situé à hauteur du houx.` },
      { numero: 7, x: 146924, y: 174846, commentaire: `Suivre le chemin qui tourne à droite, puis encore plus à droite.
Le chemin traverse ensuite un petit "chemin creux" puis tourne à droite.
Le point se situe juste après le virage à gauche, à hauteur d'une grosse souche d'arbre (hêtre) sur le côté gauche de la route. Autre repère : un grand arbre couché à droite de la route.` },
      { numero: 8, x: 146923, y: 174898, commentaire: `Suivre la route tout droit jusqu'à un virage serré à droite.
Le point se situe à hauteur d'un épais double tronc dont l’un est coupé sur la droite de la route, juste avant le début du virage serré à droite.` },
      { numero: 9, x: 146956.79, y: 174935.44, commentaire: `Suivre la route qui mène à un canal sur la droite.
Au niveau du canal, quelques arbres poussent entre la route et le canal. Autre repère : Face aux résineux de l’autre côté du canal.` },
      { numero: 10, x: 146999.49, y: 174912.99, commentaire: `Continuer le long du canal (garder un pont à droite et continuer tout droit).
Passez devant un banc sur le côté gauche de la route.
Au prochain carrefour, prendre la route à gauche.
Le point est situé 2 mètres au-delà du début de cette route (retour à l'eau).` },
      { numero: 11, x: 147035.15, y: 174884.37, commentaire: `Suivez cette route avec l'eau derrière vous jusqu'à la prochaine intersection.
Tournez à droite à l'intersection.
Traverse le pont.
Le point se situe 1 mètre avant le 1er arbre à droite après le pont.` },
      { numero: 12, x: 147081.38, y: 174874.68, commentaire: `Continuez tout droit et comptez les lampadaires sur le côté gauche de la route.
Le point est situé 3 mètres après le 3ème poteau d'éclairage à gauche de la route.` },
      { numero: 13, x: 147118.8, y: 174841.66, commentaire: `Poursuivez tout droit. Le point se trouve 5 m avant le lampadaire du côté gauche, juste avant l’étang.` },
      { numero: 14, x: 147151.38, y: 174803.8, commentaire: `Marcher tout droit.
La route approche d'un croisement avec l'avenue pavée, bordée de peupliers.
Le point est situé 10 mètres avant l'intersection avec l'avenue pavée.` },
      { numero: 15, x: 147186.17, y: 174767.26, commentaire: `Continuez jusqu'à l'intersection.
A l'intersection, continuer tout droit jusqu'à l'intersection suivante, face au pré.
Le point est situé au milieu de cette intersection.` },
      { numero: 16, x: 147222.27, y: 174733.36, commentaire: `Prendre à gauche face au pré.
Le point est situé 5m avant la prochaine intersection. Autre repère : 1 mètre avant une plaque d'égout, 3m à droite de la route.` },
      { numero: 17, x: 147228.87, y: 174686.69, commentaire: `Aller à droite. Traverser la large route tout droit jusqu'à se retrouver derrière la haie entre les deux routes.
Le point est situé au troisième poteau lumineux à droite de la large route.` },
      { numero: 18, x: 147217.42, y: 174650.15, commentaire: `Le point se situe presque deux lampadaires (environ 50m) plus loin, dix mètres avant le deuxième lampadaire.` },
      { numero: 19, x: 147169, y: 174638.26, commentaire: `Le point est situé deux lampadaires (environ 50m) plus loin, à la hauteur de ce deuxième lampadaire.` },
      { numero: 20, x: 147119.69, y: 174628.57, commentaire: `Continuer.
Passez deux lampadaires. Le point est situé 8m après le deuxième lampadaire.

 Poelbos` },
    ],
  },
  "RB2": {
    "Plan d'eau (2 min)": [
      { numero: 201, x: 146334.61, y: 174534.02, commentaire: `au milieu du pont situé tout près de l'extrémité ouest (côté avenue de l'Exposition);` },
      { numero: 202, x: 146379.8402, y: 174551.7641, commentaire: `2 m après le 1er gros arbre (espèce exotique : Metasequoia glyptostroboides) à proximité de la rive nord;` },
      { numero: 203, x: 146416.11, y: 174557.83, commentaire: `à 1 m du buisson d'arbustes (cornouiller sp.) plantés tout contre la rive;` },
      { numero: 204, x: 146474.32, y: 174566.56, commentaire: `8 m avant l'arbre planté juste avant le pont central;` },
      { numero: 205, x: 146531.2, y: 174573.44, commentaire: `5m après lampadaire après le pont central;` },
      { numero: 206, x: 146582.0, y: 174581.91, commentaire: `début de l'élargissement qui marque la fin de l'étang, plaque d'égout à droite face à 3 plaques d'égouts sur la gauche;` },
      { numero: 207, x: 146583.32, y: 174594.61, commentaire: `à hauteur du Point d'écoute n°6 mais de l'autre côté du chemin, le long du large drain, 3 m après le poteau lumineux situé lui aussi à gauche du chemin (= un peu plus loin que le Point d'écoute n°6); Revenir vers le Point d'écoute n°1` },
      { numero: 208, x: 146540.99, y: 174584.03, commentaire: `à hauteur du 1er banc, toujours côté drain;` },
      { numero: 209, x: 146488.87, y: 174585.35, commentaire: `face au 1er pont qui traverse l'étang de l'autre côté du chemin; le point d'écoute se situe sur la berge du drain, à hauteur du poteau Natura 2000.` },
    ],
  },
  "RCL": {
    "Transect forestier (3 min)": [
      { numero: 1, x: 155365.3397, y: 166985.9379, commentaire: `Au niveau du point le plus haut du toit du Prieuré, dans la rue (voir carte) ;` },
      { numero: 2, x: 155403.499, y: 166963.5749, commentaire: `À hauteur du début de la maison sur la gauche (maison du meunier)` },
      { numero: 3, x: 155432.3163, y: 167012.0408, commentaire: `Devant le premier escalier du sentier des ronces (en face du mur du couvent Rood) ; Suivez ce sentier` },
      { numero: 4, x: 155486.5028, y: 166982.1517, commentaire: `1er arbre à gauche après le virage de la clôture (hêtre avec cœur gravé avec ME à l'intérieur) ;` },
      { numero: 5, x: 155523.4689, y: 166995.1615, commentaire: `50 m plus loin (= 1er hêtre à gauche entre 2 poteaux à droite après le chêne avec une grosse tige de lierre (banche de lierre morte mais toujours accrochée à 15m de hauteur)) ;` },
      { numero: 6, x: 155570.4305, y: 167011.5398, commentaire: `50 m plus loin, = 4e arbre (chêne) à droite, juste à côté du sentier, aven entaille et sceau de lion (attention risque d'être une souche dans 3 ans) ;` },
      { numero: 7, x: 155607.8969, y: 167016.212, commentaire: `50 m plus loin (= 1er gros hêtre (ou chêne ?) à droite, juste à côté du sentier, avec une bande blanche à l'arrière à 1 m de hauteur) ;` },
      { numero: 8, x: 155662.7445, y: 167029.5067, commentaire: `5m avant grand/gros hêtre à droite, au niveau d'un noisetier sur la gauche ; Continuez tout droit au croisement` },
      { numero: 9, x: 155711.1764, y: 167071.3459, commentaire: `50 m plus loin (= ± 15 m après le croisement : 1 x 2 hêtres à gauche) ;` },
      { numero: 10, x: 155743.8061, y: 167113.6596, commentaire: `50 m plus loin (= à gauche : juste après un petit groupe de charmes et une vieille souche : 1 arbre à ± 2 m de la route) ;` },
      { numero: 11, x: 155779.8292, y: 167151.447, commentaire: `50 m plus loin (= érable à trois troncs à droite) ;` },
      { numero: 12, x: 155811.1242, y: 167195.9963, commentaire: `50 m plus loin (= sorbier avec un chêne à droite) ;` },
      { numero: 13, x: 155826.4338, y: 167235.9209, commentaire: `50 m plus loin (= érable fin à gauche après une grosse souche à droite) ;` },
      { numero: 14, x: 155844.2171, y: 167289.4862, commentaire: `50 m plus loin (= banc au croisement) ; Tournez à droite au croisement` },
      { numero: 15, x: 155888.8464, y: 167313.8647, commentaire: `50 m plus loin (= 1er arbre (gros hêtre) à droite, juste à côté du sentier, proche d'une chandelle à droite à 10m du sentier) ;` },
      { numero: 16, x: 155940.2525, y: 167341.1319, commentaire: `Sur la droite : • 1 gros hêtre ; • ± 10 m plus loin : 1 souche ; Le point d'écoute se trouve 5 m plus loin que la souche ; aucune marque de peinture n'est apposée ;` },
      { numero: 17, x: 155984.2276, y: 167365.2509, commentaire: `50 m plus loin (= 2e arbre (hêtre) à gauche) ;` },
      { numero: 18, x: 156042.4976, y: 167397.6182, commentaire: `50 m plus loin (2e arbre à droite) ; c'est environ 15 m après une très grande motte d'arbre tombé à gauche)` },
      { numero: 19, x: 156103.3217, y: 167431.1812, commentaire: `50 m plus loin (= 2e gros arbre à droite) ; Continuez tout droit au croisement` },
      { numero: 20, x: 156140.4961, y: 167464.1413, commentaire: `50 m plus loin (= 1er arbre à droite après le croisement).` },
    ],
  },
  "SBK": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 148308.15, y: 174999.6, commentaire: `pointe sud de l'étang (= côté entrée par l'avenue Jean Sobieski).` },
      { numero: 2, x: 148301.61, y: 175055.19, commentaire: `longer l'étang par la gauche (côté rue) le point se situe entre le 2ème et le 3ème banc, à gauche du gros tronc (point de repère: 8 m après plaque d'égouts le long du sentier).` },
      { numero: 3, x: 148307.4, y: 175116.31, commentaire: `à hauteur de la poubelle au bout de l'étang.` },
    ],
  },
  "TRT": {
    "Transect forestier (3 min)": [
      { numero: 1, x: 156961.4307, y: 164432.0888, commentaire: `Garez-vous le long de la Drève de Willerieken (n° 99) après resto Barbizon, près du manège. Suivez la Drève des Loups jusqu'au premier croisement (croisement avec la piste cyclable) Point d'écoute n° 1 : Drève des Loups, au croisement avec la piste cyclable : À hauteur du poteau indicateur ADEPS (= poteau avec des panneaux indicateurs) ; Tournez à droite après le point d'écoute n° 1 ;` },
      { numero: 2, x: 157010.7492, y: 164457.3062, commentaire: `2e hêtre à droite, + gros arbre sur la droite, deux troncs à la base, point rose à 2m de hauteur ;` },
      { numero: 3, x: 157064.607, y: 164478.2013, commentaire: `Bouleau légèrement plus gros, fourchu à la base, sur la gauche, face à érable fourchu à 1,5m de hauteur sur la droite ;` },
      { numero: 4, x: 157107.3749, y: 164490.0768, commentaire: `10 m après le coupe-feu, à gauche. Au niveau arbre (chêne pédonculé) avec trait rose à 1,5 m de hauteur ;` },
      { numero: 5, x: 157165.079, y: 164508.6699, commentaire: `5m avant érable sycomore avec trait rose, face au noisetier tombé ;` },
      { numero: 6, x: 157232.1786, y: 164530.2116, commentaire: `Dernier arbre avant le poteau avec les flèches de la piste cyclable ; Prendre à gauche après le point de repère n° 6 ;` },
      { numero: 7, x: 157230.0254, y: 164565.9628, commentaire: `50 m plus loin, à hauteur d'un buisson de noisetiers à gauche` },
      { numero: 8, x: 157191.2273, y: 164639.616, commentaire: `Après environ 70 m : à gauche, un saule à trois troncs (à 1 m de la route) ;` },
      { numero: 9, x: 157176.6879, y: 164704.3893, commentaire: `Après environ 70 m : aulne avec du chèvrefeuille, à 4 m à droite de la route ;` },
      { numero: 10, x: 157144.186, y: 164771.993, commentaire: `Environ 80 m plus loin, début d'un bosquet de noisetiers à droite ;` },
      { numero: 11, x: 157122.1881, y: 164814.9759, commentaire: `Dernier arbre sur la gauche avant le croisement, avec un balisage GR rouge et blanc ; Prendre à droite ;` },
      { numero: 12, x: 157141.0771, y: 164868.4476, commentaire: `70 m plus loin, en face du pare-feu sur la gauche entre 2 bosquets de bouleaux(16e arbre à droite (y compris les troncs sciés) ; il se trouve en face du pare-feu à gauche) ;` },
      { numero: 13, x: 157177.5291, y: 164922.6184, commentaire: `70 m plus loin, 5e arbre avant la fin de l'alignement à moins de 1m de la route sur la droite (28e arbre à droite (y compris les troncs sciés) ;` },
      { numero: 14, x: 157209.344, y: 164963.5402, commentaire: `Premier groupe de noisetiers sur la droite` },
      { numero: 15, x: 157241.6249, y: 165010.0664, commentaire: `55 m plus loin, au niveau d'un groupe de 4 bouleau sur la droite, après plusieurs groupes de noisetiers;` },
      { numero: 16, x: 157270.4114, y: 165058.891, commentaire: `55 m plus loin, au milieu des noisetiers, au niveau à gauche à 10m du sentier de 2 troncs coupés à 1m de haut;` },
      { numero: 17, x: 157300.3632, y: 165103.1635, commentaire: `10 m avant le croisement ; (buissons de noisetiers peu visibles)` },
      { numero: 18, x: 157329.1335, y: 165141.9984, commentaire: `1er arbre (de plus de 30cm de diamètre) juste à côté de la route à gauche après le carrefour;` },
      { numero: 19, x: 157366.2585, y: 165195.8734, commentaire: `Juste avant l'entrée du tunnel sous le Ring ;` },
      { numero: 20, x: 157406.0151, y: 165253.2117, commentaire: `Sortie du tunnel de l'autre côté du tunnel ;` },
    ],
  },
  "VUU": {
    "Transect forestier (3 min)": [
      { numero: 1, x: 153458.416, y: 164818.7193, commentaire: `À hauteur de l'entrée du Chemin des Silex, entre les deux piliers carrés ;` },
      { numero: 2, x: 153414.4796, y: 164785.2574, commentaire: `Après le lampadaire n° 1 : 10e poteau à droite (9e car 1 est tombé), poteau juste avant poteau tombé et couché au sol ;` },
      { numero: 3, x: 153369.3338, y: 164775.3695, commentaire: `Au début du banc juste avant le lampadaire n° 3 ;` },
      { numero: 4, x: 153317.6278, y: 164755.7809, commentaire: `3 m après la porte de garage à droite ; = au niveau du coin du mur ;` },
      { numero: 5, x: 153260.4441, y: 164753.9556, commentaire: `Après le lampadaire n° 6 (= début de la cabine électrique), juste après le début de la grille` },
      { numero: 6, x: 153207.9819, y: 164731.1755, commentaire: `Après le lampadaire n° 8 : poubelle (= 1 m avant le panneau d'information BIM) ;` },
      { numero: 7, x: 153143.0802, y: 164712.2564, commentaire: `Après le lampadaire n° 9 : à hauteur du conifère à gauche, juste derrière la haie) ;` },
      { numero: 8, x: 153107.2778, y: 164717.4482, commentaire: `À hauteur de la boîte aux lettres à gauche (numéro 10 ; Ninanne) ;` },
      { numero: 9, x: 153122.0816, y: 164662.9648, commentaire: `2e lampadaire à gauche, « 5003 » sur le lampadaire ;` },
      { numero: 10, x: 153141.2627, y: 164596.1218, commentaire: `± 20 m après le lampadaire en béton à gauche (= 3 m avant la souche d'arbre sur la droite)` },
      { numero: 11, x: 153128.1618, y: 164535.1446, commentaire: `Environ 65 m plus loin, soit 30 m après le début du mur sur la droite ;` },
      { numero: 12, x: 153095.5511, y: 164498.1573, commentaire: `Début de la clôture du potager ;` },
      { numero: 13, x: 153057.868, y: 164461.5941, commentaire: `Entrée du pont ferroviaire ;` },
      { numero: 14, x: 153018.4175, y: 164429.0465, commentaire: `Juste après le croisement avec le Sentier de Vuilbeek ;` },
      { numero: 15, x: 152974.4723, y: 164393.7765, commentaire: `60 m plus loin. Arbres fins sur la droite situés avant légère ouverture sur la droite suivie d'une rangée d'arbres fins` },
      { numero: 16, x: 152941.8437, y: 164363.8464, commentaire: `10 m avant le début de la clairière sur la gauche (plus vraiment une clairière), 5m avant 3 gros hêtre, dont un en chandelle ;` },
      { numero: 17, x: 152906.0611, y: 164333.4486, commentaire: `50 m plus loin (= au milieu de la zone de jeunes arbres sur la gauche), en face d'un jeune conifère à droite du chemin ;` },
      { numero: 18, x: 152871.7005, y: 164302.6927, commentaire: `50 m plus loin (entrée de la forêt). Au niveau du 1er bouleau sur la gauche ;` },
      { numero: 19, x: 152846.6658, y: 164290.0229, commentaire: `50 m plus loin (1er gros chêne à droite) ;` },
      { numero: 20, x: 152795.4677, y: 164251.2975, commentaire: `70 m plus loin (1er gros chêne à droite)` },
    ],
  },
  "WLB": {
    "Transect forestier (3 min)": [
      { numero: 1, x: 151482.4995, y: 163097.6907, commentaire: `Croisement n° 2 entre le sentier des Deux Montagnes et le sentier équestre (près du croisement n° 2 entre le sentier des Deux Montagnes et la Drève de Lorraine) ; Prendre le sentier équestre ; Point d'écoute n° 1 : 1er arbre à droite ;` },
      { numero: 2, x: 151462.3729, y: 163158.8446, commentaire: `Au croisement avec le sentier de la Source Laineuse (arbre fin à droite) ; Prendre à droite ;` },
      { numero: 3, x: 151477.813, y: 163208.8043, commentaire: `Après la barrière, 3e arbre à droite (avant le virage à droite) ;` },
      { numero: 4, x: 151503.2165, y: 163259.8656, commentaire: `1er arbre à droite situé à 3-4 m de la route (3 m plus loin : vieille souche d'arbre tombé) ;` },
      { numero: 5, x: 151515.1427, y: 163299.3397, commentaire: `2e arbre à droite (à environ 2 m de la route) après le virage, sur le tronçon droit de la pente` },
      { numero: 6, x: 151546.6507, y: 163349.6801, commentaire: `Dernier arbre à gauche avant le petit pont, marquage blanc et rouge ; Continuez tout droit` },
      { numero: 7, x: 151590.7334, y: 163388.6484, commentaire: `1er gros hêtre à gauche, tombé en travers du ruisseau (= 2 m avant 1 poteau sur le chemin)` },
      { numero: 8, x: 151631.5265, y: 163418.6492, commentaire: `3e gros arbre à gauche le long de la route, au niveau de 2 arbres tombés en travers du ruisseau ;` },
      { numero: 9, x: 151679.4228, y: 163461.5843, commentaire: `Après le ruisseau (à sec) (point le plus bas de la route), 1 arbre à gauche puis 1 arbre à droite ; À hauteur de ce 1er arbre à droite ;` },
      { numero: 10, x: 151711.3543, y: 163483.7077, commentaire: `Petite rangée d'arbres sur le côté gauche de la route, avec 2 arbres abattus l'un à côté de l'autre : À hauteur du 1er arbre abattu de cette rangée (= 3 m avant 2 poteaux sur le chemin) ;` },
      { numero: 11, x: 151764.34, y: 163526.23, commentaire: `2e arbre dans le virage à droite ;` },
      { numero: 12, x: 151808.86, y: 163553.39, commentaire: `Gros arbre à gauche dans le virage à droite (la route descend légèrement), avec gravures « LG CC IX » ;` },
      { numero: 13, x: 151864.2, y: 163583.95, commentaire: `Après un long virage à gauche ; au niveau d'une planche en bois traversant le sentier au sol, ancien ruisseau 1er arbre à gauche ;` },
      { numero: 14, x: 151876.73, y: 163632.74, commentaire: `Après la première légère descente et le virage à droite : 1er gros arbre à droite ;` },
      { numero: 15, x: 151919.04, y: 163660.01, commentaire: `La route commence à monter ; 1er petit arbre à droite (± 10 cm de diamètre), poussant entre les racines d'un gros hêtre ;` },
      { numero: 16, x: 151949.68, y: 163699.75, commentaire: `Virage à gauche; 1er arbre sur la gauche avant de voir des racines sur la route ;` },
      { numero: 17, x: 152010.9749, y: 163732.3787, commentaire: `Au croisement, tourner à droite (chemin équestre) ; 5e arbre à droite (après une souche de racine) marquée d'un coeur et d'un # gravés (= 7e arbre après le croisement). 5m après poteau en bois indiquant le chemin équestre ;` },
      { numero: 18, x: 152055.4659, y: 163720.9541, commentaire: `Après une pente raide, un caniveau de drainage sur la gauche : 2e arbre à gauche après le caniveau ;` },
      { numero: 19, x: 152093.2937, y: 163711.2335, commentaire: `4e arbre à gauche avant le croisement (chemin équestre) ;` },
      { numero: 20, x: 152128.5623, y: 163692.8849, commentaire: `2e arbre à gauche (à 2 m de la route) après le croisement avec le chemin équestre (en face d'une vieille souche). Sur le chemin des deux montagnes. 3 arbres (érables) poussant collés ;` },
    ],
  },
  "WLR": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 144549.2692, y: 171971.8006, commentaire: `accès: entrée par la rue Kasterlinden (à côté du 81), le long du cimetière; Entrer dans le par cet descendre jusqu'au 1er carrefour Point d'écoute n° 1: au 1er carrefour de chemins (poubelle à main gauche);` },
      { numero: 2, x: 144449.7343, y: 172014.3872, commentaire: `poursuivre tout droit; le point est situé au 1er carrefour de chemins;` },
      { numero: 3, x: 144490.3558, y: 172082.6037, commentaire: `prendre vers la droite puis tout de suite après, encore vers la droite; le point est situé au 2eme carrefour de chemins peu après le chemin en gravier en pente; en face d'une échelle courbe, attention, le chemin, prolongé tout droit au-delà du carrefour, n'est pas indiqué sur la carte ci-dessus !` },
      { numero: 4, x: 144470.7605, y: 172163.6734, commentaire: `prendre à gauche; au 1er carrefour, continuer tout droit; le point d'écoute est situé au 3ème arbre (arbre qui se sépare en trois arbres à 2m) (après plusieurs rigoles en pierres qui traverse le chemin après le carrefour). À hauteur du pont de pierre au-dessus d'un petit cours d'eau;` },
      { numero: 5, x: 144536.54, y: 172125.04, commentaire: `revenir sur ses pas jusqu'au carrefour (rigole de pierres qui traverse le chemin) et prendre à main gauche; le point est situé sur le ponton qui surplombe la mare côté nord, à hauteur du 2ème piquet de balustrade après le court escalier;` },
      { numero: 6, x: 144563.3348, y: 172071.9317, commentaire: `revenir sur le sentier, et le prendre vers la gauche; au 1er carrefour, prendre à gauche; le point est situé 6m avant un passage dans la balustrade située à main gauche du chemin, devant une double échelle;` },
      { numero: 7, x: 144602.5124, y: 172066.1827, commentaire: `poursuivre le chemin; au 1er carrefour, prendre la 1ère à gauche (longer la balustrade); montez les escaliers jusqu'au ponton; le point d'écoute se déroule sur ce ponton à hauteur du banc situé à droite;` },
    ],
  },
  "WUP": {
    "Transect forestier (3 min)": [
      { numero: 1, x: 154231.1013, y: 168597.492, commentaire: `Avenue du Parc de Woluwe, à 9 m devant la poubelle située au coin de la rue (avec l'Avenue Louis-Léopold Vander Swaelmen dans le dos et les étangs sur la droite) ; Prendre le chemin à gauche.` },
      { numero: 2, x: 154197.0391, y: 168603.1764, commentaire: `2 m avant la 1ère souche à gauche (= 1 m avant la grille d'égout dans le caniveau à gauche) ;` },
      { numero: 3, x: 154145.6933, y: 168597.3579, commentaire: `À hauteur de la souche situé à environ 6 m de la route dans la pelouse (= 9 m après la grille d'égout dans le caniveau à droite après le banc et la poubelle), 10m avant arbre sur la droite ;` },
      { numero: 4, x: 154103.7567, y: 168580.9554, commentaire: `À hauteur de la poubelle située entre les deux premiers bancs, sur la gauche ;` },
      { numero: 5, x: 154056.6181, y: 168571.841, commentaire: `3 m après un deuxième arbre à droite (= gros conifère situé sur la droite à environ 3 m de la route dans la pelouse) ;` },
      { numero: 6, x: 154002.2984, y: 168573.9642, commentaire: `À environ 6-7 m après 2 bancs + poubelle, un conifère situé à gauche dans la pelouse à environ 5 m de la route : 4 m après ce conifère ; Prendre la route à droite.` },
      { numero: 7, x: 154021.7342, y: 168621.9675, commentaire: `À hauteur du premier gros tronc de conifère, situé à droite à environ 6 m de la route dans la pelouse (quelques mètres avant le banc situé à gauche de la route) ; Traverser la rue en diagonale vers la gauche et continuer à suivre le chemin.` },
      { numero: 8, x: 154002.1064, y: 168670.2536, commentaire: `Dans le caniveau (pavés) qui traverse la route ;` },
      { numero: 9, x: 153973.1008, y: 168705.1091, commentaire: `Au milieu de la route, dans le caniveau (pavés) qui traverse la route ;` },
      { numero: 10, x: 153969.9605, y: 168748.9033, commentaire: `2 m avant le carrefour ; Suivre le côté droit de la route.` },
      { numero: 11, x: 153993.8287, y: 168803.4961, commentaire: `Juste avant le croisement, à hauteur d'un petit chemin qui débouche sur la droite depuis une petite clairière ; À ce premier croisement, prendre le chemin à gauche ; Au deuxième croisement : continuer tout droit (ne pas prendre le chemin sur la droite) ;` },
      { numero: 12, x: 153987.3273, y: 168846.4779, commentaire: `± 2 à 3 m après le croisement, une première souche épaisse se trouve à gauche, à ± 2 à 3 m de la route ; Le point se trouve 4 m plus loin, à hauteur d'un érable fin sur la gauche ;` },
      { numero: 13, x: 153955.8914, y: 168892.1379, commentaire: `Sur le premier trottoir devant la rue ; Traversez et continuez tout droit` },
      { numero: 14, x: 153914.4193, y: 168931.1848, commentaire: `3 m après la grille d'égout dans le caniveau à gauche de la route (juste après le panneau « Chemin de l'étang Bémel, Bemel Vijver weg ») ; (= 3 m avant le 3e gros tronc à droite)` },
      { numero: 15, x: 153900.8962, y: 168964.0228, commentaire: `3 m après la 2e grille d'égout, dans le caniveau à droite (panneau « Règlement du parc ») ;` },
      { numero: 16, x: 153902.1657, y: 169005.6748, commentaire: `3 m après la 2e grille d'égout, dans le caniveau à droite ;` },
      { numero: 17, x: 153911.838, y: 169044.7047, commentaire: `Après la 1ère grille d'égout dans le caniveau de droite : À hauteur de la 1ère souche située à moins de 2 m de la route ; (= ± 2 m avant la grille d'égout suivante)` },
      { numero: 18, x: 153972.5282, y: 169090.006, commentaire: `À hauteur de la partie la plus basse de la route (= 5e grille d'égout dans le caniveau de droite) ;` },
      { numero: 19, x: 154019.6722, y: 169128.4196, commentaire: `3e grille d'égout après les bancs (+ poubelle) sur la droite ; Restez sur la droite` },
      { numero: 20, x: 154046.2214, y: 169156.7936, commentaire: `5 m après la 3e grille d'égout dans le caniveau de droite ; (= 2e grille d'égout dans le caniveau après le carrefour sur la gauche)` },
    ],
  },
  "BER": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154269.35, y: 167087.65, commentaire: `accès: entrée par la rue Jacques Bassem;

après l'entrée côté rue Jacques Bassem, vous verrez successivement à main gauche du chemin principal: une série de bancs, puis un canisite. Compter à partir de ce canisite les arbres qui poussent devant la clôture à gauche du chemin; un 1er arbre, ± 15 mètres le 2ème qui est un arbre à double tronc dès la base; ± 15 m plus loin se trouve le 2ème arbre, 5 mètres avant le prochain arbre. Le point est situé à hauteur de cette souche, côté droit du chemin (l'étang se trouve à droite du chemin, derrière la Woluwe), les détecteurs étant dirigés vers l'étang; autre point de repère: à hauteur du début du muret bas qui forme la berge de la Woluwe le long de la berge en face.` },
      { numero: 2, x: 154281.28, y: 167054.95, commentaire: `Le ponton est fermé, le point se fait contre la grille.` },
      { numero: 3, x: 154321.5, y: 167048.76, commentaire: `Poursuivre le chemin dans la même direction pendant une quinzaine de mètres après le ponton de bois jusqu'à un banc à droite du chemin; le point d'écoute est situé 2 m après ces bancs, en dirigeant les détecteurs vers l'étang; autre point de repère: 1 m la souche d'arbre coupée.` },
    ],
  },
  "BLA": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 156491.83, y: 165397.54, commentaire: `accès: en vélo via la forêt de Soignes: venant de Boitsfort (par le chemin de Diependelle) ou d'Auderghem (chemin de Blankedelle), prendre dans les 2 cas le sentier des Faisans qui longe un vallon herbeux; ce sentier, tout en longeant le vallon, dessine une longue courbe vers la droite; puis le sentier forme un brusque tournant vers la gauche à hauteur d'une table de pique-nique; dans ce tournant, un chemin part vers la droite et mène rapidement sur un petit pont en bois délimité par une barrière.

Point 1 (= point unique): juste avant la barrière de ce petit pont; attention: ce pont peut être très glissant s'il est humide.` },
    ],
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Vous atteignez le point 1 par le Chemin des Faisans ; à l'étang la route tourne à droite ;

Marchez, avec l'étang sur votre droite, traversez l'avenue et passez la barrière ; emprunter l'ancien chemin forestier qui monte d'abord à travers les sous-bois puis tourne progressivement à gauche et disparaît. Ne tournez pas à gauche, mais continuez simplement dans la même direction ; les marquages fluorescents sur les arbres vous conduisent au point 1. Ce point 1 est situé au niveau du 13ème arbre à droite de la route après la barrière.` },
      { numero: 2, x: null, y: null, commentaire: `Celui-ci se trouve au milieu du chemin au niveau du 4ème arbre à gauche, si vous revenez vers le Chemin des Faisans. Ici aussi, des marquages fluorescents ont été placés à cet endroit.` },
      { numero: 3, x: null, y: null, commentaire: `Le point est situé au 6ème arbre, à gauche du chemin.` },
      { numero: 4, x: null, y: null, commentaire: `Revenez sur la route, traversez l'intersection et continuez sur l'avenue qui longe le pré ;
le point est situé 7 mètres après l'intersection de l'avenue ; autre repère : 2eme à droite de la route sur le bas-côté haut (repère à 2,5/3 mètres au-dessus de l'avenue) ;` },
      { numero: 5, x: null, y: null, commentaire: `Pour ce faire, comptez 50 m. Ici, vous passez l'intersection avec la route qui tourne à droite ; le point 5 est situé à la hauteur d'une grosse souche entre le premier et le deuxième arbre à droite passé cette intersection.` },
      { numero: 6, x: null, y: null, commentaire: `Le point 6 est situé à la hauteur d'un buisson à gauche, qui se trouve au centre de la prairie.` },
      { numero: 7, x: null, y: null, commentaire: `Continuez tout droit sur 40m jusqu'au bord droit de l'avenue ; autre signe de reconnaissance : 2 arbres dont 1 à doubles troncs, à droite du chemin` },
      { numero: 8, x: null, y: null, commentaire: `Au niveau d'un hêtre isolé sur le côté gauche de la route` },
      { numero: 9, x: null, y: null, commentaire: `Plus loin, au niveau d'un petit arbre isolé (Erable)` },
      { numero: 10, x: null, y: null, commentaire: `A gauche, une souche de Pin avec un petit arbre devant, et à droite un tronc de Pin couché au sol.` },
      { numero: 11, x: null, y: null, commentaire: `Comptez les arbres du bord droit de la route jusqu'au 4ème arbre ; le point se situe au niveau d'un pin qui pousse isolé à 1 mètre à droite de l'allée` },
      { numero: 12, x: null, y: null, commentaire: `Compter les arbres pas trop fins et les souches à droite de l'avenue : d'abord 1 souche, puis 1 arbre, puis 4 souches ;
Au niveau de l'arbre qui rejette sur la souche.` },
      { numero: 13, x: null, y: null, commentaire: `Le point est situé au niveau du 2ème arbre poussant à moins de 1 mètre du bord gauche de l'avenue ; autre signe de reconnaissance : 3 mètres après un tronc épais à droite de l'avenue ; Le point est au niveau de l'arbre marqué en jaune, juste avant un vieux Platane (Tag)` },
      { numero: 14, x: null, y: null, commentaire: `Depuis le banc (et non la table !), comptez les pins sur le bord gauche de l'avenue :
	24 mètres après la poubelle : un pin ;
	± 25 mètres plus loin, un 2ème pin ;
	± 12 mètres plus loin, un 3ème pin ;
Le point est situé à la hauteur de ce 3ème pin ; autre marque d'identification : à 20 mètres, un carrefour avec un chemin sur la droite ;` },
      { numero: 15, x: null, y: null, commentaire: `Au dernier arbre à droite de l'avenue avant le point où un ruisseau coule sous l'avenue ; ± 8 mètres avant le pont ;` },
      { numero: 16, x: null, y: null, commentaire: `Tourner à droite au carrefour et continuer à suivre la vallée du ruisseau ;
le point est situé 20 à 25 mètres au-delà de l'intersection. Juste avant l'arbre à gauche avec une branche en angle droit` },
      { numero: 17, x: null, y: null, commentaire: `Tourner à droite à l'intersection (à une hauteur d'environ 4 mètres, un arbre mange lentement le panneau indiquant « Blankedelleweg ») ;
le point est situé 6 mètres au-delà du carrefour, au niveau des premières poutres supportant le bord droit de l'avenue, avant le pont de pierre ; ce point n'est PAS INDIQUÉ ;` },
      { numero: 18, x: null, y: null, commentaire: `Compter sur le côté droit 3 grands arbres juste à côté de la route, puis un hêtre sur le côté gauche de la route juste avant une zone d'ouverture sur le côté droit de la route ; le point est situé à la hauteur de ce hêtre à gauche` },
      { numero: 19, x: null, y: null, commentaire: `Le point est situé au 1er arbre (hêtre) à droite de la route` },
      { numero: 20, x: null, y: null, commentaire: `Le point est situé au 10ème arbre/souche à gauche qui est juste contre le bord de la route ; autre marque d'identification : 3 mètres avant un monticule d'une vieille souche d'arbre à droite de la route ;` },
    ],
  },
  "CDC": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 152826.01, y: 164613.51, commentaire: `accès:
soit depuis la drève des Tumuli (étang du Fer à Cheval), prendre le sentier des Endymions; laisser la prairie à main droite, puis l'étang des Enfants Noyés à main droite; poursuivre jusqu'à un petit étang à main droite sous le talus de chemin de fer;
soit depuis la drève des 2 Montagnes: en remontant cette drève depuis le domaine du Silex, laisser le potager du parc Tournay-Solvay à main droite puis passer dans un court tunnel (pont chemin de fer); quelques mètres plus loin, prendre le sentier à droite; traverser la barrière et poursuivre le sentier des Endymions en restant sur la droite au "Y"; le sentier descend assez fort et atteint l'étang dans le bas; le point 1 est situé de l'autre côté de l'étang;
soit par le clos des Chênes: au bout du clos, un sentier part entre les habitations et les jardins (le sentier démarre presque dans l'axe principal du clos, un peu à droite de celui-ci); ce sentier en forte pente mène directement au coin de la mare; le point 1 est situé à main droite.

Point d'écoute n° 1: côté ouest de l'étang (= du côté des autres étangs de la vallée): presque au bout de l'étang; un charme surplombe partiellement la surface de l'étang; deux gros charmes à gauche du chemin; le point est situé sur le chemin, les détecteurs étant dirigés vers l'étang (idem pour les autres points).` },
      { numero: 2, x: 152882.08, y: 164626.77, commentaire: `Point d'écoute n° 2: dans le coin de l'étang; autre point de repère: face au panneau Vleermuizen / Chauves-Souris - clos des Chênes.` },
      { numero: 3, x: 152890.31, y: 164592.18, commentaire: `Point d'écoute n° 3: sur le trop plein de l'étang (rangée de pierres au bord de l'étang).` },
    ],
  },
  "ENF": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 152610.04, y: 164639.48, commentaire: `accès: étang situé le long du sentier des Endymions qui relie l'étang du Fer à Cheval (= drève des Tumuli) à la drève des 2 Montagnes; attention: les pentes des berges sont parfois assez raides et peuvent être glissantes.

Point d'écoute n° 1: en venant de l'étang du Fer à Cheval, un premier accès, étroit, vers l'eau de l'étang, passer au-dessus de la clôture; le point est situé à cet endroit, au bord de l'eau.` },
      { numero: 2, x: 152668, y: 164627.4, commentaire: `Point d'écoute n° 2: continuer à longer l'étang; le point est situé au bout du second accès vers l'eau de l'étang, au bord de l'eau.` },
      { numero: 3, x: 152702.68, y: 164612.69, commentaire: `Point d'écoute n° 3: le point est situé dans le coin de l'étang (croisement entre le sentier des Endymions et la digue aval).` },
      { numero: 4, x: 152707.95, y: 164583.94, commentaire: `Point d'écoute n° 4: prendre à droite sur la digue et longer l'étang; le point est situé au milieu de la digue sur le trop plein (plaque de métal carrée au bord de l'eau).` },
      { numero: 5, x: 152701.58, y: 164553.64, commentaire: `Point d'écoute n° 5: le point est situé au coin de l'étang (croisement de la digue et du sentier du Martin-Pêcheur).` },
      { numero: 6, x: 152673.27, y: 164570.55, commentaire: `Point d'écoute n° 6: continuer à longer l'étang vers la droite; après une dizaine de mètres, des rondins soutiennent le sentier à main droite puis le sentier tourne à gauche; au début de ce tournant, quitter le sentier et prendre vers la droite dans la végétation; le point est situé à la pointe de l'avancée de terre au milieu de l'eau (dans la trouée de végétation). Attention il y a des ronces.` },
      { numero: 7, x: 152633.97, y: 164561.54, commentaire: `Point d'écoute n° 7: plus loin, le sentier descend dans un petit vallon transversal; le point est situé au milieu du court caillebotis au fond de ce vallon transversal.` },
      { numero: 8, x: 152584.58, y: 164592.06, commentaire: `Point d'écoute n° 8: plus loin, prendre le second caillebotis; au milieu de ce caillebotis, une clôture part à droite vers l'étang; quitter le caillebotis à cet endroit et longer la clôture jusqu'où c'est possible; merci d'éviter de laisser des traces trop importantes dans la végétation; le point est situé sur la berge ou à proximité immédiate dans la trouée de végétation. Attention il y a des ronces.` },
      { numero: 9, x: 152555.82, y: 164606.55, commentaire: `Point d'écoute n° 9: revenir sur le caillebotis et poursuivre vers la droite; à la fin de la clôture à main droite, des rondins soutiennent le sentier sur son côté droit le long d'une roselière; le point est situé au milieu de ce passage en rondins, les détecteurs étant dirigés vers la droite (= vers la roselière). Attention très vaseux. Après le point 9, poursuivre le sentier qui rejoint la drève des Tumuli à hauteur de l'étang du Fer à Cheval ou revenir sur ses pas pour revenir sur le sentier des Endymions.` },
    ],
  },
  "ERM": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 153019.45, y: 164254.32, commentaire: `accès: à partir du chemin des Silex, remonter la drève des 2 Montagnes et se diriger vers la forêt; juste après le court tunnel (chemin de fer), traverser la barrière et descendre le chemin à gauche (sentier du Vuylbeek); l'étang est situé à main droite du chemin en venant de la drève des 2 Montagnes; seule une partie du bord de l'étang est visitée.

Point d'écoute n° 1: au bas du sentier (venant de la drève des 2 Montagnes), le sentier tourne vers la gauche pour s'engager sur la digue séparant les 2 étangs; passer le tournant; un peu plus loin, le long de la berge à droite, un arbre plus épais (aulne) et, juste à sa gauche, un autre nettement plus fin (frêne); le point est situé 2 mètres à droite de l'aulne (arbre plus épais au bord de l'étang).` },
      { numero: 2, x: 153049.39, y: 164215.73, commentaire: `Point d'écoute n° 2: longer l'étang par la gauche (sens des aiguilles d'une montre); tourner le coin de l'étang; quelques mètres après le coin, un arbre est couché dans l'eau; le point a lieu face au tronc couché, dans la trouée de végétation.` },
      { numero: 3, x: 153020.92, y: 164192.54, commentaire: `Point d'écoute n° 3: continuer le chemin qui monte puis qui tourne à droite; une petite vingtaine de mètres après le tournant, 2 hêtres se suivent de près le long du côté droit du chemin; à hauteur de ces 2 arbres, quitter le chemin vers la droite jusqu'à la clôture; le point est situé à l'endroit de la clôture où le treillis s'arrête (à partir de cet endroit, les piquets de clôture restent sans treillis); ne pas franchir la clôture; les détecteurs sont dirigés vers l'étang.` },
    ],
  },
  "ERV": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 153078.7, y: 164234.71, commentaire: `accès: partir du chemin des Silex, remonter la drève des 2 Montagnes et se diriger vers la forêt; juste après le tunnel sous le chemin de fer, traverser la barrière et descendre le chemin à gauche (sentier du Vuylbeek); l'étang est situé à main gauche du chemin en venant de la drève des 2 Montagnes; seule une partie du bord de l'étang est visitée.

Point d'écoute n° 1: en venant de la drève des 2 Montagnes, prendre la digue qui sépare les deux étangs; au bout de la digue, juste avant le tournant vers la droite du chemin, quitter le chemin vers la gauche et traverser 2 m de végétation pour rejoindre la clôture de l'étang; le point est situé là où la clôture de l'étang rejoint une autre clôture, transversale (ne pas franchir ces clôtures).` },
      { numero: 2, x: 153030.83, y: 164268.45, commentaire: `Point d'écoute n° 2: longer l'étang par la gauche (= sens des aiguilles d'une montre); à la fin de la digue, le chemin tourne à droite; le point est situé à hauteur du tournant, juste dans le "coin" de l'étang, dans une trouée de végétation.` },
      { numero: 3, x: 153061.83, y: 164304.51, commentaire: `Point d'écoute n° 3: revenir sur le chemin et le remonter; ± 50 m plus loin, une clôture part du chemin vers la droite; longer cette clôture (à distance quand c'est nécessaire avec la présence de ronces); le point d'écoute situé au bout de cette clôture, au bord de l'étang.` },
    ],
  },
  "FER": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 152359.09, y: 164536.19, commentaire: `accès:
soit à partir de la chaussée de La Hulpe: prendre la drève des Tumuli (laisser la voiture au parking) puis à pieds;
soit à partir du chemin des Silex: prendre la drève des 2 Montagnes vers la forêt; passer sous le pont de chemin de fer puis prendre le sentier à droite (sentier des Endymions) qui longe l'étang du Clos des Chênes, puis l'étang des Enfants Noyés et finit par rejoindre la drève des Tumuli;
les berges, parfois très pentues, peuvent être glissantes; s'il le faut, rester sur le dessus de la berge.

Point d'écoute n° 1: le point est situé juste avant le pont, sur la berge de la partie droite de l'étang, dos à la drève des Tumuli.` },
      { numero: 2, x: 152301.19, y: 164549.93, commentaire: `Point d'écoute n° 2: longer l'étang vers la droite (= sens inverse des aiguilles d'une montre) sur la drève des Tumuli puis prendre le sentier du Bocq qui longe l'étang; le point d'écoute est situé ± 5 m après le poteau indiquant l'accès à la drève, entre l'arbre dans l'eau et l'arbre sur pied; attention, berge en pente; interdiction de tomber à l'eau.` },
      { numero: 3, x: 152264.28, y: 164536.83, commentaire: `Point d'écoute n° 3: plus loin, une souche empiète largement sur le sentier côté gauche; le point est situé ± 12 pas normaux après cette souche dans la trouée de végétation juste avant un arbre (charme) écorcé dans le bas tombé dans l'eau.` },
      { numero: 4, x: 152235.31, y: 164519.77, commentaire: `Point d'écoute n° 4: après l'arbre tombé dans l'eau du point 3, compter les gros arbres le long du bord droit du chemin; le point est situé à hauteur du 2ème gros arbre (chêne) sur la droite du sentier.` },
      { numero: 5, x: 152203.56, y: 164504.68, commentaire: `Point d'écoute n° 5: ± 30 m après le point d'écoute n° 4: sur la gauche du chemin (côté étang) et situé à 2 m du chemin, un tronc un peu spécial portant de nombreuses cavités allongées (charme); à cet endroit, quitter le chemin et se diriger vers l'étang pour rejoindre la berge; longer ensuite la berge sur quelques mètres vers le bout de l'étang; cette zone du bout de l'étang peut être en vasières et est couverte de végétation basse.` },
      { numero: 6, x: 152390.88, y: 164515, commentaire: `Point d'écoute n° 6: revenir sur ses pas jusqu'au point n° 1; continuer le long de la berge et laisser le pont à main droite; le point est situé sur le trop plein de l'étang, à gauche du pont en faisant face à l'étang.` },
      { numero: 7, x: 152381.76, y: 164480.48, commentaire: `Point d'écoute n° 7: longer la berge par la gauche; le point est situé juste avant le banc.` },
      { numero: 8, x: 152354.83, y: 164446.87, commentaire: `Point d'écoute n° 8: prendre le chemin qui contourne l'étang par la gauche; passer la barrière qui ferme le sentier aux cyclistes; le point est situé ± 25 pas normaux après la barrière (= 5 m après l'arbre (charme) qui pousse sur la berge), dans la trouée de végétation.` },
      { numero: 9, x: 152326.52, y: 164417.5, commentaire: `Point d'écoute n° 9: un peu plus loin, un gros tronc à droite du chemin marque le tournant du sentier vers la droite; le sentier descend; arrivé presque dans le bas, 1 grosse souche située à ± 2 m à droite du sentier; le point d'écoute est situé juste à côté de ce tronc scié à la base.` },
      { numero: 10, x: 152286.11, y: 164414.59, commentaire: `Point d'écoute n° 10: contourner le bout de l'étang (enjamber le lit d'un petit ruisseau); continuer le long de l'étang sur ± 15 m jusqu'à une trouée de végétation entre 2 arbres; c'est dans cette trouée que le point est situé.` },
    ],
  },
  "KIN": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 147561.76, y: 164264.85, commentaire: `les premiers points d'écoute sont situés dans la rue du Roseau, le long de la clôture du site; les points suivants sont situés à l'intérieur du site dans 2 zones différentes; l'extérieur du site est exceptionnellement visité dans le sens contraire des aiguilles d'une montre; attention beaucoup de ronces et végétation surtout pour les points 4 à 6.

Point d'écoute n° 1: au carrefour de l'avenue Engeland, de la chaussée Saint-Job (non indiqué) et de la rue du Roseau; le point est situé face au point d'eau, au milieu du ponton en pierres contre la balustrade.` },
      { numero: 2, x: 147576.11, y: 164221.82, commentaire: `Point d'écoute n° 2: prendre la rue du Roseau; le point est situé dans la rue du Roseau, à côté du 2ème lampadaire.` },
      { numero: 3, x: 147632, y: 164170.88, commentaire: `Point d'écoute n° 3: poursuivre le long de la rue du Roseau; l'entrée du site est située un peu plus loin, à côté d'une large grille fermée; le point est situé peu après la grille d'entrée, au milieu du caillebotis; diriger les détecteurs vers le point d'écoute n° 1.` },
      { numero: 4, x: 147662.17, y: 164212.42, commentaire: `Point d'écoute n° 4: accès: continuer le sentier vers l'intérieur du site; ± 8 m après le point d'écoute n° 3, longer le ruisseau, le point a lieu 3 m après un ensemble d'arbres; les détecteurs sont dirigés vers la droite (mare en sous-bois en clairière); sur la carte, le point est situé avec une précision relative.` },
      { numero: 5, x: 147670.08, y: 164250.01, commentaire: `Point d'écoute n° 5: retourner sur ses pas jusqu'au sentier bien marqué et prendre à gauche; 25 pas après l'arbre coupé en 2, prendre le sentier à gauche peu marqué (point de repère: souche d'un mètre de haut, avant un tronc d'arbre coupé); suivre ce sentier en tenant sa gauche; ± 30 m après ce carrefour, un jeune tronc (frêne de 10 à 15 cm de diamètre) contre le sentier marque la limite avec une clairière; le point est situé à côté de ce tronc, les détecteurs dirigés vers l'avant (clairière humide); sur la carte, le point est situé avec une précision relative.` },
      { numero: 6, x: 147717.06, y: 164241.11, commentaire: `Point d'écoute n° 6: retourner sur ses pas jusqu'au sentier bien marqué et prendre à gauche; au carrefour suivant, prendre à gauche; plus loin, juste avant un tournant à droite presque à 90° (point de repère: très gros arbre désouché à droite juste avant le tournant), pénétrer à gauche dans la végétation et se diriger vers le gros tronc; passer au-dessus d'un arbre tombé, 4 m plus loin passer de nouveau au-dessus d'un arbre tombé, et une dizaine de mètres plus loin; un ruisseau et la limite d'une clairière humide; le point d'écoute au bord de cette clairière et du ruisseau.` },
      { numero: 7, x: 147815.98, y: 164163.46, commentaire: `Point d'écoute n° 7: accès: retourner sur le chemin bien marqué et prendre à gauche; au carrefour (entrée rue Engeland), continuer tout droit sur le long caillebotis; après la seconde partie du caillebotis, poursuivre le chemin le long de la clôture jusqu'au carrefour; prendre à gauche au carrefour et longer la même clôture; ± 20 m après ce carrefour, un bouquet d'arbres (tilleul, aubépine) en plein milieu du chemin qui passe entre 2 clôtures; 2 m plus loin, un tronc isolé (érable sycomore), toujours au milieu du chemin; 14 m après ce tronc isolé: un arbre (frêne) pousse sur le chemin, côté gauche contre la clôture tombée à cet endroit; le point d'écoute est situé contre la clôture, à côté de ce frêne; sur la carte, le point est situé avec une précision relative.` },
      { numero: 8, x: 147841.7, y: 164105.1, commentaire: `Point d'écoute n° 8: accès: revenir sur ses pas; prendre à droite le chemin qui descend en longeant la clôture à main droite; prendre le 1er caillebotis; le point d'écoute est situé au 3/4 de ce caillebotis (6 m après le virage), au milieu de la clairière.` },
    ],
    "Transect forestier (3 min)": [
      { numero: 0, x: 147873.75, y: 163786.33, commentaire: `Ce transect se compose de 2 parties.
Une lampe de poche est recommandée. Il fait très sombre dans certaines parties du site.` },
      { numero: 1, x: 147917, y: 163835, commentaire: `L'entrée du site se situe légèrement en contrebas de la maison numéro 284, face à un grand portail de l'autre côté de la rue.
Traversez les buissons et longez la clôture.
Le chemin tourne à droite et contourne un ruisseau.
Le point 1 est situé juste avant le point où la route traverse le ruisseau.` },
      { numero: 2, x: 147854, y: 163830, commentaire: `Suivez le chemin et comptez les arbres à gauche.
Le 5ème arbre a un tronc épais et une racine épaisse bien visible sur la route.
Le point se situe 5 mètres au-delà de ce 5ème arbre, 1m avant un gros tronc (frêne) écroulé (chablis), celui-ci obstrue le chemin.` },
      { numero: 3, x: 147829, y: 163877, commentaire: `Continuer le long de la clôture à gauche, jusqu'à un virage serré à droite qui contourne la clôture en face de la route.
Le point est situé environ 5 mètres avant ce virage à droite, à la hauteur du dernier tronc (érable) du côté droit de la route, avant l'intersection.` },
      { numero: 4, x: 147820, y: 163929, commentaire: `Suivre la route qui part à droite, juste après le point 3.
Au carrefour suivant, restez à gauche et passez devant la clôture en bois.
La route tourne à nouveau vers la droite.
Le point est située environ 4 mètres avant ce virage, à la hauteur du dernier grand arbre (érable) avant le virage à gauche.` },
      { numero: 5, x: 147845, y: 163977, commentaire: `Longez la clôture jusqu’à la prochaine intersection.
Au prochain carrefour, tournez à droite et traversez le pont.
Passez environ 13 mètres devant le pont entre 2 arbres et continuez votre chemin. La route longe le ruisseau.
Le point est située 2 m au-delà de l'endroit où le ruisseau affleure (= environ 15 mètres au-delà des 2 arbres).` },
      { numero: 6, x: 147897, y: 163983, commentaire: `Revenez sur vos pas. Traversez le pont dans l’autre sens.
Tournez à droite à l'intersection.
Prenez le caillebotis.
Le point est situé 1 mètre au-delà de l'extrémité du platelage (= 2 m avant l'épais tronc d'arbre à droite).` },
      { numero: 7, x: 147853, y: 164028, commentaire: `Continuer tout droit (un autre plancher).
Au bout du quai, tournez à gauche (pas d'autre option).
Après environ 25 mètres, il y a un tronc devant la clôture, à droite de la route.
Le point est à 2 m au-delà de ce tronc d'arbre.` },
      { numero: 8, x: 147819, y: 164070, commentaire: `Continuez tout droit le long de la clôture.
Au bout de la clôture, à droite, il y a un caillebotis. Marcher tout droit.
Juste après cette intersection, gardez un tronc d'arbre à gauche de la route. Un peu plus loin se trouve une souche à gauche.
Juste derrière, vous verrez une autre souche, maintenant du côté droit.
La pointe est située au niveau de la dernière souche du côté droit.` },
      { numero: 9, x: 147773, y: 164097, commentaire: `Suivez le chemin principal (donc NE suivez PAS le chemin à côté de la clôture sur la gauche). Après 40 m, vous tournez à gauche au croisement en Y. Le point 9 est situé au deuxième érable épais à droite après cette intersection.` },
      { numero: 10, x: 147722, y: 164115, commentaire: `Continuer.
Tourner à gauche à la première intersection (= longer la clôture à gauche du chemin);
Peu après, la route tourne à droite.
Au carrefour, continuer tout droit (= ne pas suivre la clôture et ne pas tourner à droite dans le pré).
Le chemin tourne un peu à gauche puis à droite, et sur le côté droit il y a un chemin très difficile à voir (qui ressemble plutôt à un chemin d'animaux).
Le point se situe au niveau de ce chemin qui part à droite. Autre repère : environ 5/6 mètres après un gros tronc à 3 mètres de la route, sur la gauche.` },
      { numero: 11, x: 147679, y: 164147, commentaire: `Continuer tout droit jusqu'à la prochaine intersection (tronc très épais : platane) en face de la route.
Faites le tour de l’arbre et suivez le chemin caché derrière lui qui traverse la végétation. Au croisement en T avec un chemin plus large, tournez à gauche jusqu'à atteindre un caillebotis qui mène à la sortie (Rietstraat).
Le point est au milieu du caillebotis.` },
      { numero: 12, x: 147630, y: 164174, commentaire: `Revenez sur vos pas.
Ne reprenez pas le chemin caché, mais suivez le chemin plus large tout droit. Ce chemin tourne à gauche, puis un peu à droite.
Longer un chemin qui part à gauche et continuer tout droit.
Ignorez ensuite deux groupes de noisetiers.
Le point est située 3 à 4 mètres au-delà du deuxième groupe de noisetiers.` },
      { numero: 13, x: 147680, y: 164195, commentaire: `Continuez tout droit jusqu'à la prochaine intersection. Tournez à gauche à l'intersection. 30m plus loin se trouve un arbre écroulé (chablis) très épais (sycomore) sur le côté droit, juste avant le virage à droite et un autre encore debout sur le côté gauche.
La pointe est située à 2 m devant ce platane.` },
      { numero: 14, x: 147733, y: 164202, commentaire: `Continuez en suivant le chemin autour du platane.
Au carrefour (à gauche : sortie Englandstraat), tournez à droite.
Le chemin se termine dans une clairière.
Un grand groupe d'arbustes (saules) pousse sur la gauche avec le platane écroulé au milieu de la clairière.
Le point est située à ± 15 mètres au-delà de ces saules.` },
      { numero: 15, x: 147780, y: 164178, commentaire: `Revenez sur vos pas. A l'intersection, tourner à droite (étang un peu plus loin).
La pointe est située 3 m au-delà du 1er tronc (ne pas compter celui coupé) d'arbre épais à droite, dès le début du caillebotis` },
      { numero: 16, x: 147797, y: 164127, commentaire: `Continuez à marcher sur le pont.
Au bout du quai, la route tourne à droite, après quoi suit un nouveau quai.
Le point est située ± 6 m au-delà de l'extrémité de ce 2ème caillebotis, à la hauteur du 1er tronc d'arbre épais qui pousse derrière la clôture.

Pour atteindre la deuxième partie du transect, il vaut mieux quitter Kinsendaal et se diriger vers Englandstraat.` },
      { numero: 17, x: 147860, y: 163923, commentaire: `Revenez sur vos pas. Reprenez le quai jusqu'à la sortie vers England Street.
Tournez à droite sur le trottoir et suivez la rue.
En haut, à l'intersection, restez sur le même trottoir et continuez à droite sur England Street.
Passez la première entrée à droite et restez sur le trottoir.
Continuez jusqu'à la 2ème entrée de Kinsendaal, entourée de 2 colonnes carrées. Autre repère : de l'autre côté de la rue vous verrez les mêmes 2 colonnes carrées.
Tournez à droite dans Kinsendaal (attention : 2 marches). La route en dalles de pierre devient un chemin en terre puis un platelage.
Prenez le pont.
Le point est situé au bout du pont.` },
      { numero: 18, x: 147909, y: 163905, commentaire: `Revenez sur vos pas. Reprendre la planche dans l'autre sens et traverser le ruisseau.
Il y a une clôture en bois de chaque côté de la route.
Le point est situé au niveau du premier arbre qui pousse devant la clôture du côté droit de la route. Autre repère: le tuyau d'évacuation se termine à cette hauteur du côté gauche de la route` },
      { numero: 19, x: 147960, y: 163919, commentaire: `Suivez la route plus loin et quittez Kinsendaal.
Traversez la rue et continuez sur la route dans le Kriekenput.
La route tourne légèrement à droite puis décrit un long virage à gauche.
Le point est au bout de ce virage. Autre repère : 7 tuiles devant un tronc d'arbre, à gauche de la route.` },
      { numero: 20, x: 148009, y: 163937, commentaire: `Le chemin continue par un virage à droite, puis à gauche, puis à droite et encore à gauche.
Au bout de ce virage à gauche, un chemin part à droite.
Le point se situe au niveau de ce chemin qui part vers la droite (ne se voit quasi plus).

 Roze molen / Buysdelle` },
    ],
  },
  "MOU": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 153347.03, y: 164606.76, commentaire: `les premiers points d'écoute sont situés à l'intérieur du domaine des Silex: la berge sud (Ecole Internationale), trop pentue, n'est pas visitée; sauf mention contraire, les comptages hors du domaine des Silex se font en restant sur le chemin des Silex ou sur le trottoir de l'avenue de la Foresterie; les comptages au domaine des Silex se font le plus près possible de l'étang; attention il faut un code pour rentrer sur le site.

Point d'écoute n° 1: entrez par l'entrée privée du domaine, au coin du Chemin des Silex et de la drève des 2 Montagnes, puis rejoindre l'étang des Silex; laisser l'étang des Silex à main droite: au bout de cette berge de l'étang des Silex, passer un petit pont puis prendre directement à gauche dans la végétation; il faut traverser plusieurs mètres de végétation pour accéder à l'étang; attention aux quelques drains secs creusés dans le sol; merci de marcher en file indienne pour laisser le moins de traces possible dans la végétation; le point a lieu le plus près possible de la berge de l'étang du Moulin (rester dans le haut de la berge), à gauche de l'arbre tombé.` },
      { numero: 2, x: 153304.05, y: 164655.28, commentaire: `Point d'écoute n° 2: longer l'étang vers la gauche (dans le sens des aiguilles d'une montre); plus loin, le long de cette berge, se dresse un bouquet de troncs coupés sur pieds; nichoir en béton. Le point est situé sur le promontoire juste à droite des troncs coupés et à gauche d'un petit abri bas avec filet de camouflage.` },
      { numero: 3, x: 153277.01, y: 164693.41, commentaire: `Point d'écoute n° 3: se diriger vers l'étang du Silex; une fois sur le chemin, prendre vers la droite (vers la sortie); ce sentier longe pendant quelques dizaines de mètres une clôture basse; quand la clôture part vers la droite, quitter le chemin et longer la clôture; cette clôture s'arrête peu avant une petite maisonnette; franchir la clôture entre la spirale à insectes (un petit monticule) et l'hôtel à insectes devant la maisonnette, prendre un petit sentier (peu marqué) qui part vers la droite; longer les arbres qui sont à gauche et après quelques dizaines de mètres, on débouche au-dessus de la paroi à « Hirondelles de rivage ». Le point d'écoute se trouve à un mètre de la paroi, au milieu de sa longueur (veillez à ne pas déranger les oiseaux nicheurs de la paroi).` },
      { numero: 4, x: 153217.9, y: 164680.1, commentaire: `Point d'écoute n° 4: revenir vers l'entrée principale du domaine des Silex; après le poulailler à gauche du chemin, à droite du chemin se trouve une trouée dans la végétation. Le point se situe au niveau de cette trouée.` },
      { numero: 5, x: 153270.11, y: 164748.67, commentaire: `Point d'écoute n° 5: sortir du domaine du Silex par l'entrée privée; une fois sur le Chemin des Silex, prendre à droite pour longer l'étang; laisser l'entrée officielle du domaine des Silex à main droite et poursuivre sur la rue; une vingtaine de mètres plus loin, un passage sur la droite mène à un ponton en pierres; le point est situé sur le ponton en pierres, au bord du ponton (interdiction de tomber dans l'étang).` },
      { numero: 6, x: 153322.76, y: 164751.84, commentaire: `Point d'écoute n° 6: revenir sur le Chemin des Silex et prendre à droite; un peu plus loin sur la gauche, une haute cabine à haute tension; le point est situé en face de cette cabine à haute tension (point de repère: réverbère n° 7), trouée dans la végétation à 2 m à droite de ce point.` },
      { numero: 7, x: 153357.95, y: 164763.48, commentaire: `Point d'écoute n° 7: le point est situé à hauteur du réverbère 5 situé juste avant la grille d'entrée de la propriété privée.` },
      { numero: 8, x: 153393.75, y: 164773.77, commentaire: `Point d'écoute n° 8: le point est situé à hauteur du réverbère n° 4 situé juste après une entrée de garage.` },
      { numero: 9, x: 153428.67, y: 164790.71, commentaire: `Point d'écoute n° 9: le point est situé face à la poubelle située juste entre 2 bancs (près du réverbère n° 3); roselière dense pouvant gêner l'écoute.` },
      { numero: 10, x: 153463.6, y: 164810.29, commentaire: `Point d'écoute n° 10: le point est situé 2 m après le réverbère n° 2.` },
      { numero: 11, x: 153497.46, y: 164781.18, commentaire: `Point d'écoute n° 11: le point est situé 2 m après le réverbère n° 1.` },
      { numero: 12, x: 153512.28, y: 164756.31, commentaire: `Point d'écoute n° 12: quitter le Chemin des Silex et prendre à droite le long de la rue de la Foresterie; le point est situé rue de la Foresterie, après 3 arbres plantés sur le trottoir, à hauteur de la fin du muret qui longe le trottoir à main droite; roselière dense, une petite trouée un peu à gauche du point.` },
      { numero: 13, x: 153526.04, y: 164732.5, commentaire: `Point d'écoute n° 13: le point est situé à hauteur du 1er arbre planté sur le trottoir après le feu (4 m après le lampadaire n° 58).` },
      { numero: 14, x: 153534.51, y: 164710.27, commentaire: `Point d'écoute n° 14: le point est situé 8 m après le lampadaire n° 54; à hauteur de l'arbre planté sur le trottoir numéro 15.01.074.` },
      { numero: 15, x: 153541.39, y: 164684.35, commentaire: `Point d'écoute n° 15: le point est situé entre les lampadaires 50 et 48 (numéros invisibles), 3 m après le tilleul (n° 15.01.119) planté sur le trottoir (+/- à hauteur de trois aulnes sur la berge).` },
      { numero: 16, x: 153549, y: 164660, commentaire: `Point d'écoute n° 16: le point est situé entre les lampadaires 46 et 44 (numéros invisibles), à hauteur du tilleul (n° 15.01.118); chercher la trouée dans la végétation.` },
    ],
  },
  "SEC": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 152737.08, y: 163867.91, commentaire: `accès:
soit à partir de l'étang de l'Ermite, poursuivre le sentier du Vuylbeek vers l'amont (= vers la drève des Tumuli); sur la carte, on arrive par le haut (par le point n° 1);
soit par la drève des Tumuli (depuis la chaussée de La Hulpe): descendre jusqu'à l'étang du Fer à Cheval puis poursuivre la route qui remonte, traverse la drève des 2 Montagnes et redescend jusqu'au Vuylbeek; l'étang est alors situé à main gauche; sur la carte, on arrive par la gauche (point n° 4); remonter alors le sentier du Vuylbeek pour commencer par le point n° 1;
seule une partie du bord de l'étang est visitée.

Point d'écoute n° 1: le point est situé sur le trop plein (linteau en béton au bord nord de l'étang) situé sur la berge aval de l'étang, le long de la piste cavalière (= drève du Comte).` },
      { numero: 2, x: 152754.18, y: 163815.78, commentaire: `Point d'écoute n° 2: longer la berge vers la gauche en suivant le sens des aiguilles d'une montre; on rejoint le sentier du Vuylbeek; le point est situé peu après, à côté de l'arbre mort tombé dans l'étang.` },
      { numero: 3, x: 152744, y: 163775.05, commentaire: `Point d'écoute n° 3: le sentier tourne légèrement vers la gauche puis à droite; à main droite, se dresse un épais massif d'arbustes avec les pieds dans l'eau; le point est situé dans une petite trouée dans la végétation juste après ce bouquet dense d'arbustes (saules) poussant dans l'étang et avant les arbres au bord de l'étang (troncs).` },
      { numero: 4, x: 152704.09, y: 163756.72, commentaire: `Point d'écoute n° 4: poursuivre le sentier et le continuer jusqu'à la drève des Tumuli; prendre la drève vers la droite (longer l'étang); la drève surplombe une zone de végétation basse bordant l'étang (zone à Carex sp.); le point est situé sur la drève des Tumuli, au milieu de la zone à Carex et face à elle.` },
    ],
  },
  "SIL": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 153274.98, y: 164632.01, commentaire: `accès: par le chemin des Silex; entrée (privée mais permise pour le comptage) par le parking au bout du Chemin du Silex (refermer la barrière derrière vous, merci).

Point n° 1: le point est situé coin nord-ouest de l'étang: c'est le coin rencontré à l'arrivée au bord de l'étang.` },
      { numero: 2, x: 153315.99, y: 164605.56, commentaire: `Point n° 2: longer l'étang par la gauche (sens des aiguilles d'une montre); le point est situé une dizaine de mètres avant d'arriver au coin nord-est de l'étang.` },
      { numero: 3, x: 153306.73, y: 164556.34, commentaire: `Point n° 3: le point est situé 50 m (= ± 60 pas normaux) après le coin nord-est de l'étang; point de repère: à hauteur d'un gros tronc d'arbre (qui pousse derrière la clôture) muni d'une grosse branche à ± 5 m de haut dirigée vers l'étang.` },
      { numero: 4, x: 153272.6, y: 164520.62, commentaire: `Point n° 4: le point est situé 50 m plus loin (= ± 60 pas normaux); point de repère: ± 7 pas normaux avant le 1er des 3 conifères qui poussent à gauche du chemin devant la clôture.` },
      { numero: 5, x: 153240.85, y: 164484.11, commentaire: `Point n° 5: le point est situé 50 m plus loin (= ± 60 pas normaux); point de repère: ± 2 m après le banc (trouée dans la végétation).` },
      { numero: 6, x: 153215.45, y: 164548.41, commentaire: `Point n° 6: arrivé à l'extrémité de la berge, emprunter le caillebotis qui effectue un angle droit vers la droite pour longer la berge sud; vers le milieu de ce caillebotis, un autre caillebotis part vers l'étang; le point a lieu au début de ce caillebotis qui part vers l'étang.` },
      { numero: 7, x: 153192.43, y: 164505.28, commentaire: `Point n° 7: le point a lieu ± 40 m après le coin sud-ouest de l'étang (en bas à gauche sur la carte), ± 10 m avant le banc, au niveau du premier arbre du verger à gauche du chemin (arbre coupé en deux).` },
      { numero: 8, x: 153190.84, y: 164452.36, commentaire: `Point n° 8: le point a lieu ± 50 m plus loin; point de repère: ± 10 mètres avant le deuxième banc, au niveau du dernier arbre mort du verger à gauche du chemin.` },
      { numero: 9, x: 153245.61, y: 164589.68, commentaire: `Point n° 9: le point est situé 50 m plus loin, face à l'îlot.` },
    ],
  },
  "TFO": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 155441.58, y: 166223.86, commentaire: `accès: parking sous le viaduc de l'E411, passé le centre sportif de la forêt de Soignes; aller jusqu'au bout du parking; prendre la 1ère drève à droite (panneau "Zone de protection") qui entre dans la forêt; suivre le panneau 3 fontaines; longer cette drève (ne pas prendre les dérivations vers la gauche) jusqu'à la grille du petit parc qui, dans le bas, ferme l'accès à l'étang; à droite de la porte, un petit passage par le muret est possible, attention au fil barbelé au niveau de la tête; 2 points d'écoute à réaliser.

Point d'écoute n° 1: le point est situé presque à l'extrémité de l'étang, du côté de la grille (= 4 m après la sortie d'eau de l'étang située à l'extrémité de l'étang).` },
      { numero: 2, x: 155414.1, y: 166182.2, commentaire: `Point d'écoute n° 2: le point est situé de l'autre côté de l'étang, le long d'une zone de bambous; attention, le sentier entre les bambous et l'eau est étroit (les bambous ont pris plus d'ampleur, point avant la cabane).` },
    ],
  },
  "TOS": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 153074.83, y: 164685.1, commentaire: `ce site est fermé de nuit: la clef est indispensable pour y avoir accès; site composé d'1 étang + 1 mare située contre l'étang, le long du chemin des Silex; tous les comptages ont lieu au bord de l'étang sauf si mention contraire.

Point d'écoute n° 1 (étang): entrée par la drève des 2 Montagnes (face au chemin des Silex); prendre le chemin immédiatement à gauche sur 15 à 20 mètres puis se diriger vers l'étang; le point est situé à proximité immédiate du coin de l'étang, sur la grille qui borde l'étang.` },
      { numero: 2, x: 153070.99, y: 164642.6, commentaire: `Point d'écoute n° 2: poursuivre la berge vers la gauche (longer l'étang dans le sens des aiguilles d'une montre); le point est situé juste avant le coin suivant de l'étang, à gauche de l'arbre (l'approche peut être boueuse même par temps sec).` },
      { numero: 3, x: 153016.73, y: 164621.8, commentaire: `Point d'écoute n° 3: poursuivre le chemin qui longe l'étang; le point est situé juste après le coin suivant de l'étang, au milieu du pont en dur.` },
      { numero: 4, x: 152990.73, y: 164657.54, commentaire: `Point d'écoute n° 4: continuer le chemin; peu avant le coin suivant de l'étang, 1 x 2 bancs sont placés le long du chemin; sur le bord du chemin à gauche, une dalle en pierre et un arbre tombé au sol; le point d'écoute est situé 2 mètres après cette dalle, le long de la berge; 1 banc + 1 poubelle 10 m plus loin.` },
      { numero: 5, x: 153024.4, y: 164682.82, commentaire: `Point d'écoute n° 5: le chemin fait une petite boucle pour éviter un petit précipice; le point est 8 mètres après cette boucle; autre point de repère: 2 m avant une série de petites mares.` },
      { numero: 6, x: 153093.64, y: 164662.54, commentaire: `Point d'écoute n° 6 (mare): situation: entre les points d'écoute n° 1 et 2 du grand étang, de l'autre côté du chemin; il s'agit d'une mare allongée qui borde la drève des 2 Montagnes.

À partir de l'entrée du parc par la drève des 2 Montagnes (face au chemin des Silex), prendre le chemin comme pour aller au point 1 du grand étang, mais continuer le chemin sur quelques mètres jusqu'à des faux rochers bas; quitter alors le chemin vers la gauche et descendre vers la berge de la mare; poursuivre la berge jusqu'à peu près au milieu de sa longueur, là où la terre effectue une courte avancée dans l'eau; le point est situé sur cette courte avancée de terre, à côté d'un jeune arbre (aulne). Attention zone glissante, il est interdit de tomber à l'eau. En quittant le parc, ne pas oublier de refermer la grille à clefs, merci.` },
    ],
  },
  "ENG": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 148291.8, y: 163951, commentaire: `Point n° 1: le point est situé sur la partie Nord du ponton traversant l'étang. Il est situé une dizaine de mètres après le début du pont, 5 m après là où l'eau commence (en allant vers le sud/milieu de l'étang).` },
      { numero: 2, x: 148270, y: 163927.2, commentaire: `Point n° 2: le point est situé sur la partie Sud du ponton traversant l'étang. Il est situé une quinzaine de mètres avant la fin du pont, à peu près au 2/3 du plan d'eau en venant du Nord (en allant vers le sud).` },
      { numero: 3, x: 148289.9, y: 163926.9, commentaire: `Point n° 3: une fois le pont passé, tournez à gauche et suivez la clôture qui longe le ravin avec l'étang en contrebas. Vous verrez un arbre en chablis tombé vers l'étang derrière la clôture, passez cette zone et continuez encore un peu de longer la clôture. Quelques mètres (dizaine) plus loin se trouvent en bordure de la clôture (de notre côté) trois troncs d'arbre assez fins très proches les uns des autres. À ce niveau se trouve une ouverture donnant sur l'étang. Passez au-dessus de la clôture et rapprochez-vous le plus possible du plan d'eau. Attention, pente très raide, faire attention !` },
    ],
    "Transect forestier (3 min)": [
      { numero: 0, x: 147926.5, y: 163840.39, commentaire: `ATTENTION ! En raison des changements de terrain, le transect est à changé. Les numéros de points ne sont donc plus toujours consécutifs. Par conséquent, vérifiez toujours que vous copiez le numéro de point CORRECT de la description ci-dessous sur votre formulaire !

Le début du transect se situe le long du Borreweg, au niveau du pont sur la droite qui enjambe le ruisseau et qui mène au Kriekenput.` },
      { numero: 1, x: 148029, y: 163931, commentaire: `Traversez le pont et traversez les buissons.
La route goudronnée monte puis tourne légèrement à droite, puis à gauche.
La pointe se situe au niveau du 1er tronc (érable) à droite après le virage à gauche (là où le sentier commence à descendre légèrement).` },
      { numero: 2, x: 148080, y: 163928, commentaire: `Revenez sur vos pas, traversez le pont et montez à droite sur le Borreweg.
Le point est situé ± 4 m au-delà du poteau d'éclairage à gauche de la route (autre repère : ± 2 m devant un saule tombé à droite de la route).` },
      { numero: 3, x: 148111, y: 163887, commentaire: `Continuez à marcher tout droit.
Le point est situé ± 10 / 11 mètres avant le poteau d'éclairage en béton à l'intersection (= 4ème poteau de clôture avant le poteau d'éclairage).` },
      { numero: 4, x: 148163, y: 163884, commentaire: `Au carrefour, tournez à gauche et marchez jusqu'au pont sous la voie ferrée.
Le point est situé au 13ème poteau de la clôture du jardin à droite, avant la sous-structure en brique du pont ferroviaire (ou 6ème poteau à compter du pont ; ± 11 mètres avant le début de la sous-structure en brique du pont).` },
      { numero: 5, x: 148213, y: 163872, commentaire: `Passez sous le pont.
Prendre le chemin à gauche qui s'enfonce dans les sous-bois.
Le chemin tourne immédiatement à droite et monte un peu.
Le point se situe ± 10 mètres au-delà de ce virage, à hauteur du 1er tronc d'arbre (chêne) assez épais à droite, qui est presque contre un autre tronc.` },
      { numero: 6, x: 148263, y: 163893, commentaire: `Suivre la route sur ± 10 mètres, puis emprunter le chemin (ne se voit plus bien) qui démarre à gauche.
Longer la rangée d'arbres à gauche de la route.
1 x 2 arbres, se rejoignant à la base, puis :
1 x 1 vrijstaande stam (?)
1 x 3 troncs, rendez-vous à la base (environ 3m à gauche du chemin) ;
1x1 vrijstaande stam (?)
À un carrefour en Y (plus difficile à voir), restez à gauche.
Le point se situe au niveau du 2ème arbre autoportant (chêne avec un peu de lierre à la base) à droite.` },
      { numero: 7, x: 148323, y: 163910, commentaire: `Le chemin tourne ensuite à droite et longe le ravin.
Suivre le sentier jusqu'à une légère dépression dans le sol, au bord du ravin.
De cet endroit suivre la ligne formée de 4 arbres sur la gauche.
Juste après le 4ème arbre, un tronc d'arbre mort couché.
Le point se situe au sommet du tronc couché, un peu à gauche des 4 arbres poussant en rangée. Autre repère : près du tronc d'arbre (chêne) à gauche.` },
      { numero: 8, x: 148376, y: 163898, commentaire: `Continuez à marcher sur la même ligne en passant devant les arbres sur la gauche.
Passer devant 1 arbre, puis une grosse branche morte pendante (chêne), et continuer à suivre le chemin à gauche le long du ravin.
Suivez le grillage à côté du ravin. ± 20 mètres plus loin, le sentier passe entre 2 groupes d'arbres (accacia et noisetier) proches l'un de l'autre.
Le point est situé à ± 4 mètres devant ces deux groupes d'arbres.` },
      { numero: 11, x: 148444, y: 163822, commentaire: `Continuez à marcher tout droit.
± 40 m après le point 21, le sentier passe entre 2 troncs proches l'un de l'autre.
Quelques mètres plus loin le chemin monte légèrement sur une colline.
Quelques mètres plus loin se trouve une petite "marche" dans le sol.
Le point est situé ± 4 m au-delà de cette petite « marche » dans le sol. Autre repère : ± 3 mètres avant une basse souche d'arbre abattue à gauche du chemin.` },
      { numero: 12, x: 148435, y: 163772, commentaire: `Le chemin tourne immédiatement à gauche puis à droite. Après cela, il y a une petite "bosse" sur le chemin, qui tourne ensuite à droite.
Le chemin continue tout droit sur 25 à 30 mètres encore (clôture à 5/6 m à gauche de la route), puis le chemin principal tourne à gauche (repère : 3 mètres après l'angle de la clôture à gauche. Ne pas aller jusqu'à à gauche, mais continuez tout droit.
Le point est situé 1 m au-delà de cette intersection.` },
      { numero: 13, x: 148447, y: 163720, commentaire: `Suivez le chemin. Le chemin tourne à gauche avec de nombreux arbres écroulés (+tronc d'arbre abattu), puis à droite, puis continue tout droit et tourne enfin légèrement à gauche.
± 7 m plus loin il y a 5 troncs sur le côté droit du chemin. La pointe est située à 3 m du dernier de ces 5 rondins.` },
      { numero: 14, x: 148460, y: 163669, commentaire: `Continuez à marcher tout droit. Plus loin le chemin tourne à droite, puis à gauche puis très légèrement à gauche.
Passer 10 mètres plus loin devant un tronc mort à gauche, dans le léger virage à gauche, puis sur un tronc d'arbre tombé sur la route (ou à gauche autour de la souche). Le point se trouve 25 mètres plus loin juste avant un léger virage à droite.` },
      { numero: 15, x: 148460, y: 163618, commentaire: `Suivez le chemin jusqu'à ce que vous puissiez entrer dans la clôture à droite. Le point est justement dans cet accès.` },
      { numero: 21, x: 148430, y: 163871, commentaire: `Continuez à marcher sur la même ligne en passant devant les arbres sur la gauche.
Passer devant 1 arbre, puis une grosse branche morte pendante (chêne), et continuer à suivre le chemin à gauche le long du ravin.
Suivez le grillage à côté du ravin. ± 20 mètres plus loin, le sentier passe entre 2 groupes d'arbres (accacia et noisetier) proches l'un de l'autre.
Le point est situé à ± 4 mètres devant ces deux groupes d'arbres.` },
      { numero: 22, x: 148484, y: 163571, commentaire: `Suivez le chemin entre les grillages. Passez sous le portail en barbelés. Le point est situé au niveau du quatrième poteau à droite (poteau de portail inclus). Autre repère : les poteaux transversaux au sommet du quatrième poteau sont tombés.` },
      { numero: 23, x: 148505, y: 163531, commentaire: `Suivez le chemin entre les grillages. Le point est là où les clôtures tournent vers la droite.` },
      { numero: 24, x: 148504, y: 163485, commentaire: `Suivez le chemin entre les grillages jusqu’à un arbre épais à gauche du chemin à l’intérieur de la clôture. Le point est situé à la hauteur de cet arbre` },
      { numero: 25, x: 148259, y: 163839, commentaire: `Reprenez l'itinéraire parcouru et à l'intersection après le point 6, prenez la route à gauche (le point 5 est sur la route à droite).Le point est situé 40 mètres plus loin, à hauteur d'un chêne monumental recouvert de lierre. sur la gauche.` },
      { numero: 26, x: 148284, y: 163802, commentaire: `Suivez le chemin jusqu'à une intersection de chemin. Les chemins à gauche et à droite mènent aux portails de la clôture). Le point est situé au milieu de cette intersection.` },
      { numero: 27, x: 148441, y: 163372, commentaire: `A cette intersection, tourner à gauche, passer un portail et continuer tout droit jusqu'à l'endroit où se trouve à gauche et à droite un très vieux chêne à environ 7 mètres du chemin (vous vous trouvez alors entre les branches d'un arbre tombé). Le point se situe entre ces deux chênes. (20/6/2020 : le chemin y est assez envahi par les ronces)  -> Le point est inaccessible à cause d’un enclos à bétail

 Verrewinkel` },
    ],
  },
  "SAU": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 148578, y: 164156, commentaire: `Point n° 1: le point est situé juste à côté du grand rocher en bordure d'étang, à 2 m de la porte de la fausse grotte.` },
      { numero: 2, x: 148543, y: 164165, commentaire: `Point n° 2: le point est situé sur la rive d'en face. Faites le tour de l'étang par la droite. Vous tomberez sur un jeune arbre en bordure de l'étang, passez cet arbre et continuez encore quelques mètres le long de la berge. Le point se trouve à la hauteur de l'île.` },
    ],
  },
  "BNZ": {
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Départ à l'intersection du Tamboerdreef et du Sentier des Putois (au Nord du transect).

Le point est situé sur la Tamboerdreef, au début du Sentier des Putois` },
      { numero: 2, x: null, y: null, commentaire: `Franchir la barrière et continuer le long du Sentier des Putois ;
le point est situé 4 mètres après le 4ème arbre le long du bord droit de la route` },
      { numero: 3, x: null, y: null, commentaire: `± 50 mètres plus loin à la hauteur d'un arbre à gauche de la route (avec une souche d'arbre de 1 m de haut à 1,5 m devant lui) ;` },
      { numero: 4, x: null, y: null, commentaire: `Tourner à droite à l'intersection; marcher encore ± 20 mètres ;
le point est situé à la hauteur de l'arbre juste avant le petit pont` },
      { numero: 5, x: null, y: null, commentaire: `Le point est situé au 5ème arbre à gauche de la route; autre marque de reconnaissance : 2 mètres avant le deuxième pont` },
      { numero: 6, x: null, y: null, commentaire: `Le point est situé au niveau du 5ème arbre poussant à moins de 2 mètres du bord gauche du chemin ; (des racines sont visibles sur le chemin)` },
      { numero: 7, x: null, y: null, commentaire: `Le point est situé au niveau du 2ème tronc à gauche de la route ; autre marque d'identification : 3 mètres avant le pont` },
      { numero: 8, x: null, y: null, commentaire: `La route tourne d'abord à droite puis à gauche ;
le point est situé après que le chemin tourne à gauche à la hauteur du 2ème arbre à gauche` },
      { numero: 9, x: null, y: null, commentaire: `Le point est situé à la hauteur du 2ème arbre épais qui pousse à moins de 2 mètres du bord droit de la route ; un autre signe de reconnaissance : 1 mètre plus loin pousse un autre arbre` },
      { numero: 10, x: null, y: null, commentaire: `Le point est situé à la hauteur du 3ème arbre le long du bord de route de droite` },
      { numero: 11, x: null, y: null, commentaire: `Le point est situé au 2ème arbre à gauche de la route après le pont` },
      { numero: 12, x: null, y: null, commentaire: `Le chemin monte raide sur quelques mètres (il y a un grand arbre à 2 mètres à droite de la route) puis tourne à gauche ;
le point est situé à un arbre qui bifurque à une hauteur de 1 m, juste après le virage à gauche, à 1 mètre à gauche de la route ; autres repères : juste avant une grande crique à droite de la route et 12 m avant un arbre aux racines ascendantes remarquables` },
      { numero: 13, x: null, y: null, commentaire: `Traverser le pont : environ 15 mètres plus loin, le chemin fait un léger virage vers la gauche ; à gauche du chemin se trouve un arbre épais ; le point est situé au 2ème arbre à droite de la route après l'arbre épais (= ± 2 mètres après l'arbre épais)` },
      { numero: 14, x: null, y: null, commentaire: `La route monte légèrement puis tourne à droite ; un peu plus loin, sur le côté gauche de la route, il y a une souche d'arbre envahie par la végétation ;
le point est situé au niveau du 2ème arbre à gauche de la route après la souche d'arbre` },
      { numero: 15, x: null, y: null, commentaire: `La route tourne à gauche puis traverse une zone de mûriers ;
le point est situé au niveau du 2ème arbre poussant à moins de 3 mètres à droite de la route au-delà de la zone de mûriers ; autre marque d'identification : 5 à 8 mètres au-delà de la zone des mûres` },
      { numero: 16, x: null, y: null, commentaire: `Compter les arbres très épais sur la gauche contre le bord de la route ;
le point est situé 15 à 20 mètres au-delà du 2ème tronc épais, à hauteur d'une souche d'arbre tombée le long du bord gauche de la route (arbre marqué à base noueuse à 5 mètres à droite de la route)` },
      { numero: 17, x: null, y: null, commentaire: `Le point est situé à la hauteur du 12ième arbre sur le bord gauche de la route ; autre signe de reconnaissance : arbre mince à droite de la route en face d'un tronc scié` },
      { numero: 18, x: null, y: null, commentaire: `Le point est juste après la barrière ; ce point n'est pas pourvu d'un marquage` },
      { numero: 19, x: null, y: null, commentaire: `Tourner à gauche à l'intersection (Drève du Relais des Dames, non indiqué) ; juste après l'intersection, traversez le Welriekendedreef pavé ; après environ 25 mètres, prendre le chemin qui part à droite (Meibloemenvoetpad) ;
le point est situé au 1er arbre épais à droite du chemin (= immédiatement après le pont) ;` },
      { numero: 20, x: null, y: null, commentaire: `Traverser le sentier équestre;
le point se situe au 1er arbre à droite, juste après le chemin de halage ;` },
      { numero: 21, x: null, y: null, commentaire: `Traverser la piste cyclable ;
le point est situé au 1er arbre à gauche après l'intersection ; autre signe de reconnaissance : 2 mètres après le tronc endommagé à gauche de la route ;` },
    ],
  },
  "DKL": {
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Le point est situé au 1er arbre à droite de la Doorbraakdreef au bout du parking (= 1er arbre sur le bord droit de la Doorbraakdreef à partir de la barrière)` },
      { numero: 2, x: null, y: null, commentaire: `Le point est situé à la hauteur du 3ème arbre sur le côté gauche de la route ;` },
      { numero: 3, x: null, y: null, commentaire: `Le point est situé à la hauteur du premier arbre épais sur le bord droit de la route (juste après une motte de terre provenant d'un arbre tombé et épais)` },
      { numero: 4, x: null, y: null, commentaire: `Le point est situé à l'avant de l'intersection avec la route qui va vers la gauche, à hauteur de la souche` },
      { numero: 5, x: null, y: null, commentaire: `Continuez simplement à marcher;
le point est situé 20 mètres avant la barrière.` },
      { numero: 6, x: null, y: null, commentaire: `Traverser la Chaussée de Tervueren (grande route voiture) ;
le point est juste après la barrière ; autre marque d'identification : 4 mètres au-delà du trottoir.` },
      { numero: 7, x: null, y: null, commentaire: `La route tourne à gauche, continue tout droit sur une courte distance puis tourne à droite ;
le point est situé au niveau du dernier arbre avant le virage à droite ; autre signe de reconnaissance : 2 troncs poussent à partir de la souche` },
      { numero: 8, x: null, y: null, commentaire: `Le point est situé au bout d'un long virage à gauche, à la hauteur d'un tronc d'arbre à moitié pourri (avec beaucoup de mousse dessus) sur le côté droit de la route ; autres signes de reconnaissance : Un Sureau noir pousse juste à côté du tronc couché couvert de mousse ; l'arbre se situe environ 30 mètres avant la prochaine intersection (ne se voit pas bien)` },
      { numero: 9, x: null, y: null, commentaire: `Traverser la prochaine intersection;
juste après l'intersection, il y a un grand arbre sur le côté gauche de la route ;
le point est situé 5 à 6 mètres plus loin, à la hauteur d'un arbre à gauche de la route` },
      { numero: 10, x: null, y: null, commentaire: `Le point est situé à la hauteur d'un arbre à droite de la route, à l'endroit où celle-ci tourne à droite.` },
      { numero: 11, x: null, y: null, commentaire: `La route tourne à droite ;
le point est situé à la hauteur d'un arbre à gauche collé à la route, 15 à 20 mètres après le virage à droite` },
      { numero: 12, x: null, y: null, commentaire: `Le point est situé à la hauteur d'un arbre à droite de la route juste avant l'intersection avec la route pavée (Chemin des Trois Couleurs)` },
      { numero: 13, x: null, y: null, commentaire: `À l'intersection, continuez tout droit. le point est situé environ 10 à 15 mètres avant le virage à gauche` },
      { numero: 14, x: null, y: null, commentaire: `Le point est situé dans le coude qui se courbe vers la gauche à angle droit ; 2m avant le panneau de randonnée` },
      { numero: 15, x: null, y: null, commentaire: `Compter les arbres à gauche de la route (sans compter les arbres récemment sciés à la pointe du virage) : compter les deux grands arbres à gauche, les arbres qui sont à droite de la route ;
le point est situé à la hauteur du 2ème arbre épais à droite de la route` },
      { numero: 16, x: null, y: null, commentaire: `Le point est situé au niveau du 2ème arbre (sans compter les beaux arbres) sur le côté droit de la route. Ne pas compter les arbres coupés` },
      { numero: 17, x: null, y: null, commentaire: `Le point est situé au 2ème arbre à droite de la route` },
      { numero: 18, x: null, y: null, commentaire: `Marcher tout droit à l'intersection ;
le point est situé au 2ème arbre à droite de la route après l'intersection; autre marque d'identification : ± 22 mètres au-delà de l'intersection` },
      { numero: 19, x: null, y: null, commentaire: `Le point est situé à la hauteur d'un imposant hêtre épais à droite` },
      { numero: 20, x: null, y: null, commentaire: `Marcher tout droit à l'intersection ; sur le côté gauche de la route commence une clôture avec une haie ; le point est situé au niveau du 5ème poteau de clôture ; autre marque d'identification : ± 9 mètres au-delà du premier poteau de clôture` },
    ],
  },
  "TBN": {
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Point de départ : passerelle pour piétons et cyclistes au-dessus de l'avenue de Tervuren, à l'intersection avec la Ballade verte.

Le point est situé sur la passerelle, côté musée du tram et non côté parc de Woluwe), juste au-dessus du trottoir` },
      { numero: 2, x: null, y: null, commentaire: `Le point se situe 50 m plus loin. Repère : 1er lampadaire après le 1er bâtiment` },
      { numero: 3, x: null, y: null, commentaire: `Le point se situe 50 m plus loin. Repère à gauche : au bout de la première partie de l'ancien quai (chemin venant de la gauche avec un panneau "Règlement du parc")` },
      { numero: 4, x: null, y: null, commentaire: `Le point se situe 50 m plus loin : point de reconnaissance à droite : 1 m après le banc avant l'escalier vers la rue ;
point de reconnaissance à gauche : 1 m avant la poubelle ;` },
      { numero: 5, x: null, y: null, commentaire: `Le point est 50 m plus loin : panneau de reconnaissance à droite : 3 m après le lampadaire (= 8 à 9 m après le chemin venant de la droite) ;` },
      { numero: 6, x: null, y: null, commentaire: `A hauteur d'un arbre poussant contre un arbre abattu en bordure de route) ;
point de reconnaissance à gauche : 2,5 m avant un bouleau en bordure de route ;` },
      { numero: 7, x: null, y: null, commentaire: `Le point se situe 50 m plus loin : 10 m après le 2ème lampadaire à droite ; 1 à 2 m avant le bouleau en bordure de route à gauche` },
      { numero: 8, x: null, y: null, commentaire: `Le point est situé 50 m plus loin : 3 m avant le 2ème lampadaire à droite` },
      { numero: 9, x: null, y: null, commentaire: `Le point se situe 50 m plus loin : 13 m après le 2ème lampadaire à droite (= juste avant la fin de la séparation avec les jardins, constituée de dalles de béton) ; à gauche 1 x 2 acacias qui ont poussé ensemble en bas (= quelques mètres après le chemin qui tourne à gauche) ;` },
      { numero: 10, x: null, y: null, commentaire: `Le point est à 50 m plus loin : 10 m après le 2ème lampadaire à droite et la poubelle et le banc` },
      { numero: 11, x: null, y: null, commentaire: `Le point est à 50 m plus loin : 3 m après le lampadaire à droite (= 5 mètres avant l'escalier à droite) ;` },
      { numero: 12, x: null, y: null, commentaire: `Revenir en arrière et prendre le sentier qui descend à votre droite, vers l'intérieur du parc.
Le point est situé à la hauteur des poteaux qui ferment l'accès au parc et qui sont situés presque en face du pont (= quelques mètres avant le lampadaire 4384)` },
      { numero: 13, x: null, y: null, commentaire: `Continuer à marcher et prendre la route juste après le point 12 qui part vers la droite ; Au carrefour, tourner à droite et continuer : le point est 3 m avant le prochain chemin qui tourne à droite ;
Marque de reconnaissance à gauche : 3 m devant le piquet rond en bois peint en bleu en haut ;` },
      { numero: 14, x: null, y: null, commentaire: `Continuer sur le chemin qui tourne à gauche un peu plus loin ; À la prochaine intersection, tournez à droite et arrêtez-vous là :
le point est situé juste après cette intersection, au niveau de la poubelle (± 2 m après le banc)` },
      { numero: 15, x: null, y: null, commentaire: `Il suffit de traverser la prochaine intersection ; vous arrivez dans un espace ouvert ; prendre le chemin qui part à gauche et mène aux jardins potagers ;
le point est situé à 2 m après le dernier arbre avant les jardins potagers (= ± 10 mètres avant le portail d'entrée des jardins potagers) ;` },
      { numero: 16, x: null, y: null, commentaire: `Revenez sur vos pas après le point 15 et longez le sommet autour de la clairière ; À la prochaine intersection, tournez à gauche et descendez vers le parc (ne continuez pas tout droit, vous arriverez alors à la rue) ;
le point est situé à la hauteur du lampadaire 4410 (= 3 m avant d'entrer dans le sous-bois) ;` },
      { numero: 17, x: null, y: null, commentaire: `Le point est situé 50 m plus loin : repère d'identification : 3 mètres après le lampadaire 4408 ; très incliné.` },
      { numero: 18, x: null, y: null, commentaire: `Au carrefour en bas de la route, tournez à droite et faites le tour de l'étang dans le sens inverse des aiguilles d'une montre ;
le point est situé dans la zone plus ouverte avec des palettes de bois en guise de caillebotis au sol. Le point est devant l'arbre à troncs multiples (5 troncs)` },
      { numero: 19, x: null, y: null, commentaire: `Continuer à marcher le long de l'étang; le point suivant se trouve au bord de l'étang, 4 m après la 2ème poubelle à droite de la route (= ± 10 m avant le lampadaire 4398)` },
      { numero: 20, x: null, y: null, commentaire: `Continuer à marcher le long de l'étang;
le point suivant est à 4 m avant le 2ième banc à droite. Au lampadaire et la poubelle.` },
      { numero: 21, x: null, y: null, commentaire: `Le point suivant est 50 m plus loin, au bord de l'étang : Repère à droite : en face du banc (quelques mètres avant le lampadaire 4394) ; Juste après en passant le chemin partant vers le boulevard.` },
    ],
  },
  "TMB": {
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Le point de départ est le Rond-point du Tambour. Entrez dans la forêt par la Drève du Tambour, en passant la barrière. Les points suivants sont sur cette route.

Le point est situé 5 mètres après la barrière, au niveau d'un arbre à gauche de la drève` },
      { numero: 2, x: null, y: null, commentaire: `Le point 2 est situé 50 mètres plus loin, à la hauteur du 1er arbre sur le côté droit de la route.` },
      { numero: 3, x: null, y: null, commentaire: `50 mètres plus loin, le point 3 est situé au niveau des deux arbres qui poussent l'un contre l'autre sur le côté gauche de la route (un gros chêne et un arbre plus fin).` },
      { numero: 4, x: null, y: null, commentaire: `50 mètres plus loin, le point 4 est situé juste avant le virage à gauche, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 5, x: null, y: null, commentaire: `50 mètres plus loin, le point 5 est situé à la hauteur d'un arbre sur le côté droit de la route, juste après l'intersection.` },
      { numero: 6, x: null, y: null, commentaire: `Les points suivants ne seront plus espacés de 50 mètres, mais tous les 100 mètres.

Le point est situé 100 mètres après le point 5, à hauteur du 2ème arbre à gauche de la route.` },
      { numero: 7, x: null, y: null, commentaire: `100 mètres plus loin, le point 7 est situé à hauteur d'un tronc d'arbre sur le côté droit de la route, à environ 30 mètres avant l'intersection.` },
      { numero: 8, x: null, y: null, commentaire: `Tournez à droite à l'intersection. le point 8 est situé 100 mètres plus loin, à hauteur d'un arbre à droite de la route.` },
      { numero: 9, x: null, y: null, commentaire: `100 mètres plus loin, le point 9 est situé au niveau d'un arbre sur le côté droit de la route, juste avant l'intersection.` },
      { numero: 10, x: null, y: null, commentaire: `Tourner à gauche à l'intersection. Le point 10 est situé 100 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 11, x: null, y: null, commentaire: `100 mètres plus loin, le point 11 est situé à hauteur d'un arbre à gauche de la route.` },
      { numero: 12, x: null, y: null, commentaire: `100 mètres plus loin, le point 12 est situé à la hauteur du 2ème arbre à gauche de la route.` },
      { numero: 13, x: null, y: null, commentaire: `100 mètres plus loin, le point 13 est situé au niveau d'un arbre à droite de la route.` },
      { numero: 14, x: null, y: null, commentaire: `100 mètres plus loin, le point 14 est situé à hauteur d'un arbre de l'autre côté de la route.` },
      { numero: 15, x: null, y: null, commentaire: `100 mètres plus loin, le point 15 est situé au niveau d'un arbre sur le côté droit de la route, juste avant une intersection.` },
      { numero: 16, x: null, y: null, commentaire: `Tournez à gauche à l'intersection. Le point 16 est situé 100 mètres plus loin, à hauteur du 3ème arbre à gauche de la route. (Les arbres du 1er et 2ème sont plus proches l'un de l'autre.)` },
      { numero: 17, x: null, y: null, commentaire: `100 mètres plus loin, le point 17 est situé au niveau d'un arbre à gauche de la route.` },
      { numero: 18, x: null, y: null, commentaire: `100 mètres plus loin, le point 18 est situé à hauteur d'un arbre à droite de la route.` },
      { numero: 19, x: null, y: null, commentaire: `100 mètres plus loin, le point 19 est situé au niveau d'un arbre à droite de la route.` },
      { numero: 20, x: null, y: null, commentaire: `100 mètres plus loin, le point 20 est situé à hauteur d'un arbre sur le côté gauche de la route.` },
    ],
  },
  "GRA": {
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Le point est situé dans le virage à droite, au niveau du 1er arbre à droite dans le virage` },
      { numero: 2, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, au niveau du 2ème arbre sur le côté droit de la route.` },
      { numero: 3, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé 10 mètres avant l'intersection avec le Brouwerijdreef, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 4, x: null, y: null, commentaire: `Prendre le Brouwerijdreef à gauche. Le point est situé 50 mètres plus loin, à hauteur du 2ème arbre sur le côté gauche de la route.` },
      { numero: 5, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté droit de la route, après l'intersection.` },
      { numero: 6, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 7, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur du 3ème arbre sur le côté droit de la route.` },
      { numero: 8, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté gauche de la route, 10 mètres avant l'intersection.` },
      { numero: 9, x: null, y: null, commentaire: `Tourner à droite à l'intersection. Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 10, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 11, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé 10 mètres après l'intersection avec le Grasdellestraat (à droite), à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 12, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté gauche de la route, juste avant l'intersection.` },
      { numero: 13, x: null, y: null, commentaire: `Tourner à droite à l'intersection. Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 14, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté droit de la route, 10 mètres après le virage à gauche.` },
      { numero: 15, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté gauche de la route (environ 20 mètres avant l'intersection).` },
      { numero: 16, x: null, y: null, commentaire: `Tourner à droite à l'intersection. Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 17, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 18, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé 10 mètres après l'intersection, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 19, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 20, x: null, y: null, commentaire: `50 mètres plus loin, le point est situé à hauteur d'un arbre sur le côté droit de la route.` },
    ],
  },
  "GIP": {
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Le point de départ est situé au bout de la Grippendelldreef, à l'entrée de la forêt, juste après la barrière (au nord de la drève). Le point est situé 3 mètres après la barrière, à hauteur d'un arbre sur le côté gauche de la route (virage à droite).` },
      { numero: 2, x: null, y: null, commentaire: `Le point 2 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 3, x: null, y: null, commentaire: `Le point est situé ± 50 mètres plus loin, à hauteur d'un arbre à gauche, juste avant le virage à droite.` },
      { numero: 4, x: null, y: null, commentaire: `Le point est situé ± 50 mètres plus loin, au niveau de l'intersection, sur le coin à droite.` },
      { numero: 5, x: null, y: null, commentaire: `Prendre à gauche. Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 6, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 7, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 8, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur du 1er arbre à droite de la route, juste après l'intersection.` },
      { numero: 9, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 10, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 11, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 12, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route, avant l'intersection.` },
      { numero: 13, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 14, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 15, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 16, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 17, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route, juste après l'intersection.` },
      { numero: 18, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 19, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur du 2ème arbre sur le côté droit de la route.` },
      { numero: 20, x: null, y: null, commentaire: `Le point est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
    ],
  },
  "KOR": {
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Se rendre au bout de la drève du Korporaal, à l'entrée de la forêt (au sud de la drève), en passant la barrière (si vous venez en voiture, vous pouvez vous garer le long de la drève du Korporaal, avant la barrière).

Le point est situé 3 mètres après la barrière, à hauteur d'un petit arbre sur le côté droit de la route.` },
      { numero: 2, x: null, y: null, commentaire: `Le point 2 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 3, x: null, y: null, commentaire: `Le point 3 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route (le 1er arbre sur le côté gauche, après le virage à droite).` },
      { numero: 4, x: null, y: null, commentaire: `Le point 4 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route (juste après le virage à droite).` },
      { numero: 5, x: null, y: null, commentaire: `Le point 5 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 6, x: null, y: null, commentaire: `Le point 6 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 7, x: null, y: null, commentaire: `Le point 7 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route (juste avant l'intersection).` },
      { numero: 8, x: null, y: null, commentaire: `Prendre à droite à l'intersection. Le point 8 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 9, x: null, y: null, commentaire: `Le point 9 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 10, x: null, y: null, commentaire: `Le point 10 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 11, x: null, y: null, commentaire: `Le point 11 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 12, x: null, y: null, commentaire: `Le point 12 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 13, x: null, y: null, commentaire: `Le point 13 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 14, x: null, y: null, commentaire: `Le point 14 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 15, x: null, y: null, commentaire: `Le point 15 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 16, x: null, y: null, commentaire: `Le point 16 est situé au niveau de l'intersection avec la drève de la Tour de Contrôle (à droite), sur le coin à droite (au bout d'un petit sentier).` },
      { numero: 17, x: null, y: null, commentaire: `Tourner à gauche à l'intersection. Le point 17 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route (juste après l'intersection).` },
      { numero: 18, x: null, y: null, commentaire: `Le point 18 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route.` },
      { numero: 19, x: null, y: null, commentaire: `Le point 19 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté gauche de la route.` },
      { numero: 20, x: null, y: null, commentaire: `Le point 20 est situé 50 mètres plus loin, à hauteur d'un arbre sur le côté droit de la route (juste avant l'intersection).` },
    ],
  },
  "LIN": {
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Le point est situé au 1er arbre à droite du chemin après le virage à gauche` },
      { numero: 2, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à gauche, juste avant que le chemin passe un petit pont en bois` },
      { numero: 3, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à gauche après le pont sur le ruisseau` },
      { numero: 4, x: null, y: null, commentaire: `Après 50 m : au niveau du 2ème arbre à gauche` },
      { numero: 5, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à droite, juste avant le virage à droite` },
      { numero: 6, x: null, y: null, commentaire: `Après 50 m : après le virage à droite, au niveau du 2ème arbre à gauche` },
      { numero: 7, x: null, y: null, commentaire: `Après 50 m : au niveau de l'arbre à droite, au bout du virage à gauche` },
      { numero: 8, x: null, y: null, commentaire: `Après 50 m : au niveau du 2ème arbre à droite` },
      { numero: 9, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à droite juste après l'intersection avec un chemin sur la gauche` },
      { numero: 10, x: null, y: null, commentaire: `Après 50 m : au niveau du 2ème arbre à droite` },
      { numero: 11, x: null, y: null, commentaire: `Après 50 m : au niveau du 2ème arbre à gauche (juste après le virage à droite)` },
      { numero: 12, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à gauche, juste après le virage à droite` },
      { numero: 13, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à droite, juste avant un virage à gauche (un ruisseau)` },
      { numero: 14, x: null, y: null, commentaire: `Après 50 m : au niveau du 2ème arbre à gauche, juste après le virage à gauche` },
      { numero: 15, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à gauche` },
      { numero: 16, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à droite, juste avant l'intersection` },
      { numero: 17, x: null, y: null, commentaire: `Après 50 m : après l'intersection, au niveau du 2ème arbre à droite` },
      { numero: 18, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à gauche` },
      { numero: 19, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à droite` },
      { numero: 20, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à gauche` },
      { numero: 21, x: null, y: null, commentaire: `Après 50 m : au niveau du 1er arbre à droite, juste avant l'intersection` },
    ],
  },
  "MEG": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154567.46, y: 168498.52, commentaire: `accès: boulevard du Souverain X avenue de Tervueren;

sur la rive ouest, partie sud: juste à côté de la partie privée de la berge (= à hauteur de l'extrémité sud du bâtiment long situé à côté du petit étang);

Longer l'étang vers le nord (= vers le mini golf);` },
      { numero: 2, x: 154590.53, y: 168555.26, commentaire: `Entre le 2ème et 3ème banc ;` },
      { numero: 3, x: 154614.08, y: 168599.59, commentaire: `peu après la partie privée de la berge, à hauteur des conifères situés dans le mini golf, juste derrière la grille à droite du chemin; (= ±10 m après le moine)` },
      { numero: 4, x: 154585.92, y: 168630.06, commentaire: `peu avant le banc et une poubelle, une taque d'égout dans la rigole droite du chemin;
le point est situé 12 dalles de la rigole avant la taque d'égout;` },
      { numero: 5, x: 154508.97, y: 168676.35, commentaire: `face au banc (= au début du bombement convexe de cette rive de l'étang);` },
      { numero: 6, x: 154515.73, y: 168662.84, commentaire: `juste avant le début du bombement convexe de cette rive de l'étang; (= 1 m avant le 1er arbre à gauche du chemin (= planté entre le chemin et le boulevard) et 3 m avant point lumineux du boulevard) , entre un arbre et un banc` },
      { numero: 7, x: 154538.36, y: 168706.71, commentaire: `3 m avant le premier "moine", juste au début du tournant;` },
      { numero: 8, x: 154588.69, y: 168709.94, commentaire: `Entre les 2 bancs situés à gauche du chemin;` },
      { numero: 9, x: 154627.93, y: 168677.16, commentaire: `Entre l’arbre et l’îlot buissonnant (= 1er bombement convexe de la rive de ce côté de l'étang), à hauteur du petit arbre;` },
      { numero: 10, x: 154662.56, y: 168638.83, commentaire: `tout au début du 2ème bombement convexe de la rive de ce côté de l'étang; (= 8 à 9 m avant début du buisson de conifères)` },
      { numero: 11, x: 154704.12, y: 168607.44, commentaire: `au début du 3ème bombement convexe de la rive de ce côté de l'étang, juste après la ramure du saule pleureur;` },
      { numero: 12, x: 154746.14, y: 168580.19, commentaire: `5m après l’îlot buissonnant;` },
      { numero: 13, x: 154773.84, y: 168538.18, commentaire: `2 m avant le 1er gros arbre planté à ± 6 m de la berge;` },
      { numero: 14, x: 154760.45, y: 168488.31, commentaire: `1 m avant 1er arbre d'un groupe de 3 arbres plantés entre le chemin et la berge juste après une zone de suintements; (= 8 dalles de la rigole avant la taque d'égout située dans la rigole à droite du chemin à hauteur de ces 3 arbres plantés)` },
      { numero: 15, x: 154714.28, y: 168465.68, commentaire: `10 m après un groupe de 2 d'arbres (chandelle) plantés entre le chemin et la berge, à hauteur de la taque d'égout dans la rigole à droite du chemin; (= face à la zone humide à gauche du chemin)` },
      { numero: 16, x: 154665.33, y: 168449.52, commentaire: `5 m avant le deuxième banc; (= 5 m avant le 1er arbre d'un groupe de 3 arbres plantés entre le chemin et la berge)` },
      { numero: 17, x: 154615.47, y: 168440.29, commentaire: `à hauteur du gros arbre planté à 2 m de la berge <10 m après un bouquet de conifères; (= 2 à 3 m après le point lumineux situé sur le trottoir)` },
      { numero: 18, x: 154573.45, y: 168460.6, commentaire: `à hauteur du 1er petit arbre planté à 2 m du trottoir avant 2 bouleaux sp.;` },
    ],
  },
  "PAR": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154890.95, y: 168627.03, commentaire: `accès: boulevard du Souverain

Pointe ouest de l'étang (côté avenue Parmentier), devant le saule planté dans la pelouse à 2 m de la berge;` },
      { numero: 2, x: 154931.24, y: 168660.08, commentaire: `reprendre le chemin qui longe l'étang, vers la droite;
passer le banc;
à partir de la plaque d'égout dans la rigole, compter les évacuations d'eau dans le bas du muret à gauche du chemin;
le point d'écoute a lieu a hauteur de la 8ème évacuation d'eau dans le bas du muret;` },
      { numero: 3, x: 154981, y: 168679, commentaire: `poursuivre le chemin vers la droite;
compter ± 14 m après la poubelle dans le très net tournant vers la droite;
descendre alors vers la berge en passant entre les 2 arbres (attention: berge un peu raide);` },
      { numero: 4, x: 154944.78, y: 168631.12, commentaire: `remonter sur le chemin et prendre à droite;
traverser le pont et continuer le chemin jusqu'au coude vers la gauche;
au niveau du coude, prendre à droite dans la végétation et longer le petit talus de l’avenue de Tervueren;
après quelques dizaines de mètres, le long du talus, la clôture (fils de fer non barbelés) est couchée: traverser la clôture à cet endroit;
rejoindre l'étang et longer l'étang jusqu'au 1er angle, presque droit, de la berge, là où l'étang entame un très net rétrécissement;
le point d'écoute a lieu au niveau de cet angle;` },
      { numero: 5, x: 155043, y: 168645.6, commentaire: `revenir sur ses pas pour reprendre le chemin;
contourner l'étang par la droite (sens inverse des aiguilles d'une montre);
le point d'écoute a lieu à la hauteur du 3ème banc (= le premier d'une série de 2 bancs séparés par une poubelle);` },
      { numero: 6, x: 155075.11, y: 168684.64, commentaire: `reprendre le chemin;
le long de la berge est, passer un gué;
juste après le gué, prendre à gauche dans la végétation jusqu'à la berge;
le point a lieu sur la berge;` },
      { numero: 7, x: 155019.07, y: 168703.84, commentaire: `rejoindre le chemin;
poursuivre jusqu'au bâtiment bas;
à la hauteur de la 3ème ouverture murée du bâtiment, prendre à gauche dans la végétation;
le point d'écoute a lieu sur la berge.` },
      { numero: 8, x: 155000, y: 168682, commentaire: `` },
    ],
  },
  "MEP": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154542.51, y: 168509.55, commentaire: `accès: boulevard du Souverain

entrée par la gauche du bâtiment;
le point d'écoute sur la berge juste devant l'entrée (à côté du moine);` },
      { numero: 2, x: 154526.35, y: 168443.06, commentaire: `revenir sur la route et prendre vers la droite;
quelques mètres après le panneau "sens interdit" prendre le chemin à droite;
prendre perpendiculairement à la route jusqu'à la berge (ne prendre ni à droite ni à gauche);
le point d'écoute a lieu sur la berge, passé la haie (symphorine sp.) qui borde l'étang à cet endroit;` },
      { numero: 3, x: 154451.09, y: 168471.69, commentaire: `revenir sur ses pas et emprunter le sentier qui longe la berge de l'étang vers la droite;
peu avant d'atteindre le trottoir du boulevard, 2 arbres (marronniers sp.) poussent sur le côté gauche du chemin;
le point d'écoute a lieu juste avant la ramure des marronniers` },
      { numero: 4, x: 154464.48, y: 168537.71, commentaire: `poursuivre le long de l'étang sur le trottoir d'abord, sur la pelouse ensuite;
le pont d'écoute est situé entre le 1er arbre (saule sp. pleureur) et le 2ème arbre (bouleau pleureur sp.) qui poussent à proximité de la berge dans la pelouse;` },
      { numero: 5, x: 154517.12, y: 168553.41, commentaire: `continuer vers le long de l'étang;
sur la gauche, une haie plaine de jeux, avec une poubelle;
le point d'écoute a lieu le long de la berge à hauteur de cette poubelle;` },
    ],
  },
  "VER": {
    "Transect forestier (3 min)": [
      { numero: 0, x: 149104.09, y: 162993.85, commentaire: `Les bottes sont recommandées sur ce transect.
L'entrée du site se situe le long de l'avenue Dolez, entre les numéros 510 et 512. Prendre la route entre ces deux maisons.` },
      { numero: 1, x: 149152.09, y: 163010.35, commentaire: `Le premier point est situé 4 mètres au-delà de l'entrée de la forêt. Autre repère : 2 mètres après le 1er arbre épais à gauche de la route.` },
      { numero: 2, x: 149194.85, y: 163035.85, commentaire: `(direction difficile. Si cela ne fonctionne pas : décrivez-le à nouveau. Le point est à 50 m, à revérifier ; points éventuellement méconnaissables ?)

Suivez la route tout droit. Puis la route tourne légèrement à gauche.
Après le virage, passer le premier tronc épais à droite (juste après 2 troncs fins).
± 8 mètres plus loin, 3 arbres en rang au milieu de la partie droite de la route.
Cinq mètres plus loin, dans l'axe des 3 arbres alignés, se trouve une souche basse juste à côté de la partie droite de la route.
La pointe est située à la hauteur de cette souche basse. Autre repère : une souche épaisse à environ 3 mètres à droite de la souche basse.` },
      { numero: 3, x: 149230.86, y: 163071.11, commentaire: `Suivez la route tout droit jusqu'à ce qu'elle tourne brusquement à 90° vers la gauche.
Le point est situé à ce virage.` },
      { numero: 4, x: 149268.19, y: 163103.96, commentaire: `Suivez la route qui tourne à gauche.
Quelques mètres plus loin se trouve un carrefour (point de reconnaissance : une barrière ferme la route à gauche) : continuer tout droit.
Longer sur votre droite 2 troncs épais (le premier se trouve face à la barrière, en forme d'îlot au carrefour).
Le point est située ± 5 mètres au-delà du 2ème tronc épais.` },
      { numero: 5, x: 149306.77, y: 163092.8, commentaire: `Marcher tout droit.
La route arrive à un carrefour (la route continue tout droit, une autre descend à droite).
Le point se situe à l'intersection avec une route à droite, au tout début de cette route à droite.` },
      { numero: 6, x: 149303.15, y: 163043.68, commentaire: `Prendre la route qui descend à droite et continue jusqu'à la barrière de l’Avenue du Gui/Maretaklaan.
Le point est situé contre la barrière.` },
      { numero: 7, x: 149315.21, y: 162994.85, commentaire: `Prendre le chemin à droite qui descend le long de la clôture des jardins.
Passé le coin de la clôture, la route tourne à gauche.
Le point se situe au niveau du 1er tronc à droite de la route. Autre repère : entre le 5ème et le 6ème poteau de clôture en béton.` },
      { numero: 8, x: 149334.19, y: 162948.14, commentaire: `Continuez tout droit le long de la clôture.
Ce point est situé au coin de la clôture (là où la clôture se courbe vers la gauche).` },
      { numero: 9, x: 149354.99, y: 162902.03, commentaire: `Juste après le point 8, ce sentier tourne légèrement à droite et descend.
Comptez les arbres sur le côté gauche de la route. Passé le 6ème arbre à moins de 3 m de la route, le sentier monte sur une petite colline (groupe de ronces à gauche).
Le point est située juste derrière l'extrémité de la colline, à proximité du groupe de ronces. Autre repère : 5 mètres après le tronc à gauche.` },
      { numero: 10, x: 149372.77, y: 162855.32, commentaire: `Suivre le sentier qui tourne d'abord à gauche puis à droite, puis descend rapidement dans le ravin.
Le point se situe sur le versant, au niveau d'un houx à gauche poussant autour d'un tronc.` },
      { numero: 11, x: 149386.03, y: 162807.4, commentaire: `Descendez la pente et suivez la route qui rejoint plus loin une clôture.
Le point est situé juste derrière le coin de la clôture, à hauteur d'un couvercle d'égout.` },
      { numero: 12, x: 149388.44, y: 162757.06, commentaire: `Suivre la route jusqu'à ce que le canal fasse un virage en S à droite. Il y a un arbre entre le canal et la route. Le point est à 1 mètre au-delà de cet arbre.` },
      { numero: 13, x: 149390, y: 162742, commentaire: `Suivez la route jusqu'à l'intersection, puis continuez tout droit.
Le point est situé à ± 6 mètres derrière l'intersection. Autre repère : 1 mètre avant une grosse souche d'arbre à droite.` },
      { numero: 14, x: 149353.18, y: 162664.54, commentaire: `Comptez à gauche :
1 x arbres multi-troncs légèrement plus épais (saule), puis :
1 x 5 arbres (peupliers) très rapprochés dont 1 cassé, puis :
1 tronc épais.
Le point est situé à la hauteur de cet épais tronc (saule).` },
      { numero: 15, x: 149310.99, y: 162667.86, commentaire: `Continuez tout droit, quittez la forêt et tournez à droite.
Les points suivants se trouvent en dehors de la forêt, dans la Perckestraat. Faites attention à la circulation, car cette rue n'a pas de trottoir.
Le point est situé ± 7 mètres après le premier poteau d'éclairage à droite de la rue.` },
      { numero: 16, x: 149261.26, y: 162669.06, commentaire: `Le point est situé au niveau du 4ème poteau d'éclairage (n°81). Autre repère : 4 mètres avant la passerelle en béton au dessus du tout à l'égout, qui mène à l'entrée d'une propriété privée.` },
      { numero: 17, x: 149213.64, y: 162654.9, commentaire: `Le point suivant se situe au tout début de l'intersection avec l’Avenue Dolez/Dolezlaan. Autre repère : à l'extrémité de la façade de la maison n° 144. Autre repère : poteau d'éclairage 85 juste avant l'intersection.` },
      { numero: 18, x: 149172.65, y: 162627.77, commentaire: `Tournez à gauche (= suivez la Rue de Percke/Perckestraat).
Le point est situé près de la porte d'entrée du n°137.` },
      { numero: 19, x: 149136.18, y: 162592.81, commentaire: `Le point est situé 10 mètres après le poteau d'éclairage n°92, à gauche de la route.` },
      { numero: 20, x: 149088.57, y: 162578.04, commentaire: `Plus loin, passez devant 2 portes de garage à droite et continuez.
Environ 30 mètres après les portes du garage, il y a un chemin sur la droite qui longe le bord de la route. (Ce chemin est à peine visible, car il aboutit à une impasse lors d'un récent lotissement)
Le point se situe 3 mètres avant ce sentier qui remonte le bord de la route sur le côté droit. Autre repère : à hauteur d'un double tronc d'arbre à droite.
 Bois du Laerbeek` },
    ],
  },
  "KAU": {
    "Transect forestier (3 min)": [
      { numero: 0, x: 148885.6, y: 163940.35, commentaire: `Rendez-vous à l'entrée du cimetière de l’Avenue de la Chênaie ;
L'entrée du Kauwberg se situe à quelques dizaines de mètres de l'entrée du cimetière, en direction de l'avenue Dolez (points de repère : panneau de signalisation "accès interdit à tous les automobilistes" ; 1 poubelle ; 2 barrières en bois ;
Le point est situé sur le trottoir étroit en face de l'entrée du Kauwberg.` },
      { numero: 1, x: 148935.87, y: 163949.93, commentaire: `Emprunter le chemin qui mène à l'intérieur du site. Il traverse le sous-bois et se termine par une petite clairière (ronces).
Le point se situe au fond de la clairière, 2m avant le premier tronc d'arbre (robinier).` },
      { numero: 2, x: 148982.96, y: 163968.28, commentaire: `Le point suivant se trouve au début de la clôture, à gauche du chemin.` },
      { numero: 3, x: 149026.05, y: 163991.43, commentaire: `Suivez le chemin tout droit.
Gardez un arbre (Sorbier des oiseleurs) à votre gauche, devant la clôture.
Le point se trouve environ 18-19 mètres plus loin, 1 mètre après le Sureau noir (buisson ancien) sur le côté droit de la route.` },
      { numero: 4, x: 149066.75, y: 164018.56, commentaire: `Continuez à marcher tout droit. Le chemin continue dans la forêt.
Quelques mètres plus loin, un chemin forestier part sur la gauche (ne pas l’emprunter). Le point est situé juste après l'intersection avec ce chemin.` },
      { numero: 5, x: 149110.64, y: 164040.1, commentaire: `Continuez à marcher tout droit.
Juste après une descente raide, le chemin se termine dans une clairière.
Le point est au centre de cette clairière.` },
      { numero: 6, x: 149152.93, y: 164064.84, commentaire: `Continuez tout droit à la prochaine intersection.
Environ 15 m après l'intersection, prendre un chemin à gauche (repère : quelques mètres avant d'arriver à la clôture à droite de la route).
Quelques mètres plus loin, prendre un autre chemin à gauche.
Le point est situé à 3 mètres au-delà de cette dernière intersection.` },
      { numero: 7, x: 149172.08, y: 164103.94, commentaire: `Le chemin tourne à droite puis à gauche en passant devant un croisement à droite.
Vous passez devant un arbre qui pousse au milieu de la route.
Le point est à 2 mètres.` },
      { numero: 8, x: 149156.12, y: 164150.23, commentaire: `Continuez à suivre la route.
Quelques mètres plus loin, le chemin contourne un groupe d'arbustes (Noisetier).
Il y a ensuite un sol inégal avec des racines, après quoi le sentier tourne à droite, avant de tourner légèrement à gauche.
Il y a un groupe de noisetiers au milieu de la route, juste avant que le chemin ne tourne à gauche.
Le point se situe juste au-delà de ce virage.` },
      { numero: 9, x: 149169.69, y: 164194.92, commentaire: `Suivre la route qui tourne d'abord légèrement à droite, puis à gauche puis encore à droite au niveau de 1x2 troncs multiples de Sureau noir à l'intérieur du virage (le premier de ces troncs se divise en deux troncs plus petits, le second en quatre).
Le point se situe au niveau de ces troncs.` },
      { numero: 10, x: 149175.87, y: 164243.08, commentaire: `Le chemin tourne ensuite à gauche (cabane derrière la clôture).
Ignorez une souche d'arbre de 1x3 troncs épais (Prunus sp.).
Le chemin tourne ensuite un peu plus loin autour d'un groupe de noisetiers. Une épaisse racine de ces noisetiers traverse une partie de la route.
La pointe est située 6 m avant cette racine au milieu de la route.` },
      { numero: 11, x: 149153.34, y: 164284.91, commentaire: `Plus loin, un bosquet de noisetiers au milieu du chemin, puis le chemin tourne légèrement à gauche.
La pointe est située à hauteur du 1er tronc épais (charme) du côté droit au-delà de ce virage (point de reconnaissance : ce tronc porte plusieurs petites branches basses et un numéro 1 peint à la peinture orange` },
      { numero: 12, x: 149138.46, y: 164328.36, commentaire: `Plus loin : Un petit chemin (discret) part à gauche. Ne pas le prendre.
Un deuxième sentier, bien balisé, part à gauche (avec 2 bosses dans les premiers mètres).
Le point suivant se situe 3 m avant l'intersection avec ce 2ème chemin. Autre repère : 1x3 troncs d'arbres se rejoignant à la base, face au chemin partant à gauche.` },
      { numero: 13, x: 149117.14, y: 164364.16, commentaire: `Marcher tout droit.
Le chemin tourne légèrement à gauche, immédiatement après il tourne à droite et descend. D'ICI : ROUTE FERMÉE ET REPÈRES DISPARUS. POINT ALTERNATIF NÉCESSAIRE.
(Suivre le nouveau chemin jusqu'à un carrefour, où, entre autres, une clôture contourne un tronc épais sur le côté droit. De là suivez la description du point 15).` },
      { numero: 14, x: 149085.76, y: 164400.77, commentaire: `ROUTE FERMÉE ET POINTS DISPARUS. POINT ALTERNATIF NÉCESSAIRE.` },
      { numero: 15, x: 149060.82, y: 164443.82, commentaire: `Après avoir suivi le « nouveau » chemin après le point 13, nous arriverons à un carrefour où, sur le côté droit, se trouve une clôture autour d'un tronc épais. Suivez le chemin tout droit devant cette clôture. Ignorez 1x3 troncs épais et 1 chemin étroit.
Le point se situe à environ 4m après l'intersection avec ce petit chemin qui part à gauche.` },
      { numero: 16, x: 149026.22, y: 164476.4, commentaire: `Ce point se situe à proximité d'un poteau anti-voiture au milieu du chemin, peu avant la maison à droite de la route.` },
      { numero: 17, x: 148976.34, y: 164479.22, commentaire: `Tourner à gauche à l'intersection avec la route pavée. Les pavés se transforment bientôt en chemin.
A l'intersection suivre le chemin à droite.
Le point est situé 4 mètres au-delà de cette intersection.` },
      { numero: 18, x: 148940.53, y: 164466.34, commentaire: `Plus loin, longez la clôture avec les potagers.
Le chemin tourne ensuite à gauche dans le bosquet (ne plus suivre le chemin longeant la clôture des potagers).
Au dessus de la route vous verrez un noisetier en surplomb.
Le point est situé 8 m plus loin au niveau de racine descendantes.` },
      { numero: 19, x: 148925.65, y: 164430.54, commentaire: `Traversez une route en contrebas. Le point est situé au bout du chemin creux, là où se trouve une dépression dans le sol du côté droit.` },
      { numero: 20, x: 148875.77, y: 164422.9, commentaire: `Continuez et traversez la « clôture » constituée de poteaux de bois enfoncés dans le sol.
Suivez le chemin tout droit.
Le chemin se termine soudain dans un pré.
Le point se situe au bout du chemin dans la clairière (le chemin vire ici dans la prairie), juste derrière les 2 derniers arbustes (aubépine) Kinsendaal` },
    ],
  },
  "VUI": {
    "Transect forestier (3 min)": [
      { numero: 1, x: null, y: null, commentaire: `Le point de départ est situé au carrefour entre la chaussée de Waterloo (N5) et la drève du Vuilbeek (au nord).

Le point est situé dans la drève du Vuilbeek (partant vers le sud en direction de la forêt), 10 mètres après le carrefour (à l'intersection avec le sentier cyclable), au niveau du 1er arbre à droite de la drève.` },
      { numero: 2, x: null, y: null, commentaire: `Le point 2 est situé 50 mètres plus loin, à hauteur du 1er arbre à gauche de la drève.` },
      { numero: 3, x: null, y: null, commentaire: `Le point 3 est situé 50 mètres plus loin, à hauteur du 2ème arbre à gauche de la drève.` },
      { numero: 4, x: null, y: null, commentaire: `Le point 4 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite de la drève.` },
      { numero: 5, x: null, y: null, commentaire: `Le point 5 est situé 50 mètres plus loin, à hauteur du 3ème arbre à gauche (le 2ème est juste en face d'un grand arbre?).` },
      { numero: 6, x: null, y: null, commentaire: `Le point 6 est situé 50 mètres plus loin, à hauteur du 3ème arbre à droite, juste avant l'intersection avec un chemin à gauche et un chemin à droite.` },
      { numero: 7, x: null, y: null, commentaire: `Prendre le petit sentier à gauche. Le point 7 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du sentier.` },
      { numero: 8, x: null, y: null, commentaire: `Le point 8 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du sentier.` },
      { numero: 9, x: null, y: null, commentaire: `Le point 9 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du sentier.` },
      { numero: 10, x: null, y: null, commentaire: `Le point 10 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du sentier, juste avant l'intersection avec le chemin qui revient de la droite.` },
      { numero: 11, x: null, y: null, commentaire: `Prendre le chemin à droite à l'intersection. Le point 11 est situé 3 mètres plus loin (après l'intersection), à hauteur du 1er arbre à droite du chemin.` },
      { numero: 12, x: null, y: null, commentaire: `Le point 12 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du chemin.` },
      { numero: 13, x: null, y: null, commentaire: `Le point 13 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du chemin.` },
      { numero: 14, x: null, y: null, commentaire: `Le point 14 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du chemin.` },
      { numero: 15, x: null, y: null, commentaire: `Le point 15 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du chemin.` },
      { numero: 16, x: null, y: null, commentaire: `Le point 16 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du chemin.` },
      { numero: 17, x: null, y: null, commentaire: `Le point 17 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du chemin.` },
      { numero: 18, x: null, y: null, commentaire: `Le point 18 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du chemin.` },
      { numero: 19, x: null, y: null, commentaire: `Le point 19 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du chemin.` },
      { numero: 20, x: null, y: null, commentaire: `Le point 20 est situé 50 mètres plus loin, à hauteur du 1er arbre à droite du chemin.` },
    ],
  },
  "WOR": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154430.27, y: 169002.83, commentaire: `accès: avenue de Tervueren, boulevard du Souverain;

à partir de l'avenue de Tervueren remonter l'avenue du parc de Woluwe (face au boulevard de la Woluwe) et laisser 2 poteau lumineux (C39 puis C38, marqués dans le bas);
dès la fin du massif boisé (présence d’un panneau didactique chauves-souris) descendre dans la pelouse en longeant la lisière;
le point d'écoute a lieu contre la berge dans l'axe de la lisière;
Travaux point inaccessible` },
      { numero: 2, x: 154455.79, y: 169043.13, commentaire: `remonter vers la route et prendre direction avenue de Tervueren;
juste avant d'arriver au trottoir de l'avenue de Tervueren, prendre à droite dans le chemin;
le point d'écoute est situé juste avant la zone de végétation aquatique, sur la berge (après la zone buissonnante),
juste après la cascade;` },
      { numero: 3, x: 154468.56, y: 168995.44, commentaire: `plus loin, après avoir traversé un petit ruisseau, dépasser un saule; le dévidoir de l'étang est situé juste après ce saule ;
le point d'écoute est situé 4 à 5 m après le dévidoir;` },
      { numero: 4, x: 154486.02, y: 168947.08, commentaire: `le point est situé à hauteur du premier piquet sortant de l'eau après la zone de végétation, au début de la végétation aquatique, face au petit saule poussant dans l’eau;` },
      { numero: 5, x: 154494.08, y: 168896.03, commentaire: `le point est situé à hauteur du dernier piquet sortant de l'eau à quelques mètres de la berge;` },
      { numero: 6, x: 154483.33, y: 168844.32, commentaire: `la Woluwe disparaît sous le talus à main gauche;
un peu plus loin, un tronc d'arbre (platane sp.) se dresse juste devant une zone de buissons;
le point est situé 4 à 5 m après ce tronc d'arbre;` },
      { numero: 7, x: 154461.84, y: 168796.63, commentaire: `rejoindre le chemin en dur puis contourner l'étang jusqu'à au gué;
le point est situé au milieu du gué, les détecteurs dirigés vers le grand étang;` },
      { numero: 8, x: 154428.93, y: 168754.98, commentaire: `le point est situé sur ce même gué, au même endroit, mais les détecteurs dirigés vers le petit étang;` },
      { numero: 9, x: 154408.78, y: 168706.62, commentaire: `contourner le petit étang par la gauche en reprenant le chemin;
le pont d'écoute est situé à dos au tronc d'un conifère, quelques mètres avant d’être face à l’île;` },
      { numero: 10, x: 154375.19, y: 168669.68, commentaire: `le point est situé à l'extrémité s-o de l'étang (à hauteur du premier tipi permettant de faire sécher l’herbe, face à des tronc coupés);` },
      { numero: 11, x: 154333.55, y: 168680.42, commentaire: `poursuivre le long de la berge et dépasser l'île;
le point est situé +/- 3 mètres après l’aulne (le point situé initialement à 6 mètres n’était plus accessible vu la présence d’un massif de jeunes aulnes, même s’il est à nouveau accessible, on garde à 3 m)  description transects terrestres : Monitoring à l’aide de transects en milieu terrestre

Kauwberg` },
      { numero: 12, x: 154353.03, y: 168724.08, commentaire: `` },
    ],
  },
  "WOL": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154402.73, y: 169059.93, commentaire: `accès: avenue de Tervueren, rue Bemel;

le point d'écoute a lieu sur le pont à l'extrémité sud de l'étang (face au début du boulevard de la Woluwe) travaux point inaccessible;` },
      { numero: 2, x: 154168.99, y: 169243.29, commentaire: `prendre la route (avenue du parc de Woluwe) vers la gauche puis prendre le premier chemin à droite;
le chemin court un certain temps en sous-bois puis sort au niveau d'une pelouse;
descendre vers l'étang dans la pelouse;
à proximité immédiate de la berge poussent 2 hauts conifères (un 3ème subsiste à l'état de trou de souche);
le point d'écoute a lieu à hauteur du trou de souche;` },
      { numero: 3, x: 154008.45, y: 169217.1, commentaire: `retourner sur le chemin, poursuivre vers la droite puis prendre vers la droite pour rejoindre l'autre étang;
le point d'écoute a lieu sur la digue entre les 2 étangs, au niveau de la sortie d'eau du petit étang (étang du Bémel) vers le grand étang (étang long);` },
      { numero: 4, x: 153929.2, y: 169149.93, commentaire: `contourner complètement le petit étang;
le point d'écoute a lieu à l'extrémité opposée de l'étang (berge s-o), à hauteur du tronc de saule sp.(qui est en partie coupé);` },
      { numero: 5, x: 154019.87, y: 169225.16, commentaire: `revenir sur la digue entre le petit étang et l'étang long;
le point d'écoute a lieu précisément à l'extrémité ouest de l'étang long, avancer jusqu’à la roselière (= dos au point 3);` },
      { numero: 6, x: 154059.5, y: 169273.52, commentaire: `contourner l'étang sur la gauche;
le point d'écoute est situé à hauteur d’une grosse souche (pas la souche qui est constituée d’une multitude de petites souches) situé dans la pelouse entre la berge et le chemin avant une zone buissonnante (il y a des zones de suintement dans la pelouse);` },
      { numero: 7, x: 154123.31, y: 169313.15, commentaire: `reprendre le chemin qui contourne l'étang;
laisser une partie boisée / buissonnante à main droite puis descendre dans la pelouse;
le point d'écoute est situé à l'extrémité de cette zone de pelouse, 5m à droite du sol pleureur ;` },
      { numero: 8, x: 154197.2, y: 169322.55, commentaire: `Contourner la zone buissonnante, longer la berge à contre sens,
le point d'écoute est situé près du 4e frêne aligné, le long de la berge;` },
      { numero: 9, x: 154268.4, y: 169294.34, commentaire: `poursuivre le long de la berge;
le point d'écoute est situé 3m avant 2 bancs séparés par une poubelle à proximité de la berge;` },
      { numero: 10, x: 154336.24, y: 169258.74, commentaire: `le point d'écoute est situé à proximité de la berge, face à la roselière (= à hauteur d'un tronc d'arbre (= érable) situé à gauche du chemin dans la zone buissonnante);` },
      { numero: 11, x: 154388.63, y: 169206.35, commentaire: `le point d'écoute est situé dans la pelouse à proximité de la berge 5m après un saule pleureur;` },
      { numero: 12, x: 154424.23, y: 169135.83, commentaire: `le point d'écoute est situé dans la pelouse à proximité de la berge, face à la végétation (= juste après 1 x 3 arbres (= charmes) dans pelouse);` },
      { numero: 13, x: 154403, y: 169181, commentaire: `le point d'écoute est situé dans la pelouse à proximité de la berge (= à la fin de la zone de végétation aquatique) (= à mi-distance entre un frêne et un saule pleureur, presque à hauteur du feu pour les voitures);` },
      { numero: 14, x: 154418, y: 169136, commentaire: `le point d'écoute est situé dans la pelouse à proximité de la berge (= ± 4 m après le 2ème tronc de saule pleureur);` },
      { numero: 15, x: 154419, y: 169088, commentaire: `le point d'écoute est situé dans la pelouse à proximité de la berge (= juste avant tronc de saule);` },
    ],
  },
  "TEN": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154223.99, y: 165993.55, commentaire: `accès: boulevard du Souverain et rue Ten Reuken

le point est situé sur le pont en bois dans la pointe sud-est de l'étang; les détecteurs seront dirigés vers l'étang (et non vers la cascade);` },
      { numero: 2, x: 154153.52, y: 166030.67, commentaire: `longer l'étang vers la gauche dans les sens des aiguilles d'une montre; le point est situé sur la plaque en béton sous laquelle passe la Woluwe (embouchure de la Woluwe dans l'étang) lampadaire + poubelle dans le dos;` },
      { numero: 3, x: 154138.42, y: 166078.49, commentaire: `laisser un premier croisement à main gauche;
le point est situé à hauteur du 2ème arbre planté dans la pelouse (= à droite du chemin) (+/- 6 mètres avant le 1er lampadaire après le 2e croisement);` },
      { numero: 4, x: 154130.24, y: 166125.68, commentaire: `laisser un banc à gauche puis 1 poteau lumineux à droite du chemin;
le point est situé entre le cèdre et le saule pleureur (après poteau lumineux à droite du chemin) (= juste avant une poubelle;` },
      { numero: 5, x: 154128.98, y: 166176.64, commentaire: `le point est situé près d’un ponton disparu (les piliers dépassent encore de l’eau) protégé par une barrière, à main gauche un passage de la route vers le chemin;` },
      { numero: 6, x: 154147.23, y: 166223.83, commentaire: `1 m avant la poubelle (= à hauteur du 3ème arbre à gauche, un tilleul, après le banc);` },
      { numero: 7, x: 154164.84, y: 166269.76, commentaire: `après le 2ème poteau lumineux (dépasser le nouveau ponton):
le point d'écoute à lieu à hauteur de l'avaloir dans la rigole;` },
      { numero: 8, x: 154162.33, y: 166320.73, commentaire: `passer 2 poteaux lumineux;
le point d'écoute a lieu à hauteur de l'avaloir dans la rigole (= ± 12 m avant la poubelle);` },
      { numero: 9, x: 154159.81, y: 166371.06, commentaire: `passer 2 poteaux lumineux;
le point d'écoute  a lieu à hauteur de la 6ème plaque de béton formant la rigole du côté droit du chemin (sous le « cèdre aux Conures veuves » qui possède plusieurs gros nids à perruches);` },
      { numero: 10, x: 154168.62, y: 166420.77, commentaire: `laisser un ensemble de 3 bancs légèrement en retrait du chemin;
le point d'écoute a lieu à la hauteur du croisement avec le chemin qui quitte le parc;` },
      { numero: 11, x: 154212.03, y: 166430.21, commentaire: `passer le pont puis rejoindre le trottoir;
le point d'écoute a lieu à hauteur du "hêtre pleureur" (médaille à 2m 011002) dans la pelouse qui borde l'étang (= peu après le casse vitesse de la rue);` },
      { numero: 12, x: 154249.16, y: 166394.34, commentaire: `le point d'écoute a lieu à hauteur de la 9ème plaque de béton de la rigole après le panneau chauves-souris (à hauteur du petit arbre planté à 3 m de la berge);` },
      { numero: 13, x: 154260.48, y: 166328.28, commentaire: `atteindre le 2ème poteau lumineux;
le point d'écoute a lieu à hauteur de la 3ème plaque de béton après le 2ème poteau lumineux;` },
      { numero: 14, x: 154245.38, y: 166224.46, commentaire: `le point d'écoute a lieu à hauteur du croisement du chemin ;` },
      { numero: 15, x: 154210.15, y: 166184.82, commentaire: `le point d'écoute a lieu 10 m après le kiosque, contre 2 arbres qui poussent côte à côte, à gauche en regardant l'étang;` },
      { numero: 16, x: 154201.97, y: 166111.21, commentaire: `passer 1 poteau lumineux;
3 arbres rapprochés sont plantés à droite du chemin;
le point d'écoute a lieu 2 m après l’arbre mort couché (= début du haussement du muret à gauche du chemin);` },
      { numero: 17, x: 154205, y: 166078, commentaire: `à hauteur du creux juste après la 1ère bosse du chemin, descendre vers la berge (lampadaire dans le dos, face à l’îlot); se mettre au plus proche du boisement à côté des rondins de bois au sol,
face à la barrière en bois;` },
    ],
  },
  "SOU": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154651.42, y: 169377.1, commentaire: `accès: boulevard de la Woluwe

entrer dans le parc par l'entrée sud-ouest;
après avoir traversé la Woluwe, prendre à droite;
le point d'écoute a lieu face au banc juste après l'entrée;` },
      { numero: 2, x: 154666.17, y: 169328.8, commentaire: `poursuivre vers la droite (sens inverse des aiguilles d'une montre);
le point a lieu sur la plateforme de la berge sud de l'étang;
! le ponton est en train de se casser !` },
      { numero: 3, x: 154722.57, y: 169368.14, commentaire: `juste avant le pont, prendre à gauche;
le point d'écoute a lieu à gauche des 3 arbres situés sur la berge;` },
      { numero: 4, x: 154739.64, y: 169435.52, commentaire: `le point d'écoute a lieu sur le ponton suivant (toujours berge est);
! le ponton est en train de se casser !` },
      { numero: 5, x: 154707.24, y: 169487.87, commentaire: `le point d'écoute a lieu au niveau de la berge nord, 10 mètres avant une poubelle + lampadaire numéro 4400;` },
      { numero: 6, x: 154675.14, y: 169441.6, commentaire: `le point d'écoute a lieu devant le ponton (ce ponton n’est plus praticable) de la berge ouest, passé le 1er banc (juste avant le poteau lumineux 4397);` },
    ],
  },
  "ROY": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 154234.3, y: 165856.45, commentaire: `accès: par la rue Ten Reuken;

le point est situé dans le coin qui constitue la pointe est de l'étang;
En venant du passage pour piétons, continuer le chemin tout droit sur 10 mètres, prendre le chemin à droite, descendre sur la berge à gauche.` },
      { numero: 2, x: 154189.13, y: 165839, commentaire: `parking pour voitures devant la façade nord du bâtiment;
le point est situé dans le coin est du parking, à côté du chenal d'arrivée d'eau;` },
      { numero: 3, x: 154145.51, y: 165832.84, commentaire: `parking pour voitures devant la façade nord du bâtiment;
le point est situé presque dans le coin du parking opposé au point 2, à hauteur de la 8ème plaque métallique entre le parking et la pièce d'eau (= entre 5ème et 6ème place de parking),
au milieu du 2ème banc;` },
      { numero: 4, x: 154103.93, y: 165860.04, commentaire: `sur la berge ouest:
le point est situé à hauteur d’un grand marronnier à gauche du chemin, entre les 2ème et 3ème bancs;` },
      { numero: 5, x: 154082.38, y: 165897.51, commentaire: `prendre à droite le sentier qui longe la berge nord;
le point a lieu à hauteur du 1er réverbère (= 5 m avant dévidoir),
entre les 2 arbres et le dévidoir;` },
      { numero: 6, x: 154107.53, y: 165941.14, commentaire: `le point a lieu à hauteur de la pointe de l'île;` },
      { numero: 7, x: 154152.18, y: 165962.69, commentaire: `` },
      { numero: 8, x: 154189.65, y: 165936, commentaire: `` },
    ],
  },
  "LEY": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 153729.78, y: 165579.81, commentaire: `accès: par le boulevard du Souverain ou l'avenue de la Fauconnerie;

extrémité nord de l'étang, à hauteur du moine (côté avenue de la Fauconnerie);` },
      { numero: 2, x: 153719, y: 165530.03, commentaire: `berge est (= côté boulevard du Souverain):
laisser 2 bancs côté gauche du chemin; à partir du banc, compter 4m (juste avant l’îlot);` },
      { numero: 3, x: 153693.34, y: 165485.89, commentaire: `sur le gué en regardant la partie nord de l'étang (= côté point 1);` },
      { numero: 4, x: 153658.44, y: 165449.45, commentaire: `sur le gué en regardant la partie sud de l'étang, non encore inventoriée;` },
      { numero: 5, x: 153628.16, y: 165407.88, commentaire: `± 15 m après le premier banc, 8m avant la poubelle,
(qui est presque face à la pointe sud de l'île);` },
      { numero: 6, x: 153593.26, y: 165409.93, commentaire: `contourner la pointe sud de l'étang;
le point est situé 2 m après la pointe sud de l'étang, sur la berge ouest;` },
      { numero: 7, x: 153613.27, y: 165457.66, commentaire: `continuer sur l'autre berge;
laisser un banc+poubelle puis un banc;
le point d'écoute est situé sur la berge, ± 1 m après ce banc (= face à la pointe nord de l'île) ou ± 3 m après le charme;` },
      { numero: 8, x: 153654.33, y: 165484.35, commentaire: `longer l'étang dans le sens des aiguilles d'une montre;
laisser un banc;
le point d'écoute est situé ± 15 m après le banc.` },
      { numero: 9, x: 153672.3, y: 165531.06, commentaire: `` },
    ],
  },
  "HTL": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 152636.4, y: 166837.21, commentaire: `accès: par l'avenue de la Héronnière, côté la rue des Bégonias (côté ouest du parc de La Héronnière);

Au bout du ponton, dans le coin droit (= coin nord-est);
attention : par temps humide, le ponton peut être particulièrement glissant` },
      { numero: 2, x: 152681.84, y: 166819.41, commentaire: `A l’extrémité Est de l’étang, à droite des 2 troncs coupés en chandelles couverts de lierre ;` },
    ],
  },
  "HPR": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 153080.84, y: 166892.22, commentaire: `accès: par la rue des Pêcheries à côté du parking au n° 97;

entrée à proximité immédiate du point n° 4;
on atteint le point n° 1 en passant par les points 3, 2 et 1;

sur la berge sud de l'étang (berge opposée à la rue des Pêcheries)
A partir de la clôture qui ferme l'accès à la berge, le point est situé à gauche du premier gros arbre (marronnier) le long de la berge;` },
      { numero: 2, x: 153031.56, y: 166879.66, commentaire: `à gauche du 2ème gros tronc (marronnier) le long de la berge, après le point précédent;` },
      { numero: 3, x: 152984.93, y: 166865.44, commentaire: `12 m avant le gros marronnier du coin, 14m avant le pont, à droite d'un arbre planté à ±1 m de la berge;` },
      { numero: 4, x: 152956.16, y: 166918.02, commentaire: `dans le coin de l'étang, au niveau du croisement entre le chemin de terre et le chemin en pavé;` },
      { numero: 5, x: 153009.73, y: 166936.87, commentaire: `au bout du 2ème ponton, à côté d'un jeune arbre (aulne); attention par temps humide, peut être très glissant.` },
      { numero: 6, x: 153051.74, y: 166962.01, commentaire: `1 m après le 4ème frêne le long du chemin (= 7 m avant panneau de circulation signalant une route sinueuse planté sur le trottoir mais dépassant la haie);` },
      { numero: 7, x: 153094.4, y: 166977.55, commentaire: `à hauteur du 5ème arbre le long du chemin (frêne) ;` },
      { numero: 8, x: 153152.94, y: 166975.24, commentaire: `passer le ponton hémisphérique;
Dépasser le chemin pavé et, 3 m après un arbre planté à droite du chemin, se placer face à l’étang, devant une barrière.` },
    ],
  },
  "HMC": {
    "Plan d'eau (2 min)": [
      { numero: 1, x: 153085.02, y: 166792.59, commentaire: `accès: par l'avenue de la Héronnière, face au numéro 90-92;

sur le ponton de pierre situé à l'ouest de l'étang, au bord de l'eau;` },
    ],
  },
  "GAN": {
    "Transect forestier (3 min)": [
      { numero: 0, x: 145275.08, y: 174425.65, commentaire: `Entrée par la Rue du Bois : route qui longe le Molenbeek, juste avant le parking.
Prendre la route à droite lorsque vous regardez le parking.` },
      { numero: 1, x: 145324.16, y: 174428.43, commentaire: `Le point est situé au bout du 1er banc à gauche de la route. Autre repère : un groupe d’arbre en bordure de l’autre côté du cours d’eau.` },
      { numero: 2, x: 145373.24, y: 174418.24, commentaire: `Le point se situe 5 m avant un groupe de grands arbres sur la droite (frêne et aulne noir). Autre repère : ± 15 mètres avant un banc à gauche de la route.` },
      { numero: 3, x: 145421.39, y: 174417.32, commentaire: `Marchez 50 m plus loin. Le point 3 se situe à l'endroit où un arbre colle littéralement à la clôture de gauche. Autre repère : à 5 m après une forêt de noisetiers sur la droite. 15m après le 3ième banc.` },
      { numero: 4, x: 145469.54, y: 174427.5, commentaire: `Marchez 50 m plus loin. Le point se situe 10m après un virage de la route (avec des buissons à droite). Autre repère : 10m devant il y a un banc.` },
      { numero: 5, x: 145516.77, y: 174442.32, commentaire: `Marchez 50 m plus loin. Le point 5 se situe à l'endroit où un arbre (Aulne noir) s'appuie contre la clôture à gauche. Autre repère : l'aubépine sur le côté droit de la route.` },
      { numero: 6, x: 145551.96, y: 174436.76, commentaire: `Marchez 50 m plus loin. Le point se situe 10m avant le virage à droite.` },
      { numero: 7, x: 145572.34, y: 174391.39, commentaire: `La route tourne à droite, traverse le pont puis continue tout droit à travers le marais.
Continuer jusqu'à l'intersection ± au milieu du marais (route à droite).
Le point est situé 3 mètres avant le début de l'intersection, en bordure du pré.` },
      { numero: 8, x: 145604.75, y: 174354.35, commentaire: `Continuez tout droit jusqu'à atteindre presque la prochaine intersection.
Le point est situé 4/5 mètres avant l'intersection, près d'un buisson (saule) du côté gauche de la route.` },
      { numero: 9, x: 145651.05, y: 174354.35, commentaire: `A l'intersection, tourner à gauche (impossible de continuer tout droit).
La route tourne à droite puis arrive à une intersection en forme de Y.
Le point est situé ± 10 mètres avant l'intersection.` },
      { numero: 10, x: 145689.02, y: 174355.27, commentaire: `Au carrefour en Y, tournez à gauche.
Le chemin traverse une clairière puis croise un petit chemin. Il y a une mare dans la clairière.
Le point est au début de l'intersection.` },
      { numero: 11, x: 145738.1, y: 174357.12, commentaire: `À l'intersection juste après le point 10 :
marcher tout droit.
Puis la route tourne légèrement à gauche.
Le point se situe à la fin du virage à gauche.` },
      { numero: 12, x: 145786.25, y: 174369.16, commentaire: `Marcher tout droit.
Le chemin se termine dans une clairière. A gauche de la route, dans la clairière, un cylindre métallique dépasse du sol.
Le point se situe à environ 4 mètres derrière le cylindre métallique. Autre repère : ± 12 mètres au-delà de l'extrémité du buisson.` },
      { numero: 13, x: 145831.63, y: 174385.83, commentaire: `Marcher tout droit.
Plus loin, le chemin tourne légèrement gauche, puis s'enfonce dans les sous-bois.
Le point se situe à la fin de la clairière, juste avant que le sentier n'atteigne les sous-bois.` },
      { numero: 14, x: 145870.52, y: 174408.98, commentaire: `Marcher tout droit.
Le sentier s'enfonce dans le sous-bois, ressort puis tourne à droite (sauleraie dans ce virage à droite). Le point 14 est à la hauteur de ces saules.` },
      { numero: 15, x: 145909.42, y: 174433.98, commentaire: `Continuer.
Le chemin tourne légèrement à gauche puis à droite (une série de troncs très hauts à droite dans le virage à droite).
Le point se situe juste au-delà de ce virage à droite, juste avant un court virage à gauche.` },
      { numero: 16, x: 145983, y: 174413, commentaire: `Continuer.
Le chemin pénètre dans une bande de buissons. Le chemin monte un peu au début, puis devient de plus en plus raide. Puis la pente raide se termine brusquement.
Le point est situé là où la pente se termine soudainement. Autre repère : 1 mètre avant un tronc d'arbre (érable) du côté droit de la route. Autre repère : ± 20 mètres avant un poteau en béton de 2,5 mètres de haut sur le côté droit de la route.` },
      { numero: 17, x: 146006.65, y: 174405.28, commentaire: `Continuer.
Passez devant un poteau en béton de 2,5 mètres de haut sur le côté droit de la route, puis :
le chemin tourne un peu à gauche, puis un peu à droite, puis encore un peu à gauche, et passe devant un buisson épais (aubépine) à droite, juste avant le début d'une clairière, à droite du chemin .
Le point se situe ± 5 mètres au-delà de l'extrémité de l'aubépine à droite, juste avant le début de la clairière, à la hauteur d'un panneau 'Réserve Naturelle de Ganshoren' à gauche.` },
      { numero: 18, x: 146054.8, y: 174388.61, commentaire: `Continuer.
La route tourne à gauche et traverse la voie ferrée.
Traversez la voie ferrée.
Le point est situé 2 mètres au-delà de la barrière qui ferme le passage à niveau.` },
      { numero: 19, x: 146091.85, y: 174415.46, commentaire: `La route tourne à droite, puis à gauche.
Le point est situé au point de circulation indiquant le passage à niveau (« à 60 mètres »), à gauche de la route.` },
      { numero: 20, x: 146196, y: 174402, commentaire: `Continuer.
Le point est 60m plus loin.` },
    ],
  },
  "DGB": {
    "Transect forestier (3 min)": [
      { numero: 0, x: 147056, y: 174979, commentaire: `Accès à la forêt par la Rue Bonaventure, entre les numéros 176 et 222.` },
      { numero: 1, x: 147026, y: 175020, commentaire: `Emprunter le large chemin jusqu'aux premiers bancs, séparés par une poubelle, sur la droite.
Le point est situé au milieu de la ruelle, au niveau de la poubelle.` },
      { numero: 2, x: 146995, y: 175067, commentaire: `Continuez tout droit dans le chemin et comptez les arbres à droite.
Le point est situé à la hauteur du 6ème arbre planté le long de l'avenue. Autre repère : 1er arbre à droite après la poubelle.` },
      { numero: 3, x: 146966, y: 175111, commentaire: `Continuez tout droit dans le chemin et comptez les arbres à droite.
Le point se situe au deuxième arbre épais à droite après l'intersection (route qui part à droite). Autre repère : 1 arbre à droite devant le banc.` },
      { numero: 4, x: 146934, y: 175152, commentaire: `Continuez tout droit dans le chemin et comptez les arbres à droite.
Le point se situe 2 mètres après le 5ème arbre à droite après le banc. Autre repère : à proximité du chemin qui part à gauche.` },
      { numero: 5, x: 146903, y: 175195, commentaire: `Allez tout droit et suivez le chemin.
Le point est situé près de la première poubelle du côté gauche de la ruelle, entre 2 bancs. Autre repère : ± 1 mètre après un jeune hêtre planté sur la droite de la route.` },
      { numero: 6, x: 146872, y: 175236, commentaire: `Allez tout droit et suivez le chemin.
Le point est situé ± 3 mètres avant le 1er banc à droite de la route. Autre repère : arbre planté à environ 4 mètres du chemin, en accotement à droite.` },
      { numero: 7, x: 146842, y: 175279, commentaire: `Allez tout droit et suivez le chemin.
Le point est située à hauteur d'un jeune hêtre planté à droite du chemin, ± 10 mètres avant un chemin qui part à droite. Autre repère : un autre jeune hêtre planté de l'autre côté, à gauche du chemin.` },
      { numero: 8, x: 146841, y: 175334, commentaire: `Prendre la route à droite et continuer jusqu'à la prochaine intersection.
Le point est situé à cette intersection.` },
      { numero: 9, x: 146828, y: 175385, commentaire: `Suivre la large route à gauche.
Laisser un premier chemin qui part à gauche et continuer tout droit.
Le point est situé ± 10 mètres avant l'arbre épais à gauche, qui est planté au coin d'un chemin à peine visible qui part à gauche. L'accès à ce chemin est interdit.` },
      { numero: 10, x: 146776, y: 175380, commentaire: `Continuer tout droit et longer 1 sentiers qui part à gauche (l'accès au sentier est interdit).
Prendre le chemin qui descend à gauche.
Le point est situé environ 17 mètres au-delà du début du sentier, à hauteur d'un tronc autour duquel pousse du lierre, sur la droite de la route.` },
      { numero: 11, x: 146756, y: 175330, commentaire: `Suivre le chemin qui longe le ravin sur la gauche. Comptez les épais troncs d'arbres à droite du chemin.
Le point est situé au niveau du 3ème arbre.` },
      { numero: 12, x: 146733, y: 175282, commentaire: `Continuer à suivre le chemin jusqu'à un virage serré à droite, où le chemin commence à descendre.
Le point se situe au début de ce virage à droite.` },
      { numero: 13, x: 146711, y: 175235, commentaire: `Continuer à suivre le chemin qui descend jusqu'à une large route.
Prendre cette large route à gauche et la suivre jusqu'à l'intersection.
Traversez l'intersection, comptez les arbres épais qui poussent sur le côté gauche de la route.
Le point est située au niveau du 3ème arbre épais. Autre repère : un tronc mort abattu au sol juste avant la pointe.` },
      { numero: 14, x: 146725, y: 175185, commentaire: `Suivez le chemin.
Passer un petit croisement sur la droite.
Un peu plus loin vous apercevrez une souche d'arbre.
Comptez les arbres à gauche de la souche.
Le point est situé au niveau du 2ème arbre. Autre repère : ± 7 mètres après l'intersection avec le chemin à gauche.` },
      { numero: 15, x: 146747, y: 175137, commentaire: `Suivez la route.
Le point se situe au niveau du panneau de gauche, juste avant l'intersection.` },
      { numero: 16, x: 146785, y: 175102, commentaire: `A l'intersection, prendre la 2ème route à gauche (laisser la sortie forestière à droite).
Un peu plus loin, depuis l'endroit où l'eau remonte à la surface à droite (mur de pierre), comptez les troncs d'arbres peu fins à gauche. Les deux premiers sont coupés
Le point se situe au niveau du 5ème arbre (le 3ème arbre est en réalité un groupe d'arbustes, mais doit être compté pour 1 arbre). Autre repère : juste après ce 5ème arbre se trouve un autre arbre.` },
      { numero: 17, x: 146828, y: 175072, commentaire: `Suivez la route.
A droite, un mur de dalles de béton verticales avec un tag jaune.
Le point est situé au début de cette clôture, à la limite avec le mur de briques devant le mur en béton.` },
      { numero: 18, x: 146879, y: 175062, commentaire: `Suivre la route jusqu'à la 2ème gouttière en béton qui traverse la route.
La pointe est située 2 mètres au-delà de ce 2ème caniveau.` },
      { numero: 19, x: 146931, y: 175060, commentaire: `La route tourne légèrement à gauche, puis prend un virage serré à droite.
Le point est situé au début de ce virage à droite, à la hauteur de l'arbre indépendant qui pousse du côté droit, à 1 mètre de la route.` },
      { numero: 20, x: 146982, y: 175037, commentaire: `Passé le virage à droite du point 19, la route tourne à gauche puis à droite.
Le point se situe dans ce virage à droite, au niveau du cours d’eau.

Pour revenir à la sortie Rue Bonaventure, suivez la route et prenez la grande avenue à droite.
 Parc Roi Baudouin, phase 1` },
    ],
  },
  "BUY": {
    "Transect forestier (3 min)": [
      { numero: 0, x: 148620, y: 162895, commentaire: `Ce transect se compose de 2 parties. Entrée partie 1 : Avenue des Hospices, en face des numéros 47 / 51 (repère : haute tour en brique)` },
      { numero: 1, x: 148622, y: 162844, commentaire: `Le point est situé au début de la route, à hauteur de 3 poteaux en béton.` },
      { numero: 2, x: 148613, y: 162792, commentaire: `Entrer sur le site.
Le point se situe au niveau du 1er tronc épais avec de la peinture bleue (robinier fortement incliné) à gauche au-delà de l'extrémité de la clôture à gauche. Autre repère : 6/7 m au-delà de l'extrémité de la clôture.` },
      { numero: 3, x: 148604, y: 162742, commentaire: `Marcher tout droit.
Longer un chemin qui part à gauche, puis un deuxième.
Juste derrière ce 2ème chemin : les restes d'une colonne carrée en brique au ras du sol
Le point est située 7 mètres après ce reste d'une colonne carrée.` },
      { numero: 4, x: 148643, y: 162679, commentaire: `Continuez et longez la clôture à gauche.
Le point se situe au premier coin de la clôture (virage prononcé vers la gauche). Autre repère : 2 m plus loin sur l'accotement à droite, 1 pilastre
en brique.` },
      { numero: 5, x: 148674, y: 162722, commentaire: `Plus loin, le chemin tourne un peu à droite (clôture tombée à droite de la route).
Quelques mètres plus loin : un tronc très épais à gauche.
Le point est située 3 mètres au-delà du tronc très épais derrière la clôture (à gauche) avec un petit tronc poussant juste à côté, à hauteur d'un poteau en béton. Autre repère : un tuyau oublié touche la clôture juste au-delà de cet épais tronc.` },
      { numero: 6, x: 148699, y: 162768, commentaire: `Continuer. Un peu plus loin : un petit escalier en moellons monte à droite.
Plus loin, dans le virage à droite, un portail de jardin.
Le point est située ± 6 m avant cette clôture, à hauteur d'un tronc épais à droite de la route.` },
      { numero: 7, x: 148730, y: 162809, commentaire: `Le chemin monte puis tourne à gauche. Dans ce virage, à droite de la route, une souche coupée qui pointe vers la route.
Le point est situé à ± 3 mètres derrière cet arbre en surplomb. Autre repère : 2/3 m avant le début d'un mur de moellons, à gauche de la route.` },
      { numero: 8, x: 148766, y: 162848, commentaire: `Le mur de gauche forme un coin, puis :
A droite, les souches coupées d’un groupe d'arbustes (symphorine).
Puis une clôture perpendiculaire à la clôture le long de la route.
Le point est situé au niveau du 2ème poteau métallique de l'ancienne clôture (= au niveau du 3ème tronc d'arbre (érable) au-delà de cette clôture perpendiculaire).` },
      { numero: 9, x: 148769, y: 162904, commentaire: `Prendre le large chemin à droite (laisser la maison derrière soi). Le point est situé à ± 6 mètres au-delà du poteau d'éclairage n° 10044 du côté droit de la ruelle. Autre repère : compter les troncs d'arbres dans l'allée qui dépassent de la haie à gauche. La pointe est située 1 mètre au-delà du 3ème tronc d'arbre saillant : un hêtre épais à forte ramification à 3 m de hauteur.` },
      { numero: 10, x: 148363, y: 162876, commentaire: `Le point est située 2 mètres au-delà du premier pilastre en brique surmonté d'une sphère en béton du côté gauche de la route (entrée de la propriété). (Le pilastre de gauche - probablement à l'origine le point de repère - est tombé, mais un deuxième est toujours debout de l'autre côté de l'allée).

Revenez sur vos pas pour retourner dans la rue.
Prendre la rue à droite et marcher environ 250 mètres sur le même trottoir (c'est-à-dire passer l'entrée de la propriété privée n°156 et continuer à marcher sur le trottoir).
L'entrée de la deuxième partie se situe juste après cette propriété privée, sur la droite.` },
      { numero: 11, x: 148329, y: 162836, commentaire: `Le point est juste à l'entrée de la route (au-dessus des marches qui descendent jusqu'au bout de la haie).` },
      { numero: 12, x: 148286, y: 162804, commentaire: `Descendez les escaliers.
Plus loin au carrefour (route qui part à gauche), continuer tout droit.
Le point est situé 15/16 mètres après l'intersection. Autre repère : un tronc d'arbre à gauche de la route, juste après un tronc d'arbre courbé et écorcé à 2 mètres à gauche de la route.` },
      { numero: 13, x: 148238, y: 162782, commentaire: `Passez devant un grand portail sur la droite.
Le point est situé à ± 20 mètres au-delà de la clôture. Autre repère : 2 mètres après le houx à gauche de la route.` },
      { numero: 14, x: 148194, y: 162753, commentaire: `Le point est situé au début du virage serré à gauche, à proximité d'un tronc mort sur le côté gauche de la route. Autre repère : juste avant un buisson (aubépine) sur la droite de la route.` },
      { numero: 15, x: 148145, y: 162731, commentaire: `Le point est située juste avant le pont sur le ruisseau.` },
      { numero: 16, x: 148094, y: 162720, commentaire: `Ne traversez pas le pont.
Ne suivez pas le flux.
Prendre l'autre chemin à gauche qui monte tout droit dans les buissons (= passer devant une souche couchée à gauche et, 15 mètres plus loin, un gros tronc mort 2 mètres à droite du chemin).
± 30 mètres après l'entrée de la forêt, un épais tronc d'arbre à gauche du chemin. A partir de cet arbre, comptez les troncs du côté gauche de la route, y compris les troncs fins.
Le point est située à hauteur du (mince) 11ème tronc, avec un tronc très épais qui se trouve à ± 3 mètres en arrière du tronc mince.` },
      { numero: 17, x: 148080, y: 162670, commentaire: `Longer la route en passant devant un tronc épais à droite, peu après devant une vieille souche d'arbre faiblement sciée à gauche. Un peu plus loin vous verrez un autre tronc épais sur la droite.
Le point est située à hauteur de ce dernier tronc épais du côté droit. Autre repère : à 1 mètre devant ce tronc épais, pousse un jeune Houx.` },
      { numero: 18, x: 148054, y: 162625, commentaire: `Marchez environ 50 m plus loin. Le point est au début d’un virage à droite.` },
      { numero: 19, x: 148021, y: 162584, commentaire: `La route tourne d'abord à droite puis à gauche, puis :
la route tourne brusquement à droite, en direction des escaliers.
Le point se situe au niveau du 1er arbre à droite après le virage. Autre repère : 2 mètres avant les escaliers.` },
      { numero: 20, x: 148023, y: 162546, commentaire: `Prenez les escaliers et quittez la forêt.
Prenez la rue à gauche, jusqu'à Godshuizenlaan.
Le point est situé juste avant le carrefour, à proximité d'une cabane à faible consommation électrique ("Sibelgaz"). Plateau Engeland, Uccle` },
    ],
  },
}
