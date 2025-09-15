import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, Mail, FileText } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-semibold text-center">Perfil</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                  {userData.anonymous ? "?" : getInitials(userData.nome || "")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {userData.anonymous ? "Usuário Anônimo" : userData.nome || "Usuário"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {userData.anonymous ? "Acesso sem identificação" : "Membro da APM"}
                </p>
              </div>
            </div>

            {!userData.anonymous && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">CPF: {userData.documento}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* App Information */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Sobre o aplicativo
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                O DOE APM é um aplicativo desenvolvido para facilitar o acompanhamento
                das doações e arrecadações da Associação de Pais e Mestres.
              </p>
              <p>
                Através dele, você pode visualizar suas contribuições e acompanhar
                como os recursos são utilizados para melhorar a educação em nossa escola.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => navigate("/home")}
            className="w-full justify-start"
          >
            <User className="w-4 h-4 mr-2" />
            Voltar ao início
          </Button>
          
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full justify-start"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair do aplicativo
          </Button>
        </div>

        {/* App Version */}
        <div className="text-center text-xs text-muted-foreground mt-8">
          DOE APM v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Profile;