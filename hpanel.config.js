module.exports = {
  // Configuration générale
  app: {
    name: 'G-Finance',
    description: 'Application de gestion financière',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  },

  // Configuration du serveur
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    ssl: {
      enabled: false,
      key: '',
      cert: ''
    }
  },

  // Configuration de la base de données Firebase
  firebase: {
    apiKey: "AIzaSyAR5_2sWe8i_KfdB4XOsisxA7lKFePlLhM",
    authDomain: "g-finances.firebaseapp.com",
    projectId: "g-finances",
    storageBucket: "g-finances.appspot.com",
    messagingSenderId: "296356497766",
    appId: "1:296356497766:web:9b1d4707b814c3c537a0a7",
    measurementId: "G-XBHDRL7TBJ"
  },

  // Configuration des services externes
  services: {
    payment: {
      provider: 'paiementpro',
      merchantId: process.env.PAYMENT_MERCHANT_ID || '1936',
      apiUrl: 'https://vente.paiementpro.net/g-startup'
    },
    email: {
      provider: 'smtp',
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    }
  },

  // Configuration du stockage
  storage: {
    type: 'firebase',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf']
  },

  // Configuration de la sécurité
  security: {
    cors: {
      enabled: true,
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    },
    rateLimit: {
      enabled: true,
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limite par IP
    }
  },

  // Configuration des logs
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'json',
    outputs: ['console', 'file'],
    filename: 'logs/app.log'
  },

  // Configuration du cache
  cache: {
    enabled: true,
    type: 'memory',
    ttl: 3600 // 1 heure en secondes
  },

  // Configuration des backups
  backup: {
    enabled: true,
    schedule: '0 0 * * *', // tous les jours à minuit
    retention: 7, // nombre de jours de conservation
    storage: {
      type: 'firebase',
      path: 'backups'
    }
  },

  // Configuration des notifications
  notifications: {
    enabled: true,
    providers: ['email', 'push'],
    templates: {
      path: 'templates/notifications'
    }
  },

  // Configuration des tâches planifiées
  cron: {
    enabled: true,
    jobs: [
      {
        name: 'cleanup',
        schedule: '0 0 * * *',
        handler: 'jobs/cleanup.js'
      },
      {
        name: 'backup',
        schedule: '0 0 * * *',
        handler: 'jobs/backup.js'
      }
    ]
  },

  // Configuration des moniteurs
  monitoring: {
    enabled: true,
    interval: 60000, // 1 minute
    checks: [
      {
        name: 'health',
        url: '/health',
        timeout: 5000
      },
      {
        name: 'database',
        type: 'firebase',
        timeout: 5000
      }
    ]
  },

  // Configuration des performances
  performance: {
    compression: true,
    minify: true,
    cache: true,
    maxAge: 86400000 // 1 jour en millisecondes
  },

  // Configuration du déploiement
  deployment: {
    provider: 'firebase',
    project: 'g-finances',
    region: 'europe-west1',
    config: {
      hosting: {
        public: 'dist',
        ignore: [
          'firebase.json',
          '**/.*',
          '**/node_modules/**'
        ],
        rewrites: [
          {
            source: '**',
            destination: '/index.html'
          }
        ]
      }
    }
  }
};