# volcadeReact
React project made for Hitema, 02/2020

Après avoir cloné le repo, se placer dans le dossier apiVolcade et lancer les commandes suivantes : 
  - npm install              //installe node_modules back
  - npm run client-install   //installe node_modules front
  - npm run dev              // lance le front et le back en meme temps
  
  Après une authentification sur l'interface, merci de rafraichir la page pour permettre une correcte utilisation de l'appli
  il y a une erreur que je n'ai pas eu le temps de corriger qui sauvegarge un user.id dans le state auth au login et register,
  tandis que le load de l'utilisateur courant sauvegarde un user._id, qui sera l'id utilisé pour parcourir l'application
  
  Volcade est une application recensant actuellement quelques volcans et cascades, 
  et qui compte sur ses utilisateurs pour s'étoffer de jour en jour.
  
  Ainsi, une personne non authentifiée pourra parcourir la carte recensant les volcans et cascades enregistrés sur l'appli
  Un utilisateur lambda pourra parcourir les différents volcans et cascades ajoutés et aura la possibilité d'en rajouter
  Un administrateur pourra également supprimer ces volcans et cascades.
  
  
