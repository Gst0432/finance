import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Target, Award, Globe } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Users,
      title: "Innovation",
      description: "Nous repoussons constamment les limites pour offrir des solutions financières innovantes."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque aspect de nos services."
    },
    {
      icon: Award,
      title: "Intégrité",
      description: "Nous agissons avec honnêteté et transparence dans toutes nos interactions."
    },
    {
      icon: Globe,
      title: "Impact",
      description: "Nous contribuons au développement économique de l'Afrique."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">À Propos de G-Finance</h1>
          <p className="text-xl text-gray-400">
            Révolutionner la gestion financière en Afrique
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Notre Histoire</h2>
            <p className="text-gray-300 leading-relaxed">
              Fondée en 2024 à Niamey, G-Finance est née de la vision d'entrepreneurs passionnés par la technologie et la finance. Notre mission est de démocratiser l'accès à des outils de gestion financière professionnels en Afrique, permettant aux entreprises et aux particuliers de mieux gérer leurs finances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-6">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <value.icon className="h-8 w-8 text-purple-500 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Notre Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-purple-500">10K+</p>
                <p className="text-gray-400">Utilisateurs</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-500">5</p>
                <p className="text-gray-400">Pays</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-500">1M+</p>
                <p className="text-gray-400">Transactions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-500">98%</p>
                <p className="text-gray-400">Satisfaction</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Notre Équipe</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Notre équipe diversifiée réunit des experts en technologie, finance et service client, tous unis par la passion d'innover et de servir nos clients.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Direction</h3>
                <p className="text-gray-300">Leadership visionnaire et stratégique</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Développement</h3>
                <p className="text-gray-300">Innovation technologique continue</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
                <p className="text-gray-300">Assistance client personnalisée</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Notre Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              Nous aspirons à devenir le leader de la gestion financière digitale en Afrique, en offrant des solutions innovantes qui permettent à chacun de réaliser son potentiel financier.
            </p>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Rejoignez l'Aventure</h2>
            <button
              onClick={() => navigate('/careers')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Voir nos offres d'emploi
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}