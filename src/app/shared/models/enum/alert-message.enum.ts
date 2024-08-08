export enum AlertMessage {
  // Success messages
  PROFILE_CREATED_SUCCESS = 'Votre profil a été sauvegardé avec succès !',
  AD_CREATED_SUCCESS = 'Votre annonce a été crée avec succès !',
  AD_UPDATED_SUCCESS = 'Votre annonce a été modifiée avec succès !',
  AD_DELETED_SUCCESS = 'Votre annonce a été supprimée avec succès !',
  FAVORITES_ADDED_SUCCESS = "L'annonce a été ajoutée à vos favoris",
  FAVORITES_REMOVED_SUCCESS = "L'annonce a été supprimée de vos favoris",
  MEETING_INITIALIZED_SUCCESS = 'La proposition de RDV a été envoyée',
  MEETING_ACCEPTED_SUCCESS = 'Votre RDV est planifié',
  MEETING_FINALIZED_SUCCESS = "Merci d'avoir confirmé l'information",

  // Error messages
  UPLOAD_PICTURE_ERROR = 'Vos images dépassent la taille autorisée',
  DEFAULT_ERROR = "Une erreur s'est produite, veuillez réessayer plus tard",
}
