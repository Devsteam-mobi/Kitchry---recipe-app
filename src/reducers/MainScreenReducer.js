/**
 * Created by Devsteam.mobi on 6/25/17.
 */
import {CHANGE_ACTIVE_TAB} from '../actions/types';

const INITIAL_STATE = {
	title: 'Kitchry',
	listDish: [
		{
			title: 'Creamy Dill Chicken',
			subTitle: 'with Roasted Potatoes and Green Beans',
			img: 'https://d3hvwccx09j84u.cloudfront.net/680,480/image/creamy-dill-chicken-f8373422.jpg',
			decription: 'This latest addition to the HelloFresh Recipe Hall of Fame features the key to a crowd-pleasing dinner: sauce! Who could turn down a drizzly, creamy herb and Dijon concoction, especially one that’s draped across pan-seared chicken and roasted potatoes and green beans? No one, we say. At least not anyone that we’ve met yet.'
		},
		{
			title: 'Kiwi Salsa and Steak Fajitas',
			subTitle: 'with Charred Bell Pepper, Onion, and Blistered Beans',
			img: 'https://d3hvwccx09j84u.cloudfront.net/680,480/image/kiwi-salsa-and-steak-fajitas-a45533d3.jpg',
			decription: 'What is kiwi doing in my fajitas?” you may ask. “That’s not Mexican, Tex-Mex, Southwestern, or anything in between!” Bear with us—when our chef Nate had us try it, we thought it was a little out there too. But upon first bite, it was immediately clear that the fruit is a natural match for the big flavors of beef: it’s tangy, it’s sassy, it’s a little bit surprising. Basically, it’s everything that you want from a salsa (and then some).'
		},
		{
			title: 'Chipotle-Glazed Pork Chops',
			subTitle: 'with Garlic Mashed Potatoes and Roasted Broccoli',
			img: 'https://d3hvwccx09j84u.cloudfront.net/680,480/image/chipotle-glazed-pork-chops-87660214.jpg',
			decription: 'Pork, broccoli, and potatoes: sounds pretty ordinary, right? Wrong! We’ve jazzed up this everyday dish with sweet honey, a smoky chipotle glaze, and a touch of garlic. Every swipe of sauce is so addictive, so unforgettable, you’ll likely find yourself scraping out every last drop from the pan.'
		}

	],
	newsList: [
		{
			title: 'Potato Pan Rosti',
			img: 'https://d3hvwccx09j84u.cloudfront.net/680,480/image/potato-pan-rosti-c0516db7.jpg',
			description: 'If you love crispy potatoes, let’s just say you’ll LOVE Swiss-style rösti, which are all potato, all crispy, all the time. The shredded potato pancake is basically one massive round that gets fried in the pan until it’s golden and crisp, taking you to the heart of tater town and beyond. With salty prosciutto and sour cream on top (plus a lemony salad on the side for balance), it’s the ultimate in spud supremacy.'
		},
		{
			title: 'Cheesy Chorizo Orzotto',
			img: 'https://d3hvwccx09j84u.cloudfront.net/680,480/image/cheesy-chorizo-orzotto-2a6c8c18.jpg',
			description: 'If you’ve never tried making orzotto (that’s cooking pasta risotto-style), you’re in for a treat. In this recipe, orzo pasta is boiled in just enough water to cover, so that the cooking liquid reduces into a sauce that clings to each grain (that also means no draining!). It’s the perfect pasta base for adventurous add-ins, like paprika-laced chorizo, tangy tomatoes, hearty spinach, and a cheese duo of mozzarella and Parmesan.'
		},
		{
			title: 'Salmon En Papillote',
			img: 'https://d3hvwccx09j84u.cloudfront.net/680,480/image/salmon-en-papillote-353dd4db.jpg',
			description: 'It doesn’t matter if you can pronounce en papillote; the appeal of this classic French technique is easy to understand. When you wrap salmon fillets in foil, then cook them in the oven (or on the grill), they basically roast in their own juices, locking in flavor and moisture throughout. In this recipe, they’re finished with a drizzle of herb sauce and served next to asparagus and couscous. Basically, it’s an equation for timeless, classic deliciousness.'
		}
	],
	activeTabId: 0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CHANGE_ACTIVE_TAB:
			return {...state, activeTabId: action.activeTabId, title: action.title};
		default:
			return state;
	}
};