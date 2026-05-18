export const PAGE_API_ROOT = `/api/v2/pages`;
export const PUBLIC_ACCOUNT_ENDPOINT = `/api/v1/account/public`;
export const ADMIN_ACCOUNT_ENDPOINT = `/api/v1/account/admin`;

export const PUBLIC_PRODUCT_ENDPOINT = `/api/v1/product/public`;
export const ADMIN_PRODUCT_ENDPOINT = `/api/v1/product/admin`;

export const ADMIN_UTILITY_ENDPOINT = `/api/v1/utility/admin`;
export const PUBLIC_UTILITY_ENDPOINT = `/api/v1/utility/public`;
export const ADMIN_SALE_ENDPOINT = `/api/v1/sell/admin`;
export const PUBLIC_SALE_ENDPOINT = `/api/v1/sell/public`;

export const PUBLIC_USER_ENDPOINT = PUBLIC_ACCOUNT_ENDPOINT + `/users`;
export const PUBLIC_SETTINGS_ENDPOINT = PUBLIC_UTILITY_ENDPOINT + `/settings`;
export const ADMIN_USER_ENDPOINT = ADMIN_ACCOUNT_ENDPOINT + `/users`;
export const ADMIN_RATING_ENDPOINT = ADMIN_ACCOUNT_ENDPOINT + `/rating-reviews`;
export const ADMIN_MARKETING_ENDPOINT = ADMIN_ACCOUNT_ENDPOINT + `/marketing`;

export const PUBLIC_CATEGORY_ENDPOINT = PUBLIC_PRODUCT_ENDPOINT + `/categories`;
export const ADMIN_CATEGORY_ENDPOINT = ADMIN_PRODUCT_ENDPOINT + `/categories`;
export const ADMIN_BRAND_ENDPOINT = ADMIN_PRODUCT_ENDPOINT + `/brands`;
export const ADMIN_ATTRIBUTE_ENDPOINT = ADMIN_PRODUCT_ENDPOINT + `/attributes`;
export const ADMIN_ATTRIBUTE_VALUE_ENDPOINT =
	ADMIN_PRODUCT_ENDPOINT + `/attribute-values`;
export const ADMIN_PRODUCT_PRODUCT_ENDPOINT =
	ADMIN_PRODUCT_ENDPOINT + `/products`;

export const ADMIN_CAMPAIGN_ENDPOINT = ADMIN_PRODUCT_ENDPOINT + `/campaigns`;
export const ADMIN_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT =
	ADMIN_PRODUCT_ENDPOINT + `/campaign-product-throughs`;

export const ADMIN_FREE_SHIPPING_CAMPAIGN_PRODUCT_THROUGH_ENDPOINT =
	ADMIN_PRODUCT_ENDPOINT + `/free-shipping-campaign-product-throughs`;

export const ADMIN_CAMPAIGN_VARIANT_THROUGH_ENDPOINT =
	ADMIN_PRODUCT_ENDPOINT + `/campaign-variant-throughs`;
export const ADMIN_IMAGES_ENDPOINT = ADMIN_UTILITY_ENDPOINT + `/images`;
export const ADMIN_BASIC_SETTINGS_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/basic-settings`;
export const ADMIN_SOCIAL_SETTINGS_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/social-settings`;
export const ADMIN_EMAIL_SETTINGS_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/email-settings`;
export const ADMIN_SHIPPING_SETTINGS_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/shipping-settings`;
export const ADMIN_SHIPPING_CITY_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/shipping-cities`;
export const ADMIN_PATHAO_COURIER_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/pathao-courier`;
export const ADMIN_STEADFAST_COURIER_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/steadfast-courier`;

export const ADMIN_ADD_COURIER_IN_ORDERS_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/add-courier-in-orders`;

export const ADMIN_SHIPPING_TYPE_WEIGHT_RATE_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/shipping-type-weight-wise-rate`;

export const ADMIN_SHIPPING_TYPE_WEIGHT_RATE_VALUE_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/shipping-type-weight-wise-rate-values`;

export const ADMIN_COUPONS_ENDPOINT = ADMIN_UTILITY_ENDPOINT + `/coupons`;
export const ADMIN_NAVIGATION_SCOPE_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/nav-scopes`;
export const ADMIN_MENUS_ENDPOINT = ADMIN_UTILITY_ENDPOINT + `/menus`;
export const ADMIN_SUBMENUS_ENDPOINT = ADMIN_UTILITY_ENDPOINT + `/submenus`;
export const ADMIN_CONTACT_US_ENDPOINT = ADMIN_UTILITY_ENDPOINT + `/contact-us`;
export const ADMIN_COURIER_SETTINGS_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/courier-settings`;

export const ADMIN_ORDERS_ENDPOINT = ADMIN_SALE_ENDPOINT + `/orders`;
export const ADMIN_SALE_REPORT_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/variant-sales-report`;

export const ADMIN_DASHBOARD_ANALYTICS_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/dashboard-analytics`;

export const ADMIN_BUSINESS_ANALYTICS_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/business-analytics`;
export const ADMIN_ORDER_ANALYTICS_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/order-analytics`;
export const ADMIN_PRODUCT_ANALYTICS_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/product-analytics`;
export const ADMIN_LOW_STOCKED_ANALYTICS_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/low-stocks`;
export const ADMIN_USER_ANALYTICS_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/user-analytics`;
export const ADMIN_SHIPPING_ANALYTICS_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/shipping-analytics`;
export const ADMIN_COUPON_ANALYTICS_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/coupon-analytics`;
export const ADMIN_APPLIED_COUPON_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/applied-coupons`;
export const ADMIN_PHONE_NUMBERS_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/marketing/numbers`;
export const ADMIN_EMAILS_ENDPOINT = ADMIN_SALE_ENDPOINT + `/marketing/emails`;

export const ADMIN_SHIPPING_COMPANY_ENDPOINT =
	ADMIN_SALE_ENDPOINT + `/shipping-companies`;

export const ADMIN_PAYMENT_GATEWAY_SETTINGS_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/payment-gateways`;
export const ADMIN_SMS_PROVIDERS_SETTINGS_ENDPOINT =
	ADMIN_UTILITY_ENDPOINT + `/sms-providers`;

export const PUBLIC_SHIPPING_CITY_ENDPOINT =
	PUBLIC_UTILITY_ENDPOINT + `/shipping-cities`;

// ─── Public ──────────────────────────────────────────────────────────────────
export const PUBLIC_PRODUCTS_ENDPOINT = PUBLIC_PRODUCT_ENDPOINT + `/products`;
export const PUBLIC_SHIPPING_RATE_ENDPOINT =
	PUBLIC_SALE_ENDPOINT + `/shipping-rates`;
