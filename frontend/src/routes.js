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
		component: 'managecompany',
		key: 'managecompany',
		breadcrumbName: 'Quản lý công ty',
		exact: true
	},
	{
		type: 'child',
		path: '/payment/:serviceId',
		component: 'paycompany',
		key: 'payCompany',
		breadcrumbName: 'Công ty',
		exact: true
	}
]


