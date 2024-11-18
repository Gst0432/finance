import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, LineChart, CircleDollarSign, CheckCircle2 } from 'lucide-react';
import Logo from '../components/ui/Logo';

export default function Landing() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: CircleDollarSign,
      title: "Gestion financière simplifiée",
      description: "Suivez vos revenus et dépenses en temps réel avec des tableaux de bord intuitifs"
    },
    {
      icon: Zap,
      title: "Performance optimale",
      description: "Interface rapide et réactive pour une gestion efficace au quotidien"
    },
    {
      icon: LineChart,
      title: "Analyses détaillées",
      description: "Visualisez vos performances avec des graphiques interactifs et rapports personnalisés"
    },
    {
      icon: ShieldCheck,
      title: "Sécurité maximale",
      description: "Protection avancée de vos données avec un chiffrement de bout en bout"
    }
  ];

  const testimonials = [
    {
      name: "Aminata Diallo",
      role: "Entrepreneure",
      content: "G-Finance a transformé la gestion de mon entreprise. Je recommande vivement !",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
      name: "Moussa Konaté",
      role: "Consultant",
      content: "Une solution complète qui répond parfaitement à mes besoins. Support excellent.",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
      name: "Fatou Sow",
      role: "Commerçante",
      content: "Interface intuitive et fonctionnalités puissantes. Un vrai gain de temps !",
      image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&w=128&h=128&q=80"
    }
  ];

  const legalLinks = [
    {
      title: "Confidentialité",
      path: "/privacy",
      content: "Notre politique de confidentialité détaille comment nous protégeons vos données personnelles et respectons votre vie privée."
    },
    {
      title: "CGU",
      path: "/terms",
      content: "Les conditions générales d'utilisation définissent les règles d'utilisation de notre plateforme."
    },
    {
      title: "Mentions légales",
      path: "/legal",
      content: "Informations légales sur notre société et nos services conformément à la réglementation en vigueur."
    }
  ];

  const companyLinks = [
    {
      title: "À propos",
      path: "/about",
      content: "G-Finance est une startup innovante spécialisée dans la gestion financière digitale, fondée en 2024."
    },
    {
      title: "Blog",
      path: "/blog",
      content: "Découvrez nos articles sur la gestion financière, les tendances du marché et les meilleures pratiques."
    },
    {
      title: "Carrières",
      path: "/careers",
      content: "Rejoignez notre équipe dynamique et participez à la révolution de la gestion financière en Afrique."
    }
  ];

  const productLinks = [
    {
      title: "Fonctionnalités",
      path: "/features",
      content: "Découvrez toutes les fonctionnalités qui font de G-Finance la solution idéale pour votre entreprise."
    },
    {
      title: "Tarifs",
      path: "/pricing",
      content: "Des plans tarifaires adaptés à tous les besoins, de la petite entreprise à la grande organisation."
    },
    {
      title: "FAQ",
      path: "/faq",
      content: "Trouvez rapidement des réponses à vos questions sur l'utilisation de G-Finance."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex gap-8">
              <button onClick={() => navigate('/login')} className="text-gray-300 hover:text-white transition-colors">
                Se connecter
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                S'inscrire gratuitement
              </button>
            </div>
            <button
              onClick={() => navigate('/register')}
              className="md:hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
              La solution intelligente pour gérer vos finances
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              Simplifiez la gestion de vos finances, suivez vos performances et développez votre activité avec notre plateforme tout-en-un.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
              >
                Commencer gratuitement
              </button>
              <button
                onClick={() => navigate('/subscriptions')}
                className="bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors shadow-lg"
              >
                Voir les tarifs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Fonctionnalités puissantes
            </h2>
            <p className="text-lg text-gray-400">
              Tout ce dont vous avez besoin pour gérer efficacement vos finances
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors border border-gray-700"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-gray-400">
              Découvrez pourquoi ils nous font confiance
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
              >
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Prêt à transformer votre gestion financière ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Commencer maintenant
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-transparent text-white px-8 py-4 rounded-lg border border-white hover:bg-white/10 transition-colors"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="mt-4 text-sm">
                Simplifiez la gestion de vos finances avec G-Finance, votre partenaire de confiance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Produit</h3>
              <ul className="space-y-2">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => navigate(link.path)}
                      className="hover:text-white transition-colors"
                      title={link.content}
                    >
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Entreprise</h3>
              <ul className="space-y-2">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => navigate(link.path)}
                      className="hover:text-white transition-colors"
                      title={link.content}
                    >
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Légal</h3>
              <ul className="space-y-2">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => navigate(link.path)}
                      className="hover:text-white transition-colors"
                      title={link.content}
                    >
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} G-Finance. Tous droits réservés.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-sm">Propulsé par</span>
              <a
                href="https://www.gstartup.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 ml-1"
              >
                www.gstartup.pro
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}