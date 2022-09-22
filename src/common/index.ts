export const actionIds = {
  GET_CONTACT_LIST: 'async service returned Contact List.',
  GET_CONTACT_DETAIl: 'async service returned Contact Detail.',
};

export interface BaseAction {
  type: string;
  payload?: any;
}
