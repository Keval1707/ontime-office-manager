export interface RouterItem {
    id: number;
    Title: string;
    Path: string;
    basePath: string; // <-- NEW: basePath for matching
    isActive: boolean;
    isProtected: boolean;
    iconKey?: string;
    pageKey: string;
    show: boolean
}

export interface RouterGroup {
    groupTitle: string;
    items: RouterItem[];
}

export const routerLinks: RouterItem[] = [
    {
        id: 0,
        Title: "Dashboard",
        Path: "/",
        basePath: "/Dashboard",
        isActive: false,
        isProtected: true,
        iconKey: "LayoutDashboard",
        pageKey: "Dashboard",
        show: false
    },
    {
        id: 1,
        Title: "Dashboard",
        Path: "/Dashboard",
        basePath: "/Dashboard",
        isActive: false,
        isProtected: true,
        iconKey: "LayoutDashboard",
        pageKey: "Dashboard",
        show: true
    },
    {
        id: 2,
        Title: "Clients",
        Path: "/clients",
        basePath: "/clients",
        isActive: false,
        isProtected: true,
        iconKey: "Users",
        pageKey: "Clients",
        show: true
    },
    {
        id: 3,
        Title: "Tasks",
        Path: "/tasks",
        basePath: "/tasks",
        isActive: false,
        isProtected: true,
        iconKey: "ClipboardList",
        pageKey: "Tasks",
        show: true
    },
    {
        id: 4,
        Title: "Projects",
        Path: "/projects",
        basePath: "/projects",
        isActive: false,
        isProtected: true,
        iconKey: "FolderKanban",
        pageKey: "Projects",
        show: true
    },
    {
        id: 5,
        Title: "Payments",
        Path: "/payments",
        basePath: "/payments",
        isActive: false,
        isProtected: true,
        iconKey: "IndianRupee",
        pageKey: "Payments",
        show: true
    },
    {
        id: 10,
        Title: "Task Detail",
        Path: "/tasks/:taskId",
        basePath: "/tasks",
        isActive: false,
        isProtected: true,
        iconKey: "ClipboardList",
        pageKey: "Tasks",
        show: false
    },
    {
        id: 11,
        Title: "Projects Detail",
        Path: "/projects/:projectid",
        basePath: "/projects",
        isActive: false,
        isProtected: true,
        iconKey: "FolderKanban",
        pageKey: "Projects",
        show: false
    },

];

export const routerGroups: RouterGroup[] = [
    {
        groupTitle: "Settings",
        items: [
            {
                id: 6,
                Title: "Project Status",
                Path: "/settings/projectStatus",
                basePath: "/settings/projectStatus",
                isActive: false,
                isProtected: true,
                iconKey: "Settings",
                pageKey: "Settings",
                show: true
            },
            {
                id: 7,
                Title: "Task Status",
                Path: "/settings/taskStatus",
                basePath: "/settings/taskStatus",
                isActive: false,
                isProtected: true,
                iconKey: "ClipboardList",
                pageKey: "Settings",
                show: true
            },
            {
                id: 8,
                Title: "User Roles",
                Path: "/settings/userRoles",
                basePath: "/settings/userRoles",
                isActive: false,
                isProtected: true,
                iconKey: "UserCog",
                pageKey: "Settings",
                show: true
            },
            {
                id: 9,
                Title: "Notifications",
                Path: "/settings/notifications",
                basePath: "/settings/notifications",
                isActive: false,
                isProtected: true,
                iconKey: "Bell",
                pageKey: "Settings",
                show: true
            },
        ],
    },
];
