import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import schoolHero from "@/assets/school-hero.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    documento: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user data in localStorage for demo purposes
    localStorage.setItem("userData", JSON.stringify(formData));
    navigate("/home");
  };

  const handleAnonymousLogin = () => {
    localStorage.setItem("userData", JSON.stringify({ anonymous: true }));
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md lg:max-w-4xl lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left side - Form */}
        <Card className="w-full">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto bg-primary text-primary-foreground p-3 rounded-lg w-fit">
              <span className="text-lg font-bold">DOE APM</span>
            </div>
            <CardTitle className="text-2xl">Bem-vindo à APM</CardTitle>
            <CardDescription>
              Gerencie suas doações de forma fácil e rápida
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  name="nome"
                  placeholder="Jorge Antunes Macedo"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  className="bg-muted border-0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jorgeamacedo@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-muted border-0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="documento">Documento (CPF)</Label>
                <Input
                  id="documento"
                  name="documento"
                  placeholder="1236788"
                  value={formData.documento}
                  onChange={handleInputChange}
                  required
                  className="bg-muted border-0"
                />
              </div>
              
              <Button type="submit" className="w-full h-12 text-base font-medium">
                Entrar
              </Button>
            </form>
            
            <div className="text-center">
              <span className="text-muted-foreground text-sm">OU</span>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={handleAnonymousLogin}
              className="w-full text-primary hover:text-primary"
            >
              Entrar sem me identificar
            </Button>
          </CardContent>
        </Card>

        {/* Right side - Illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <img 
            src={schoolHero} 
            alt="Ilustração escolar"
            className="w-full h-auto max-w-lg rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;