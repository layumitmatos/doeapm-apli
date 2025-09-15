import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface Donation {
  id: string;
  amount: number;
  date: string;
  status: "confirmed" | "pending";
}

const MyDonations = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  // Mock data - in a real app this would come from an API based on user data
  const donations: Donation[] = userData && !userData.anonymous ? [
    {
      id: "1",
      amount: 150.00,
      date: "14/01/2024",
      status: "confirmed"
    },
    {
      id: "2",
      amount: 85.50,
      date: "01/01/2024",
      status: "confirmed"
    },
    {
      id: "3",
      amount: 200.00,
      date: "19/12/2023",
      status: "confirmed"
    },
    {
      id: "4",
      amount: 120.00,
      date: "10/11/2023",
      status: "confirmed"
    }
  ] : [];

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const donationCount = donations.length;

  if (userData?.anonymous) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b p-4">
          <h1 className="text-xl font-semibold text-center">Minhas Doações</h1>
          <p className="text-sm text-muted-foreground text-center mt-1">
            Veja as doações que você já fez para nossa instituição
          </p>
        </div>

        <div className="p-4 flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Acesso não identificado</h3>
              <p className="text-muted-foreground text-sm">
                Para visualizar suas doações, é necessário fazer login com seus dados pessoais.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-xl font-semibold text-center">Minhas Doações</h1>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Veja as doações que você já fez para nossa instituição
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Total Donated Card */}
        <Card className="bg-success text-success-foreground">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5" />
              <h2 className="text-sm font-medium opacity-90">Total doado</h2>
            </div>
            <p className="text-3xl font-bold mb-2">
              R$ {totalDonated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs opacity-80">
              {donationCount} doações realizadas
            </p>
          </CardContent>
        </Card>

        {/* Donations List */}
        <div className="space-y-3">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <Card key={donation.id} className="border-l-4 border-l-success">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-success-light text-success">
                        <Heart className="w-4 h-4" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-success text-success-foreground hover:bg-success/90">
                            Doação realizada
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {donation.status === "confirmed" ? "Confirmada" : "Pendente"}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          {donation.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-success">
                        R$ {donation.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Nenhuma doação encontrada</h3>
                <p className="text-muted-foreground text-sm">
                  Você ainda não realizou nenhuma doação para nossa instituição.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDonations;