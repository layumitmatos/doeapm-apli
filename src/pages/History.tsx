import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: string;
  type: "donation" | "withdrawal";
  amount: number;
  date: string;
  description: string;
  donor?: string;
  responsible?: string;
}

const History = () => {
  // Mock data - in a real app this would come from an API
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "donation",
      amount: 150.00,
      date: "14/01/2024",
      description: "Doação para reforma da biblioteca",
      donor: "Maria Silva Santos"
    },
    {
      id: "2",
      type: "withdrawal",
      amount: 500.00,
      date: "13/01/2024",
      description: "Compra de materiais didáticos",
      responsible: "João Carlos - Diretor"
    },
    {
      id: "3",
      type: "donation",
      amount: 85.50,
      date: "12/01/2024",
      description: "Doação para atividades extracurriculares",
      donor: "Pedro Oliveira"
    },
    {
      id: "4",
      type: "donation",
      amount: 200.00,
      date: "10/01/2024",
      description: "Doação para equipamentos tecnológicos",
      donor: "Ana Costa Silva"
    }
  ];

  const currentBalance = 2847.50;
  const lastUpdated = "15/01/2024 às 14:30";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-xl font-semibold text-center">Histórico de Arrecadações</h1>
        <p className="text-sm text-muted-foreground text-center mt-1">
          Veja nossas arrecadações e como elas serão usadas
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <Card className="bg-info text-info-foreground">
          <CardContent className="p-6 text-center">
            <h2 className="text-sm font-medium mb-2 opacity-90">Saldo atual</h2>
            <p className="text-3xl font-bold mb-2">
              R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs opacity-80">
              Última atualização em {lastUpdated}
            </p>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="border-l-4 border-l-transparent hover:border-l-primary transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "donation" 
                        ? "bg-success-light text-success" 
                        : "bg-info-light text-info"
                    }`}>
                      {transaction.type === "donation" ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant={transaction.type === "donation" ? "default" : "secondary"}
                          className={
                            transaction.type === "donation" 
                              ? "bg-success text-success-foreground hover:bg-success/90" 
                              : "bg-info text-info-foreground hover:bg-info/90"
                          }
                        >
                          {transaction.type === "donation" ? "Doação" : "Depósito"}
                        </Badge>
                      </div>
                      
                      <h3 className="font-medium text-sm mb-1">
                        {transaction.description}
                      </h3>
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>{transaction.date}</p>
                        {transaction.donor && (
                          <p>Doador: {transaction.donor}</p>
                        )}
                        {transaction.responsible && (
                          <p>Responsável: {transaction.responsible}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === "donation" 
                        ? "text-success" 
                        : "text-destructive"
                    }`}>
                      {transaction.type === "donation" ? "+" : "-"}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;