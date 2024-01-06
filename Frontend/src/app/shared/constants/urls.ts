const BASE_URL = "http://localhost:5000";

export const FOODS_URL = BASE_URL + '/api/foods';

export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_FAVORITES_URL = FOODS_URL + '/MyFavorites';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
export const FOODS_BY_ID_URL = FOODS_URL + '/';

export const UPLOAD_FOODS_URL = FOODS_URL + '/Upload';
export const UPDATE_FOODS_URL = FOODS_URL + '/Edit';
export const UPDATE_FAVORITE_URL = FOODS_URL + '/Favorite';
export const UPDATE_DELETE_URL = FOODS_URL + '/Delete';

export const USER_LOGIN_URL = BASE_URL + "/api/users/Login";
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';