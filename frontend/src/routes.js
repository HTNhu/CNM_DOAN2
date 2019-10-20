export const routers = [
	// {
	// 	path: '/login',
	// 	component: 'login',
	// 	key: 'login',
	// 	breadcrumbName: 'Đăng nhập',
	// 	exact: true
	// },
	{
		path: '/payment',
		component: 'payment',
		key: 'payment',
		breadcrumbName: 'Thanh Toán',
		exact: true
	},
	{
		path: '/signup',
		component: 'signup',
		key: 'signup',
		breadcrumbName: 'Đăng ký',
		exact: true
	},
	{
		path: '/history',
		component: 'history',
		key: 'history',
		breadcrumbName: 'Lịch sử giao dịch',
		exact: true
	},
	{
		path: '/managebill',
		component: 'managebill',
		key: 'managebill',
		breadcrumbName: 'Quản lý hóa đơn',
		exact: true
	},
	{
		path: '/managecompany',
		component: 'manageCompany',
		key: 'managecompany',
		breadcrumbName: 'Quản lý công ty',
		exact: true
	},
	{
		isParams: true,
		path: '/payment/:serviceId',
		component: 'payment/paycompany',
		key: 'payCompany',
		breadcrumbName: 'Công ty',
		exact: true
	},
	{
		isParams: true,
		path: '/payment/:serviceId/:companyId',
		component: 'payment/paybill',
		key: 'paybill',
		breadcrumbName: 'Tìm kiếm hóa đơn',
		exact: true
	}
]


