import Auth from "./pages/auth/Auth"
import Chats from "./pages/chats/Chats"
import Friends from "./pages/friends/Friends"
import News from "./pages/news/News"
import Photo from "./pages/photo/Photo"
import Search from "./pages/search/Search"
import Settings from "./pages/settings/Settings"
import User from "./pages/user/User"

interface IRoute {
	path: string
	Element: React.ElementType
}

export enum RouteName {
	USER_CARD = "/",
	AUTHORIZATION = "/",
	PHOTO = "/photo",
	SEARCH_PEOPLE = "/search/people",
	FRIENDS = "/friends",
	CHATS = "/chats",
	SETTINGS = "/setting",
	NEWS = "/",
}

export const publicRoute: IRoute[] = [
	{ path: RouteName.AUTHORIZATION, Element: Auth },
]

export const authRoute: IRoute[] = [
	{ path: RouteName.USER_CARD + "/:id", Element: User },
	{ path: "/:id" + RouteName.PHOTO, Element: Photo },
	{ path: RouteName.SEARCH_PEOPLE, Element: Search },
	{ path: "/:id" + RouteName.FRIENDS, Element: Friends },
	{ path: RouteName.CHATS, Element: Chats },
	{ path: RouteName.SETTINGS, Element: Settings },
	{ path: RouteName.NEWS, Element: News },
	// { path: `*`, Element: Main },
]
