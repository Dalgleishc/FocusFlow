# FocusFlow
FocusFlow is a web-based application designed to help users maintain their focus and optimize their daily routines.


FocusFlow/
├── backend/              # Python backend
│   ├── app.py            # Main Flask application
│   ├── models.py         # Database models
│   ├── routes/           # API routes
│   │   ├── auth.py       # Authentication routes
│   │   ├── tasks.py      # Task management routes
│   │   ├── calendar.py   # Calendar data routes
│   │   └── social.py     # Social/leaderboard routes
│   └── utils/            # Utility functions
│       ├── task_splitter.py  # Logic for breaking down tasks
│       └── timer.py      # Timer logic
│
├── frontend/             # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Calendar/           # Calendar view components
│       │   ├── TaskManagement/     # Task-related components
│       │   ├── FocusTimer/         # Timer components (flower visualization)
│       │   ├── Tabs/               # Tab navigation components
│       │   └── Leaderboard/        # Social features components
│       ├── pages/
│       │   ├── CalendarPage.js     # Initial calendar page
│       │   └── FocusPage.js        # The 3-tabbed interface page
│       ├── contexts/               # React contexts for state management
│       ├── hooks/                  # Custom React hooks
│       ├── services/               # API service interfaces
│       └── App.js                  # Main application component
│
└── README.md                       # Project documentation
