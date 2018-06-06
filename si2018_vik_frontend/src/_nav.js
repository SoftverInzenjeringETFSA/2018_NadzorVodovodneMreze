export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
        name: 'Login',
        url: '/login',
        icon: 'icon-speedometer',
      },
    {
      title: true,
      name: 'Sistem',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Cijevi',
      url: '/pipes',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Novi unos',
          url: '/pipes/add',
          icon: 'icon-plus',
        },
        {
          name: 'Spisak',
          url: '/pipes/list',
          icon: 'icon-notebook',
        },
      ]
    },
    {
        name:'Vodostaji',
        url: '/vodostaji',
        icon: 'icon-drop',
        children: [
            {
            name: 'Novi unos',
            url: '/vodostaji/add',
            icon: 'icon-plus',
            },
            {
                name: 'Spisak',
                url: '/vodostaji/list',
                icon: 'icon-notebook',
            },
        ]

    },
    {
        name: 'Mjerna mjesta',
        url: '/mstations',
        icon: 'icon-flag',
        children: [
            {
                name: 'Novi unos',
                url: '/mstations/add',
                icon: 'icon-plus',
            },
            {
                name: 'Spisak',
                url: '/mstations/list',
                icon: 'icon-notebook',
            },
        ]
    },
    {
        name: 'Kvarovi',
        url: '/failures',
        icon: 'icon-close',
        children: [
            {
                name: 'Novi unos',
                url: '/failures/new',
                icon: 'icon-plus',
            },
            {
                name: 'Spisak',
                url: '/failures/list',
                icon: 'icon-notebook',
            },
        ]
    },
    {
        name: 'Radovi',
        url: '/constructions',
        icon: 'icon-wrench',
        children: [
            {
                name: 'Novi unos',
                url: '/constructions/add',
                icon: 'icon-plus',
            },
            {
                name: 'Spisak',
                url: '/constructions/list',
                icon: 'icon-notebook',
            },
        ]
    },
    {
        name: 'Administracija',
        url: '/administration',
        icon: 'icon-settings',
        children: [
            {
                name: 'Izvještaji',
                url: '/reporting/activity',
                icon: 'icon-doc',
            },
            {
                name: 'Postavke',
                url: '/administration/settings',
                icon: 'icon-settings',
            },
            {
                name: 'Help',
                url: 'https://github.com/SoftverInzenjeringETFSA/2018_NadzorVodovodneMreze/tree/master/si2018_vik_backend',
                icon: 'icon-settings',
            },
        ]
    }
  ],
};
