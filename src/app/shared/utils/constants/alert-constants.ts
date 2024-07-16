import { AlertType } from "../../models/alert.model";
import { AlertMessage } from "../../models/enum/alert-message.enum";

export const ALERTS = {
  PROFILE_CREATED_SUCCESS: {
    message: AlertMessage.PROFILE_CREATED_SUCCESS,
    type: AlertType.SUCCESS,
  },
  AD_CREATED_SUCCES: {
    message: AlertMessage.AD_CREATED_SUCCES,
    type: AlertType.SUCCESS,
  },
  FAVORITES_ADDED_SUCCESS: {
    message: AlertMessage.FAVORITES_ADDED_SUCCESS,
    type: AlertType.SUCCESS,
  },
  FAVORITES_REMOVED_SUCCESS: {
    message: AlertMessage.FAVORITES_REMOVED_SUCCESS,
    type: AlertType.SUCCESS,
  },
  UPLOAD_PICTURE_ERROR: {
    message: AlertMessage.UPLOAD_PICTURE_ERROR,
    type: AlertType.ERROR,
  },
  DEFAULT_ERROR: {
    message: AlertMessage.DEFAULT_ERROR,
    type: AlertType.ERROR,
  },
};
