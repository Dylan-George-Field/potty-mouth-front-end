
const routes = [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/home.vue') }
    ]
  },
  {
    path: '/create',
    component: () => import('layouts/default'),
    children: [
      { path: '',
        component: () => import('pages/create'),
        children: [
          { path: '', component: () => import('components/create/trackedOrAnon'), meta: { title: '👩‍💻 Create' } }
        ]
      }
    ]
  },
  /*
  {
    path: '/dashboard',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/dashboard'), meta: { title: '🏭 Dashboard' } }
    ]
  },
  {
    path: '/create/anonymous',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/create/anonymous'), meta: { title: '👻 Anonymous' } }
    ]
  },
  {
    path: '/create/tracked',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/create/tracked'), meta: { title: '🎯 Tracked' } }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/login'), meta: { title: '🔑 Login' } }
    ]
  }, */
  {
    path: '/feedback',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/feedback'), meta: { title: '📮 Feedback' } }
    ]
  },
  {
    path: '/create',
    component: () => import('layouts/error'),
    children: [
      { path: '', component: () => import('pages/underconstruction'), meta: { title: 'Under Construction' } }
    ]
  },
  {
    path: '/privacy',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/privacy'), meta: { title: 'Privacy' } }
    ]
  },
  {
    path: '/buy',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/buy'), meta: { title: 'Buy' } }
    ]
  },
  {
    path: '/wall/notfound',
    component: () => import('layouts/error'),
    children: [
      { path: '', component: () => import('pages/wall/notfound'), meta: { title: 'The wall wasn\'t found' } }
    ]
  },
  {
    path: '/wall/expired',
    component: () => import('layouts/error'),
    children: [
      { path: '', component: () => import('pages/wall/expired'), meta: { title: 'The page has expired' } }
    ]
  },
  {
    path: '/wall/:id',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/wall/chatbox') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('layouts/error.vue'),
    children: [
      { path: '', component: () => import('pages/404.vue'), meta: { title: 'The page doesn\'t exist' } }
    ]
  })
}

export default routes
