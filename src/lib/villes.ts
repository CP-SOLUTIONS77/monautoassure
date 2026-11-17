/**
 * Pages locales « assurance auto à <ville> », pour le référencement de
 * proximité autour de l'agence de Montereau-Fault-Yonne. Chaque page traite un
 * angle différent de l'assurance auto, pour ne pas dupliquer le contenu ni les
 * pages ville des autres sites du cabinet.
 */

export type Section = {
  titre: string;
  paragraphes: string[];
  liste?: string[];
};

export type Ville = {
  slug: string;
  nom: string;
  /** Balise title (le suffixe du site est ajouté par le layout). */
  titre: string;
  description: string;
  h1: string;
  chapeau: string;
  sections: Section[];
  /** Accès à l'agence depuis la ville. */
  trajet: string;
  faq: { question: string; reponse: string }[];
};

export const VILLES: Ville[] = [
  {
    slug: "montereau-fault-yonne",
    nom: "Montereau-Fault-Yonne",
    titre: "Assurance auto à Montereau-Fault-Yonne, en agence",
    description:
      "Comparez votre assurance auto avec un courtier installé à Montereau-Fault-Yonne, 35 rue Jean Jaurès. Plusieurs assureurs, changement à tout moment, sans engagement.",
    h1: "Votre assurance auto à Montereau-Fault-Yonne, avec un courtier en agence",
    chapeau:
      "Mon Auto Assuré est le service d'assurance auto de CP Solutions, cabinet de courtage installé rue Jean Jaurès, en centre-ville de Montereau. Vous pouvez comparer en ligne, ou passer à l'agence avec votre carte grise et votre relevé d'information.",
    sections: [
      {
        titre: "Ce qu'il faut apporter",
        paragraphes: ["Pour un devis précis, prévoyez :"],
        liste: [
          "la carte grise du véhicule ;",
          "votre permis de conduire, et celui des conducteurs secondaires ;",
          "votre relevé d'information, que votre assureur actuel doit vous remettre sur simple demande : il indique votre bonus-malus et vos sinistres.",
        ],
      },
      {
        titre: "Changer d'assureur sans démarche",
        paragraphes: [
          "Après un an de contrat, la loi Hamon vous permet de changer d'assurance auto à tout moment, sans frais ni justification. C'est le nouvel assureur qui se charge de résilier l'ancien contrat, et vous restez couvert sans interruption.",
        ],
      },
      {
        titre: "Comparer les garanties, pas seulement le prix",
        paragraphes: [
          "Deux contrats au même prix peuvent couvrir très différemment : franchises, assistance dès le domicile ou à partir de 50 km, véhicule de remplacement, protection du conducteur. Nous vous expliquons les écarts avant de vous recommander une formule.",
        ],
      },
    ],
    trajet:
      "L'agence est en centre-ville, au 35 rue Jean Jaurès, à une dizaine de minutes à pied de la gare. Stationnement en zone bleue devant l'agence.",
    faq: [
      {
        question: "Puis-je venir à l'agence sans rendez-vous ?",
        reponse:
          "Oui, l'agence est ouverte du lundi au samedi. Pour être sûr qu'un courtier soit disponible, appelez avant de passer ou prenez rendez-vous.",
      },
      {
        question: "Comment obtenir mon relevé d'information ?",
        reponse:
          "Demandez-le à votre assureur actuel, par téléphone, par e-mail ou dans votre espace client. Il doit vous le fournir dans les quinze jours suivant votre demande.",
      },
      {
        question: "Vais-je rester assuré pendant le changement ?",
        reponse:
          "Oui. Avec la loi Hamon, le nouvel assureur résilie l'ancien contrat pour vous, et la nouvelle garantie prend le relais sans période sans assurance.",
      },
    ],
  },
  {
    slug: "fontainebleau",
    nom: "Fontainebleau",
    titre: "Assurance auto à Fontainebleau : voiture récente, LOA, tous risques",
    description:
      "Voiture récente, LOA ou crédit auto à Fontainebleau ou Avon ? Choisissez la bonne formule tous risques et votre assureur librement. Courtier indépendant, sans engagement.",
    h1: "Assurance auto à Fontainebleau : bien assurer une voiture récente ou en LOA",
    chapeau:
      "À Fontainebleau et à Avon, beaucoup de conducteurs roulent dans un véhicule récent, souvent financé par un crédit ou une location avec option d'achat. Ces voitures méritent une assurance choisie avec soin, et pas forcément celle proposée par le concessionnaire.",
    sections: [
      {
        titre: "LOA et crédit auto : vous choisissez votre assureur",
        paragraphes: [
          "Quand vous financez une voiture, l'organisme de financement exige souvent une assurance tous risques. Depuis le 20 novembre 2026, il doit vous laisser au moins trois jours pour comparer, et vous pouvez souscrire un contrat équivalent auprès de l'assureur de votre choix.",
          "Demandez ce délai avant de signer : nous comparons pour vous les offres à garanties équivalentes.",
        ],
      },
      {
        titre: "Les garanties utiles sur une voiture récente",
        paragraphes: ["Sur un véhicule de valeur, regardez de près :"],
        liste: [
          "la valeur d'indemnisation en cas de vol ou de destruction : valeur à neuf pendant une durée donnée, ou valeur à dire d'expert ;",
          "la garantie perte financière, utile en LOA, qui couvre l'écart entre l'indemnité et ce qu'il reste dû au loueur ;",
          "le bris de glace, l'assistance et le véhicule de remplacement.",
        ],
      },
      {
        titre: "Électrique ou hybride",
        paragraphes: [
          "Une voiture électrique a des besoins particuliers : batterie, câble de recharge, borne à domicile. Tous les contrats ne les couvrent pas de la même façon, et certains assureurs proposent des tarifs spécifiques.",
        ],
      },
    ],
    trajet:
      "L'agence de Montereau-Fault-Yonne est à environ 25 minutes en voiture de Fontainebleau, et Fontainebleau-Avon est reliée à Montereau par la ligne R du Transilien. Tout peut aussi se faire à distance.",
    faq: [
      {
        question: "Suis-je obligé de prendre l'assurance proposée avec ma LOA ?",
        reponse:
          "Non. Pour un financement signé depuis le 20 novembre 2026, vous disposez d'au moins trois jours pour comparer et pouvez choisir un contrat équivalent chez l'assureur de votre choix.",
      },
      {
        question: "Qu'est-ce que la garantie perte financière ?",
        reponse:
          "En cas de vol ou de destruction du véhicule en LOA, elle couvre la différence entre l'indemnité versée par l'assureur et la somme restant due au loueur. Sans elle, cet écart reste à votre charge.",
      },
      {
        question: "La valeur à neuf est-elle toujours incluse en tous risques ?",
        reponse:
          "Non. Elle dépend du contrat et ne s'applique en général que pendant les premières années du véhicule. Au-delà, l'indemnisation se fait à la valeur estimée par l'expert.",
      },
    ],
  },
  {
    slug: "melun",
    nom: "Melun",
    titre: "Assurance auto à Melun : trajets domicile-travail, kilométrage",
    description:
      "Vous prenez la voiture tous les jours depuis Melun ? Déclarez le bon usage et le bon kilométrage pour payer le juste prix de votre assurance auto. Courtier indépendant.",
    h1: "Assurance auto à Melun : payer le juste prix selon vos trajets",
    chapeau:
      "Trajets quotidiens vers le travail, déplacements professionnels, voiture qui dort au garage la semaine : l'usage de votre véhicule pèse directement sur le prix de l'assurance. Encore faut-il le déclarer correctement.",
    sections: [
      {
        titre: "L'usage déclaré, un point clé",
        paragraphes: ["Les assureurs distinguent en général trois usages :"],
        liste: [
          "privé : promenades et loisirs, sans trajet régulier vers le travail ;",
          "privé et trajet travail : vous utilisez la voiture pour aller au travail ;",
          "professionnel : vous l'utilisez pour vos déplacements dans le cadre de votre activité.",
        ],
      },
      {
        titre: "Pourquoi la déclaration doit être exacte",
        paragraphes: [
          "Déclarer un usage plus limité que la réalité fait baisser la cotisation, mais peut coûter très cher : en cas de sinistre, l'assureur peut réduire l'indemnisation, voire refuser sa garantie s'il établit une fausse déclaration.",
          "À l'inverse, si vous avez changé de travail ou si vous télétravaillez davantage, votre usage a peut-être diminué : signalez-le, la cotisation peut baisser.",
        ],
      },
      {
        titre: "Petits rouleurs : les formules au kilomètre",
        paragraphes: [
          "Si vous roulez peu, certains assureurs proposent des formules avec un forfait kilométrique annuel. Elles peuvent être intéressantes pour une deuxième voiture ou un conducteur qui utilise surtout les transports en commun.",
        ],
      },
    ],
    trajet:
      "L'agence de Montereau-Fault-Yonne est à environ 35 minutes en voiture de Melun, et les deux villes sont reliées par la ligne R du Transilien. La plupart des dossiers se traitent par téléphone et par e-mail.",
    faq: [
      {
        question: "Dois-je déclarer mes trajets pour aller au travail ?",
        reponse:
          "Oui. Un usage limité aux loisirs ne couvre pas correctement les trajets réguliers vers le travail, ce qui peut poser problème en cas d'accident sur le trajet.",
      },
      {
        question: "Je télétravaille désormais, puis-je payer moins ?",
        reponse:
          "Peut-être. Si votre usage ou votre kilométrage a nettement diminué, signalez-le à votre assureur ou faites comparer votre contrat : une formule adaptée peut coûter moins cher.",
      },
      {
        question: "Une formule au kilomètre est-elle avantageuse ?",
        reponse:
          "Pour un petit rouleur, souvent. Il faut toutefois estimer son kilométrage avec réalisme, car un dépassement du forfait peut entraîner un supplément.",
      },
    ],
  },
  {
    slug: "nemours",
    nom: "Nemours",
    titre: "Assurance auto à Nemours : inondations, tempêtes, catastrophes naturelles",
    description:
      "Voiture inondée ou abîmée par une tempête à Nemours ? Vérifiez que votre assurance auto couvre les événements climatiques et les catastrophes naturelles. Courtier indépendant.",
    h1: "Assurance auto à Nemours : être couvert face aux crues et aux intempéries",
    chapeau:
      "À Nemours et dans la vallée du Loing, les crues de juin 2016 ont endommagé de nombreux véhicules. Beaucoup d'automobilistes ont alors découvert que leur contrat ne couvrait pas les dégâts subis par leur propre voiture.",
    sections: [
      {
        titre: "Au tiers, votre voiture n'est pas couverte",
        paragraphes: [
          "Une assurance au tiers couvre les dommages que vous causez aux autres, pas ceux subis par votre véhicule. Même en cas de catastrophe naturelle reconnue, la garantie catastrophes naturelles ne s'applique que si votre contrat couvre déjà les dommages à votre véhicule, par exemple une garantie incendie, vol ou dommages.",
        ],
      },
      {
        titre: "Les garanties à vérifier",
        paragraphes: ["Pour être protégé face aux intempéries, regardez si votre contrat inclut :"],
        liste: [
          "la garantie catastrophes naturelles, qui s'applique après un arrêté publié au Journal officiel ;",
          "une garantie événements climatiques ou tempête, grêle et neige, qui couvre aussi les épisodes non reconnus comme catastrophe naturelle ;",
          "les franchises applicables : pour une catastrophe naturelle, la franchise est fixée par la loi.",
        ],
      },
      {
        titre: "En cas de sinistre",
        paragraphes: [
          "Après la publication d'un arrêté de catastrophe naturelle, vous disposez de trente jours pour déclarer le sinistre à votre assureur. Ne tentez pas de démarrer une voiture qui a pris l'eau : cela peut aggraver les dégâts moteur.",
        ],
      },
    ],
    trajet:
      "L'agence de Montereau-Fault-Yonne est à environ 30 minutes en voiture de Nemours. Si vous préférez ne pas vous déplacer, tout peut se faire par téléphone, par e-mail ou par courrier.",
    faq: [
      {
        question: "Ma voiture assurée au tiers a été inondée, suis-je indemnisé ?",
        reponse:
          "En général non. Une formule au tiers ne couvre pas les dommages subis par votre véhicule, même en cas de catastrophe naturelle reconnue. Il faut au minimum une garantie couvrant les dommages à votre voiture.",
      },
      {
        question: "Combien de temps ai-je pour déclarer un sinistre catastrophe naturelle ?",
        reponse:
          "Trente jours à compter de la publication de l'arrêté de catastrophe naturelle au Journal officiel.",
      },
      {
        question: "Quelle différence entre catastrophe naturelle et événement climatique ?",
        reponse:
          "La catastrophe naturelle suppose un arrêté officiel. La garantie événements climatiques, quand elle est prévue au contrat, couvre aussi les tempêtes, la grêle ou la neige sans attendre cette reconnaissance.",
      },
    ],
  },
  {
    slug: "sens",
    nom: "Sens",
    titre: "Assurance auto jeune conducteur à Sens",
    description:
      "Jeune conducteur à Sens ou dans le Sénonais ? Surprime, conduite accompagnée, conducteur secondaire : comment réduire le prix de votre assurance auto. Courtier indépendant.",
    h1: "Assurance auto jeune conducteur à Sens : réduire la surprime",
    chapeau:
      "Dans le Sénonais, la voiture est souvent indispensable dès l'obtention du permis. Pour un jeune conducteur, l'assurance peut pourtant coûter très cher, et les écarts de tarif entre assureurs sont importants.",
    sections: [
      {
        titre: "Comment fonctionne la surprime",
        paragraphes: [
          "Un conducteur novice peut se voir appliquer une surprime qui peut atteindre 100 % la première année, puis 50 % la deuxième et 25 % la troisième. Elle disparaît ensuite, à condition de ne pas avoir eu d'accident responsable.",
          "Après une conduite accompagnée, cette surprime est réduite de moitié et disparaît au bout de deux ans au lieu de trois.",
        ],
      },
      {
        titre: "Les pistes pour payer moins",
        paragraphes: ["Plusieurs solutions existent, à condition qu'elles correspondent à la réalité :"],
        liste: [
          "être déclaré conducteur secondaire sur le contrat d'un parent, si c'est bien le parent qui conduit le plus ;",
          "choisir un véhicule moins puissant, dont la cotisation est plus basse ;",
          "opter pour une formule au tiers ou au tiers étendu les premières années, sur une voiture de faible valeur ;",
          "comparer plusieurs assureurs : c'est sur les profils de jeunes conducteurs que les écarts sont les plus forts.",
        ],
      },
      {
        titre: "Attention aux fausses déclarations",
        paragraphes: [
          "Déclarer un parent comme conducteur principal alors que c'est le jeune qui conduit au quotidien est une fausse déclaration. En cas d'accident, l'assureur peut refuser sa garantie. Mieux vaut un contrat honnête bien négocié.",
        ],
      },
    ],
    trajet:
      "L'agence de Montereau-Fault-Yonne est à environ 35 minutes en voiture de Sens, et les deux villes sont sur la ligne Paris-Sens. Un devis se fait très bien à distance.",
    faq: [
      {
        question: "La conduite accompagnée fait-elle vraiment baisser l'assurance ?",
        reponse:
          "Oui. Elle réduit de moitié la surprime jeune conducteur et la fait disparaître au bout de deux ans au lieu de trois, en l'absence d'accident responsable.",
      },
      {
        question: "Mon enfant peut-il être conducteur secondaire sur mon contrat ?",
        reponse:
          "Oui, si c'est bien vous qui utilisez le plus le véhicule. S'il en est l'utilisateur principal, il doit être déclaré comme tel, sous peine de refus de garantie en cas de sinistre.",
      },
      {
        question: "Au bout de combien de temps n'est-on plus jeune conducteur ?",
        reponse:
          "La surprime disparaît au bout de trois ans sans accident responsable, ou deux ans après une conduite accompagnée.",
      },
    ],
  },
  {
    slug: "provins",
    nom: "Provins",
    titre: "Assurance auto à Provins : conducteurs résiliés ou malussés",
    description:
      "Résilié par votre assureur ou malussé à Provins ? Retrouvez une assurance auto adaptée à votre profil avec un courtier indépendant. Solutions pour les dossiers difficiles.",
    h1: "Assurance auto à Provins, même après une résiliation ou un malus",
    chapeau:
      "Autour de Provins, on ne peut guère se passer de voiture. Être résilié par son assureur, ou voir sa cotisation exploser à cause d'un malus, devient alors un vrai problème. Des solutions existent pourtant.",
    sections: [
      {
        titre: "Résilié par votre assureur",
        paragraphes: [
          "Un assureur peut résilier votre contrat pour non-paiement, après plusieurs sinistres, ou après un retrait de permis. La résiliation figure ensuite sur votre relevé d'information, et beaucoup d'assureurs refusent alors de vous couvrir.",
          "Certains assureurs sont spécialisés dans ces profils. Nous savons vers lesquels nous tourner selon le motif de votre résiliation.",
        ],
      },
      {
        titre: "Comprendre et faire baisser le malus",
        paragraphes: [
          "Chaque accident responsable augmente votre coefficient de 25 %, ou de 12,5 % si la responsabilité est partagée. Ce coefficient diminue ensuite de 5 % par année sans sinistre responsable, et revient à 1 après deux années consécutives sans accident responsable.",
          "En attendant, comparer les assureurs reste le meilleur moyen de limiter l'impact du malus sur votre cotisation.",
        ],
      },
      {
        titre: "En dernier recours : le Bureau central de tarification",
        paragraphes: [
          "Si tous les assureurs refusent de vous couvrir, le Bureau central de tarification peut obliger un assureur à vous garantir pour la responsabilité civile, l'assurance minimale obligatoire. C'est une solution de dernier recours, que nous pouvons vous aider à engager.",
        ],
      },
    ],
    trajet:
      "L'agence de Montereau-Fault-Yonne est à environ 40 minutes en voiture de Provins. Pour la plupart de nos clients provinois, tout se fait par téléphone et par e-mail.",
    faq: [
      {
        question: "Peut-on être assuré après une résiliation pour non-paiement ?",
        reponse:
          "Oui. Certains assureurs acceptent ces profils, souvent avec un paiement de la cotisation au comptant ou par prélèvement. Le tarif dépend du motif et de l'ancienneté de la résiliation.",
      },
      {
        question: "Combien de temps faut-il pour effacer un malus ?",
        reponse:
          "Après deux années consécutives sans accident responsable, le coefficient revient à 1, quel que soit son niveau précédent.",
      },
      {
        question: "Que faire si tous les assureurs refusent de m'assurer ?",
        reponse:
          "Vous pouvez saisir le Bureau central de tarification, qui peut imposer à un assureur de vous couvrir pour la responsabilité civile obligatoire. Nous pouvons vous accompagner dans cette démarche.",
      },
    ],
  },
];

export function getVille(slug: string): Ville | undefined {
  return VILLES.find((v) => v.slug === slug);
}
