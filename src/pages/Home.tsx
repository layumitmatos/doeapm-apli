import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import schoolHero from "@/assets/school-hero.jpg";
import schoolCourtyard from "@/assets/school-courtyard.jpg";
import schoolClassroom from "@/assets/school-classroom.jpg";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  const slideImages = [schoolHero, schoolCourtyard, schoolClassroom];

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="text-center">
          <div className="bg-primary-light text-primary-light-foreground p-2 rounded-lg inline-block mb-2">
            <span className="text-sm font-bold">DOE APM</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Slideshow */}
      <div className="bg-secondary p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-secondary-foreground mb-2">
              Bem-vindo à nossa APM
            </h1>
            <p className="text-secondary-foreground/80">
              Associação de Pais e Mestres - Transformando a educação juntos
            </p>
          </div>

          {/* Slideshow */}
          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48 sm:h-64">
              <img
                src={slideImages[currentSlide]}
                alt="Imagem escolar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slideImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Member badge */}
            {userData && !userData.anonymous && (
              <div className="p-4">
                <Button variant="light" size="sm" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Sou membro da APM
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Conheça nossa APM</h2>
          <p className="text-center text-muted-foreground mb-8">
            Entenda como trabalhamos para melhorar a educação
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">O que é a APM?</h3>
                <p className="text-sm text-muted-foreground">
                  A Associação de Pais e Mestres é uma organização que une famílias e educadores para melhorar a qualidade da educação em nossa escola. Trabalhamos juntos para proporcionar um ambiente de aprendizado ainda melhor para nossos alunos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💚</span>
                </div>
                <h3 className="font-semibold mb-2">Como suas doações ajudam</h3>
                <p className="text-sm text-muted-foreground">
                  Suas contribuições são fundamentais para melhorias na infraestrutura, aquisição de materiais didáticos, equipamentos tecnológicos e realização de atividades extracurriculares que enriquecem a experiência educacional.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold mb-2">O que você encontra no app</h3>
                <p className="text-sm text-muted-foreground">
                  • Acompanhe suas doações pessoais • Visualize o histórico completo de arrecadações • Veja como os recursos são utilizados • Mantenha-se informado sobre nossas atividades
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;