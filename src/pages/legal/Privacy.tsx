import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
  const navigate = useNavigate();

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

        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 text-purple-500 mr-3" />
          <h1 className="text-3xl font-bold">Politique de Confidentialité</h1>
        </div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Introduction</h2>
            <p>
              G-Finance s'engage à protéger la confidentialité de vos données personnelles. Cette politique détaille nos pratiques concernant la collecte, l'utilisation et la protection de vos informations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Collecte des Données</h2>
            <p className="mb-4">Nous collectons les informations suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informations d'identification (nom, email, téléphone)</li>
              <li>Données de transaction et financières</li>
              <li>Informations d'utilisation de la plateforme</li>
              <li>Données techniques (adresse IP, cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Utilisation des Données</h2>
            <p className="mb-4">Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fournir et améliorer nos services</li>
              <li>Personnaliser votre expérience</li>
              <li>Assurer la sécurité de votre compte</li>
              <li>Communiquer des informations importantes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Protection des Données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Chiffrement des données sensibles</li>
              <li>Contrôles d'accès stricts</li>
              <li>Surveillance continue de la sécurité</li>
              <li>Formation régulière de notre personnel</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Vos Droits</h2>
            <p className="mb-4">Vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accès à vos données personnelles</li>
              <li>Rectification des informations inexactes</li>
              <li>Suppression de vos données</li>
              <li>Opposition au traitement</li>
              <li>Portabilité des données</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
            <p>
              Pour toute question concernant notre politique de confidentialité, contactez notre délégué à la protection des données à :
              <a href="mailto:privacy@g-finance.com" className="text-purple-400 hover:text-purple-300 ml-1">
                privacy@g-finance.com
              </a>
            </p>
          </section>

          <section className="border-t border-gray-800 pt-8 mt-8">
            <p className="text-sm text-gray-400">
              Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}