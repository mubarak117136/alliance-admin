import { v4 as uuidv4 } from "uuid";

export const buildParams = (params) => {
	const keys = Object.keys(params);
	if (keys.length == 0) return "";
	return (
		"?" +
		keys
			.map((key) => {
				return `${key}=${params[key]}`;
			})
			.join("&")
	);
};

export const makeid = () => {
	return uuidv4();
};

export const deepCopy = (params) => {
	return JSON.parse(JSON.stringify(params));
};

export const convertBoolean = (val) => {
	if (val == true) {
		return "Yes";
	} else {
		return "No";
	}
};

export const convertCoinType = (val) => {
	if (val == 1) {
		return "Debit";
	} else {
		return "Credit";
	}
};

export const isObjectEmpty = (objectName) => {
	return Object.keys(objectName).length === 0;
};

export const findNestedObj = (entireObj, keyToFind, valToFind) => {
	let foundObj;
	JSON.stringify(entireObj, (_, nestedValue) => {
		if (nestedValue && nestedValue[keyToFind] === valToFind) {
			foundObj = nestedValue;
		}
		return nestedValue;
	});
	return foundObj;
};

export const truncateText = (text, length) => {
	if (text.length > length) {
		return text.substring(0, length) + " ...";
	}
	return text;
};

export const simpleHash = (s) => {
	var a = 1,
		c = 0,
		h,
		o;
	if (s) {
		a = 0;
		for (h = s.length - 1; h >= 0; h--) {
			o = s.charCodeAt(h);
			a = ((a << 6) & 268435455) + o + (o << 14);
			c = a & 266338304;
			a = c !== 0 ? a ^ (c >> 21) : a;
		}
	}
	return String(a);
};

export const convertObjToString = (items) => {
	let data = "";

	for (const key in items) {
		const item = items[key];
		if (typeof item === "object" && item !== null && "value" in item) {
			data += `${key}: ${item.value}, `;
		} else {
			data += `${key}: ${item}, `;
		}
	}

	return data.trim();
};

export const orderStatuses = [
	{
		title: "Pending",
		value: "1",
	},
	{
		title: "Processing",
		value: "2",
	},
	{
		title: "In transit",
		value: "3",
	},
	{
		title: "Delivered",
		value: "4",
	},
	{
		title: "Returned",
		value: "5",
	},
	{
		title: "Cancelled",
		value: "6",
	},
];

export const paymentStatuses = [
	{
		title: "Pending",
		value: "0",
	},
	{
		title: "Success",
		value: "1",
	},
	{
		title: "Failed",
		value: "2",
	},
];

export const orderSourceToText = (source) => {
	if (source == 1) {
		return "Website";
	} else if (source == 2) {
		return "Landing";
	} else {
		return "POS";
	}
};

export const menus = [
	{
		name: "Dashboard",
		link: "/",
		icon: "mdi-speedometer",
		child: null,
	},
	{
		name: "Users",
		link: "/users",
		icon: "mdi-account-box",
		child: null,
	},
	{
		name: "Product",
		icon: "mdi-package",
		child: [
			{
				name: "All",
				link: "/products",
				icon: "mdi-server",
			},
			{
				name: "Create",
				link: "/products/create",
				icon: "mdi-plus-box",
			},
			{
				name: "Category",
				link: "/products/category",
				icon: "mdi-shape-plus-outline",
			},
			{
				name: "Brand",
				link: "/products/brand",
				icon: "mdi-ab-testing",
			},
			{
				name: "Attribute",
				link: "/products/attribute",
				icon: "mdi-vector-difference",
			},
		],
	},
	{
		name: "Orders",
		link: "/orders",
		icon: "mdi-gavel",
		child: null,
	},
	{
		name: "Analytics",
		icon: "mdi-chart-scatter-plot",
		child: [
			{
				name: "Business",
				link: "/analytics",
				icon: "mdi-wrench-cog",
			},
			{
				name: "Order",
				link: "/analytics/order",
				icon: "mdi-gavel",
			},
			{
				name: "Product",
				link: "/analytics/product",
				icon: "mdi-package",
			},
			{
				name: "User",
				link: "/analytics/user",
				icon: "mdi-account-box",
			},
			{
				name: "Shipping",
				link: "/analytics/shipping",
				icon: "mdi-truck",
			},
			{
				name: "Coupon",
				link: "/analytics/coupon",
				icon: "mdi-ticket",
			},
		],
	},
	{
		name: "Campaign",
		link: "/campaigns",
		icon: "mdi-rhombus-split",
		child: null,
	},
	{
		name: "Marketing",
		icon: "mdi-bullhorn",
		child: [
			{
				name: "Emails",
				link: "/marketing/emails",
				icon: "mdi-email",
			},
		],
	},
	{
		name: "Ratings",
		link: "/ratings",
		icon: "mdi-star-box",
		child: null,
	},
	{
		name: "Contact Us",
		link: "/contact-us",
		icon: "mdi-headphones",
		child: null,
	},
	{
		name: "Settings",
		icon: "mdi-cog",
		child: [
			{
				name: "Basic",
				link: "/settings",
				icon: "mdi-wrench-cog",
			},
			{
				name: "Social",
				link: "/settings/social",
				icon: "mdi-link-box-variant",
			},
			{
				name: "Email",
				link: "/settings/email",
				icon: "mdi-email",
			},
			{
				name: "Shipping",
				link: "/settings/shipping",
				icon: "mdi-truck",
			},
			{
				name: "Coupons",
				link: "/settings/coupons",
				icon: "mdi-ticket",
			},
			{
				name: "Menu",
				link: "/settings/menu",
				icon: "mdi-menu",
			},
		],
	},
];

export const calculateTotalPage = (total_items, per_page_total) => {
	return Math.ceil(total_items / per_page_total);
};

export const campaignTypeToText = (type) => {
	if (type == 0) {
		return "Category";
	} else if (type == 1) {
		return "Product";
	} else if (type == 2) {
		return "Free shipping";
	} else if (type == 3) {
		return "Free Shipping On Category";
	} else if (type == 4) {
		return "Free Shipping On Product";
	}
};

export const couponTypeToText = (type) => {
	if (type == 1) {
		return "Percent Discount";
	} else if (type == 2) {
		return "Flat discount";
	}
};

export const navigationScopeTypeToText = (type) => {
	if (type == 1) {
		return "Main navigation";
	} else if (type == 2) {
		return "Footer navigation";
	}
};

export const orderStatusTypeToText = (type) => {
	if (type == 1) {
		return "Pending";
	} else if (type == 2) {
		return "Processing";
	} else if (type == 3) {
		return "In transit";
	} else if (type == 4) {
		return "Delivered";
	} else if (type == 5) {
		return "Returned";
	} else {
		return "Cancelled";
	}
};

export const orderStatusColor = (type) => {
	if (type == 1) {
		return "white";
	} else if (type == 2) {
		return "white";
	} else if (type == 3) {
		return "white";
	} else if (type == 4) {
		return "white";
	} else if (type == 5) {
		return "red";
	} else {
		return "red";
	}
};

export const contactUsStatusToText = (status) => {
	if (status == 1) {
		return "Unseen";
	} else {
		return "Seen";
	}
};

export const contactUsStatusColor = (status) => {
	if (status == 1) {
		return "red";
	} else {
		return "primary";
	}
};

export const paymentMethodProvider = (type) => {
	if (type == 1) {
		return "SSLCommerz";
	} else if (type == 2) {
		return "Bkash";
	} else if (type == 3) {
		return "Nagad";
	}
};

export const hours = [
	"00",
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
];

export const minutes = [
	"00",
	"01",
	"02",
	"03",
	"04",
	"05",
	"06",
	"07",
	"08",
	"09",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"30",
	"31",
	"32",
	"33",
	"34",
	"35",
	"36",
	"37",
	"38",
	"39",
	"40",
	"41",
	"42",
	"43",
	"44",
	"45",
	"46",
	"47",
	"48",
	"49",
	"50",
	"51",
	"52",
	"53",
	"54",
	"55",
	"56",
	"57",
	"58",
	"59",
];
